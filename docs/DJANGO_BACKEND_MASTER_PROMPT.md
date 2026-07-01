# Master Prompt: Build the Hello Oman Sheba Django REST Backend

> Copy everything below the line into a fresh AI coding agent session (Claude
> Code, etc.) with access to this repository. It is self-contained — the
> agent should not need this conversation's history, only this repo.

---

## 1. Role & Mission

You are building the production backend for **Hello Oman Sheba**, a
bilingual (Bengali/English) digital services platform for Bangladeshi
expatriates in Oman. The frontend (Next.js, `apps/web`) already exists and
is live. Your job is to build a **Django + Django REST Framework (DRF)**
backend at `apps/api` that will eventually serve both the existing web
frontend and a **future native mobile app (Swift/Kotlin or Flutter)** —
which is why the API must be plain REST/JSON with OpenAPI docs, not
framework-coupled (no tRPC, no GraphQL).

**Before writing any code, read these files in the repo** — they are the
source of truth and you must not contradict them without calling it out:

- `packages/database/schema.prisma` — the full existing data model (currently
  Prisma/TypeScript, never put into production use). Treat this as the
  canonical entity/field list to port into Django models. Prisma itself is
  being retired for backend duties; do not add Prisma code.
- `packages/database/mock-data.ts` — shows the exact field shapes and sample
  category names (Bengali + English) the frontend currently renders against.
- `apps/web/src/app/api/*/route.ts` — thin Next.js route handlers currently
  returning mock data in the shape `{ success, data, count }`. Your Django
  API's response envelope must be compatible with this shape (see §7).
- `docs/API_DOCUMENTATION.md` — an existing endpoint/contract sketch (written
  for a since-abandoned tRPC plan). Reuse its endpoint list and payload
  shapes as a starting point, but resolve the response-envelope conflict
  between this doc and the Next.js stub routes using the rules in §7.
- `docs/ARCHITECTURE.md` — overall system architecture. Its "Backend
  Architecture" section describes tRPC/Node; your job supersedes that
  section. Everything else (data layer, caching, search, storage, real-time,
  security) still applies and you should implement against it.
- `.env.example` (repo root) — every external integration this project
  expects (Postgres, Redis, Meilisearch, Twilio, Resend/SendGrid, Firebase,
  Cloudflare R2/S3, Stripe/SSLCommerz/Thawani, Sentry). Reuse these exact
  variable names in `apps/api/.env` where they overlap (same Postgres/Redis/
  Meilisearch instance as the rest of the stack) — don't invent new names for
  things that already have one.
- `docker-compose.yml` (repo root) — already runs `postgres`, `redis`,
  `meilisearch`, and the Next.js `web` service. Add an `api` service here
  rather than creating a parallel compose file.

---

## 2. Priorities (read this before starting)

The project owner needs a **working, deployable backend fast** — they are
more comfortable with Python/Django than the alternatives, which is why this
stack was chosen over a lighter TypeScript option. Optimize for **shipping a
correct, secure MVP quickly** over architectural purity. Concretely:

**Phase 1 — must have (build this first, make it fully solid):**
- Django project + all models from §6, migrations, Django admin registered
  for every model (this alone gives a usable content-management UI for
  free — don't skip it).
- JWT auth (register/login/refresh/logout), role field, permissions.
- Full CRUD REST API for: Jobs, Properties, Vehicles, Service Providers,
  Classifieds — matching §9.
- Categories endpoints + seed command populating them with the **exact**
  Bengali/English names already used in `packages/database/mock-data.ts`
  and in `apps/web/src/components/layout/header.tsx` / the homepage service
  grid (grep the frontend for these — do not invent new category names).
- Favorites, saved jobs, job applications, service bookings.
- Pagination, filtering, search-by-field (django-filter) on every list
  endpoint.
- CORS configured for the Next.js origin.
- OpenAPI schema + Swagger UI (drf-spectacular) — this is what the future
  mobile app will be built against, so it must be accurate.
- Dockerfile + docker-compose `api` service, wired to the existing
  `postgres`/`redis` services.
- Basic tests (auth flow + one CRUD module) proving the setup works.

**Phase 2 — do after Phase 1 is solid and demoable:**
- Forum/community module, Articles/news, Emergency contacts, Advertisements.
- Notifications + Messages (in-app; real-time is Phase 3).
- Meilisearch sync + global `/search` endpoint.
- Celery + Redis for async email/SMS/OTP sending.
- Reviews/ratings.

**Phase 3 — explicitly optional, call out as future work rather than
building it:**
- Real-time chat (Django Channels), push notifications (Firebase), payment
  gateway integration (Stripe/SSLCommerz/Thawani), custom admin analytics
  API (Django Admin already covers moderation — don't build a parallel
  admin API unless asked).

If you have to cut scope anywhere, cut from Phase 2/3, never from Phase 1.

---

## 3. Tech Stack (pinned choices — don't substitute without a strong reason)

- **Python 3.12**, **Django 5.x**, **djangorestframework**
- **djangorestframework-simplejwt** — JWT auth (access + refresh)
- **django-cors-headers** — CORS for the Next.js origin + future mobile
- **django-filter** — filtering on list endpoints
- **drf-spectacular** — OpenAPI 3 schema, Swagger UI at `/api/docs/`, schema
  at `/api/schema/`
- **psycopg[binary]** — Postgres driver
- **django-redis** — cache backend, pointed at the existing Redis instance
- **Pillow** — image handling
- **django-storages + boto3** — Cloudflare R2 (S3-compatible) media storage,
  using the `CLOUDFLARE_*` env vars already in `.env.example`
- **celery + redis** (Phase 2) — async tasks (OTP/email/SMS, search index sync)
- **meilisearch** python client (Phase 2)
- **twilio** python client (Phase 2, OTP/SMS)
- **sentry-sdk** — error monitoring, `SENTRY_DSN` from `.env.example`
- **pytest-django + factory_boy** — testing
- **gunicorn** — production WSGI server
- Primary keys: **UUID4** (`models.UUIDField(primary_key=True,
  default=uuid.uuid4, editable=False)`) on every model — this is the Django-
  idiomatic equivalent of Prisma's `cuid()`, don't add a cuid dependency.
- Postgres array columns (`skills String[]` etc. in the Prisma schema) →
  `django.contrib.postgres.fields.ArrayField`.
- `Json?` fields → `models.JSONField`.
- Polymorphic relations (Prisma's manual `reviewableType`/`reviewableId` and
  `favoriteType`/`favoriteId` pattern) → use Django's real
  `django.contrib.contenttypes` `GenericForeignKey`. This is strictly better
  than the manual string-type-name pattern Prisma was using; don't port that
  part literally.

---

## 4. Repository Integration

- Build the Django project inside **`apps/api/`** (already exists as an
  empty placeholder with a README — replace/build into it).
- This is a pnpm/Turborepo monorepo for the JS side; Django doesn't plug
  into Turborepo's task graph, and that's fine — just make sure `apps/api`
  has its own `requirements.txt` (or `pyproject.toml` if you prefer Poetry/
  uv — your call, but be consistent) and doesn't interfere with the root
  `package.json` workspaces (`apps/*` glob will match it but no `package.json`
  there, which is harmless).
- Add a top-level `README.md` note or update `docs/DEVELOPMENT_GUIDE.md`
  with how to run the Django dev server locally (`apps/api`, venv, `manage.py
  runserver` on port 8000) alongside `pnpm dev` for the frontend.
- Update root `docker-compose.yml`: add an `api` service building from
  `apps/api/Dockerfile`, depending on `postgres` and `redis` (reuse the
  existing service names/healthchecks), exposing port 8000, using
  `DATABASE_URL`/`REDIS_URL` env vars already defined in `.env.example`.

---

## 5. Environment Variables

Reuse these exact names from the root `.env.example` (don't rename):
`DATABASE_URL`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`,
`REDIS_URL`, `REDIS_PASSWORD`, `MEILISEARCH_HOST`, `MEILISEARCH_MASTER_KEY`,
`CLOUDFLARE_*`, `TWILIO_*`, `RESEND_API_KEY`/`SENDGRID_API_KEY`,
`FIREBASE_*`, `SENTRY_DSN`, `RATE_LIMIT_MAX_REQUESTS`,
`RATE_LIMIT_WINDOW_MS`.

New Django-specific vars already added to root `.env.example` for you:
`DJANGO_SECRET_KEY`, `DJANGO_DEBUG`, `DJANGO_ALLOWED_HOSTS`,
`DJANGO_CORS_ALLOWED_ORIGINS`, `NEXT_PUBLIC_DJANGO_API_URL`.

Create `apps/api/.env.example` mirroring whichever of the above the Django
settings actually read, with a short comment pointing back to the root file
as the canonical source for shared infra values.

---

## 6. Data Model — Django Apps & Models

Create these Django apps under `apps/api/`, one per domain (mirrors the
`// ====` section headers in `schema.prisma`):

| Django app | Prisma models to port |
|---|---|
| `accounts` | `User`, `Account`, `Session` (replace with SimpleJWT token blacklist app instead of a custom Session model), `VerificationToken` (repurpose as OTP model) |
| `jobs` | `Job`, `JobCategory` (self-referential, keep parent/children), `Company`, `JobApplication`, `SavedJob` |
| `properties` | `Property` |
| `vehicles` | `Vehicle` |
| `services` | `ServiceProvider`, `ServiceCategory` (self-referential) |
| `classifieds` | `Classified`, `ClassifiedCategory` |
| `community` | `ForumPost`, `ForumComment` (self-referential replies), `ForumCategory` |
| `content` | `Article`, `ArticleCategory`, `EmergencyContact`, `Advertisement` |
| `interactions` | `Review` (via GenericForeignKey, replaces `reviewableType`/`Id`), `Favorite` (via GenericForeignKey, replaces `favoriteType`/`Id`), `Booking`, `Message`, `Notification` |
| `core` | `Setting`, `AuditLog`, `PageView`, shared abstract base models |

**Shared abstract base models** (put in `core/models.py`, inherit everywhere
applicable):

```python
class TimeStampedModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True

class SluggedModel(models.Model):
    slug = models.SlugField(unique=True, max_length=255)
    class Meta:
        abstract = True

class PublishableModel(models.Model):
    """DRAFT/PUBLISHED/EXPIRED/etc. lifecycle shared by Job, Property,
    Vehicle, Classified — mirror Prisma's ListingStatus/JobStatus enums."""
    status = models.CharField(max_length=20, choices=..., default="DRAFT")
    featured = models.BooleanField(default=False)
    views = models.PositiveIntegerField(default=0)
    published_at = models.DateTimeField(null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    class Meta:
        abstract = True
```

**Field porting rules:**
- Every Prisma `enum` → a Django `TextChoices` class, kept as the exact same
  member names/values (e.g. `JobType.FULL_TIME`) so the API's string values
  don't change from what's documented in `docs/API_DOCUMENTATION.md`.
- Every `fieldBn` in Prisma → `field_bn` in Django (snake_case is Django
  convention; the DRF serializer will re-expose it as `fieldBn` — see §7 on
  casing).
- `String[]` → `ArrayField(models.CharField(max_length=255), default=list,
  blank=True)`.
- Self-referential category trees (`JobCategory`, `ServiceCategory`) → keep
  `parent = models.ForeignKey('self', null=True, blank=True,
  related_name='children', on_delete=models.SET_NULL)`.
- Every `@@index` in Prisma → an explicit `indexes = [...]` in the Django
  model's `Meta`, plus `db_index=True` on frequently-filtered scalar fields
  (`city`, `status`, `slug`, etc.).
- `@@unique([a, b])` → `UniqueConstraint(fields=['a', 'b'], name=...)`.

Register **every** model in `admin.py` with sensible `list_display`,
`list_filter`, and `search_fields` — this is a Phase 1 deliverable, not
optional polish, since it's the fastest way for the project owner to manage
content before an admin dashboard UI exists.

---

## 7. API Design Standards

**Base path:** `/api/v1/`.

**Response envelope — resolve the conflict between the two existing docs
like this:**

```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "count": 100,
    "page": 1,
    "pageSize": 20,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

- `success`/`data` keeps compatibility with the shape already returned by
  the Next.js stub routes in `apps/web/src/app/api/*` (`{ success, data,
  count }`) so swapping the frontend over later is a small diff, not a
  rewrite.
- `pagination` block satisfies what `docs/API_DOCUMENTATION.md` promises.
- Implement this as a custom DRF pagination class (`StandardResultsPagination`)
  and a custom `Response` wrapper/renderer so every view gets it for free —
  don't hand-roll the envelope in every view function.
- Detail endpoints (single object) return `{ "success": true, "data": {...}
  }` with no `pagination` key.

**Field casing:** the frontend (TypeScript/Prisma) uses `camelCase`
(`titleBn`, `createdAt`). Django/DRF defaults to `snake_case`. Configure DRF
to serialize as `camelCase` on the wire (e.g. via `djangorestframework-
camel-case` or custom serializer fields) so the API output matches
`docs/API_DOCUMENTATION.md`'s examples exactly and the frontend needs zero
transformation logic.

**Filtering/search/sort conventions** (apply consistently across all list
endpoints, matching the query params already sketched in
`docs/API_DOCUMENTATION.md`):
- `page`, `pageSize` (aliased to DRF's pagination)
- `search` — free-text search (django-filter `SearchFilter` initially;
  swap to Meilisearch in Phase 2 for the modules that need typo-tolerance)
- `sortBy`, `order` (`asc`/`desc`)
- Domain-specific filters per module (city, type, category, price range,
  etc.) — see the query parameter lists already documented per-endpoint in
  `docs/API_DOCUMENTATION.md` §"Jobs API" / "Properties API" / etc. and
  implement exactly those.

**Error format** — implement exactly what's in
`docs/API_DOCUMENTATION.md` §"Error Responses" via a custom DRF exception
handler:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable error message",
    "details": { "field": "Field-specific errors" }
  }
}
```

**Versioning:** URL-prefixed (`/api/v1/`) so a future `/api/v2/` can exist
without breaking the mobile app once it ships.

---

## 8. Authentication & Authorization

- **djangorestframework-simplejwt**: access token short-lived (15 min),
  refresh token longer-lived (7 days), matching
  `docs/ARCHITECTURE.md`'s stated flow.
- Custom `User` model (`AUTH_USER_MODEL`) extending
  `AbstractBaseUser`/`PermissionsMixin`, with the fields from the Prisma
  `User` model: `email` (unique, login field), `phone` (unique, nullable),
  `name`, `name_bn`, `avatar`, `role`, `status`, `date_of_birth`, `gender`,
  `nationality` (default `"Bangladesh"`), `passport_no`, `oman_id`, `city`,
  `area`, `language` (default `"bn"`).
- `role` choices: `USER`, `SERVICE_PROVIDER`, `RECRUITER`, `ADMIN`,
  `SUPER_ADMIN` (exact Prisma enum values). Build a small `IsRecruiter`,
  `IsOwnerOrAdmin`, etc. set of DRF permission classes rather than checking
  `request.user.role` inline in every view.
- Endpoints: `POST /auth/register/`, `POST /auth/login/`, `POST
  /auth/token/refresh/`, `POST /auth/logout/` (blacklist refresh token),
  `GET /auth/me/`, `PATCH /auth/me/`.
- Phase 2: `POST /auth/otp/request/` + `POST /auth/otp/verify/` (Twilio SMS,
  repurposing the `VerificationToken` model), password reset flow, Google/
  Facebook OAuth (`django-allauth` is fine if you get to this).
- Password hashing: Django's default (PBKDF2) is acceptable; Argon2 is a
  one-line upgrade (`argon2-cffi` + `PASSWORD_HASHERS` setting) if you have
  time — not required for Phase 1.

---

## 9. Endpoint Catalog (Phase 1 scope — build all of these)

Use DRF `ModelViewSet` + `DefaultRouter` per module to keep this fast to
build; only break out to explicit `APIView`s for the non-CRUD actions
(apply/save/favorite/book).

```
/api/v1/auth/register/                 POST
/api/v1/auth/login/                    POST
/api/v1/auth/token/refresh/            POST
/api/v1/auth/logout/                   POST
/api/v1/auth/me/                       GET, PATCH

/api/v1/jobs/                          GET, POST
/api/v1/jobs/{slug}/                   GET, PATCH, DELETE
/api/v1/jobs/{slug}/apply/             POST (auth)
/api/v1/jobs/{slug}/save/              POST (auth, toggle SavedJob)
/api/v1/job-categories/                GET
/api/v1/companies/                     GET
/api/v1/companies/{slug}/              GET

/api/v1/properties/                    GET, POST
/api/v1/properties/{slug}/             GET, PATCH, DELETE
/api/v1/properties/{slug}/favorite/    POST (auth, toggle)

/api/v1/vehicles/                      GET, POST
/api/v1/vehicles/{slug}/               GET, PATCH, DELETE

/api/v1/services/                      GET, POST
/api/v1/services/{slug}/               GET, PATCH, DELETE
/api/v1/services/{slug}/book/          POST (auth)
/api/v1/service-categories/            GET

/api/v1/classifieds/                   GET, POST
/api/v1/classifieds/{slug}/            GET, PATCH, DELETE
/api/v1/classified-categories/         GET

/api/v1/favorites/                     GET (auth, all types for current user)
/api/v1/favorites/{id}/                DELETE (auth)

/api/v1/user/applications/             GET (auth)
/api/v1/user/saved-jobs/               GET (auth)
```

Phase 2 additions:

```
/api/v1/forum/posts/                   GET, POST
/api/v1/forum/posts/{slug}/            GET, PATCH, DELETE
/api/v1/forum/posts/{slug}/comments/   GET, POST
/api/v1/forum-categories/              GET

/api/v1/articles/                      GET  (?type=NEWS|BLOG|ANNOUNCEMENT|GUIDE)
/api/v1/articles/{slug}/               GET

/api/v1/emergency-contacts/            GET
/api/v1/ads/                           GET  (?page=&position=)

/api/v1/notifications/                 GET (auth)
/api/v1/notifications/{id}/read/       POST (auth)
/api/v1/notifications/read-all/        POST (auth)

/api/v1/messages/threads/              GET, POST (auth)
/api/v1/messages/threads/{id}/         GET (auth)

/api/v1/search/                        GET  ?q=&type=&limit=
/api/v1/services/{slug}/review/        POST (auth)
```

For every list endpoint, apply ownership/status rules: public users only
ever see `status=PUBLISHED` (and not expired) listings; the owning user or
an admin can see/edit their own regardless of status. Enforce this in the
viewset's `get_queryset`, not just at the serializer level.

---

## 10. Search (Phase 2)

Sync `Job`, `Property`, `Vehicle`, `ServiceProvider`, `Classified`, `Article`
into Meilisearch indexes via `post_save`/`post_delete` signals (or Celery
tasks, preferred, so indexing never blocks the request-response cycle).
Implement `GET /api/v1/search/` as a Meilisearch multi-index federated
search, matching the response shape in
`docs/API_DOCUMENTATION.md` §"Search API". Fall back to Postgres
`icontains`/`SearchVector` if Meilisearch is unreachable — don't let search
being down take down listing pages.

---

## 11. Performance & Caching

- `select_related`/`prefetch_related` on every queryset that serializes a
  foreign key or reverse relation (e.g. `Job.objects.select_related(
  'company', 'category')`) — audit every viewset for N+1 before calling
  Phase 1 done.
- `django-redis` cache for category lists, homepage aggregates, and any
  endpoint that's read far more than written (cache invalidate on
  save/delete via signals).
- DRF throttling classes using `RATE_LIMIT_MAX_REQUESTS`/
  `RATE_LIMIT_WINDOW_MS` from env, matching the tiers in
  `docs/API_DOCUMENTATION.md` §"Rate Limiting" (unauthenticated vs
  authenticated).
- Default `PAGE_SIZE` of 20, hard max of 100 (matches documented `limit`
  max).

---

## 12. File Uploads

Images/documents (job CVs, property/vehicle/classified photos, avatars) go
to Cloudflare R2 via `django-storages`, using the `CLOUDFLARE_*` env vars.
Provide a simple authenticated `POST /api/v1/uploads/` endpoint that accepts
multipart file(s) and returns the public URL(s) to store in the relevant
`ArrayField`/`CharField` — don't require the client to talk to R2 directly
for Phase 1 (presigned direct-upload URLs are a fine Phase 2 optimization).

---

## 13. Security Checklist

- `DJANGO_DEBUG=false` in any non-local environment; `DJANGO_ALLOWED_HOSTS`
  and `DJANGO_CORS_ALLOWED_ORIGINS` read from env, never `*` in production.
- All write endpoints require authentication; ownership checked server-side
  (never trust a client-supplied `ownerId`/`userId` — derive it from
  `request.user`).
- File upload validation: content-type allowlist, size limit.
- Django's built-in CSRF protection is not needed for a token-auth JSON API
  (SimpleJWT, no session cookies) — disable CSRF checks on the API views but
  make sure you haven't accidentally left session auth enabled alongside
  JWT (pick one primary auth class in DRF settings: JWT).
- `sentry-sdk` initialized with `SENTRY_DSN` from env, environment tag set
  correctly per deploy target.

---

## 14. API Documentation

`drf-spectacular` wired up so:
- `GET /api/schema/` returns the raw OpenAPI 3 spec
- `GET /api/docs/` serves Swagger UI
- `GET /api/redoc/` serves ReDoc (optional but cheap to add)

This OpenAPI spec is the contract the future native mobile app will be
built against — every endpoint needs accurate request/response schemas, not
just a 200 with no documented shape. Use DRF serializers' built-in
introspection (drf-spectacular reads these automatically) rather than
writing OpenAPI YAML by hand.

---

## 15. Testing

`pytest-django` + `factory_boy`. Phase 1 minimum:
- Auth flow: register → login → access protected endpoint → refresh →
  logout → old refresh token rejected.
- One full CRUD + permission test suite for the `jobs` app (create as owner,
  read as anonymous, reject edit by non-owner, apply as authenticated user,
  reject duplicate application).
- Model-level tests for any non-trivial `save()`/signal logic (slug
  generation, etc.).

---

## 16. Seed Data

Write a `python manage.py seed_categories` management command (Phase 1)
that populates `JobCategory`, `ServiceCategory`, `ClassifiedCategory`,
`ForumCategory`, and `EmergencyContact` with the **exact** names already
hardcoded in the frontend — grep these before writing the command:

- `apps/web/src/components/layout/header.tsx` — top-level nav categories
  (চাকরি, বাসা ভাড়া, গাড়ি, সেবা, কমিউনিটি, ক্লাসিফাইড)
- The homepage services grid (12 icons: চাকরি, বাসা ভাড়া, গাড়ি,
  স্বাস্থ্যসেবা, পাসপোর্ট, ভিসা, ভ্রমণ, শিক্ষা, আইনগত সহায়তা, ব্যবসা,
  কমিউনিটি, ক্লাসিফাইড) — find the component that renders this and copy
  its exact icon/label pairs into `ServiceCategory` seed rows.
- `packages/database/mock-data.ts` — `mockEmergencyContacts`,
  `mockServices` category names, `mockJobs`/`mockProperties` for realistic
  sample listings if you also write a `seed_demo_data` command (nice to
  have, not required).

Getting these names wrong means the frontend's category filter dropdowns
silently return empty results — treat this as correctness-critical, not
cosmetic.

---

## 17. Docker & Deployment

- `apps/api/Dockerfile`: multi-stage, slim Python base image, installs deps,
  runs `gunicorn config.wsgi:application` in production.
- Add an `api` service to the root `docker-compose.yml`:
  ```yaml
  api:
    build:
      context: ./apps/api
    container_name: hello-oman-api
    restart: unless-stopped
    ports:
      - '8000:8000'
    environment:
      - DATABASE_URL=postgresql://${POSTGRES_USER:-postgres}:${POSTGRES_PASSWORD:-password}@postgres:5432/${POSTGRES_DB:-hello_oman_sheba}?schema=public
      - REDIS_URL=redis://:${REDIS_PASSWORD:-}@redis:6379
      - MEILISEARCH_HOST=http://meilisearch:7700
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
  ```
  (adjust env var parsing since Django won't consume a Prisma-style
  `?schema=public` query string the same way — use `dj-database-url` to
  parse `DATABASE_URL` cleanly.)
- **Vercel cannot host Django.** Note this explicitly in
  `docs/DEPLOYMENT_GUIDE.md`: the Next.js frontend stays on Vercel, the
  Django API needs Railway, Render, Fly.io, or a plain VPS with this same
  docker-compose file. Update that doc's deployment matrix accordingly
  rather than leaving it implying a single Vercel deploy target.

---

## 18. Definition of Done (Phase 1)

- [ ] `apps/api` is a working Django project; `python manage.py runserver`
      boots with no errors against the existing `postgres` container.
- [ ] `python manage.py migrate` runs clean from empty.
- [ ] Every model from §6 exists, is registered in Django admin, and admin
      login works.
- [ ] Auth flow (register/login/refresh/logout/me) works end-to-end,
      verified by a test.
- [ ] Jobs, Properties, Vehicles, Services, Classifieds all have working
      list (with filtering + pagination), detail, create, update, delete,
      respecting ownership/status rules.
- [ ] Favorites, saved jobs, job applications, service bookings work.
- [ ] `GET /api/docs/` renders Swagger UI with every endpoint documented.
- [ ] Seed command populates categories matching the frontend's existing
      hardcoded names exactly.
- [ ] `docker compose up` brings up postgres + redis + meilisearch + api
      together and the API is reachable on `localhost:8000`.
- [ ] CORS allows `http://localhost:3000` (and whatever
      `NEXT_PUBLIC_APP_URL` is set to) to call the API from a browser.
- [ ] `pytest` passes.
- [ ] Short `apps/api/README.md` explaining how to run it locally, replacing
      the placeholder that's there now.

Report back what you built, what you deferred to Phase 2/3, and any place
you had to deviate from this spec (e.g. a Prisma field that didn't map
cleanly) with your reasoning.

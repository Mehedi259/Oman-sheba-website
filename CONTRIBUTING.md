# Contributing to Hello Oman Sheba

Thank you for your interest in contributing to Hello Oman Sheba! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone, regardless of:
- Age, body size, disability, ethnicity, gender identity and expression
- Level of experience, education, socio-economic status
- Nationality, personal appearance, race, religion
- Sexual identity and orientation

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behavior includes:**
- Harassment, trolling, or derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct inappropriate in a professional setting

## Getting Started

### 1. Fork the Repository

Click the "Fork" button at the top right of the repository page.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/hello-oman-sheba.git
cd hello-oman-sheba
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/original-org/hello-oman-sheba.git
```

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 5. Make Your Changes

Follow our [Development Guide](docs/DEVELOPMENT_GUIDE.md) for detailed instructions.

## Development Process

### Before You Start

1. **Check existing issues** - Someone might already be working on it
2. **Create an issue** - Discuss your idea before starting
3. **Get assigned** - Wait for maintainer approval
4. **Start coding** - Follow our guidelines

### During Development

1. **Keep commits small** - One logical change per commit
2. **Write tests** - Cover your changes with tests
3. **Update docs** - Keep documentation in sync
4. **Run checks** - Lint, type-check, and test before pushing

### Sync with Upstream

```bash
# Fetch upstream changes
git fetch upstream

# Merge into your branch
git merge upstream/main
```

## Pull Request Process

### 1. Prepare Your PR

```bash
# Run all checks
pnpm lint
pnpm type-check
pnpm test
pnpm build

# Commit and push
git push origin feature/your-feature-name
```

### 2. Create Pull Request

- Go to your fork on GitHub
- Click "New Pull Request"
- Select your feature branch
- Fill in the PR template

### 3. PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added where needed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added
- [ ] All checks passing

## Screenshots (if applicable)

## Related Issues
Closes #123
```

### 4. Review Process

- Maintainers will review your PR
- Address feedback and make changes
- Once approved, your PR will be merged

### 5. After Merge

- Delete your feature branch
- Pull latest changes from main
- Celebrate! 🎉

## Coding Standards

### TypeScript

```typescript
// ✅ Good
interface User {
  id: string
  name: string
  email: string
}

function getUser(id: string): Promise<User> {
  // Implementation
}

// ❌ Bad
function getUser(id: any) {
  // No return type, uses 'any'
}
```

### React Components

```typescript
// ✅ Good - Functional component with TypeScript
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary' 
}: ButtonProps) {
  return (
    <button onClick={onClick} className={variant}>
      {children}
    </button>
  )
}

// ❌ Bad - No types, unclear props
export function Button(props) {
  return <button>{props.children}</button>
}
```

### File Organization

```
✅ Good Structure:
src/
├── components/
│   ├── job-card.tsx
│   ├── job-list.tsx
│   └── index.ts       # Export all
├── hooks/
│   ├── use-jobs.ts
│   └── use-auth.ts
└── lib/
    ├── api.ts
    └── utils.ts

❌ Bad Structure:
src/
├── Component1.tsx
├── component2.tsx
├── utils.tsx
└── misc.tsx
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `JobCard.tsx` |
| Functions | camelCase | `getUserProfile()` |
| Constants | UPPER_SNAKE_CASE | `API_URL` |
| Types/Interfaces | PascalCase | `UserProfile` |
| Files | kebab-case | `job-list.tsx` |
| Hooks | camelCase with 'use' | `useJobs()` |

### Code Style

```typescript
// ✅ Good - Clear, documented, typed
/**
 * Formats a date to Bengali locale
 * @param date - Date to format
 * @param format - Format string (default: 'short')
 * @returns Formatted date string
 */
export function formatDateBn(
  date: Date,
  format: 'short' | 'long' = 'short'
): string {
  return new Intl.DateTimeFormat('bn-BD', {
    dateStyle: format === 'short' ? 'short' : 'long'
  }).format(date)
}

// ❌ Bad - No docs, unclear, untyped
export function formatDate(d, f) {
  return new Intl.DateTimeFormat('bn-BD').format(d)
}
```

## Commit Messages

### Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only
- **style**: Formatting, missing semicolons, etc.
- **refactor**: Code restructuring
- **perf**: Performance improvement
- **test**: Adding tests
- **chore**: Maintenance, dependencies

### Examples

```bash
# Good commits
feat(jobs): add job alert functionality
fix(auth): resolve login redirect issue
docs(api): update authentication documentation
refactor(database): optimize job queries
test(jobs): add tests for job creation

# Bad commits
update stuff
fix bug
changes
wip
```

### Detailed Example

```
feat(jobs): add email notifications for job applications

- Implement email template for application confirmation
- Add background job processing with Bull
- Include job details and application status in email
- Add user preference for email notifications

Closes #145
```

## Testing

### Write Tests

```typescript
// apps/web/src/lib/__tests__/utils.test.ts
import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../utils'

describe('formatCurrency', () => {
  it('formats OMR currency correctly', () => {
    expect(formatCurrency(100, 'OMR')).toBe('OMR 100.00')
  })
  
  it('handles zero values', () => {
    expect(formatCurrency(0, 'OMR')).toBe('OMR 0.00')
  })
  
  it('handles large numbers', () => {
    expect(formatCurrency(1000000, 'OMR')).toBe('OMR 1,000,000.00')
  })
})
```

### Run Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test utils.test.ts

# Run tests in watch mode
pnpm test --watch

# Run with coverage
pnpm test --coverage
```

### Test Coverage

Aim for:
- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

## Documentation

### Code Comments

```typescript
// ✅ Good - Explains WHY, not WHAT
// Using debounce to prevent excessive API calls during typing
const debouncedSearch = debounce(searchJobs, 300)

// ❌ Bad - States the obvious
// Call the debounced search function
const debouncedSearch = debounce(searchJobs, 300)
```

### JSDoc Comments

```typescript
/**
 * Searches for jobs based on query parameters
 * 
 * @param query - Search query string
 * @param filters - Optional filters (category, location, etc.)
 * @returns Promise resolving to array of jobs
 * @throws {ValidationError} If query is invalid
 * 
 * @example
 * ```typescript
 * const jobs = await searchJobs('engineer', { 
 *   category: 'IT',
 *   location: 'Muscat' 
 * })
 * ```
 */
export async function searchJobs(
  query: string,
  filters?: JobFilters
): Promise<Job[]> {
  // Implementation
}
```

### Update Documentation

When you change:
- **API**: Update API documentation
- **Database**: Update schema documentation
- **Features**: Update user documentation
- **Setup**: Update README or guides

## Issue Guidelines

### Creating Issues

**Bug Report:**
```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g., macOS]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]
```

**Feature Request:**
```markdown
**Is your feature request related to a problem?**
Description of the problem

**Describe the solution you'd like**
Clear description of desired feature

**Describe alternatives you've considered**
Other solutions you've thought about

**Additional context**
Any other information
```

## Review Process

### As a Reviewer

- **Be constructive**: Suggest improvements, don't just criticize
- **Be specific**: Point to exact lines and explain why
- **Be timely**: Review within 48 hours if possible
- **Be thorough**: Check code, tests, and documentation
- **Approve or request changes**: Don't leave PRs hanging

### As an Author

- **Be responsive**: Address feedback promptly
- **Be open**: Accept constructive criticism
- **Be explanatory**: Explain your reasoning
- **Be patient**: Wait for thorough review
- **Be grateful**: Thank reviewers for their time

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Featured on our website (with permission)
- Invited to contributor Discord channel

## Questions?

- 💬 [Discord Community](https://discord.gg/helloomansheba)
- 📧 [Email](mailto:dev@helloomansheba.com)
- 📚 [Documentation](docs/)
- 🐛 [Issues](https://github.com/your-org/hello-oman-sheba/issues)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Hello Oman Sheba! Together, we're building something amazing for the Bangladeshi community in Oman. 🇧🇩🇴🇲

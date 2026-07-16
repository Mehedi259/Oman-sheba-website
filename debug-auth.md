# Google Login Debugging Guide

## আপনার ব্রাউজারে এই steps follow করুন:

### Step 1: Website খুলুন
```
https://sheba-website.vercel.app
```

### Step 2: Browser Console খুলুন
- **Chrome/Edge**: `F12` অথবা `Right Click → Inspect → Console`
- **Firefox**: `F12` অথবা `Right Click → Inspect Element → Console`
- **Safari**: `Cmd + Option + C`

### Step 3: Environment Variables Check করুন
Console এ এই code paste করুন:

```javascript
console.log('Google Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
console.log('Backend URL:', process.env.NEXT_PUBLIC_BACKEND_URL);
```

**Expected Output:**
```
Google Client ID: undefined (এটা normal, client side এ process.env কাজ করে না)
```

### Step 4: Window এ Google Provider Check করুন
```javascript
console.log('Window has google:', typeof window.google !== 'undefined');
```

### Step 5: লগইন Button ক্লিক করে Console দেখুন

1. Header এর ডান দিকে **"লগইন"** button ক্লিক করুন
2. Modal খুললে Console এ কোনো error দেখাচ্ছে কিনা দেখুন

### Common Errors:

#### Error 1: "GoogleOAuthProvider needs clientId prop"
**Solution:** Environment variable missing
```bash
# Terminal এ run করুন:
cd /Users/mehedihasanmridul/website/sheba-website
vercel env ls
```

#### Error 2: "Failed to load gsi client"
**Solution:** Network issue or wrong Client ID

#### Error 3: No error but button not showing
**Solution:** CSS/styling issue

---

## Quick Fix Commands:

### Re-add Environment Variables (যদি missing হয়):
```bash
cd /Users/mehedihasanmridul/website/sheba-website

# Production
printf "426790430741-89du8066jkn0cjkbqugq7ej6v6s5ep5v.apps.googleusercontent.com" | vercel env add NEXT_PUBLIC_GOOGLE_CLIENT_ID production

# Preview
printf "426790430741-89du8066jkn0cjkbqugq7ej6v6s5ep5v.apps.googleusercontent.com" | vercel env add NEXT_PUBLIC_GOOGLE_CLIENT_ID preview

# Redeploy
vercel --prod
```

---

## আমাকে এই information দিন:

1. ✅ "লগইন" button দেখাচ্ছে কিনা?
2. ✅ Button ক্লিক করলে modal খুলছে কিনা?
3. ✅ Modal এর ভিতরে কী দেখাচ্ছে?
4. ✅ Console এ কোনো error আছে কিনা?
5. ✅ Screenshot পাঠাতে পারলে আরো ভালো!


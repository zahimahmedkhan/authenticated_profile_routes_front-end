# Cookie Authentication Fix

## Problem
Cookies were not being set in the browser when logging in, causing authentication issues.

## Root Causes Identified
1. **CORS Configuration**: Missing proper CORS headers in Next.js
2. **Cookie Domain Issues**: Cross-domain cookie setting between frontend and backend
3. **Missing Cookie Configuration**: No proper cookie handling setup

## Fixes Applied

### 1. Updated Next.js Configuration (`next.config.mjs`)
- Added CORS headers to allow credentials
- Configured proper origin for backend domain
- Added necessary HTTP methods and headers

### 2. Created Auth Utility (`src/lib/auth.js`)
- Centralized authentication logic
- Proper axios configuration with `withCredentials: true`
- Cookie handling and localStorage fallback
- Error handling and automatic redirects

### 3. Updated All Authentication Pages
- **Login Page**: Uses new auth utility
- **Signup Page**: Uses new auth utility  
- **Profile Page**: Uses new auth utility
- **Middleware**: Updated to handle `/profile` routes

### 4. Added Debug Tools
- **Cookie Debugger Component**: Test cookie functionality
- **Test API Route**: Verify cookie setting locally

## Testing the Fix

### 1. Start Your Development Server
```bash
npm run dev
```

### 2. Test Cookie Debugger
1. Go to `/auth/login`
2. Click "Show Cookie Debugger"
3. Test both local and backend cookie functionality

### 3. Test Login Flow
1. Try logging in with valid credentials
2. Check browser DevTools → Application → Cookies
3. Verify cookies are being set

### 4. Check Network Tab
1. Open DevTools → Network
2. Attempt login
3. Check if cookies are in response headers

## Common Issues and Solutions

### Issue: Cookies Still Not Setting
**Possible Causes:**
- Backend not setting cookies properly
- Domain mismatch
- HTTPS/HTTP mismatch

**Solutions:**
1. Check backend CORS configuration
2. Ensure backend sets cookies with proper domain
3. Use HTTPS in production

### Issue: CORS Errors
**Solution:**
- Verify backend allows your frontend domain
- Check `Access-Control-Allow-Credentials: true` on backend

### Issue: Cookie Not Persisting
**Solutions:**
- Check cookie attributes (httpOnly, secure, sameSite)
- Verify domain and path settings
- Test in incognito mode

## Backend Requirements

Your backend should:
1. Set cookies with proper attributes:
```javascript
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  domain: '.yourdomain.com', // or omit for same domain
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
});
```

2. Configure CORS properly:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

## Debugging Steps

1. **Check Browser Console**: Look for CORS errors
2. **Network Tab**: Verify cookies in response headers
3. **Application Tab**: Check if cookies are stored
4. **Use Cookie Debugger**: Test cookie functionality
5. **Backend Logs**: Check if login requests are reaching backend

## Production Considerations

1. **HTTPS Only**: Use HTTPS in production
2. **Domain Configuration**: Set proper cookie domains
3. **Security Headers**: Configure security headers properly
4. **Environment Variables**: Use proper environment configuration

## Files Modified

- `next.config.mjs` - Added CORS configuration
- `src/lib/auth.js` - Created auth utility
- `src/app/auth/login/page.jsx` - Updated to use auth utility
- `src/app/auth/signup/page.jsx` - Updated to use auth utility
- `src/app/profile/page.js` - Updated to use auth utility
- `src/middleware.js` - Updated route protection
- `src/app/api/test-cookies/route.js` - Added test API
- `src/components/CookieDebugger.jsx` - Added debug component

## Next Steps

1. Test the login flow thoroughly
2. Remove debug components when working
3. Configure production environment
4. Set up proper error monitoring
5. Test on different browsers and devices 
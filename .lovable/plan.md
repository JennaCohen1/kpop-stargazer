

## Add User Authentication with Supabase

Connect your Supabase project and add login/signup so parents can access their child's star chart from any device.

### What this includes

1. **Connect Supabase** to the project (you'll be prompted to select your account)

2. **Auth pages** — Create a `/login` page with email/password sign-up and sign-in, styled to match the K-pop neon theme

3. **Protected routes** — Redirect unauthenticated users from `/chart` to `/login`; redirect authenticated users from `/login` to `/chart`

4. **Auth context** — A simple hook (`useAuth`) to track the current user session across the app, using `onAuthStateChange`

5. **Logout button** — Add a logout icon button in the header bar next to Settings

### Data storage (future consideration)

Right now, star chart data lives in localStorage. Authentication alone won't sync data across devices — that would require storing chore data in Supabase tables. This plan focuses only on adding user accounts. We can add cloud data sync as a follow-up.

### Files to create/modify

| File | Change |
|------|--------|
| `src/hooks/useAuth.tsx` | New — auth context with session listener |
| `src/pages/Login.tsx` | New — sign-in/sign-up form |
| `src/components/ProtectedRoute.tsx` | New — redirects to login if not authenticated |
| `src/App.tsx` | Wrap routes with auth provider, add `/login` route, protect `/chart` |
| `src/pages/Index.tsx` | Add logout button in header |


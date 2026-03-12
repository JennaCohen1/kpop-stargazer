

## Plan: Add Home Button, Settings Link & Manual Reset

### 1. Add Home button to star chart header
Add a **Home** icon button (next to the existing Settings gear) in `src/pages/Index.tsx` that navigates back to `/` (the splash page) using `useNavigate`.

### 2. Add "Reset Week" button in Settings
In `src/components/SettingsPanel.tsx`, add a **Reset Week** button (with a confirmation dialog) that:
- Resets all chore completions to 0
- Resets `goalReached` to false
- Updates `weekStart` to the current week
- Saves and closes settings

This gives a manual way to start fresh without waiting for the automatic Monday reset.

### Changes

**`src/pages/Index.tsx`**
- Import `useNavigate` from react-router-dom and `Home` icon from lucide-react
- Add a Home button next to the Settings button that calls `navigate("/")`

**`src/components/SettingsPanel.tsx`**
- Add a "Reset Week" button (styled destructive) below the Save button
- On click, show a `window.confirm` dialog ("Reset all stars and start fresh?")
- If confirmed, call `onSave` with completions zeroed and `goalReached: false`, then close


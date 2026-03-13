

## Plan: Move Home button next to Settings button

Move the Home button from the left side of the header to sit right next to the Settings button on the right side.

**Change in `src/pages/Index.tsx`:**
- Remove the Home button from its current position (before the hero image)
- Place it immediately before the Settings button, both grouped on the right with `ml-auto`
- Wrap both buttons in a `flex gap-2` container with `ml-auto`

The header will become: `[Image] [Title] ... [Home] [Settings]`




## Plan: Show stars based on points, not completions

Currently, `ChoreRow.tsx` renders one star per completion. For a 2-point chore like "Clean room," it should render 2 stars per completion.

### Change

In `ChoreRow.tsx`, change the star count from `chore.completions` to `Math.abs(chore.points) * chore.completions`. This way "Clean room" (2 pts, completed once) shows 2 stars, "Brush teeth" (1 pt, completed once) shows 1 star, etc.

The "No stars yet" fallback and negative-chore styling remain unchanged.


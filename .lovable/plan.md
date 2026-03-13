

## Unmute celebration video

Remove the `muted` attribute from the `<video>` tag in `src/components/CelebrationScreen.tsx` so the K-pop video plays with sound.

**Note:** On iOS/iPad, browsers require videos to be muted for autoplay. Removing `muted` may prevent autoplay. To work around this, I'll keep `autoPlay` but remove `muted`, and add an `onCanPlay` handler as a fallback — if autoplay fails (due to browser policy), the video will still be ready to play on user tap.

### Changes
- **`src/components/CelebrationScreen.tsx`**: Remove `muted` from the `<video>` element. The video will attempt to autoplay with sound; if the browser blocks it, the user can tap the video to start playback.




## Replace YouTube iframe with local video

The `kpop.mp4` file is now in `/public`. I'll update `CelebrationScreen.tsx` to replace the YouTube `<iframe>` with a `<video>` tag pointing to `/kpop.mp4`, with autoplay, loop, and muted attributes for reliable playback on iPad.

### Changes
- **`src/components/CelebrationScreen.tsx`**: Replace the `<iframe>` block with a `<video>` element using `src="/kpop.mp4"`, with `autoPlay`, `loop`, `muted`, and `playsInline` attributes (all required for auto-play on iOS/iPad).


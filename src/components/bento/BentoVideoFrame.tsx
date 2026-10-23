import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useVideoPrefs } from '@/src/context/VideoPrefsContext';
import { getYoutubeId } from '@/src/core/domain/projectMedia';
import type { IScreenshot } from '@/src/core/domain/models';

interface BentoVideoFrameProps {
  screenshots: IScreenshot[];
  // The screenshot showing; held by the caller, since the clipboard shows that screenshot's links.
  slide: number;
  onSlideChange: (index: number) => void;
  youtubeUrl?: string;
  isActive?: boolean;
}

interface YTPlayerEvent {
  target: YTPlayer;
  data: number;
}

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  destroy(): void;
}

interface YTPlayerOptions {
  videoId: string;
  playerVars?: Record<string, number | string>;
  events?: {
    onReady?: (event: YTPlayerEvent) => void;
    onStateChange?: (event: YTPlayerEvent) => void;
  };
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
      PlayerState: { PLAYING: number; PAUSED: number };
    };
  }
}

// YouTube makes the full-size thumbnail for only some uploads; for the rest it answers with a
// 120×90 grey placeholder, which must never cover the frame (C-013).
const hasFullThumbnail = new Map<string, boolean>();

function fullThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

// The full-size thumbnail's URL, null when the video has none, undefined while still checking.
function useFullThumbnail(videoId: string | null): string | null | undefined {
  const [checked, setChecked] = useState<{ videoId: string; exists: boolean } | null>(null);

  useEffect(() => {
    if (!videoId || hasFullThumbnail.has(videoId)) return;
    let cancelled = false;
    const image = new Image();
    const settle = (exists: boolean) => {
      hasFullThumbnail.set(videoId, exists);
      if (!cancelled) setChecked({ videoId, exists });
    };
    image.onload = () => settle(image.naturalWidth > 120);
    image.onerror = () => settle(false);
    image.src = fullThumbnailUrl(videoId);
    return () => { cancelled = true; };
  }, [videoId]);

  if (!videoId) return null;
  const exists = hasFullThumbnail.get(videoId) ?? (checked?.videoId === videoId ? checked.exists : undefined);
  if (exists === undefined) return undefined;
  return exists ? fullThumbnailUrl(videoId) : null;
}

function NoPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-surface-base border-[length:var(--border-width-sm)] border-dashed border-ink-base/20 rounded-[32px]">
      <span className="font-mono text-xs text-ink-base/25 uppercase tracking-widest text-center select-none">
        No Preview<br/>Available
      </span>
    </div>
  );
}

const SLIDE_MS = 4000;

// Crossfades through the screenshots while its project is in view (T-067). Slides already shown
// stay mounted so the outgoing one can fade out; only the next one is added ahead, to load in time.
// A dot click jumps straight there, and the 4 s wait starts over from it.
function Slideshow({ screenshots, isActive, shown, onShow }: {
  screenshots: IScreenshot[];
  isActive?: boolean;
  shown: number;
  onShow: (index: number) => void;
}) {
  const isReducedMotion = useReducedMotion();
  const [reached, setReached] = useState(shown);
  if (shown > reached) setReached(shown);
  const runs = isActive && !isReducedMotion && screenshots.length > 1;

  useEffect(() => {
    if (!runs) return;
    const timer = setInterval(() => {
      if (!document.hidden) onShow((shown + 1) % screenshots.length);
    }, SLIDE_MS);
    return () => clearInterval(timer);
  }, [runs, shown, screenshots.length, onShow]);

  const hasCaptions = screenshots.some(shot => shot.caption);
  return (
    <>
      {screenshots.slice(0, runs ? reached + 2 : shown + 1).map((shot, i) => (
        <img
          key={shot.src}
          src={shot.src}
          alt={shot.caption ?? 'Project screenshot'}
          className="absolute inset-0 w-full h-full object-cover rounded-[32px] transition-opacity duration-700"
          style={{ opacity: i === shown ? 1 : 0 }}
        />
      ))}
      {(hasCaptions || screenshots.length > 1) && (
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1.5 pt-10 pb-3 md:pb-4 rounded-b-[32px] bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
          {/* All captions share one grid cell, so each fades in step with its screenshot. */}
          {hasCaptions && (
            <div className="grid text-center" aria-hidden>
              {screenshots.map((shot, i) => (
                <span
                  key={shot.src}
                  className="[grid-area:1/1] px-6 text-sm md:text-base font-semibold text-white drop-shadow-md transition-opacity duration-700"
                  style={{ opacity: i === shown ? 1 : 0 }}
                >
                  {shot.caption}
                </span>
              ))}
            </div>
          )}
          {screenshots.length > 1 && (
            <div className="flex pointer-events-auto">
              {screenshots.map((shot, i) => (
                <button
                  key={shot.src}
                  onClick={() => onShow(i)}
                  className="p-1.5 cursor-pointer group/dot"
                  aria-label={shot.caption ?? `Screenshot ${i + 1}`}
                  aria-current={i === shown}
                >
                  <span
                    className={`block w-2 h-2 rounded-full transition-colors ${i === shown ? 'bg-white' : 'bg-white/45 group-hover/dot:bg-white/80'}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export function BentoVideoFrame({ screenshots, slide, onSlideChange, youtubeUrl, isActive }: BentoVideoFrameProps) {
  const screenshot = screenshots[0]?.src;
  const videoId = youtubeUrl ? getYoutubeId(youtubeUrl) : null;
  const { isMuted, autoPlay, setMuted, setAutoPlay } = useVideoPrefs();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);
  const playerRef = useRef<YTPlayer | null>(null);
  const fullThumbnail = useFullThumbnail(videoId);
  const curtainImage = fullThumbnail === null ? screenshot : fullThumbnail;

  // Initialize YouTube player once per videoId
  useEffect(() => {
    if (!videoId) return;

    let cancelled = false;

    const initPlayer = () => {
      if (cancelled) return;
      playerRef.current = new window.YT.Player(`youtube-player-${videoId}`, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          loop: 1,
          playlist: videoId,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          disablekb: 1,
        },
        events: {
          onReady: (event: YTPlayerEvent) => {
            event.target.playVideo();
            setIsPlayerReady(true);
          },
          onStateChange: (event: YTPlayerEvent) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              setShowCurtain(false);
            }
            if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
          }
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      window.addEventListener('yt-ready', initPlayer);
      if (!document.getElementById('youtube-iframe-api')) {
        const script = document.createElement('script');
        script.id = 'youtube-iframe-api';
        script.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      window.removeEventListener('yt-ready', initPlayer);
      playerRef.current?.destroy();
      playerRef.current = null;
      setIsPlayerReady(false);
      setIsPlaying(false);
      setShowCurtain(true);
    };
  }, [videoId]);

  // Play/pause driven by isActive + global autoPlay preference
  useEffect(() => {
    if (!playerRef.current || !isPlayerReady) return;
    if (isActive && autoPlay) {
      setShowCurtain(true);
      playerRef.current.playVideo();
    } else if (!isActive) {
      playerRef.current.pauseVideo();
    }
    // isActive && !autoPlay: stay paused until user explicitly hits play
  }, [isActive, isPlayerReady, autoPlay]);

  // Global mute preference applied to this player whenever it changes
  useEffect(() => {
    if (!playerRef.current || !isPlayerReady) return;
    if (isMuted) {
      playerRef.current.mute();
    } else {
      playerRef.current.unMute();
    }
  }, [isMuted, isPlayerReady]);

  const toggleMute = () => setMuted(!isMuted);

  const togglePlay = () => {
    if (!playerRef.current || !isPlayerReady) return;
    if (isPlaying) {
      setAutoPlay(false);
      playerRef.current.pauseVideo();
    } else {
      setShowCurtain(true);
      setAutoPlay(true);
      playerRef.current.playVideo();
    }
  };

  return (
    // container-type: size lets the frame below size its width from THIS
    // element's actual height (via cqh), not just its width — needed so
    // the 16:9 frame shrinks on both axes together instead of one axis
    // (see the frame div's own comment for why).
    <div
      className="relative w-full h-full min-h-0 flex items-center justify-center p-2"
      style={{ containerType: 'size' }}
    >
      {/* w-full + aspect-video + max-h-full (the old sizing here) fight each
          other: aspect-ratio only fills in whichever dimension is left
          unset, so with width pinned to 100% it always derives height from
          that width first, then max-h-full just clamps the RESULT after the
          fact — it never feeds back to shrink the width, so on a short/wide
          panel the frame stayed full-width while only its height got cut,
          distorting the 16:9 ratio instead of scaling both dimensions down
          together. Sizing width as the smaller of "100% of available width"
          or "available height scaled to a 16:9 width" (via the cqh unit,
          which reads the container above) picks the largest 16:9 box that
          actually fits both constraints, so it grows/shrinks uniformly. */}
      <div
        className="relative aspect-video flex-shrink-0"
        style={{ width: 'min(100%, calc(100cqh * 16 / 9))' }}
      >
        {/* Hardware Buttons on top edge — locked chrome, never skin-driven, see index.css */}
        {/* Volume rocker, then the shorter power key: an Android phone's right side, turned so the camera sits on the left. */}
        <div className="absolute -top-[3px] md:-top-[4px] left-[46px] md:left-[76px] w-[56px] md:w-[93px] h-[3px] md:h-[4px] bg-[var(--chrome-device-shell)] rounded-t-[2px] z-0" />
        <div className="absolute -top-[3px] md:-top-[4px] left-[114px] md:left-[191px] w-[36px] md:w-[60px] h-[3px] md:h-[4px] bg-[var(--chrome-device-shell)] rounded-t-[2px] z-0" />

        <div className="relative group w-full h-full border-[8px] border-[var(--chrome-device-shell)] rounded-[40px] bg-[var(--chrome-device-shell)] overflow-hidden shadow-[var(--chrome-device-shadow)] z-10">
          {/* Device Notch */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-20 bg-[var(--chrome-device-shell)] rounded-r-[12px] z-20" />

          {/* Content: Video or Screenshot */}
          {videoId ? (
            // iframes don't support object-fit: cover, so the standard
            // workaround is oversizing the embed and clipping the overflow
            // via the parent's overflow-hidden. This frame is already 16:9
            // (aspect-video) matching a standard YouTube embed, so only a
            // small uniform buffer is needed — not the old -20%/-20%/-10%/
            // -10%, which was asymmetric (4x more vertical overscan than
            // horizontal) and cropped far more off the top/bottom than the
            // matching aspect ratio ever required.
            <div className="absolute -inset-[2%] z-0">
               <div id={`youtube-player-${videoId}`} className="w-full h-full pointer-events-none" />
               {/* Invisible shield blocks YouTube's own hover/click detection */}
               <div className="absolute inset-0 z-20 bg-transparent pointer-events-auto" />
            </div>
          ) : screenshot ? (
            <Slideshow screenshots={screenshots} isActive={isActive} shown={slide} onShow={onSlideChange} />
          ) : (
            <NoPreview />
          )}

          {/* Poster curtain: covers YouTube's startup animation, fades out on first PLAYING event.
              Full-size thumbnail, else our screenshot, else the placeholder (C-013); black while checking. */}
          {videoId && (
            <div
              className="absolute inset-0 z-30 bg-black bg-cover bg-center pointer-events-none"
              style={{
                backgroundImage: curtainImage ? `url(${curtainImage})` : undefined,
                opacity: showCurtain ? 1 : 0,
                visibility: showCurtain ? 'visible' : 'hidden',
                // instant show, then 0.8s hold before fading — covers YouTube's ~0.8s button animation
                transition: showCurtain
                  ? 'none'
                  : 'opacity 0.5s 0.8s ease-out, visibility 0s 1.3s',
              }}
            >
              {fullThumbnail === null && !screenshot && <NoPreview />}
            </div>
          )}

          {/* Custom Controls Overlay */}
          {videoId && isPlayerReady && (
            <div className="absolute inset-0 z-40 p-8 flex flex-col pointer-events-none">
              {/* Sound Toggle - Top Right */}
              <div className="flex justify-end">
                <button
                  onClick={toggleMute}
                  className="pointer-events-auto text-white/90 hover:text-white transition-colors cursor-pointer drop-shadow-md"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
                </button>
              </div>

              {/* Play/Pause Toggle - Center, On Hover */}
              <div className="flex-grow flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="pointer-events-auto text-white/0 group-hover:text-white/90 hover:!text-white transition-colors duration-300 cursor-pointer drop-shadow-lg"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={56} fill="currentColor" /> : <Play size={56} fill="currentColor" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

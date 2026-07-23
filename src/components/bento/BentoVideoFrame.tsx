import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useVideoPrefs } from '@/src/context/VideoPrefsContext';

interface BentoVideoFrameProps {
  screenshot?: string;
  youtubeUrl?: string;
  isActive?: boolean;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

function getYoutubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export function BentoVideoFrame({ screenshot, youtubeUrl, isActive }: BentoVideoFrameProps) {
  const videoId = youtubeUrl ? getYoutubeId(youtubeUrl) : null;
  const { isMuted, autoPlay, setMuted, setAutoPlay } = useVideoPrefs();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);
  const playerRef = useRef<any>(null);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

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
          onReady: (event: any) => {
            event.target.playVideo();
            setIsPlayerReady(true);
          },
          onStateChange: (event: any) => {
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
        <div className="absolute -top-[6px] left-[20%] md:left-[25%] w-12 md:w-16 h-[6px] bg-[var(--chrome-device-shell)] rounded-t-md z-0" />
        <div className="absolute -top-[6px] left-[40%] md:left-[45%] w-16 md:w-20 h-[6px] bg-[var(--chrome-device-shell)] rounded-t-md z-0" />

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
            <img
              src={screenshot}
              alt="Project screenshot"
              className="w-full h-full object-cover rounded-[32px]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-base border-[length:var(--border-width-sm)] border-dashed border-ink-base/20 rounded-[32px]">
              <span className="font-mono text-xs text-ink-base/25 uppercase tracking-widest text-center select-none">
                No Preview<br/>Available
              </span>
            </div>
          )}

          {/* Poster curtain: thumbnail covers YouTube's startup animation, fades out on first PLAYING event */}
          {videoId && (
            <div
              className="absolute inset-0 z-30 bg-black bg-cover bg-center pointer-events-none"
              style={{
                backgroundImage: thumbnailUrl ? `url(${thumbnailUrl})` : undefined,
                opacity: showCurtain ? 1 : 0,
                visibility: showCurtain ? 'visible' : 'hidden',
                // instant show, then 0.8s hold before fading — covers YouTube's ~0.8s button animation
                transition: showCurtain
                  ? 'none'
                  : 'opacity 0.5s 0.8s ease-out, visibility 0s 1.3s',
              }}
            />
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
                  className="pointer-events-auto text-white/0 group-hover:text-white/90 hover:!text-white transition-all duration-300 cursor-pointer drop-shadow-lg"
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

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
    <div className="relative w-full h-full min-h-0 flex items-center justify-center p-2">
      <div className="relative w-full max-h-full aspect-video flex-shrink-0">
        {/* Hardware Buttons on top edge */}
        <div className="absolute -top-[6px] left-[20%] md:left-[25%] w-12 md:w-16 h-[6px] bg-ink-base rounded-t-md z-0" />
        <div className="absolute -top-[6px] left-[40%] md:left-[45%] w-16 md:w-20 h-[6px] bg-ink-base rounded-t-md z-0" />

        <div className="relative group w-full h-full border-[8px] border-ink-base rounded-[40px] bg-ink-base overflow-hidden shadow-raised z-10">
          {/* Device Notch */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-20 bg-ink-base rounded-r-[12px] z-20" />

          {/* Content: Video or Screenshot */}
          {videoId ? (
            <div className="absolute -top-[20%] -bottom-[20%] -left-[10%] -right-[10%] z-0">
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
            <div className="w-full h-full flex items-center justify-center bg-surface-base border-2 border-dashed border-ink-base/20 rounded-[32px]">
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

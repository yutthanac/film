"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Music2, Heart, Volume2, Volume1, VolumeX, Settings2, RotateCcw } from "lucide-react";

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        config: {
          videoId: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getPlayerState: () => number;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  destroy: () => void;
}

interface SongSection {
  name: string;
  start: number; // in seconds
  description: string;
}

const SECTIONS: SongSection[] = [
  { name: "ท่อนฮุค (Til I found her)", start: 31, description: "'Til I found her, I found her... 💖" },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(true);
  const [selectedSection, setSelectedSection] = useState<SongSection>(SECTIONS[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [volume, setVolume] = useState(10); // Default gentle volume (10%)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);

  // Load YouTube Iframe API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player("youtube-audio-player", {
          videoId: "f5-IY_Ja1RM",
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            start: SECTIONS[0].start,
          },
          events: {
            onReady: (event) => {
              setIsReady(true);
              event.target.setVolume(0);
            },
            onStateChange: (event) => {
              if (window.YT && window.YT.PlayerState) {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                } else if (
                  event.data === window.YT.PlayerState.PAUSED ||
                  event.data === window.YT.PlayerState.ENDED
                ) {
                  setIsPlaying(false);
                }
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Auto-play after 5s delay with smooth volume ramp-up to 40% (medium volume)
  useEffect(() => {
    if (!isReady || !playerRef.current) return;

    let fadeInterval: NodeJS.Timeout | null = null;
    let hasTriggered = false;

    const startFadeIn = () => {
      if (hasTriggered || !playerRef.current) return;
      hasTriggered = true;

      try {
        playerRef.current.setVolume(0);
        playerRef.current.seekTo(SECTIONS[0].start, true);
        playerRef.current.playVideo();
        setIsPlaying(true);
        setVolume(0);

        let cur = 0;
        const target = 10; // Gentle volume (10%)
        fadeInterval = setInterval(() => {
          cur += 1;
          if (cur >= target) {
            cur = target;
            if (fadeInterval) clearInterval(fadeInterval);
          }
          if (playerRef.current) {
            playerRef.current.setVolume(cur);
          }
          setVolume(cur);
        }, 150);
      } catch (err) {
        console.warn("Audio autoplay deferred to user interaction:", err);
      }
    };

    // 5 seconds countdown
    const timer = setTimeout(() => {
      startFadeIn();
    }, 5000);

    // In case browser policy restricts audio until interaction
    const handleGesture = () => {
      startFadeIn();
    };

    window.addEventListener("scroll", handleGesture, { once: true });
    window.addEventListener("click", handleGesture, { once: true });

    return () => {
      clearTimeout(timer);
      if (fadeInterval) clearInterval(fadeInterval);
      window.removeEventListener("scroll", handleGesture);
      window.removeEventListener("click", handleGesture);
    };
  }, [isReady]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleSelectSection = (sec: SongSection) => {
    setSelectedSection(sec);
    setIsMenuOpen(false);
    if (playerRef.current) {
      playerRef.current.seekTo(sec.start, true);
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleReplaySection = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(selectedSection.start, true);
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (playerRef.current) {
      playerRef.current.setVolume(newVol);
    }
  };

  return (
    <aside aria-label="Music player" className="fixed bottom-5 right-5 z-40">
      {/* Hidden YouTube Iframe Audio Player */}
      <div className="absolute opacity-0 pointer-events-none -z-50 w-1 h-1 overflow-hidden">
        <div id="youtube-audio-player" />
      </div>

      {/* Volume Slider Popup */}
      {showVolumeSlider && (
        <div className="absolute bottom-16 right-16 neu-card p-3 shadow-2xl mb-2 flex flex-col items-center gap-2">
          <div className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
            <span>ระดับเสียง: {volume}%</span>
          </div>
          <div className="flex items-center gap-2 h-28 py-1">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="accent-rose-500 cursor-pointer h-24 w-1.5 [writing-mode:vertical-lr] [direction:rtl]"
              aria-label="Volume slider"
            />
          </div>
          <div className="flex gap-1.5 pt-2 border-t border-slate-300/40">
            <button
              onClick={() => handleVolumeChange(10)}
              className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                volume === 10 ? "neu-pressed text-rose-600 font-bold" : "neu-btn text-slate-600"
              }`}
            >
              10%
            </button>
            <button
              onClick={() => handleVolumeChange(25)}
              className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                volume === 25 ? "neu-pressed text-rose-600 font-bold" : "neu-btn text-slate-600"
              }`}
            >
              25%
            </button>
            <button
              onClick={() => handleVolumeChange(50)}
              className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                volume === 50 ? "neu-pressed text-rose-600 font-bold" : "neu-btn text-slate-600"
              }`}
            >
              50%
            </button>
          </div>
        </div>
      )}

      {/* Section selector dropdown popup */}
      {isMenuOpen && (
        <div className="absolute bottom-16 right-0 w-72 neu-card p-3.5 mb-2 text-slate-800">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-300/40 text-xs font-semibold text-rose-600">
            <span>🎵 เลือกท่อนเพลงที่อยากฟัง:</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-400 hover:text-slate-600 px-1"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {SECTIONS.map((sec) => (
              <button
                key={sec.name}
                onClick={() => handleSelectSection(sec)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex flex-col gap-0.5 ${
                  selectedSection.name === sec.name
                    ? "neu-pressed text-rose-600 font-medium"
                    : "neu-btn text-slate-700 hover:text-rose-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{sec.name}</span>
                  <span className="text-[10px] text-slate-400">
                    {Math.floor(sec.start / 60)}:
                    {(sec.start % 60).toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[11px] truncate text-slate-500">
                  {sec.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Mini Player Bar */}
      <div className="neu-flat pl-3 pr-4 py-2.5 rounded-full flex items-center gap-2.5">
        {/* Disc / Icon spinning */}
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-10 h-10 rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 flex items-center justify-center text-white shadow-sm transition-transform cursor-pointer group relative ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "5s" }}
          title="คลิกเพื่อเลือกท่อนเพลง"
        >
          <Music2 className="w-5 h-5" />
        </div>

        {/* Track info */}
        <div className="text-left hidden sm:block max-w-[140px]">
          <div className="text-xs font-semibold text-slate-800 truncate">
            her - JVKE
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[10px] text-rose-500 truncate flex items-center gap-1 hover:underline text-left"
            title="คลิกเพื่อเลือกท่อนเพลง"
          >
            <Volume2 className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate">{selectedSection.name}</span>
          </button>
        </div>

        {/* Volume Control Button */}
        <button
          onClick={() => setShowVolumeSlider(!showVolumeSlider)}
          className={`p-1.5 rounded-full transition-colors ${
            showVolumeSlider
              ? "bg-rose-100 text-rose-600"
              : "text-slate-400 hover:text-rose-500 hover:bg-rose-50"
          }`}
          title={`ปรับระดับเสียง (${volume}%)`}
          aria-label="Adjust volume"
        >
          {volume === 0 ? (
            <VolumeX className="w-3.5 h-3.5 text-rose-400" />
          ) : volume < 50 ? (
            <Volume1 className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Section picker toggle button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-1.5 rounded-full transition-colors ${
            isMenuOpen
              ? "bg-rose-100 text-rose-600"
              : "text-slate-400 hover:text-rose-500 hover:bg-rose-50"
          }`}
          title="เลือกท่อนเพลง"
          aria-label="Select song section"
        >
          <Settings2 className="w-3.5 h-3.5" />
        </button>

        {/* Replay section button */}
        <button
          onClick={handleReplaySection}
          className="p-1.5 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
          title="เริ่มท่อนนี้ใหม่"
          aria-label="Restart section"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-md transition-all active:scale-90"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-white" />
          ) : (
            <Play className="w-4 h-4 fill-white ml-0.5" />
          )}
        </button>

        {/* Like heart */}
        <button
          onClick={() => setLiked(!liked)}
          className="p-1 rounded-full text-slate-400 hover:text-rose-500 transition-colors"
          aria-label="Favorite song"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              liked ? "fill-rose-500 text-rose-500" : "text-slate-300"
            }`}
          />
        </button>
      </div>
    </aside>
  );
}

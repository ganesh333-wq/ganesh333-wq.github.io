import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Auto-playing crossfade video sequence, extracted verbatim from the previous
// hero so the behaviour is preserved intact.
//
// It is no longer part of the hero: the hero's visual centrepiece is now the
// particle galaxy, and a playing video beside it competed with that. The
// component is kept whole and self-contained so it can be dropped into
// whichever section it belongs in (About or Projects) without rebuilding the
// autoplay, crossfade, mute and audio-unlock logic.
//
// Usage: <IntroVideo /> inside any section.

// Crossfade window between video 1 and video 2
const TRANSITION_MS = 320;

function IntroVideo() {
  const sectionRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSecondActive, setIsSecondActive] = useState(false);
  // Shown only when the browser actually blocks autoplay-with-sound
  const [showSoundPrompt, setShowSoundPrompt] = useState(false);

  // Unmute both videos and dismiss the prompt on user gesture (also
  // resumes playback if the browser had blocked the muted fallback)
  const handleUnmute = useCallback((e) => {
    if (e) e.stopPropagation();
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (v1) {
      v1.muted = false;
      v1.volume = 1;
      if (v1.paused && !isSecondActive) {
        const p = v1.play();
        if (p && p.catch) p.catch(() => {});
      }
    }
    if (v2) {
      v2.muted = false;
      v2.volume = 1;
      if (v2.paused && isSecondActive) {
        const p = v2.play();
        if (p && p.catch) p.catch(() => {});
      }
    }
    setIsMuted(false);
    setShowSoundPrompt(false);
  }, [isSecondActive]);

  const toggleMute = useCallback((e) => {
    if (e) e.stopPropagation();
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;
    const next = !v1.muted;
    v1.muted = next;
    v2.muted = next;
    setIsMuted(next);
  }, []);

  // video 1 finished → crossfade into video 2
  const handleFirstEnded = useCallback(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v2) return;
    v2.currentTime = 0;
    v2.muted = v1 ? v1.muted : false;
    v2.volume = v1 ? v1.volume : 1;
    const p = v2.play();
    if (p && p.catch) p.catch(() => {});
    setIsSecondActive(true);
  }, []);

  // video 2 finished → loop back into video 1, continuously
  const handleSecondEnded = useCallback(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1) return;
    v1.currentTime = 0;
    v1.muted = v2 ? v2.muted : false;
    v1.volume = v2 ? v2.volume : 1;
    const p = v1.play();
    if (p && p.catch) p.catch(() => {});
    setIsSecondActive(false);
  }, []);

  // Auto-play with sound as soon as the section enters the viewport.
  // Browsers may block unmuted autoplay before the user has interacted
  // with the page, so we retry muted and surface a "play with sound"
  // prompt rather than silently forcing mute on every visit.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v1 = video1Ref.current;
          const v2 = video2Ref.current;
          if (!v1 || !v2) return;

          if (entry.isIntersecting) {
            v2.pause();
            v2.currentTime = 0;
            v1.currentTime = 0;
            setIsSecondActive(false);

            v1.volume = 0.8;
            v1.muted = false;
            const playPromise = v1.play();

            if (playPromise && playPromise.then) {
              playPromise
                .then(() => {
                  setIsMuted(false);
                  setShowSoundPrompt(false);
                })
                .catch(() => {
                  // Autoplay-with-sound was blocked: fall back to a
                  // muted autoplay and ask the user to opt into sound.
                  v1.muted = true;
                  setIsMuted(true);
                  setShowSoundPrompt(true);
                  const retry = v1.play();
                  if (retry && retry.catch) retry.catch(() => {});
                });
            } else {
              setIsMuted(false);
              setShowSoundPrompt(false);
            }
          } else {
            v1.pause();
            v2.pause();
            v1.currentTime = 0;
            v2.currentTime = 0;
            setIsSecondActive(false);
            setIsPlaying(false);
            setShowSoundPrompt(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative group w-full max-w-[500px] lg:max-w-none mx-auto">
      <div
        className="absolute -inset-3 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10"
        style={{ background: "radial-gradient(circle, rgba(22,242,179,0.08) 0%, rgba(130,40,236,0.06) 50%, transparent 70%)" }}
      />

      <div
        className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0d1224] to-[#0a0d37] shadow-glass transition-all duration-500 ease-out group-hover:shadow-[0_20px_60px_rgba(22,242,179,0.22),0_10px_30px_rgba(130,40,236,0.18)] group-hover:border-[#16f2b3]/40 group-hover:scale-[1.03] group-hover:-translate-y-2"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
          e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
        }}
      >
        <div className="cursor-spotlight z-[3] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute top-0 left-0 right-0 z-10 flex flex-row">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600 opacity-60" />
          <div className="h-[2px] w-full bg-gradient-to-r from-violet-600 to-transparent opacity-60" />
        </div>

        <video
          ref={video1Ref}
          src="/video/video1.mp4"
          playsInline
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleFirstEnded}
          className="absolute inset-0 w-full h-full object-contain transition-opacity ease-in-out"
          style={{
            opacity: isSecondActive ? 0 : 1,
            transitionDuration: `${TRANSITION_MS}ms`,
            zIndex: 2,
          }}
        />

        <video
          ref={video2Ref}
          src="/video/video 2.mp4"
          playsInline
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleSecondEnded}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ zIndex: 1 }}
        />

        <AnimatePresence>
          {showSoundPrompt && isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
              onClick={handleUnmute}
            >
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-semibold tracking-wide border border-[#16f2b3]/40 hover:border-[#16f2b3]/80 hover:shadow-[0_0_16px_rgba(22,242,179,0.3)] transition-all duration-300"
                style={{ background: "rgba(13,18,36,0.80)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
              >
                <svg className="w-4 h-4 text-[#16f2b3]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-3.15a.75.75 0 011.28.53v13.74a.75.75 0 01-1.28.53L6.75 14.25H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
                <span>Tap to play with sound</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isPlaying && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={isMuted ? handleUnmute : toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="absolute bottom-3 right-3 z-20 flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:text-white hover:border-[#16f2b3]/50 hover:shadow-[0_0_12px_rgba(22,242,179,0.2)] focus:outline-none"
            style={{ background: "rgba(13, 18, 36, 0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
          >
            {isMuted ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-3.15a.75.75 0 011.28.53v13.74a.75.75 0 01-1.28.53L6.75 14.25H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-3.15a.75.75 0 011.28.53v13.74a.75.75 0 01-1.28.53L6.75 14.25H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            )}
          </motion.button>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0d1224]/40 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

export default IntroVideo;

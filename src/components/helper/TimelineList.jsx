import { useEffect, useRef } from "react";

const TimelineList = ({ children, className = "" }) => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;

    if (!timeline) return;

    const items = Array.from(timeline.querySelectorAll(".timeline-item"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      timeline.style.setProperty("--timeline-progress", "1");
      items.forEach((item) => {
        item.classList.add("is-visible");
        item.classList.add("is-node-active");
      });
      return;
    }

    let frameId = null;

    const updateProgress = () => {
      const rect = timeline.getBoundingClientRect();
      const viewportTrigger = window.innerHeight * 0.62;
      const rawProgress = (viewportTrigger - rect.top) / rect.height;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      const activePoint = rect.top + rect.height * progress;

      timeline.style.setProperty("--timeline-progress", progress.toString());

      items.forEach((item) => {
        const node = item.querySelector(".timeline-node");
        const nodeRect = node?.getBoundingClientRect();
        const shouldActivate = nodeRect ? nodeRect.top + nodeRect.height / 2 <= activePoint : false;

        item.classList.toggle("is-node-active", shouldActivate);
      });

      frameId = null;
    };

    const requestUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.2,
      }
    );

    items.forEach((item) => observer.observe(item));
    updateProgress();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div ref={timelineRef} className={`portfolio-timeline flex flex-col gap-6 ${className}`}>
      {children}
    </div>
  );
};

export default TimelineList;

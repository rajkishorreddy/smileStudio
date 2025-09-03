"use client";

import React from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type GalleryCategory = {
  id: string;                 // e.g., "birthday"
  label: string;              // e.g., "Birthday"
  folder: string;             // folder under /public, e.g., "birthday"
  count: number;              // how many images (01.webp ... count.webp)
  ext?: "webp" | "jpg" | "jpeg" | "png";
};

type GalleryModalProps = {
  open: boolean;
  onClose: () => void;
  categories: GalleryCategory[];
  defaultId?: string;
};

export default function GalleryModal({
  open,
  onClose,
  categories,
  defaultId,
}: GalleryModalProps) {
  const [activeId, setActiveId] = React.useState(defaultId ?? categories[0]?.id);

  // Close on ESC
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Respect reduced motion
  const prefersReduced = React.useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const active = categories.find((c) => c.id === activeId) ?? categories[0];
  if (!active) return null;

  // Build image src list like /birthday/01.webp ... /birthday/10.webp
  const ex = active.ext ?? "webp";
  const images: (string | StaticImageData)[] = React.useMemo(
    () =>
      Array.from({ length: active.count }, (_, i) => {
        const n = String(i + 1).padStart(2, "0");
        return `/${active.folder}/${n}.${ex}`;
      }),
    [active.folder, active.count, ex]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Content wrapper (click inside shouldn't close) */}
          <div
            className="relative mx-auto h-dvh w-dvw max-w-none p-4 sm:p-6 lg:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar: title + pills */}
            <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
              <div className="text-lg sm:text-xl font-semibold">Gallery</div>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    className={`rounded-full px-3 py-1 text-sm border transition
                      ${activeId === c.id
                        ? "bg-white text-black border-white"
                        : "border-white/30 text-white/80 hover:border-white/60"}`}
                    aria-pressed={activeId === c.id}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="h-9 w-9 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white/90"
              >
                ✕
              </button>
            </div>

            {/* Continuous-motion marquee strips */}
            <div className="mx-auto mt-6 max-w-7xl">
              <MarqueeStrips images={images} prefersReduced={prefersReduced} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =========================
   Marquee Strips + Ken Burns
   ========================= */

function MarqueeStrips({
  images,
  prefersReduced,
}: {
  images: (string | StaticImageData)[];
  prefersReduced: boolean;
}) {
  // Decide how many strips based on width
  const [strips, setStrips] = React.useState(3);
  React.useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setStrips(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Split images across strips (round-robin)
  const lanes = React.useMemo(() => {
    return Array.from({ length: strips }, (_, lane) =>
      images.filter((_, i) => i % strips === lane)
    );
  }, [images, strips]);

  return (
    <div className="flex flex-col gap-5">
      {lanes.map((laneImgs, i) => (
        <MarqueeStrip
          key={i}
          images={laneImgs.length ? laneImgs : images}
          direction={i % 2 === 0 ? "left" : "right"}
          speed={prefersReduced ? 0 : 40 - i * 6} // seconds per full loop (slower = smoother)
          prefersReduced={prefersReduced}
        />
      ))}
    </div>
  );
}

function MarqueeStrip({
  images,
  direction = "left",
  speed = 40,
  prefersReduced,
}: {
  images: (string | StaticImageData)[];
  direction?: "left" | "right";
  speed?: number; // seconds per loop
  prefersReduced: boolean;
}) {
  // Strip height scales by breakpoint
  const stripHeight =
    "h-[36vh] sm:h-[32vh] md:h-[28vh] lg:h-[24vh] xl:h-[22vh]";

  // Track animation: move -50% with duplicated content for seamless loop
  const animateX =
    direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 ${stripHeight}`}>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/80 via-black/30 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/80 via-black/30 to-transparent z-10" />

      {/* moving track */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute left-0 top-0 flex h-full w-[200%] gap-4"
          style={{ willChange: "transform" }}
          animate={prefersReduced ? undefined : { x: animateX }}
          transition={
            prefersReduced
              ? undefined
              : { duration: speed, repeat: Infinity, ease: "linear" }
          }
        >
          {/* content duplicated for seamless wrap */}
          <StripContent images={images} prefersReduced={prefersReduced} />
          <StripContent images={images} prefersReduced={prefersReduced} ariaHidden />
        </motion.div>
      </div>
    </div>
  );
}

function StripContent({
  images,
  prefersReduced,
  ariaHidden = false,
}: {
  images: (string | StaticImageData)[];
  prefersReduced: boolean;
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="flex h-full flex-nowrap items-center gap-4"
      aria-hidden={ariaHidden}
    >
      {images.map((src, i) => (
        <MarqueeTile
          key={(typeof src === "string" ? src : src.src) ?? i}
          src={src}
          index={i}
          prefersReduced={prefersReduced}
        />
      ))}
    </div>
  );
}

function MarqueeTile({
  src,
  index,
  prefersReduced,
}: {
  src: string | StaticImageData;
  index: number;
  prefersReduced: boolean;
}) {
  // consistent width relative to strip height; ensures nice rhythm
  // min/max stop images from being too skinny/wide at extremes
  const base =
    "relative h-[calc(100%-0px)] aspect-[4/3] min-w-[min(80vw,22rem)] sm:min-w-[20rem] md:min-w-[22rem] lg:min-w-[24rem] xl:min-w-[26rem] overflow-hidden rounded-2xl border border-white/10 bg-white/5";

  // per-tile ken-burns motion + occasional “pop”
  const delay = (index % 9) * 0.25;
  const dur = 14 + (index % 5); // 14s..18s

  return (
    <div className={base}>
      {/* Ken Burns layer (continuous subtle motion) */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1, x: 0, y: 0 }}
          animate={{
            scale: [1, 1.04, 1.02, 1.05, 1],
            x: [0, 6, -4, 5, 0],
            y: [0, 4, -3, 3, 0],
          }}
          transition={{
            duration: dur,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ pointerEvents: "none" }}
        />
      )}

      {/* Random gentle “pop” pulse to add life */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{
            duration: 1.2,
            delay: 3 + (index % 7), // stagger
            repeat: Infinity,
            repeatDelay: 6 + (index % 5), // every ~6–10s
            ease: "easeOut",
          }}
          style={{ pointerEvents: "none" }}
        />
      )}

      {/* Actual image with IO prewarm + fade-in (no black flash) */}
      <PrewarmFadeImage src={src} alt={`gallery-${index + 1}`} preloadMargin={420} />
    </div>
  );
}

/** IO-prewarm + blur/fade-in for string or static src */
function PrewarmFadeImage({
  src,
  alt,
  preloadMargin = 360,
}: {
  src: string | StaticImageData;
  alt: string;
  preloadMargin?: number;
}) {
  const [loaded, setLoaded] = React.useState(false);
  const [near, setNear] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: `${preloadMargin}px 0px` }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [preloadMargin]);

  const eager = near; // fetch just-before visible

  return (
    <div ref={ref} className="absolute inset-0">
      <Image
        src={src as any}
        alt={alt}
        width={1600}
        height={1200}
        sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        onLoadingComplete={() => setLoaded(true)}
        className={`w-full h-full object-cover transform-gpu will-change-[opacity,filter,transform]
          transition-[opacity,filter,transform] duration-700 ease-out
          ${loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-[10px] scale-[1.01]"}`}
      />
      {/* Light gradient top/bottom so text/pills always readable if needed later */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}


"use client";
import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, AnimatePresence, useTransform } from "framer-motion";
import GalleryModal, { type GalleryCategory } from "./components/GalleryModal";
import dynamic from "next/dynamic";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import p01 from "@/public/portfolio/01.webp";
import p02 from "@/public/portfolio/02.webp";
import p03 from "@/public/portfolio/03.webp";
import p04 from "@/public/portfolio/04.webp";
import p05 from "@/public/portfolio/05.webp";
import p06 from "@/public/portfolio/06.webp";
import p07 from "@/public/portfolio/07.webp";
import p08 from "@/public/portfolio/08.webp";
import p09 from "@/public/portfolio/09.webp";
import p10 from "@/public/portfolio/10.webp";
/**
 * CRAZY LENS STUDIO — Cinematic Landing Page
 */
const AlbumModal = dynamic(() => import("./components/AlbumModal"), { ssr: false });

export default function CrazyLensStudioPage() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white antialiased overflow-x-hidden">
      <BackdropFX />
      <Navbar />
      <Hero />
      <Showreel />
      <Portfolio />
      <AlbumTeaserSection />
      {/* <BTS /> */}
      <Packages />
      <Booking />
      <Footer />
    </main>
  );
}

/** Navbar — glass, subtle glow */
function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-3 rounded-2xl border border-white/10 bg-black/50 supports-[backdrop-filter]:bg-black/30 backdrop-blur-xl shadow-lg shadow-black/30">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-fuchsia-500 via-cyan-400 to-amber-300 animate-pulse" />
              <span className="font-semibold tracking-wider text-white/90 group-hover:text-white transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                SMILE STUDIO
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a href="#showreel" className="text-white/70 hover:text-white transition">Showreel</a>
              <a href="#portfolio" className="text-white/70 hover:text-white transition">Portfolio</a>
              <a href="#albums" className="text-white/70 hover:text-white transition">Albums</a>
              <a href="#bts" className="text-white/70 hover:text-white transition">Behind the Scenes</a>
              <a href="#packages" className="text-white/70 hover:text-white transition">Packages</a>
              <a href="#booking" className="text-white/70 hover:text-white transition">Book</a>
            </nav>
            <a href="#booking" className="inline-flex items-center justify-center rounded-xl px-4 py-2 bg-white text-black font-medium hover:opacity-90 transition shadow-lg shadow-fuchsia-500/20">
              Book Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Hero — full screen video background + kinetic headline */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = async () => {
      try { v.muted = true; await v.play(); } catch {}
    };
    tryPlay();
  }, []);

  return (
    <section ref={ref} className="relative h-[100svh] w-full" aria-label="Hero">
      <div className="absolute inset-0 z-0 overflow-hidden rounded-b-[3rem] border-b border-white/10">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setReady(true)}
          onCanPlayThrough={() => setReady(true)}
          onPlay={() => setReady(true)}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Local poster overlay (fades out) */}
        <img
          src="/hero-poster.webp"
          alt=""
          aria-hidden
          className={`${ready ? "opacity-0" : "opacity-100"} pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700`}
          loading="eager"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 45%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0) 75%)",
          }}
        />
        <div
          className="pointer-events-none absolute -inset-x-20 -bottom-32 h-64 blur-[80px] opacity-60"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 100%, rgba(168,85,247,0.45) 0%, rgba(34,211,238,0.35) 45%, rgba(251,191,36,0.15) 100%)",
          }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]"
        >
          Cinematic Frames.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-amber-300 drop-shadow-[0_1px_12px_rgba(0,0,0,0.7)]">
            Crazy Stories.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-5 max-w-2xl text-white/85 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]"
        >
          We craft bold visuals for weddings, fashion, brands & souls that don’t do ordinary.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex items-center gap-4"
        >
          <a href="#portfolio" className="rounded-xl bg-white text-black px-5 py-3 font-medium hover:opacity-90 transition shadow-xl shadow-black/50 ring-1 ring-black/10">
            View Portfolio
          </a>
          <a href="#showreel" className="rounded-xl border border-white/30 px-5 py-3 font-medium text-white/90 hover:text-white hover:border-white/50 transition bg-black/30 supports-[backdrop-filter]:bg-black/20 backdrop-blur-sm">
            Watch Showreel
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Showreel — filmstrip with modal-ready posters */
function Showreel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const reels = [
    {
      title: "Engagement",
      src: "/hero.mp4",
      poster:
        "https://images.unsplash.com/photo-1523369579000-4ec0fe04db44?auto=format&fit=crop&w=1600&h=1000&q=80&crop=faces",
      duration: "0:52",
      wide: true,
    },
    {
      title: "Wedding Ceremony",
      src: "/hero.mp4",
      poster:
        "https://images.unsplash.com/photo-1680490964562-60ee7fd82944?auto=format&fit=crop&w=1600&h=1000&q=80&crop=faces",
      duration: "0:22",
    },
    {
      title: "Reception Evening",
      src: "/hero.mp4",
      poster:
        "https://images.unsplash.com/photo-1740767581333-0e83e94c7f6e?auto=format&fit=crop&w=1600&h=1000&q=80&crop=faces",
      duration: "0:18",
    },
    {
      title: "Mehndi Night",
      src: "/hero.mp4",
      poster:
        "https://images.unsplash.com/photo-1697347816275-83728d258959?auto=format&fit=crop&w=1600&h=1000&q=80&crop=faces",
      duration: "0:30",
    },
    {
      title: "Birthday Party",
      src: "/hero.mp4",
      poster:
        "https://images.unsplash.com/photo-1630481721712-0a79d553c1ea?auto=format&fit=crop&w=1600&h=1000&q=80&crop=faces",
      duration: "0:26",
    },
  ];

  const scrollBy = (delta: number) => scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });

  return (
    <section id="showreel" className="relative py-24 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold">Showreel</h2>
          <div className="hidden md:flex items-center gap-2 text-sm text-white/60">
            <button onClick={() => scrollBy(-400)} className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 grid place-items-center" aria-label="Scroll left">←</button>
            <button onClick={() => scrollBy(400)} className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 grid place-items-center" aria-label="Scroll right">→</button>
          </div>
        </div>
      </div>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10" />

      <div className="overflow-x-auto no-scrollbar" ref={scrollerRef}>
        <div className="flex snap-x snap-mandatory gap-6 px-6 md:px-12">
          {reels.map((r, i) => (
            <button
              key={i}
              className={`group relative snap-start shrink-0 h-[50vh] rounded-3xl overflow-hidden border border-white/10 bg-white/5 text-left ${
                r.wide ? "w-[85vw] sm:w-[65vw] md:w-[48vw] lg:w-[40vw]" : "w-[80vw] sm:w-[55vw] md:w-[38vw] lg:w-[30vw]"
              }`}
              onClick={() => { setActive(i); setOpen(true); }}
            >
              <img
                src={r.poster}
                alt={r.title}
                className="h-full w-full object-cover transform-gpu transition duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-105"
                loading="lazy"
                decoding="async"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/hero-poster.webp"; }}
              />
              {/* dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
              {/* labels */}
              <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between">
                <div>
                  <div className="text-base font-semibold drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">{r.title}</div>
                  <div className="text-xs text-white/70">{r.duration}</div>
                </div>
                <div className="rounded-full bg-white text-black px-3 py-1 text-xs font-medium shadow">▶ Play</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <VideoLightbox open={open} reel={reels[active]} onClose={() => setOpen(false)} />
    </section>
  );
}

/** Modal player */
function VideoLightbox({
  open,
  reel,
  onClose,
}: {
  open: boolean;
  reel: { title: string; src: string; poster?: string };
  onClose: () => void;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm grid place-items-center p-4">
      <button aria-label="Close" onClick={onClose} className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20">✕</button>
      <div className="w-full max-w-5xl">
        <video className="w-full h-auto rounded-2xl border border-white/10" src={reel.src} poster={reel.poster} autoPlay muted={false} controls playsInline />
        <div className="mt-3 text-center text-sm text-white/70">{reel.title}</div>
      </div>
    </div>
  );
}

function BlurFadeImage({
  src,
  alt,
  priority = false,
  preloadMargin = 360, // px before viewport to start eager loading
}: {
  src: StaticImageData | string;
  alt: string;
  priority?: boolean;
  preloadMargin?: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [near, setNear] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Mark as "near" slightly before it scrolls into view
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

  const eager = priority || near; // only first row + near-viewport get eager/high

  return (
    <div ref={ref}>
      <Image
        src={src as unknown as StaticImageData}
        alt={alt}
        placeholder={typeof src === "object" ? "blur" : undefined}
        width={1200}
        height={1600}
        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        priority={eager}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        onLoadingComplete={() => setLoaded(true)}
        className={`w-full h-auto object-cover transform-gpu will-change-[opacity,transform]
          transition-[opacity,transform] duration-700 ease-out
          ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.01]"}`}
      />
    </div>
  );
}

function Portfolio() {
  // Local images (10 .webp files in /public/portfolio)
  const [galleryOpen, setGalleryOpen] = useState(false);

  const galleryCategories: GalleryCategory[] = [
    { id: "birthday",   label: "Birthday",   folder: "birthday",  count: 17, ext: "webp" },
    { id: "marriage", label: "marriage", folder: "marriage",  count: 16, ext: "webp" }, 
  ];
  const images = useMemo(
    () => [p01, p02, p03, p04, p05, p06, p07, p08, p09, p10],
    []
  );

  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  const [albumOpen, setAlbumOpen] = useState(false);

  return (
    <section id="portfolio" className="relative py-24 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold">Portfolio</h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* NEW: opens the category modal (birthday/marriage) */}
          <button
            onClick={() => setGalleryOpen(true)}
            className="rounded-xl border border-white/20 bg-black/30 supports-[backdrop-filter]:bg-black/20 backdrop-blur px-4 py-2 text-sm text-white/90 hover:border-white/50 hover:bg-black/40 transition"
          >
            View more
          </button>

          {/* existing: opens the 3D album (iframe) */}
          {/* <button
            onClick={() => setAlbumOpen(true)}
            className="rounded-xl border border-white/20 bg-black/30 supports-[backdrop-filter]:bg-black/20 backdrop-blur px-4 py-2 text-sm text-white/90 hover:border-white/50 hover:bg黑/40 transition"
          >
            View album
          </button> */}

          <a href="#booking" className="text-sm text-white/70 hover:text-white">
            Book a shoot →
          </a>
        </div>
      </div>

        {/* Masonry via CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {images.map((img, i) => (
            <figure
              key={(img as StaticImageData).src ?? i}
              className="mb-6 break-inside-avoid rounded-3xl overflow-hidden border border-white/10 bg-white/5 cursor-zoom-in"
              onClick={() => { setLbIndex(i); setLbOpen(true); }}
              style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}
            >
              <BlurFadeImage
                src={img}                 // your static import or string path
                alt={`Portfolio ${i + 1}`}
                priority={i < 2}          // keep first row as true
                preloadMargin={360}       // tweak to 240–480 if you want more/less prefetch
              />
              {/* <figcaption className="p-3 text-xs text-white/60">Shot {i + 1}</figcaption> */}
            </figure>
          ))}
        </div>
      </div>

      <ImageLightbox
        open={lbOpen}
        images={images}
        index={lbIndex}
        onClose={() => setLbOpen(false)}
        onPrev={() => setLbIndex((lbIndex - 1 + images.length) % images.length)}
        onNext={() => setLbIndex((lbIndex + 1) % images.length)}
      />
      <GalleryModal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        categories={galleryCategories}
        defaultId="birthday"
      />
      <AlbumModal open={albumOpen} onClose={() => setAlbumOpen(false)} />
    </section>
  );
}


function ImageLightbox({
  open,
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  open: boolean;
  images: (string | StaticImageData)[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button aria-label="Close" onClick={onClose} className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/90">✕</button>
          <button aria-label="Previous" onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 hidden sm:grid place-items-center">←</button>
          <button aria-label="Next" onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 hidden sm:grid place-items-center">→</button>

          {/* Use Next/Image in the modal */}
          <Image
            src={images[index]}
            alt=""
            width={2000}
            height={1333}
            className="max-h-[85vh] max-w-[92vw] object-contain rounded-2xl border border-white/10 shadow-2xl"
            sizes="92vw"
            priority
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
function AlbumTeaserSection() {
  const [albumOpen, setAlbumOpen] = useState(false);

  // swap to any teaser shot you like
  const teaserSrc = "/albpre.webp";

  return (
    <section id="albums" className="relative py-24 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* make both columns share height */}
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          {/* Copy (stretches to same height as the visual) */}
          <div className="h-full flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-semibold">Handcrafted Wedding Albums</h2>
            <p className="mt-3 text-white/70">
              We design and print premium lay-flat albums—archival paper, rich color, and cover
              materials that last. Your story, printed to keep.
            </p>
            <ul className="mt-5 text-sm text-white/70 space-y-2">
              <li>• Lay-flat binding, archival lustre/matte paper</li>
              <li>• 10×10″ or 12×12″; linen/leather covers &amp; foil deboss</li>
              <li>• Professional design included + two revision rounds</li>
              <li>• Parent mini-books available</li>
              <li>• Typical turnaround: 2–3 weeks</li>
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setAlbumOpen(true)}
                className="rounded-xl cursor-pointer bg-white text-black px-5 py-3 font-medium hover:opacity-90 transition shadow"
              >
                Flip a sample online
              </button>
              <a
                href="#booking"
                className="rounded-xl border border-white/30 px-5 py-3 font-medium text-white/90 hover:border-white/50 transition"
              >
                Request pricing
              </a>
            </div>

            <p className="mt-3 text-xs text-white/50">
              Note: the online flipbook is a digital preview of layouts. The final product is a
              printed, handcrafted album.
            </p>
          </div>

          {/* Visual teaser (same height, fully clickable + hover motion) */}
          <button
            type="button"
            onClick={() => setAlbumOpen(true)}
            aria-label="Open album flipbook"
            className="group cursor-pointer relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 h-full min-h-[420px] w-full text-left focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            {/* subtle hover tilt/scale */}
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.02, rotateX: -2, rotateY: 2 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Image
                src={teaserSrc}
                alt="Heirloom photo album preview"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </motion.div>

            {/* top/bottom gradients for contrast */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

            {/* moving shine */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transform translate-x-[-40%] transition-transform duration-700 group-hover:translate-x-[220%]" />
            </div>
          </button>
        </div>
      </div>

      {/* 3D flipbook modal */}
      <AlbumModal open={albumOpen} onClose={() => setAlbumOpen(false)} />
    </section>
  );
}

/** Behind The Scenes — split layout with parallax copy */
function BTS() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="bts" ref={ref} className="relative py-28 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 items-center gap-10">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1440&auto=format&fit=crop"
            alt="Behind the scenes"
            className="w-full h-[60vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
        <motion.div style={{ x }} className="space-y-6">
          <h3 className="text-2xl sm:text-3xl font-semibold">Behind the Scenes</h3>
          <p className="text-white/70">
            Lights, rigs, gimbals, and chaos — we love the craft as much as the final frame. Get a peek at how we
            build scenes that feel alive.
          </p>
          <ul className="text-white/70 space-y-2 text-sm">
            <li>• Industry-grade lighting setups with mood gels</li>
            <li>• Dual-body workflow for never-miss moments</li>
            <li>• Instant tether to review and refine on set</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/** Packages — cards with subtle hover motion */
function Packages() {
  const tiers = [
    { name: "Portrait", price: "₹9,999", desc: "1 hr shoot • 10 edits • indoor/outdoor" },
    { name: "Fashion",  price: "₹24,999", desc: "Half day • creative direction • 25 edits" },
    { name: "Wedding",  price: "₹79,999", desc: "Full day • team of 3 • highlight film" },
  ];

  return (
    <section id="packages" className="relative py-24 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold">Packages</h2>
          <a href="#booking" className="text-sm text-white/70 hover:text-white">Need custom? →</a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <motion.div key={t.name} whileHover={{ y: -8 }} className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6">
              <h4 className="text-xl font-semibold">{t.name}</h4>
              <p className="mt-2 text-sm text-white/70">{t.desc}</p>
              <div className="mt-6 text-3xl font-bold">{t.price}</div>
              <a href="#booking" className="mt-6 inline-flex items-center justify-center rounded-xl bg-white text-black px-4 py-2 font-medium hover:opacity-90 transition">
                Book {t.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Booking — simple form with validation message */
function Booking() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      type: String(fd.get("type") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    try {
      const res = await fetch("/api/book", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Failed");
      setStatus("ok"); form.reset();
    } catch { setStatus("error"); }
  };

  return (
    <section id="booking" className="relative py-28 scroll-mt-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur">
          <h2 className="text-2xl sm:text-3xl font-semibold">Book a Shoot</h2>
          <p className="mt-2 text-white/70">Tell us the vibe. We’ll craft the story.</p>

          <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="text-sm text-white/70">Your Name</label><input name="name" required className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30" /></div>
            <div><label className="text-sm text-white/70">Email</label><input name="email" type="email" required className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30" /></div>
            <div><label className="text-sm text-white/70">Phone</label><input name="phone" type="tel" className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30" /></div>
            <div>
              <label className="text-sm text-white/70">Shoot Type</label>
              <select name="type" className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30">
                <option>Portrait</option><option>Fashion</option><option>Wedding</option><option>Brand</option>
              </select>
            </div>
            <div className="md:col-span-2"><label className="text-sm text-white/70">Message</label><textarea name="message" rows={4} className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30" placeholder="Dates, location, moodboard…" /></div>
            <div className="md:col-span-2 flex items-center justify-between">
              <span className="text-xs text-white/50">We’ll reply within 24 hours.</span>
              <button disabled={status === "loading"} type="submit" className="rounded-xl bg-white text-black px-5 py-3 font-medium hover:opacity-90 transition disabled:opacity-60">
                {status === "loading" ? "Sending…" : "Send Request"}
              </button>
            </div>
            {status === "ok" && <div className="md:col-span-2 text-sm text-emerald-300">Thanks! Your request is in. We’ll reach out soon. ✨</div>}
            {status === "error" && <div className="md:col-span-2 text-sm text-rose-300">Uh oh, something went wrong. Try again.</div>}
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-10 text-center text-white/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Crazy Lens Studio — All rights reserved.</p>
      </div>
    </footer>
  );
}

/** BackdropFX — floating particles + glow */
function BackdropFX() {
  return (
    <>
      {/* soft noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 15%, #fff 1px, transparent 1px), radial-gradient(circle at 75% 85%, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px, 24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      />
      {/* top scrim for navbar contrast */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-36 bg-gradient-to-b from-black/90 via-black/50 to-transparent" />
      {/* ambient glow blobs */}
      <div className="pointer-events-none fixed z-0 blur-3xl opacity-40">
        <div
          className="absolute -top-24 -left-24 h-[32rem] w-[32rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 60%)" }}
        />
        <div
          className="absolute -bottom-24 -right-24 h-[30rem] w-[30rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(34,211,238,0.35) 0%, transparent 60%)" }}
        />
      </div>
    </>
  );
}
// Note: scrollbar-hiding utility moved to global CSS to avoid SSR issues in Next.js 13+ / 15.

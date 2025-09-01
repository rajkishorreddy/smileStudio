"use client";
import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * CRAZY LENS STUDIO — Cinematic Landing Page
 * --------------------------------------------------------------
 * Drop this file into: app/page.tsx (Next.js 13/14 app router)
 * TailwindCSS required. Framer Motion for animation.
 * 
 * Optional assets:
 *  - /public/hero.mp4      (background b-roll)
 *  - /public/logo.svg      (your logo)
 *  - Replace Unsplash URLs in <Portfolio/> with your own images/Cloudinary.
 *
 * Notes:
 *  - All sections are in one file for easy copy-paste.
 *  - Minimal external deps: framer-motion only.
 *  - No server calls yet; booking form logs to console.
 */

export default function CrazyLensStudioPage() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white antialiased overflow-x-hidden">
      <BackdropFX />
      <Navbar />
      <Hero />
      <Showreel />
      <Portfolio />
      <BTS />
      <Packages />
      <Booking />
      <Footer />
    </main>
  );
}

/**
 * Navbar — glass, subtle glow
 */
function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/50 supports-[backdrop-filter]:bg-black/30 backdrop-blur-xl shadow-lg shadow-black/30">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-fuchsia-500 via-cyan-400 to-amber-300 animate-pulse" />
              <span className="font-semibold tracking-wider text-white/90 group-hover:text-white transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">SMILE STUDIO</span>
            </a>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a href="#showreel" className="text-white/70 hover:text-white transition">Showreel</a>
              <a href="#portfolio" className="text-white/70 hover:text-white transition">Portfolio</a>
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

/**
 * Hero — full screen video background + kinetic headline
 */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Nudge autoplay (especially iOS/Safari)
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = async () => {
      try {
        v.muted = true; // must be muted before play on mobile
        await v.play();
      } catch {
        // ignore; poster stays until user interacts
      }
    };
    tryPlay();
  }, []);

  return (
    <section ref={ref} className="relative h-[100svh] w-full" aria-label="Hero">
      <div className="absolute inset-0 z-0 overflow-hidden rounded-b-[3rem] border-b border-white/10">
        {/* Video (below) */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.webp"      // safe local poster too
          onLoadedData={() => setReady(true)}
          onCanPlayThrough={() => setReady(true)}
          onPlay={() => setReady(true)}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Poster overlay (above) fades out */}
        <img
          src="/hero-poster.webp"
          alt=""
          aria-hidden
          className={`${ready ? "opacity-0" : "opacity-100"} pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700`}
          loading="eager"
        />

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
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
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
        >
          Cinematic Frames. <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-amber-300">Crazy Stories.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-5 max-w-2xl text-white/70"
        >
          We craft bold visuals for weddings, fashion, brands & souls that don’t do ordinary.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex items-center gap-4"
        >
          <a href="#portfolio" className="rounded-xl bg-white text-black px-5 py-3 font-medium hover:opacity-90 transition shadow-xl shadow-fuchsia-500/20">View Portfolio</a>
          <a href="#showreel" className="rounded-xl border border-white/20 px-5 py-3 font-medium text-white/80 hover:text-white hover:border-white/40 transition">Watch Showreel</a>
        </motion.div>
      </motion.div>
    </section>
  );
}


/**
 * Showreel — horizontal scroll with snap
 */
function Showreel() {
  const items = [
    "https://images.unsplash.com/photo-1526178619943-3e7d64b4c990?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505483531331-8632f46a1f20?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
  ];
  return (
    <section id="showreel" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">Showreel</h2>
          <span className="text-white/50 text-sm">Swipe →</span>
        </div>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex snap-x snap-mandatory gap-6 px-6 md:px-12">
          {items.map((src, i) => (
            <motion.div
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              key={i}
              className="relative snap-start shrink-0 w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[32vw] h-[50vh] rounded-3xl overflow-hidden border border-white/10 bg-white/5"
            >
              <img src={src} alt={`showreel-${i}`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Portfolio — responsive masonry grid
 */
function Portfolio() {
  const images = useMemo(
    () => [
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494386346843-e12284507169?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500829243541-74b677fecc30?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975922323-8d8a0f1d3d8a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519408469771-2586093c3f14?q=80&w=1200&auto=format&fit=crop",
    ],
    []
  );

  return (
    <section id="portfolio" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold">Portfolio</h2>
          <a href="#booking" className="text-sm text-white/70 hover:text-white">Book a shoot →</a>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {images.map((src, i) => (
            <figure key={i} className="mb-6 break-inside-avoid rounded-3xl overflow-hidden border border-white/10 bg-white/5">
              <img src={src} alt={`portfolio-${i}`} className="w-full h-auto object-cover" />
              <figcaption className="p-3 text-xs text-white/60">Shot {i + 1}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Behind The Scenes — split layout with parallax copy
 */
function BTS() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="bts" ref={ref} className="relative py-28">
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
            <li>• Industry‑grade lighting setups with mood gels</li>
            <li>• Dual‑body workflow for never‑miss moments</li>
            <li>• Instant tether to review and refine on set</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Packages — cards with subtle hover motion
 */
function Packages() {
  const tiers = [
    {
      name: "Portrait",
      price: "₹9,999",
      desc: "1 hr shoot • 10 edits • indoor/outdoor",
    },
    {
      name: "Fashion",
      price: "₹24,999",
      desc: "Half day • creative direction • 25 edits",
    },
    {
      name: "Wedding",
      price: "₹79,999",
      desc: "Full day • team of 3 • highlight film",
    },
  ];

  return (
    <section id="packages" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold">Packages</h2>
          <a href="#booking" className="text-sm text-white/70 hover:text-white">Need custom? →</a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <motion.div
              key={t.name}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6"
            >
              <h4 className="text-xl font-semibold">{t.name}</h4>
              <p className="mt-2 text-sm text-white/70">{t.desc}</p>
              <div className="mt-6 text-3xl font-bold">{t.price}</div>
              <a
                href="#booking"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-white text-black px-4 py-2 font-medium hover:opacity-90 transition"
              >
                Book {t.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Booking — simple form with validation message
 */
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
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="booking" className="relative py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur">
          <h2 className="text-2xl sm:text-3xl font-semibold">Book a Shoot</h2>
          <p className="mt-2 text-white/70">Tell us the vibe. We’ll craft the story.</p>

          <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-white/70">Your Name</label>
              <input name="name" required className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="text-sm text-white/70">Email</label>
              <input name="email" type="email" required className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="text-sm text-white/70">Phone</label>
              <input name="phone" type="tel" className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="text-sm text-white/70">Shoot Type</label>
              <select name="type" className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30">
                <option>Portrait</option>
                <option>Fashion</option>
                <option>Wedding</option>
                <option>Brand</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-white/70">Message</label>
              <textarea name="message" rows={4} className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30" placeholder="Dates, location, moodboard…" />
            </div>
            <div className="md:col-span-2 flex items-center justify-between">
              <span className="text-xs text-white/50">We’ll reply within 24 hours.</span>
              <button disabled={status === "loading"} type="submit" className="rounded-xl bg-white text-black px-5 py-3 font-medium hover:opacity-90 transition disabled:opacity-60">
                {status === "loading" ? "Sending…" : "Send Request"}
              </button>
            </div>
            {status === "ok" && (
              <div className="md:col-span-2 text-sm text-emerald-300">Thanks! Your request is in. We’ll reach out soon. ✨</div>
            )}
            {status === "error" && (
              <div className="md:col-span-2 text-sm text-rose-300">Uh oh, something went wrong. Try again.</div>
            )}
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
        <p>© {new Date().getFullYear()} Smile Studio — All rights reserved.</p>
      </div>
    </footer>
  );
}

/**
 * BackdropFX — floating particles + glow
 */
function BackdropFX() {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-36 bg-gradient-to-b from-black/90 via-black/50 to-transparent" />
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
      {/* ambient glow blobs */}
      <div className="pointer-events-none fixed z-0 blur-3xl opacity-40">
        <div className="absolute -top-24 -left-24 h-[32rem] w-[32rem] rounded-full" style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 60%)",
        }} />
        <div className="absolute -bottom-24 -right-24 h-[30rem] w-[30rem] rounded-full" style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.35) 0%, transparent 60%)",
        }} />
      </div>
    </>
  );
}

// Note: scrollbar-hiding utility moved to global CSS to avoid SSR issues in Next.js 13+ / 15.

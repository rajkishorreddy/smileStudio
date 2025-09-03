"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AlbumModal({
  open,
  onClose,
//   src = "/book/index.html",
    src="/book/"
}: {
  open: boolean;
  onClose: () => void;
  src?: string;
}) {
  // Lock background scroll while open
  React.useEffect(() => {
    if (!open) return;
    const { style } = document.documentElement;
    const prev = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = prev;
    };
  }, [open]);

  // ESC + Back to close
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    // push a history state so Back = close
    const state = { album: true };
    window.history.pushState(state, "");
    const onPop = () => onClose();
    window.addEventListener("popstate", onPop);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPop);
      // clean the extra history entry
      if (window.history.state?.album) window.history.back();
    };
  }, [open, onClose]);

  // NEW: smooth fade when iframe finishes loading
  const [loaded, setLoaded] = React.useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] bg-black/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-[130] h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white/90 hover:bg-white/20"
          >
            ✕
          </button>

          {/* the iframe fills the viewport exactly */}
          <iframe
            src={src}
            onLoad={() => setTimeout(() => setLoaded(true), 50)} // tiny delay for a cleaner fade
            className={`absolute inset-0 w-screen h-screen md:h-dvh md:w-dvw transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-pointer-lock"
            // important: no borders/scrollbars
            style={{ border: "0", overflow: "hidden" }}
            loading="eager"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

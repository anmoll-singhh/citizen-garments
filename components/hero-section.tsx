// "use client";

// import Link from "next/link";
// import { ArrowDown } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { HeroSkeleton } from "./skeletons";

// const DESKTOP_VIDEOS = [
//   "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/luxurylingerieshowcasewithmaps-deployable/public/hero-vid-1-jUY4U3Snv7B8hlS1Ro7oYftOywIscH.mp4",
//   "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/luxurylingerieshowcasewithmaps-deployable/public/hero-vid-2-SNpJ63qqtn7oa8V8lXAW0DO71GN65p.mp4",
//   "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/luxurylingerieshowcasewithmaps-deployable/public/hero-vid-3-rnqFN6UhRX2LOAD9B1zeRge7jJYgY3.mp4",
//   "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/luxurylingerieshowcasewithmaps-deployable/public/hero-vid-4-dgCVwTiLincdTIvtElNk3LLCzsS8lb.mp4",
// ];

// // const MOBILE_VIDEOS = ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/luxurylingerieshowcasewithmaps-deployable/public/hero-vid-1-jUY4U3Snv7B8hlS1Ro7oYftOywIscH.mp4", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/luxurylingerieshowcasewithmaps-deployable/public/hero-vid-2-SNpJ63qqtn7oa8V8lXAW0DO71GN65p.mp4"];

// const MOBILE_VIDEOS = ["/hero-vid-m-1.mp4", "/hero-vid-m-4.mp4"];

// const FADE_DURATION = 800; // ms

// export function HeroSection() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isVisible, setIsVisible] = useState(false);
//   const [videos, setVideos] = useState(DESKTOP_VIDEOS);
//   const [index, setIndex] = useState(0);

//   const videoA = useRef<HTMLVideoElement>(null);
//   const videoB = useRef<HTMLVideoElement>(null);
//   const active = useRef<"A" | "B">("A");

//   /* -------- initial load -------- */
//   useEffect(() => {
//     const t = setTimeout(() => {
//       setIsLoading(false);
//       setIsVisible(true);
//     }, 300);
//     return () => clearTimeout(t);
//   }, []);

//   /* -------- responsive videos -------- */
//   useEffect(() => {
//     const update = () =>
//       setVideos(window.innerWidth < 768 ? MOBILE_VIDEOS : DESKTOP_VIDEOS);
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   /* -------- preload everything -------- */
//   useEffect(() => {
//     videos.forEach((src) => {
//       const v = document.createElement("video");
//       v.src = src;
//       v.preload = "auto";
//     });
//   }, [videos]);

//   /* -------- visibility recovery -------- */
//   useEffect(() => {
//     const onVisible = async () => {
//       const current = active.current === "A" ? videoA.current : videoB.current;
//       if (!current) return;

//       if (document.hidden) {
//         current.pause();
//       } else {
//         try {
//           if (current.ended) crossfade();
//           else await current.play();
//         } catch {}
//       }
//     };

//     document.addEventListener("visibilitychange", onVisible);
//     return () => document.removeEventListener("visibilitychange", onVisible);
//   }, [index, videos]);

//   /* -------- crossfade logic -------- */
//   const crossfade = async () => {
//     const current = active.current === "A" ? videoA.current : videoB.current;
//     const next = active.current === "A" ? videoB.current : videoA.current;

//     if (!current || !next) return;

//     const nextIndex = (index + 1) % videos.length;

//     next.src = videos[nextIndex];
//     next.currentTime = 0;
//     next.style.opacity = "0";
//     next.load();

//     const startNext = async () => {
//       try {
//         await next.play();
//         next.style.transition = `opacity ${FADE_DURATION}ms ease`;
//         current.style.transition = `opacity ${FADE_DURATION}ms ease`;

//         requestAnimationFrame(() => {
//           next.style.opacity = "1";
//           current.style.opacity = "0";
//         });

//         setTimeout(() => {
//           current.pause();
//           active.current = active.current === "A" ? "B" : "A";
//           setIndex(nextIndex);
//         }, FADE_DURATION);
//       } catch {}
//     };

//     if (next.readyState >= 3) startNext();
//     else next.addEventListener("canplay", startNext, { once: true });
//   };

//   if (isLoading) return <HeroSkeleton />;

//   return (
//     <section className="relative min-h-screen overflow-hidden bg-black">
//       {/* VIDEO A */}
//       <video
//         ref={videoA}
//         autoPlay
//         muted
//         playsInline
//         preload="auto"
//         onEnded={crossfade}
//         className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-100"
//         src={videos[index]}
//       />

//       {/* VIDEO B */}
//       <video
//         ref={videoB}
//         muted
//         playsInline
//         preload="auto"
//         className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-0"
//       />

//       {/* CONTENT */}
//       <div className="relative z-10 flex items-center justify-center min-h-screen text-center px-4">
//         <div>
//           <p
//             className={`text-sm tracking-[0.4em] text-white/80 uppercase mb-8 transition-opacity duration-1000 ${
//               isVisible ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             Luxury Intimate Apparel
//           </p>

//           <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-10">
//             Elegance Redefined
//           </h1>

//           <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-14">
//             Discover our curated collection of exquisite lingerie
//           </p>

//           <div className="flex justify-center gap-6">
//             <Link
//               href="/products"
//               className="px-10 py-4 bg-white text-black uppercase tracking-[0.2em]"
//             >
//               View Collection
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
//         <ArrowDown className="w-5 h-5 text-white/70" />
//       </div>
//     </section>
//   );
// }
"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HeroSkeleton } from "./skeletons";

const DESKTOP_VIDEOS = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/luxurylingerieshowcasewithmaps-deployable/public/hero-vid-1-jUY4U3Snv7B8hlS1Ro7oYftOywIscH.mp4",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/luxurylingerieshowcasewithmaps-deployable/public/hero-vid-2-SNpJ63qqtn7oa8V8lXAW0DO71GN65p.mp4",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/luxurylingerieshowcasewithmaps-deployable/public/hero-vid-3-rnqFN6UhRX2LOAD9B1zeRge7jJYgY3.mp4",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/luxurylingerieshowcasewithmaps-deployable/public/hero-vid-4-dgCVwTiLincdTIvtElNk3LLCzsS8lb.mp4",
];

const MOBILE_VIDEOS = ["/hero-vid-m-1.mp4", "/hero-vid-m-4.mp4"];

const FADE_DURATION = 800; // ms

export function HeroSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [videos, setVideos] = useState(DESKTOP_VIDEOS);
  const [index, setIndex] = useState(0);

  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const active = useRef<"A" | "B">("A");

  /* -------- initial load -------- */
  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  /* -------- responsive videos -------- */
  useEffect(() => {
    const update = () =>
      setVideos(window.innerWidth < 768 ? MOBILE_VIDEOS : DESKTOP_VIDEOS);

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* -------- preload everything -------- */
  useEffect(() => {
    videos.forEach((src) => {
      const v = document.createElement("video");
      v.src = src;
      v.preload = "auto";
    });
  }, [videos]);

  //   /* -------- visibility recovery -------- */
  useEffect(() => {
    const onVisible = async () => {
      const current = active.current === "A" ? videoA.current : videoB.current;
      if (!current) return;

      if (document.hidden) {
        current.pause();
      } else {
        try {
          if (current.ended) crossfade();
          else await current.play();
        } catch {}
      }
    };

    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [index, videos]);

  /* -------- crossfade logic -------- */
  const crossfade = async () => {
    const current = active.current === "A" ? videoA.current : videoB.current;
    const next = active.current === "A" ? videoB.current : videoA.current;

    if (!current || !next) return;

    const nextIndex = (index + 1) % videos.length;

    next.src = videos[nextIndex];
    next.currentTime = 0;
    next.style.opacity = "0";
    next.load();

    const startNext = async () => {
      try {
        await next.play();

        next.style.transition = `opacity ${FADE_DURATION}ms ease`;
        current.style.transition = `opacity ${FADE_DURATION}ms ease`;

        requestAnimationFrame(() => {
          next.style.opacity = "1";
          current.style.opacity = "0";
        });

        setTimeout(() => {
          current.pause();
          active.current = active.current === "A" ? "B" : "A";
          setIndex(nextIndex);
        }, FADE_DURATION);
      } catch {}
    };

    if (next.readyState >= 3) startNext();
    else next.addEventListener("canplay", startNext, { once: true });
  };

  if (isLoading) return <HeroSkeleton />;

  return (
    <section className="relative bg-black overflow-hidden pt-16 md:pt-20">

      {/* ✅ HERO HEIGHT FIXED BELOW NAV */}
      <div className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">

        {/* ✅ VIDEO A */}
        <video
          ref={videoA}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={crossfade}
          src={videos[index]}
          className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-100"
        />

        {/* ✅ VIDEO B */}
        <video
          ref={videoB}
          muted
          playsInline
          preload="auto"
          className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-0"
        />

        {/* ✅ CONTENT */}
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div>
            <p
              className={`text-sm tracking-[0.4em] text-white/80 uppercase mb-8 transition-opacity duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              Luxury Intimate Apparel
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-10">
              Elegance Redefined
            </h1>

            <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-14">
              Discover our curated collection of exquisite lingerie
            </p>

            <div className="flex justify-center gap-6">
              <Link
                href="/products"
                className="px-10 py-4 bg-white text-black uppercase tracking-[0.2em]"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>

        {/* ✅ SCROLL ICON */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <ArrowDown className="w-5 h-5 text-white/70" />
        </div>
      </div>
    </section>
  );
}


"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HeroSkeleton } from "./skeletons";

/* ✅ STATIC IMPORTS (BEST IMAGE OPTIMIZATION) */
import hero1 from "@/public/hero-img-pc-1.jpeg";
import hero2 from "@/public/bela-padded.png";
import hero3 from "@/public/hero-img-pc-3.png";
import hero4 from "@/public/clovia-everyday.png";

/* ✅ Desktop Image Array */
const DESKTOP_IMAGES = [hero1, hero2, hero3, hero4];

/* ✅ Mobile Videos (WebM + MP4 fallback files must exist) */
const MOBILE_VIDEOS = [
  {
    webm: "/hero-vid-m-1.webm",
    mp4: "/hero-vid-m-1.mp4",
  },
  {
    webm: "/hero-vid-m-4.webm",
    mp4: "/hero-vid-m-4.mp4",
  },
];

const FADE_DURATION = 800;
const IMAGE_DURATION = 4000;

export function HeroSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ✅ Desktop Image Index */
  const [imgIndex, setImgIndex] = useState(0);

  /* ✅ Mobile Video Index */
  const [vidIndex, setVidIndex] = useState(0);

  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const active = useRef<"A" | "B">("A");

  /* ✅ Initial Skeleton Loading */
  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  /* ✅ Detect Mobile */
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ✅ Desktop Image Slideshow */
  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % DESKTOP_IMAGES.length);
    }, IMAGE_DURATION);

    return () => clearInterval(interval);
  }, [isMobile]);

  /* ✅ Mobile Video Crossfade */
  const crossfade = async () => {
    if (!isMobile) return;

    const current = active.current === "A" ? videoA.current : videoB.current;
    const next = active.current === "A" ? videoB.current : videoA.current;

    if (!current || !next) return;

    const nextIndex = (vidIndex + 1) % MOBILE_VIDEOS.length;

    /* ✅ Load next video sources */
    next.innerHTML = `
      <source src="${MOBILE_VIDEOS[nextIndex].webm}" type="video/webm" />
      <source src="${MOBILE_VIDEOS[nextIndex].mp4}" type="video/mp4" />
    `;

    next.load();
    next.currentTime = 0;
    next.style.opacity = "0";

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
          setVidIndex(nextIndex);
        }, FADE_DURATION);
      } catch {}
    };

    next.addEventListener("canplay", startNext, { once: true });
  };

  if (isLoading) return <HeroSkeleton />;

  return (
    <section className="relative bg-black overflow-hidden pt-16 md:pt-20">
      <div className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
        {/* ✅ DESKTOP IMAGE SLIDER */}
        {!isMobile && (
          <div className="absolute inset-0">
            {DESKTOP_IMAGES.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt="Hero Background"
                fill
                quality={85}
                priority={i === 0}
                placeholder="blur"
                className={`absolute inset-0 object-cover transition-opacity duration-[800ms] ${
                  i === imgIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        )}

        {/* ✅ MOBILE VIDEO SLIDER (WebM Optimized) */}
        {isMobile && (
          <>
            {/* ✅ VIDEO A */}
            <video
              ref={videoA}
              autoPlay
              muted
              playsInline
              preload="metadata"
              onEnded={crossfade}
              className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-100"
            >
              <source
                src={MOBILE_VIDEOS[vidIndex].webm}
                type="video/webm"
              />
              <source
                src={MOBILE_VIDEOS[vidIndex].mp4}
                type="video/mp4"
              />
            </video>

            {/* ✅ VIDEO B */}
            <video
              ref={videoB}
              muted
              playsInline
              preload="metadata"
              className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-0"
            />
          </>
        )}

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

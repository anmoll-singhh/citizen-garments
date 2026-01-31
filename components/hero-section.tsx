"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HeroSkeleton } from "./skeletons";

/* DESKTOP IMAGES */
import hero1 from "@/public/hero-img-pc-1.webp";
import hero2 from "@/public/bela-padded.webp";
import hero3 from "@/public/hero-img-pc-3.webp";
import hero4 from "@/public/clovia-everyday.webp";

const DESKTOP_IMAGES = [hero1, hero2, hero3, hero4];

/* MOBILE VIDEOS */
const MOBILE_VIDEOS = [
  { webm: "/hero-vid-m-1.webm", mp4: "/hero-vid-m-1.mp4" },
  { webm: "/hero-vid-m-2.webm", mp4: "/hero-vid-m-2.mp4" },
];

const FADE_DURATION = 800;
const IMAGE_DURATION = 4000;

export function HeroSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [vidIndex, setVidIndex] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const active = useRef<"A" | "B">("A");

  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const interval = setInterval(
      () => setImgIndex((i) => (i + 1) % DESKTOP_IMAGES.length),
      IMAGE_DURATION,
    );
    return () => clearInterval(interval);
  }, [isMobile]);

  const crossfade = async () => {
    if (!isMobile) return;

    const current = active.current === "A" ? videoA.current : videoB.current;
    const next = active.current === "A" ? videoB.current : videoA.current;
    if (!current || !next) return;

    const nextIndex = (vidIndex + 1) % MOBILE_VIDEOS.length;

    next.innerHTML = `
      <source src="${MOBILE_VIDEOS[nextIndex].webm}" type="video/webm" />
      <source src="${MOBILE_VIDEOS[nextIndex].mp4}" type="video/mp4" />
    `;

    next.load();
    next.currentTime = 0;
    next.style.opacity = "0";

    next.addEventListener(
      "canplay",
      async () => {
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
      },
      { once: true },
    );
  };

  if (isLoading) return <HeroSkeleton />;

  return (
    <section className="relative bg-black overflow-hidden pt-16 md:pt-20">
      <div className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
        {/* DESKTOP IMAGE SLIDER */}
        {!isMobile && (
          <div className="absolute inset-0">
            {DESKTOP_IMAGES.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt="Hero"
                fill
                priority={i === 0}
                placeholder="blur"
                className={`absolute inset-0 object-cover transition-opacity duration-700 ${
                  i === imgIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        )}

        {/* MOBILE POSTER PLACEHOLDER */}
        {isMobile && (
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isVideoReady ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src="/hero-poster.webp"
              alt="Luxury Hero"
              fill
              priority
              className="object-cover scale-105 blur-[2px]"
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>
        )}
       
        {/* MOBILE VIDEOS */}
        {isMobile && (
          <>
            <video
              ref={videoA}
              autoPlay
              muted
              playsInline
              preload="metadata"
              onCanPlay={() => setIsVideoReady(true)}
              onEnded={crossfade}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={MOBILE_VIDEOS[vidIndex].webm} type="video/webm" />
              <source src={MOBILE_VIDEOS[vidIndex].mp4} type="video/mp4" />
            </video>

            <video
              ref={videoB}
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover opacity-0"
            />
          </>
        )}

        {/* LUXURY OVERLAY */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/grain.webp')]" />
        </div>

        {/* CONTENT */}
        <div className="relative z-20 flex items-center justify-center h-full text-center px-4">
          <div>
            <p className="text-sm tracking-[0.4em] text-white/80 uppercase mb-8">
              Luxury Intimate Apparel
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-10">
              Elegance Redefined
            </h1>

            <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-14">
              Discover our curated collection of exquisite lingerie
            </p>

            <Link
              href="/products"
              className="px-10 py-4 bg-white text-black uppercase tracking-[0.2em]"
            >
              View Collection
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-30">
          <ArrowDown className="w-5 h-5 text-white/70" />
        </div>
      </div>
    </section>
  );
}

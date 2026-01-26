// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { cn } from "@/lib/utils";

// const LOGOS = [
//   { src: "/logos/Citizens.png", alt: "Citizen Garment" }, // FIRST
//   { src: "/logos/Citybabe.png", alt: "Citybabe" },

// ];

// export function RotatingLogo() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % LOGOS.length);
//     }, 2500); // change every 2.5s

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       className="
//         relative 
//         w-36 h-9 
//         sm:w-40 sm:h-10 
//         md:w-44 md:h-11
//         overflow-hidden
//       "
//     >
//       {LOGOS.map((logo, i) => (
//         <Image
//           key={logo.alt}
//           src={logo.src}
//           alt={logo.alt}
//           fill
//           priority={i === 0}
//           className={cn(
//             "object-contain transition-all duration-700 ease-in-out",
//             i === index
//               ? "opacity-100 scale-100"
//               : "opacity-0 scale-95"
//           )}
//         />
//       ))}
//     </div>
//   );
// }
"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

type Size = "sm" | "md" | "lg"

interface DualLogoProps {
  leftLogo: string
  rightLogo: string
  size?: Size
  className?: string
}

const sizeMap = {
  sm: {
    logo: 28,
    gap: "gap-3",
    separator: "h-6",
  },
  md: {
    logo: 36,
    gap: "gap-4",
    separator: "h-8",
  },
  lg: {
    logo: 80,
    gap: "gap-1",
    separator: "h-8",
  },
  xl: {
    logo: 150,
    gap: "gap-2",
    separator: "h-10",
  }
}

export function DualLogo({
  leftLogo,
  rightLogo,
  size = "md",
  className,
}: DualLogoProps) {
  const styles = sizeMap[size]

  return (
    <div
      className={cn(
        "flex items-center",
        styles.gap,
        className
      )}
    >
      <Image
        src={leftLogo}
        alt="Left logo"
        width={styles.logo}
        height={styles.logo}
        className="object-contain"
        priority
      />

      {/* Separator */}
      <div
        className={cn(
          "w-px",
          styles.separator,
          "bg-neutral-300 dark:bg-neutral-700"
        )}
      />

      <Image
        src={rightLogo}
        alt="Right logo"
        width={styles.logo}
        height={styles.logo}
        className="object-contain"
        priority
      />
    </div>
  )
}

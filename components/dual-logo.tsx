
// "use client"

// import Image from "next/image"
// import { cn } from "@/lib/utils"
// import { useEffect, useState } from "react"

// type Size = "sm" | "md" | "lg"

// interface DualLogoProps {
//   leftLogo: string
//   rightLogo: string
//   size?: Size
//   className?: string
// }

// const sizeMap = {
//   sm: {
//     logo: 28,
//     gap: "gap-3",
//     separator: "h-6",
//   },
//   md: {
//     logo: 36,
//     gap: "gap-4",
//     separator: "h-8",
//   },
//   lg: {
//     logo: 80,
//     gap: "gap-1",
//     separator: "h-8",
//   },
//   xl: {
//     logo: 150,
//     gap: "gap-2",
//     separator: "h-10",
//   },
// }

// export function DualLogo({
//   leftLogo,
//   rightLogo,
//   size = "md",
//   className,
// }: DualLogoProps) {
//   const styles = sizeMap[size]

//   /** ✅ Hydration Fix */
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   /** ✅ Professional Placeholder (No Layout Shift) */
//   if (!mounted) {
//     return (
//       <div
//         className={cn("flex items-center", styles.gap, className)}
//         style={{
//           height: styles.logo,
//         }}
//       >
//         {/* Placeholder Left */}
//         <div style={{ width: styles.logo, height: styles.logo }} />

//         {/* Separator Placeholder */}
//         <div className={cn("w-px", styles.separator)} />

//         {/* Placeholder Right */}
//         <div style={{ width: styles.logo, height: styles.logo }} />
//       </div>
//     )
//   }

//   return (
//     <div className={cn("flex items-center", styles.gap, className)}>
//       <Image
//         src={leftLogo}
//         alt="Left logo"
//         width={styles.logo}
//         height={styles.logo}
//         className="object-contain"
//         priority
//       />

//       {/* Separator */}
//       <div
//         className={cn(
//           "w-px",
//           styles.separator,
//           "bg-neutral-300 dark:bg-neutral-700"
//         )}
//       />

//       <Image
//         src={rightLogo}
//         alt="Right logo"
//         width={styles.logo}
//         height={styles.logo}
//         className="object-contain"
//         priority
//       />
//     </div>
//   )
// }
"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Size = "sm" | "md" | "lg" | "xl";

interface DualLogoProps {
  leftLogo: string;
  rightLogo: string;
  size?: Size;
  className?: string;
}

const sizeMap = {
  sm: { logo: 28, gap: "gap-3", separator: "h-6" },
  md: { logo: 36, gap: "gap-4", separator: "h-8" },
  lg: { logo: 80, gap: "gap-1", separator: "h-8" },
  xl: { logo: 150, gap: "gap-2", separator: "h-10" },
};

export function DualLogo({
  leftLogo,
  rightLogo,
  size = "md",
  className,
}: DualLogoProps) {
  const styles = sizeMap[size];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn("flex items-center", styles.gap, className)}
        style={{
          height: styles.logo,
          maxHeight: "clamp(42px,4.5vw,105px)",
        }}
      >
        <div style={{ width: styles.logo, height: styles.logo }} />
        <div className={cn("w-px", styles.separator)} />
        <div style={{ width: styles.logo, height: styles.logo }} />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", styles.gap, className)}>
      {/* Left Logo */}
      <Image
        src={leftLogo}
        alt="Left logo"
        width={styles.logo}
        height={styles.logo}
        priority
        className="object-contain w-auto max-h-[clamp(42px,4.5vw,105px)]"
      />

      {/* Separator */}
      <div
        className={cn(
          "w-px bg-neutral-300 dark:bg-neutral-700",
          styles.separator,
          "max-h-[clamp(24px,2.8vw,48px)]"
        )}
      />

      {/* Right Logo */}
      <Image
        src={rightLogo}
        alt="Right logo"
        width={styles.logo}
        height={styles.logo}
        priority
        className="object-contain w-auto max-h-[clamp(42px,4.7vw,105px)]"
      />
    </div>
  );
}

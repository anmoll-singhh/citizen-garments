
"use client";

import Link from "next/link";
import { DualLogo } from "./dual-logo";
import { useTheme } from "next-themes";

export function Footer() {
  const { theme } = useTheme();

  /** ✅ Correct Logos */
  const leftLogo =
    theme === "dark" ? "/logos/Citizens-dark.png" : "/logos/Citizens.png";

  const rightLogo =
    theme === "dark" ? "/logos/Citybabe-dark.png" : "/logos/Citybabe.png";

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-14">
          {/* ✅ Brand */}
          <div>
            <Link href="/" className="flex items-center">
              <DualLogo leftLogo={leftLogo} rightLogo={rightLogo} size="xl" />
            </Link>

            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              Luxury intimate apparel crafted with the finest fabrics for the
              modern woman.
            </p>
          </div>

          {/* ✅ Navigation */}
          <div>
            <h4 className="text-sm md:text-base tracking-[0.2em] uppercase text-foreground mb-6">
              Navigation
            </h4>

            <nav className="flex flex-col gap-5">
              <Link
                href="/"
                className="text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>

              <Link
                href="/products"
                className="text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                Collection
              </Link>

              <Link
                href="/products?category=bra"
                className="text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                Bras
              </Link>

              <Link
                href="/products?category=sets"
                className="text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                Sets
              </Link>
            </nav>
          </div>

          {/* ✅ Contact */}
          <div>
            <h4 className="text-sm md:text-base tracking-[0.2em] uppercase text-foreground mb-6">
              Get In Touch
            </h4>

            <div className="flex flex-col gap-5">
              <a
                href="https://wa.me/919137914629"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-muted-foreground hover:text-foreground transition"
              >
                WhatsApp
              </a>

              <a
                href="https://instagram.com/citizenslingerie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-muted-foreground hover:text-foreground transition"
              >
                Instagram
              </a>

              <a
                href="tel:+919860266177"
                className="text-base text-muted-foreground hover:text-foreground transition"
              >
                +91 98602 66177
              </a>

              <a
                href="mailto:citizenslingerie@gmail.com"
                className="text-base text-muted-foreground hover:text-foreground transition"
              >
                citizenslingerie@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* ✅ Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Citizen Garments. All rights reserved.
          </p>

          <p className="text-sm text-muted-foreground">
            Crafted with elegance
          </p>
        </div>
      </div>
    </footer>
  );
}


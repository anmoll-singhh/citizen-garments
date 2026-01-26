
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { DualLogo } from "./rotating-logo";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /** ✅ Contact Dropdown */
  const [isContactOpen, setIsContactOpen] = useState(false);

  /** ✅ Theme */
  const { theme } = useTheme();

  /** ✅ Close dropdown on outside click */
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        contactRef.current &&
        !contactRef.current.contains(event.target as Node)
      ) {
        setIsContactOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** ✅ Light / Dark Logos */
  const leftLogo =
    theme === "dark" ? "/logos/Citizens-dark.png" : "/logos/Citizens.png";

  const rightLogo =
    theme === "dark" ? "/logos/Citybabe-dark.png" : "/logos/Citybabe.png";

  /** ✅ Luxury Hover Link Style */
  const navLinkStyle =
    "relative text-lg tracking-[0.2em] font-bold uppercase text-foreground/80 transition-colors duration-500" +
    " after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-current" +
    " after:transition-all after:duration-700 hover:text-foreground hover:after:w-full";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          {/* ✅ Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex md:hidden">
              <DualLogo leftLogo={leftLogo} rightLogo={rightLogo} size="lg" />
            </div>

            <div className="hidden md:flex">
              <DualLogo leftLogo={leftLogo} rightLogo={rightLogo} size="xl" />
            </div>
          </Link>

          {/* ✅ Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link href="/" className={navLinkStyle}>
              Home
            </Link>

            <Link href="/products" className={navLinkStyle}>
              Collection
            </Link>

            {/* ✅ Contact Dropdown */}
            <div ref={contactRef} className="relative">
              <button
                onClick={() => setIsContactOpen(!isContactOpen)}
                className={`${navLinkStyle} flex items-center gap-2`}
              >
                <Phone className="w-4 h-4" />
                Contact
              </button>

              <div
                className={cn(
                  "absolute top-full left-0 mt-3 w-60 rounded-xl bg-card border border-border shadow-xl overflow-hidden z-50",
                  "transition-all duration-300 origin-top",
                  isContactOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
                )}
              >
                <a
                  href="https://wa.me/919137914629"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-4 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>

                <a
                  href="tel:+919860266177"
                  className="flex items-center gap-3 px-5 py-4 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>
          </nav>

          {/* ✅ Right Side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsContactOpen(false);
              }}
              className="md:hidden p-2 text-foreground"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col p-6 gap-6">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition"
          >
            Home
          </Link>

          <Link
            href="/products"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition"
          >
            Collection
          </Link>

          <a
            href="https://wa.me/919137914629"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>

          <a
            href="tel:+919860266177"
            className="flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
        </nav>
      </div>
    </header>
  );
}


"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { DualLogo } from "./dual-logo";
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

  /** ✅ Correct Logos */
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
            {/* Mobile */}
            <div className="flex md:hidden">
              <DualLogo leftLogo={leftLogo} rightLogo={rightLogo} size="lg" />
            </div>

            {/* Desktop */}
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
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                )}
              >
                {/* ✅ WhatsApp */}
                <a
                  href="https://wa.me/919137914629"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-4 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition"
                >
                  {/* WhatsApp Logo */}
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.15 1.6 5.97L0 24l6.3-1.65a11.9 11.9 0 0 0 5.75 1.47h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.43-8.45ZM12.06 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.88 9.88 0 0 1-1.52-5.27C2.16 6.44 6.6 2 12.05 2c2.64 0 5.12 1.03 6.98 2.89a9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.89-9.86 9.89Zm5.41-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
                  </svg>
                  WhatsApp
                </a>

                {/* ✅ Call */}
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

            {/* Mobile Menu */}
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
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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

          {/* ✅ WhatsApp Mobile */}
          <a
            href="https://wa.me/919137914629"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.15 1.6 5.97L0 24l6.3-1.65a11.9 11.9 0 0 0 5.75 1.47h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.43-8.45Z" />
            </svg>
            WhatsApp
          </a>

          {/* ✅ Call Mobile */}
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

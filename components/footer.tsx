import Link from "next/link";
import { DualLogo } from "./rotating-logo";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-14">
          {/* Brand */}
          <div>
            {/* <Link
              href="/"
              className="text-3xl md:text-4xl font-light tracking-wider text-foreground"
            >
              Élise
            </Link> */}
            <Link href="/" className="left-0 ">
              {" "}
              <DualLogo
                leftLogo="/logos/Citizens.png"
                rightLogo="/logos/Citybabe.png"
                size="xl"
              />
            </Link>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              Luxury intimate apparel crafted with the finest fabrics for the
              modern woman.
            </p>
          </div>

          {/* Navigation */}
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

          {/* Contact */}
          <div>
            <h4 className="text-sm md:text-base tracking-[0.2em] uppercase text-foreground mb-6">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-5">
              <a
                href="https://wa.me/+919137914629"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3"
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
                href="https://instagram.com/citizenslingerie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm10.25 2a.75.75 0 1 1-.001 1.501A.75.75 0 0 1 18 5.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
                </svg>
                Instagram
              </a>
              <a
                href="tel:+919860266177"
                className="text-base text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 98602 66177
              </a>
              <a
                href="mailto:citizenslingerie@gmail.com"
                className="text-base text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                citizenslingerie@gmail.com  
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Citizen Garments. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Crafted with elegance</p>
        </div>
      </div>
    </footer>
  );
}

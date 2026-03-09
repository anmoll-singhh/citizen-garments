"use client"

import { useEffect, useRef, useState } from "react"

export function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-card">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm md:text-base tracking-[0.3em] uppercase text-accent">Visit Us</span>
          <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-foreground">
            Our Office
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Experience our collection in person. Visit our exclusive office for a personalized shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Map */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4635.706428549913!2d73.1622446!3d19.220028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795c8c1a62e2d%3A0xc593e3c5901b27a9!2sCitizens%20Garments!5e1!3m2!1sen!2sin!4v1769081763559!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Citizen Lingerie"
                className="md:grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
          {/* Contact Info */}
          <div
            className={`flex flex-col justify-center transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Address */}
            <div className="mb-12">
              <h3 className="text-sm md:text-base tracking-[0.2em] uppercase text-accent mb-5">Address</h3>
              <p className="text-foreground text-lg md:text-xl leading-relaxed">
                Citizen Garments, Bk no. 974
                <br />
                Sukhmani niwas 
                <br />
                Station rd , Ulhasnagar 421003
                 
              </p>
            </div>

            {/* Hours */}
            <div className="mb-12">
              <h3 className="text-sm md:text-base tracking-[0.2em] uppercase text-accent mb-5">Opening Hours</h3>
              <div className="space-y-3 text-foreground">
                <p className="flex justify-between max-w-sm text-base md:text-lg">
                  <span>Monday - Thursday</span>
                  <span className="text-muted-foreground">10:00 AM - 7:00 PM</span>
                </p>
                <p className="flex justify-between max-w-sm text-base md:text-lg">
                  <span>Saturday</span>
                  <span className="text-muted-foreground">10:00 AM - 7:00 PM</span>
                </p>
                <p className="flex justify-between max-w-sm text-base md:text-lg">
                  <span>Sunday</span>
                  <span className="text-muted-foreground">10:00 AM - 7:00 PM</span>
                </p>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/+919137914629?text=Hello%2C%20I%20would%20like%20to%20visit%20your%20office."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 px-10 py-4 bg-accent text-accent-foreground text-sm md:text-base tracking-[0.15em] uppercase transition-all duration-300 hover:bg-accent/90 hover:scale-[1.02]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
              <a
                href="tel:+919860266177"
                className="group flex items-center justify-center gap-3 px-10 py-4 border border-foreground/20 text-foreground text-sm md:text-base tracking-[0.15em] uppercase transition-all duration-300 hover:bg-foreground hover:text-background hover:scale-[1.02]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call Us
              </a>
            </div>

            {/* Get Directions Link */}
            <a
              href="https://maps.app.goo.gl/16jqSC2VrFCWtFBW7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-base text-muted-foreground hover:text-foreground transition-colors group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Get Directions
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

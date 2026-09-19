"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight, Mail, Menu, Phone, X } from "lucide-react";
import Flag from "@/components/Flag";
import ServiceIcon from "@/components/ServiceIcon";
import { navigation } from "@/lib/nav";
import { contact, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close every menu when the route changes
  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenGroup(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openNow = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };

  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 120);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-navy-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 text-[13px]">
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${contact.emails.general}`}
              className="flex items-center gap-2 transition-colors hover:text-gold-400"
            >
              <Mail className="size-3.5" aria-hidden />
              {contact.emails.general}
            </a>
            <a
              href={contact.phonePrimaryHref}
              className="flex items-center gap-2 transition-colors hover:text-gold-400"
            >
              <Phone className="size-3.5" aria-hidden />
              {contact.phonePrimary}
            </a>
          </div>
          <p className="text-navy-200">
            Ameerpet, Hyderabad &nbsp;•&nbsp; Karimnagar
          </p>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? "border-navy-100 shadow-sm" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* The real logo, lifted from the company's own poster artwork.
              It already contains the wordmark and tagline, so no text sits
              beside it — the alt text carries the name for screen readers. */}
          <Link href="/" className="group flex shrink-0 items-center">
            <Image
              src="/logo-compact.png"
              alt={`${site.name} — Overseas Educational Consultants`}
              width={478}
              height={120}
              priority
              className="h-9 w-auto sm:h-11"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {navigation.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openNow(item.label)}
                  onMouseLeave={closeSoon}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenGroup(openGroup === item.label ? null : item.label)
                    }
                    aria-expanded={openGroup === item.label}
                    className={`relative flex items-center gap-1 rounded-lg px-3 py-2 text-[14.5px] font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-gold-500 after:transition-transform after:duration-300 ${
                      isActive(item.href)
                        ? "text-navy-900 after:scale-x-100"
                        : "text-navy-600 after:scale-x-0 hover:bg-navy-50 hover:text-navy-900 hover:after:scale-x-100"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-3.5 transition-transform ${
                        openGroup === item.label ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>

                  {openGroup === item.label && (
                    <div
                      className={`absolute top-full left-0 pt-2 ${
                        // Two columns keeps tall menus (services carry a line
                        // of description each) from running the height of the
                        // viewport.
                        item.children.length > 4 ? "w-[34rem]" : "w-72"
                      }`}
                    >
                      {/* Same language as the cards — navy face, white
                          labels, gold accents — with the photograph carried
                          behind the whole panel rather than banded across the
                          top. The wash is heavy enough that every label keeps
                          full contrast over any part of the image. */}
                      <div className="animate-fade-up relative overflow-hidden rounded-2xl border border-navy-800/60 bg-navy-900 shadow-[0_2px_8px_rgba(11,31,58,0.20),0_28px_56px_-20px_rgba(11,31,58,0.65)]">
                        {item.panelPhoto && (
                          <>
                            <Image
                              src={item.panelPhoto.src}
                              alt=""
                              fill
                              sizes="34rem"
                              className="object-cover"
                            />
                            <div
                              className="absolute inset-0 bg-gradient-to-br from-navy-950/96 via-navy-900/94 to-navy-950/91"
                              aria-hidden
                            />
                          </>
                        )}

                        {item.panelCaption && (
                          <p className="relative px-4 pt-3.5 pb-1 text-[11.5px] font-semibold tracking-[0.14em] text-gold-400 uppercase">
                            {item.panelCaption}
                          </p>
                        )}

                        <div
                          className={`relative grid gap-0.5 p-2 ${
                            item.children.length > 4 ? "grid-cols-2" : ""
                          }`}
                        >
                          {item.children.map((child) => {
                            // A one-line row centres against its icon; a row
                            // carrying a description hangs from the top.
                            const stacked = Boolean(child.desc);

                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`group/item flex gap-2.5 rounded-lg px-2.5 py-2 transition-colors hover:bg-white/10 ${
                                  stacked ? "items-start" : "items-center"
                                }`}
                              >
                                {child.countrySlug && (
                                  <span
                                    className={`grid size-7 shrink-0 place-items-center rounded-md bg-white/10 ring-1 ring-white/15 transition-colors group-hover/item:ring-gold-500/50 ${
                                      stacked ? "mt-0.5" : ""
                                    }`}
                                  >
                                    <Flag slug={child.countrySlug} size="sm" />
                                  </span>
                                )}
                                {child.serviceIcon && (
                                  <span
                                    className={`grid size-7 shrink-0 place-items-center rounded-md bg-gold-500/15 text-gold-400 ring-1 ring-gold-500/25 transition-colors group-hover/item:bg-gold-500 group-hover/item:text-navy-900 ${
                                      stacked ? "mt-0.5" : ""
                                    }`}
                                  >
                                    <ServiceIcon
                                      name={child.serviceIcon}
                                      className="size-3.5"
                                    />
                                  </span>
                                )}
                                <span className="min-w-0 leading-tight">
                                  <span className="block text-[13.5px] font-semibold text-white transition-colors group-hover/item:text-gold-300">
                                    {child.label}
                                  </span>
                                  {child.desc && (
                                    <span className="mt-0.5 line-clamp-2 block text-[11.5px] leading-[1.35] text-navy-300">
                                      {child.desc}
                                    </span>
                                  )}
                                </span>
                              </Link>
                            );
                          })}
                        </div>

                        <Link
                          href={item.href}
                          className="group/all relative flex items-center justify-between border-t border-white/10 bg-navy-950/70 px-4 py-3 text-[12.5px] font-semibold text-gold-400 transition-colors hover:bg-navy-950/90 hover:text-gold-300"
                        >
                          {item.viewAllLabel ??
                            "View all " + item.label.toLowerCase()}
                          <span className="grid size-6 place-items-center rounded-full bg-white/10 text-gold-400 transition-all duration-300 group-hover/all:bg-gold-500 group-hover/all:text-navy-900">
                            <ChevronRight className="size-3.5" aria-hidden />
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-lg px-3 py-2 text-[14.5px] font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-gold-500 after:transition-transform after:duration-300 ${
                    isActive(item.href)
                      ? "text-navy-900 after:scale-x-100"
                      : "text-navy-600 after:scale-x-0 hover:bg-navy-50 hover:text-navy-900 hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden rounded-lg bg-gradient-to-br from-gold-400 to-gold-500 px-4 py-2.5 text-[14px] font-semibold text-navy-900 shadow-md shadow-gold-500/25 transition-all duration-300 hover:-translate-y-px hover:from-gold-300 hover:to-gold-400 hover:shadow-lg hover:shadow-gold-500/40 sm:inline-block"
            >
              Free Consultation
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-navy-800 transition-colors hover:bg-navy-50 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(88vw,22rem)] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-navy-100 px-5 py-4">
              <span className="font-display font-bold text-navy-900">Menu</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-1.5 text-navy-700 hover:bg-navy-50"
                aria-label="Close menu"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-3">
              {navigation.map((item) =>
                item.children ? (
                  <div key={item.label} className="border-b border-navy-50">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenGroup(
                          openGroup === item.label ? null : item.label,
                        )
                      }
                      aria-expanded={openGroup === item.label}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium text-navy-800"
                    >
                      {item.label}
                      <ChevronDown
                        className={`size-4 text-navy-400 transition-transform ${
                          openGroup === item.label ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    </button>
                    {openGroup === item.label && (
                      <div className="pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-3 rounded-lg py-2.5 pr-3 pl-5 text-[14px] text-navy-600 hover:bg-navy-50"
                          >
                            {child.countrySlug && (
                              <span className="grid size-7 shrink-0 place-items-center rounded-md border border-navy-100 bg-white">
                                <Flag slug={child.countrySlug} size="sm" />
                              </span>
                            )}
                            {child.serviceIcon && (
                              <span className="grid size-7 shrink-0 place-items-center rounded-md bg-navy-50 text-navy-700">
                                <ServiceIcon
                                  name={child.serviceIcon}
                                  className="size-3.5"
                                />
                              </span>
                            )}
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block border-b border-navy-50 px-3 py-3 text-[15px] font-medium ${
                      isActive(item.href) ? "text-navy-900" : "text-navy-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="space-y-2 border-t border-navy-100 p-4">
              <Link
                href="/contact"
                className="block rounded-lg bg-gold-500 px-4 py-3 text-center text-[15px] font-semibold text-navy-900"
              >
                Book a Free Consultation
              </Link>
              <a
                href={contact.phonePrimaryHref}
                className="flex items-center justify-center gap-2 rounded-lg border border-navy-200 px-4 py-3 text-[15px] font-semibold text-navy-800"
              >
                <Phone className="size-4" aria-hidden />
                {contact.phonePrimary}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { photos } from "@/lib/images";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <Image
        src={photos.flight.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-navy-950/88" aria-hidden />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center sm:py-32">
      <span className="font-display text-[4.5rem] leading-none font-bold text-white/25">
        404
      </span>
      <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
        This page has moved on
      </h1>
      <p className="mt-3 text-[15.5px] leading-relaxed text-navy-200">
        The page you are looking for doesn&apos;t exist or has been relocated.
        Let&apos;s get you back to planning your education abroad.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg bg-gold-500 px-5 py-3 text-[14.5px] font-semibold text-navy-900 hover:bg-gold-400"
        >
          Back to home
          <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link
          href="/study-in"
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 px-5 py-3 text-[14.5px] font-semibold text-white hover:border-white/60 hover:bg-white/5"
        >
          Explore destinations
        </Link>
      </div>
      </div>
    </section>
  );
}

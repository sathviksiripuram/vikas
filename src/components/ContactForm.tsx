"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { countries } from "@/lib/countries";
import { services } from "@/lib/services";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({
  defaultCountry = "",
  defaultService = "",
}: {
  defaultCountry?: string;
  defaultService?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot — bots fill hidden fields, humans do not.
    if (data.company) return;

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "We could not send your enquiry. Please call or WhatsApp us instead.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-navy-100 bg-navy-50/60 p-8 text-center sm:p-10">
        <CheckCircle2 className="mx-auto size-11 text-gold-500" aria-hidden />
        <h3 className="mt-4 text-xl font-bold text-navy-900">
          Thank you — we have your enquiry
        </h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-navy-600">
          One of our counsellors will contact you within one working day. For
          anything urgent, call us on{" "}
          <a href="tel:+919849303673" className="font-semibold text-navy-800 underline">
            +91 98493 03673
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[14px] font-semibold text-navy-600 underline underline-offset-4 hover:text-navy-900"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-navy-200 bg-white px-3.5 py-2.5 text-[15px] text-navy-900 outline-none transition-colors placeholder:text-navy-400 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/15";
  const label = "mb-1.5 block text-[13.5px] font-semibold text-navy-800";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Full name <span className="text-gold-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone / WhatsApp <span className="text-gold-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 90000 00000"
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={label}>
          Email address <span className="text-gold-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={field}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="country" className={label}>
            Preferred destination
          </label>
          <select
            id="country"
            name="country"
            defaultValue={defaultCountry}
            className={field}
          >
            <option value="">Not sure yet</option>
            {countries.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="service" className={label}>
            I need help with
          </label>
          <select
            id="service"
            name="service"
            defaultValue={defaultService}
            className={field}
          >
            <option value="">General enquiry</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="qualification" className={label}>
          Highest qualification
        </label>
        <input
          id="qualification"
          name="qualification"
          placeholder="e.g. B.Tech CSE, 2024, 72%"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Tell us about your plans
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Intake, budget, test scores, or any questions you have…"
          className={`${field} resize-y`}
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-[14px] text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy-900 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden />
            Submit Enquiry
          </>
        )}
      </button>

      <p className="text-[13px] leading-relaxed text-navy-500">
        By submitting this form you agree to be contacted by Vikas Overseas
        about your study abroad plans. We never share your details with third
        parties.
      </p>
    </form>
  );
}

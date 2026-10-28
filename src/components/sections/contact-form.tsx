"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { contactProjectTypes, siteConfig } from "@/data/portfolio";
import { contactSchema, getFieldErrors, type ContactErrors } from "@/lib/contact-schema";
import { EASE, cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "peer w-full rounded-[4px] border bg-[#161616]/70 px-4 pt-6 pb-2.5 text-base text-white outline-none transition-all placeholder:text-transparent focus:border-white focus:ring-2 focus:ring-white/40";

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-2 left-4 text-xs text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#b3b3b3]"
      >
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-center gap-1.5 pl-1 text-xs text-red-500"
          >
            <CircleAlert className="size-3.5" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [projectType, setProjectType] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors = getFieldErrors(parsed.error);
      setErrors(fieldErrors);
      const first = Object.keys(fieldErrors)[0];
      if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setServerError(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; fields?: ContactErrors };
      if (!res.ok) {
        if (json.fields) setErrors(json.fields);
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      form.reset();
      setProjectType("");
      setStatus("success");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const describedBy = (k: keyof ContactErrors) => (errors[k] ? `${k}-error` : undefined);

  return (
    <div className="relative overflow-hidden rounded-md border border-white/10 bg-black/60 p-6 text-left shadow-soft backdrop-blur-sm sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex min-h-[460px] flex-col items-center justify-center text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="grid size-16 place-items-center rounded-full bg-accent text-white shadow-[0_10px_40px_-10px_rgba(229,9,20,0.6)]"
            >
              <CircleCheck className="size-8" />
            </motion.span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">Message sent — thank you!</h3>
            <p className="mt-2 max-w-sm text-muted">
              I&apos;ve received your message and will get back to you within 24–48 hours.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 text-sm font-medium text-white underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            className="space-y-4"
            aria-label="Contact form"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Your name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy("name")}
                  className={cn(fieldBase, errors.name ? "border-[#eb3942]" : "border-white/30")}
                />
              </Field>
              <Field id="email" label="Email address" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy("email")}
                  className={cn(fieldBase, errors.email ? "border-[#eb3942]" : "border-white/30")}
                />
              </Field>
            </div>

            <fieldset>
              <legend className="mb-3 pl-1 text-sm text-[#b3b3b3]">What are you looking to build?</legend>
              <div className="flex flex-wrap gap-2" role="radiogroup">
                {contactProjectTypes.map((t) => (
                  <label
                    key={t}
                    className={cn(
                      "cursor-pointer rounded-[4px] border px-3.5 py-2 text-sm transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-white",
                      projectType === t
                        ? "border-accent bg-accent text-white"
                        : "border-white/25 text-[#b3b3b3] hover:border-white/60 hover:text-white",
                    )}
                  >
                    <input
                      type="radio"
                      name="projectType"
                      value={t}
                      checked={projectType === t}
                      onChange={() => setProjectType(t)}
                      className="sr-only"
                    />
                    {t}
                  </label>
                ))}
              </div>
              <AnimatePresence>
                {errors.projectType && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 flex items-center gap-1.5 pl-1 text-xs text-red-500"
                  >
                    <CircleAlert className="size-3.5" /> {errors.projectType}
                  </motion.p>
                )}
              </AnimatePresence>
            </fieldset>

            <Field id="message" label="Tell me about your project" error={errors.message}>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Tell me about your project"
                aria-invalid={!!errors.message}
                aria-describedby={describedBy("message")}
                className={cn(fieldBase, "resize-none pt-7", errors.message ? "border-[#eb3942]" : "border-white/30")}
              />
            </Field>

            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <AnimatePresence>
              {status === "error" && serverError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="flex flex-col gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <CircleAlert className="size-4 shrink-0" /> {serverError}
                  </span>
                  <a
                    href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Project enquiry")}`}
                    className="inline-flex items-center gap-1 font-medium text-fg underline-offset-4 hover:underline"
                  >
                    Email instead <ArrowUpRight className="size-3.5" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col-reverse items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
              <p className="text-xs text-[#808080]">Usually replies within 24–48 hours.</p>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-[4px] bg-accent px-8 text-lg font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-70 sm:w-auto"
              >
                {status === "submitting" ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

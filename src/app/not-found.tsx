import Link from "next/link";
import { Wordmark, nfButton } from "@/components/netflix/brand";

export default function NotFound() {
  return (
    <section className="relative grid min-h-dvh place-items-center overflow-hidden bg-black px-5 text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(229,9,20,0.22),transparent_70%)]"
      />
      <Link href="/" className="absolute top-5 left-[max(1rem,4%)]" aria-label="Home">
        <Wordmark className="text-3xl" />
      </Link>
      <div className="relative">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg sm:text-7xl">Lost your way?</h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-white/90 sm:text-2xl">
          Sorry, this title isn&apos;t in the catalogue. There&apos;s plenty more to explore on the home page.
        </p>
        <Link href="/" className={`${nfButton.play} mt-8`}>
          Portfolio Home
        </Link>
        <p className="mt-10 text-lg text-white/70">
          <span className="border-l-2 border-accent pl-3">
            Error Code <strong className="text-white">JA-404</strong>
          </span>
        </p>
      </div>
    </section>
  );
}

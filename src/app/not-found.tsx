import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="font-mono text-sm text-accent">Error 404</p>
      <h1 className="mt-4 text-6xl font-semibold tracking-tight sm:text-7xl">
        Page <span className="text-gradient font-serif font-normal italic">not found</span>
      </h1>
      <div className="mt-8 w-full max-w-md rounded-2xl border border-line bg-[#0b0f17] p-5 text-left font-mono text-sm text-[#d6deeb]">
        <p>
          <span className="text-[#c3e88d]">➜</span> <span className="text-[#82aaff]">~</span> cd ./this-page
        </p>
        <p className="text-[#ff5f57]">bash: cd: ./this-page: No such file or directory</p>
      </div>
      <ButtonLink href="/" size="lg" className="mt-10">
        <ArrowLeft className="size-4" /> Back to home
      </ButtonLink>
    </section>
  );
}

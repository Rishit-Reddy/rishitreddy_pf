import { useState } from "react";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";

const EMAIL = "rishitpalle@gmail.com";

const button =
  "inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setStatus("copied");
    } catch {
      setStatus("failed"); // clipboard blocked; the mailto button still works
    }
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <section className="w-full">
      <h2 className="text-xl font-bold mb-1">Contact</h2>
      <p className="text-base text-muted-foreground mb-3">Questions, or just want to say hi?</p>

      <div className="flex flex-wrap gap-2">
        <a href={`mailto:${EMAIL}`} className={button}>
          <Mail className="size-4" aria-hidden="true" />
          {EMAIL}
        </a>
        <button type="button" onClick={copyEmail} className={button}>
          {status === "copied" ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          {status === "copied" ? "Copied" : status === "failed" ? "Copy failed, select the address" : "Copy email"}
        </button>
        <a href="https://www.linkedin.com/in/rishit-reddy-palle/" target="_blank" rel="noopener noreferrer" className={button}>
          <Linkedin className="size-4" aria-hidden="true" />
          LinkedIn
        </a>
        <a href="https://github.com/Rishit-Reddy" target="_blank" rel="noopener noreferrer" className={button}>
          <Github className="size-4" aria-hidden="true" />
          GitHub
        </a>
      </div>
      <p className="sr-only" aria-live="polite">{status === "copied" ? "Email address copied" : status === "failed" ? "Copy failed" : ""}</p>
    </section>
  );
}

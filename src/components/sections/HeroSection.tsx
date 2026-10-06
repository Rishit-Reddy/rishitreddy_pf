import { Github, Linkedin } from "lucide-react";

export default function Hero() {
  return (
    <div className="md:pt-24">
      <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-12 w-full">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Rishit Reddy Palle
          </h1>
          <p className="text-xl font-medium mt-2">
            MSc student in Image Analysis and Machine Learning
          </p>
          <p className="text-base text-muted-foreground mt-0.5">
            Uppsala University<span className="hidden sm:inline"> · </span><span className="block sm:inline">Background in full-stack development</span>
          </p>
          <p className="inline-block rounded-lg border border-border bg-muted px-3 py-1 text-sm mt-3">
            Looking for a digital pathology degree project from January 2027
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 mt-4 text-base">
            <a href="https://github.com/Rishit-Reddy" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[#181717] dark:text-white hover:opacity-75 transition-opacity">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/rishit-reddy-palle/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#0A66C2] hover:opacity-75 transition-opacity">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:rishitpalle@gmail.com" className="text-foreground hover:text-muted-foreground transition-colors">rishitpalle@gmail.com</a>
          </div>
        </div>

        <picture className="block w-screen md:w-56 flex-shrink-0">
          {/* Phones get the wide outdoor photo; desktop keeps the cut-out portrait. */}
          <source media="(min-width: 768px)" srcSet="/profile-image.png" />
          <img
            src="/mobile-photo.jpg"
            alt="Rishit Reddy Palle smiling outdoors against a blue sky"
            width="1600"
            height="746"
            className="w-full aspect-[3/2] object-cover object-center md:aspect-auto md:h-auto md:rounded-2xl"
          />
        </picture>
      </div>
    </div>
  );
}

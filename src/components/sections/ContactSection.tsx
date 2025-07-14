import React, { useEffect } from 'react';

// Declare Tally for TypeScript
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

const ContactSection: React.FC = () => {
  useEffect(() => {
    if (window.Tally) {
      window.Tally.loadEmbeds();
    }
  }, []);

  return (
    <section className="w-full py-16 md:py-24 bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Let’s Connect
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Got an idea, a collaboration, or just want to say hi? Fill out the form below and I’ll get back to you soon.
          </p>
        </header>

        <div className="bg-blue-50 dark:bg-blue-100 border border-border rounded-xl shadow-md p-6 md:p-8">
          <iframe
            data-tally-src="https://tally.so/embed/mJjZ67?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="400"
            title="Contact form"
            className="w-full min-h-[400px]"
            data-theme="auto"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

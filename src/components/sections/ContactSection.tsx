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
    <section className="w-full">
      <h2 className="text-xl font-bold mb-1">Contact</h2>
      <p className="text-base text-muted-foreground mb-3">
        Got an idea, a collaboration, or just want to say hi? Use the form below.
      </p>

      <div className="border border-border rounded-lg p-3">
        <iframe
          data-tally-src="https://tally.so/embed/mJjZ67?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="360"
          title="Contact form"
          className="w-full min-h-[360px]"
          data-theme="auto"
        />
      </div>
    </section>
  );
};

export default ContactSection;

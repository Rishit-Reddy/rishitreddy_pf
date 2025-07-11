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
    // Load Tally embeds when component mounts
    if (window.Tally) {
      window.Tally.loadEmbeds();
    }
  }, []);

  return (
    <div className="w-full py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Drop me a message and let's create something amazing together.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <iframe 
              data-tally-src="https://tally.so/embed/mJjZ67?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
              loading="lazy" 
              width="100%" 
              height="342" 
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0} 
              title="Contact form"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;

// src/data/experience-data.ts

export type ExperienceData = {
  company: string;
  title: string;
  logo: string;
  period: string;
  points: string[];
  narrative?: string;
  skills?: string[];
};

// NOTE: `narrative` is a first draft written from the `points` below — plain facts turned into
// sentences, not real personal reflection. Rishit should read these and rewrite in his own voice.
// (The drafted `experienceIntro` paragraph was removed: it was not written by Rishit.)

export const experienceData: ExperienceData[] = [
  {
    company: "Axiogreen",
    title: "Machine Learning Engineer (Intern)",
    logo: "/logos/axiogreen.png",
    period: "June 2026 – August 2026",
    narrative:
      "Axiogreen was an early-stage startup with a very lean team, so I ended up with a lot of ownership over the ML side of their building-automation platform, which controls how buildings get heated. The existing system was rule-based, and I worked on moving that decision-making toward a model predictive control approach instead, using a multilinear regression model to predict how the building would respond to different heating inputs. Before any of that could go near a real building, I designed a physics-based simulator built around an RC (resistance-capacitance) thermal model, which meant going through a fair number of peer-reviewed papers to get the modeling right.",
    points: [
      "Developed a predictive heating controller to optimize building energy use, transitioning from a rule-based system.",
      "Created a physics-based building simulator for safe testing and validation of control algorithms."
    ],
    skills: ["Machine Learning", "Model Predictive Control", "Multilinear Regression", "Simulation"]
  },
  {
    company: "NoGapps",
    title: "Full Stack Intern",
    logo: "/logos/nogapps.png",
    period: "July 2024 – December 2024",
    narrative:
      "At NoGapps I worked on internal order management tools built with FastAPI and MedusaJS. There wasn't much onboarding, so I picked up MedusaJS and Next.js mostly by reading docs and just building. I put together the frontend in Next.js, wired up JotForm-based workflows, and spent a good chunk of time chasing down Stripe checkout bugs. I also talked to clients directly, which meant the scope shifted more than once and I had to get comfortable adjusting on the fly.",
    points: [
      "Built internal order management tools using FastAPI and MedusaJS.",
      "Developed frontend in NextJS and integrated JotForm-based workflows.",
      "Handled Stripe payment bugs and improved client checkout flow.",
      "Worked with limited onboarding; adapted to MedusaJS + NextJS independently.",
      "Communicated directly with clients and navigated scope changes in real-time."
    ],
    skills: ["FastAPI", "NextJS", "MedusaJS", "Stripe", "JotForm", "DigitalOcean"]
  },
  {
    company: "MocX",
    title: "Co-Founder",
    logo: "/logos/mocx.png",
    period: "August 2021 – June 2023",
    narrative:
      "MocX was a mock interview platform I co-founded, built with React, Tailwind, Django, and GCP. I owned most of the product side: interview scheduling, feedback reporting, the whole session flow, plus integrating Razorpay for payments and running the PostgreSQL backend behind user data and feedback logs. I ran the user interviews myself and used what I heard to keep reworking the UX in Figma. It's probably the project that taught me the most about shipping something end to end, not just the code but the decisions around it.",
    points: [
      "Built a mock interview platform using React, Tailwind, Django, and GCP.",
      "Integrated Razorpay for secure payment handling.",
      "Managed PostgreSQL for user data and feedback logging.",
      "Designed interview scheduling, feedback reporting, and session flows.",
      "Led user interviews and iterative UX improvements in Figma."
    ],
    skills: ["ReactJS", "TailwindCSS", "Django", "GCP", "Razorpay", "PostgreSQL", "Figma"]
  },
  {
    company: "IGNITE SVUCE",
    title: "Chief Strategy Officer",
    logo: "/logos/ignite.png",
    period: "February 2022 – January 2023",
    // Title line only on the homepage: no narrative, no skill badges.
    points: [
      "Led cross-departmental sustainability initiative 'Prakruthi Suraksha'.",
      "Helped set up Coding & Book Clubs with recurring weekly activities.",
      "Pitched and implemented QR-based carbon offset tracking system.",
      "Facilitated club growth, participation tracking, and event planning.",
      "Practiced stakeholder alignment, pitch delivery, and team collaboration."
    ]
    // Soft-skill badges removed so this renders as a single title line.
  }
];

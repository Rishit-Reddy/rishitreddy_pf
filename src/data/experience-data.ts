// src/data/experience-data.ts

export type ExperienceData = {
  company: string;
  title: string;
  logo: string;
  period: string;
  points: string[];
  skills?: string[];
};

export const experienceData: ExperienceData[] = [
  {
    company: "NoGapps",
    title: "Full Stack Intern",
    logo: "/logos/nogapps.png",
    period: "July 2024 – December 2024",
    points: [
      "Built internal order management tools using FastAPI and MedusaJS.",
      "Developed frontend in GatsbyJS and integrated JotForm-based workflows.",
      "Handled Stripe payment bugs and improved client checkout flow.",
      "Worked with limited onboarding; adapted to MedusaJS + GatsbyJS independently.",
      "Communicated directly with clients and navigated scope changes in real-time."
    ],
    skills: ["FastAPI", "GatsbyJS", "MedusaJS", "Stripe", "JotForm", "DigitalOcean"]
  },
  {
    company: "MocX",
    title: "Co-Founder",
    logo: "/logos/mocx.png",
    period: "August 2021 – June 2023",
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
    points: [
      "Led cross-departmental sustainability initiative 'Prakruthi Suraksha'.",
      "Helped set up Coding & Book Clubs with recurring weekly activities.",
      "Pitched and implemented QR-based carbon offset tracking system.",
      "Facilitated club growth, participation tracking, and event planning.",
      "Practiced stakeholder alignment, pitch delivery, and team collaboration."
    ],
    skills: ["Leadership", "Strategy", "Sustainability", "Public Speaking", "Team Management"]
  }
];

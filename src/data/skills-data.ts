export const categoryOrder = [
  "Imaging & ML Methods",
  "ML Tools",
  "Languages",
  "Web & Backend",
  "Cloud/DevOps",
] as const;

export type Skill = { name: string; category: (typeof categoryOrder)[number] };

// Every item below comes from a project or course already on this site or in Rishit's notes.
// Web and DevOps are deliberately trimmed to the strongest items; add back only if needed.
const byCategory: Record<(typeof categoryOrder)[number], string[]> = {
  "Imaging & ML Methods": [
    "CNNs (from scratch and transfer learning)",
    "Data augmentation",
    "FFT filtering",
    "Segmentation",
    "HOG + SVM",
    "Object detection (YOLOv3, Faster R-CNN)",
  ],
  "ML Tools": ["PyTorch", "TensorFlow / Keras", "scikit-learn", "NumPy", "OpenCV", "Detectron2"],
  Languages: ["Python", "MATLAB", "C++", "C", "TypeScript"],
  "Web & Backend": ["React", "Next.js", "Django", "FastAPI", "PostgreSQL", "Firebase"],
  "Cloud/DevOps": ["Docker", "Kubernetes", "AWS", "GitHub Actions"],
};

export const skills: Skill[] = categoryOrder.flatMap((category) =>
  byCategory[category].map((name) => ({ name, category }))
);

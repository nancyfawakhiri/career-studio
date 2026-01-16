export type Career = {
  slug: string;
  title: string;
  intro: string;
  bucket: "artistic" | "social" | "enterprising" | "investigative" | "conventional" | "realistic";
};

export const careers: Career[] = [
  {
    slug: "registered-nurse",
    title: "Registered Nurse",
    intro: "Provide patient care, coordinate treatment, and educate patients and families in clinical settings.",
    bucket: "social",
  },
  {
    slug: "ai-ml",
    title: "Artificial Intelligence & Machine Learning",
    intro: "Build and deploy models that learn from data to automate decisions, detect patterns, and improve products.",
    bucket: "investigative",
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    intro: "Create visual concepts that communicate ideas clearly across brand, product, and marketing channels.",
    bucket: "artistic",
  },
  {
    slug: "content-writer",
    title: "Content Writer",
    intro: "Write and edit content for websites, blogs, and campaigns with clarity, structure, and audience fit.",
    bucket: "artistic",
  },
];

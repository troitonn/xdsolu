export interface SolutionTab {
  id: string;
  number: string;
  tabLabel: string;
  tabSub: string;
  title: string;
  description: string;
  pills: string[];
  subcards: {
    title: string;
    description: string;
    tag?: string;
  }[];
}

export interface SegmentItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  featured?: boolean;
  metrics?: string;
  iconName: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

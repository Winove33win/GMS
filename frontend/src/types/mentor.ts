export interface MentorExperience {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface MentorEducation {
  course: string;
  institution: string;
  year: string;
}

export interface MentorLink {
  label: string;
  url: string;
}

export interface Mentor {
  slug: string;
  name: string;
  headline: string;
  avatarUrl?: string;
  summary: string;
  expertise: string[];
  ods: number[];
  location: string;
  remote: boolean;
  availability: string;
  seniority: string;
  languages: string[];
  interests: string[];
  education: MentorEducation[];
  experience: MentorExperience[];
  links: MentorLink[];
  recommendationScore: number;
  lastActiveAt: string;
  joinedAt: string;
}

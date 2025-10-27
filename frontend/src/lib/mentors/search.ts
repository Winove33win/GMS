import type { Mentor } from "@/types/mentor";

export const ADVANCED_SENIORITY_VALUE = "senior-specialist" as const;

export type Filters = {
  q?: string;
  expertise: string[];
  ods: number[];
  seniority?: string;
  lang?: string[];
  location?: string;
  remote?: boolean;
  available?: boolean;
  sort?: "recommended" | "availability" | "recent";
};

export type AppliedFilters = Omit<Filters, "sort">;

export type MentorWithScore = Mentor & { score: number };

export interface FilterCounts {
  expertise: Record<string, number>;
  ods: Record<number, number>;
  lang: Record<string, number>;
}

export interface FilterResult {
  items: MentorWithScore[];
  counts: FilterCounts;
}

const ADVANCED_SENIORITY_MATCH = new Set(["sênior", "senior", "especialista"]);

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function normalize(text: string): string {
  return text
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeArray(values: string[]): string[] {
  return values.map((value) => normalize(value));
}

function matchOdsScore(mentor: Mentor, filters: Filters): number {
  if (filters.ods.length === 0) {
    const richness = clamp(mentor.ods.length, 0, 4) / 4;
    return Math.round(20 + richness * 20);
  }

  const matches = mentor.ods.filter((value) => filters.ods.includes(value)).length;
  if (matches === 0) {
    return 0;
  }

  return Math.round((matches / filters.ods.length) * 40);
}

function matchExpertiseScore(mentor: Mentor, filters: Filters): number {
  if (filters.expertise.length === 0) {
    const baseline = clamp(mentor.recommendationScore ?? 70, 0, 100) / 100;
    return Math.round(15 + baseline * 15);
  }

  const normalizedExpertise = normalizeArray(mentor.expertise);
  const matchCount = filters.expertise
    .map((value) => normalize(value))
    .filter((value) => normalizedExpertise.includes(value)).length;

  if (matchCount === 0) {
    return 0;
  }

  return Math.round((matchCount / filters.expertise.length) * 30);
}

function availabilityScore(mentor: Mentor, filters: Filters): number {
  const availabilityText = normalize(mentor.availability);

  if (filters.available === true) {
    return availabilityText.includes("dispon") ? 20 : 0;
  }

  if (availabilityText.includes("dispon")) {
    return 18;
  }

  if (availabilityText.includes("agenda") || availabilityText.includes("limit")) {
    return 12;
  }

  if (availabilityText.includes("breve") || availabilityText.includes("consult")) {
    return 10;
  }

  return 6;
}

function seniorityScore(mentor: Mentor, filters: Filters): number {
  if (!filters.seniority) {
    switch (normalize(mentor.seniority)) {
      case "especialista":
        return 10;
      case "sênior":
      case "senior":
        return 9;
      case "pleno":
        return 6;
      default:
        return 5;
    }
  }

  if (filters.seniority === ADVANCED_SENIORITY_VALUE) {
    return ADVANCED_SENIORITY_MATCH.has(normalize(mentor.seniority)) ? 10 : 2;
  }

  return normalize(mentor.seniority) === normalize(filters.seniority) ? 10 : 0;
}

export function score(mentor: Mentor, filters: Filters): number {
  const ods = matchOdsScore(mentor, filters);
  const expertise = matchExpertiseScore(mentor, filters);
  const availability = availabilityScore(mentor, filters);
  const seniority = seniorityScore(mentor, filters);

  return clamp(ods + expertise + availability + seniority, 0, 100);
}

function matchesQuery(mentor: Mentor, queryTokens: string[]): boolean {
  if (queryTokens.length === 0) {
    return true;
  }

  const haystack = normalize(
    [
      mentor.name,
      mentor.headline,
      mentor.location,
      mentor.expertise.join(" "),
      mentor.ods.join(" "),
    ].join(" "),
  );

  return queryTokens.every((token) => haystack.includes(token));
}

function matchesLocation(mentor: Mentor, locationQuery?: string): boolean {
  if (!locationQuery) {
    return true;
  }

  const normalizedLocation = normalize(locationQuery);
  if (!normalizedLocation) {
    return true;
  }

  const haystack = normalize(`${mentor.location} ${mentor.remote ? "remoto" : ""}`);
  return haystack.includes(normalizedLocation);
}

function matchesSeniority(mentor: Mentor, seniority?: string): boolean {
  if (!seniority) {
    return true;
  }

  if (seniority === ADVANCED_SENIORITY_VALUE) {
    return ADVANCED_SENIORITY_MATCH.has(normalize(mentor.seniority));
  }

  return normalize(mentor.seniority) === normalize(seniority);
}

function matchesLanguages(mentor: Mentor, languages: string[] = []): boolean {
  if (languages.length === 0) {
    return true;
  }

  const normalizedLanguages = normalizeArray(mentor.languages);
  return languages.every((language) => normalizedLanguages.includes(normalize(language)));
}

function matchesExpertise(mentor: Mentor, expertise: string[] = []): boolean {
  if (expertise.length === 0) {
    return true;
  }

  const normalizedExpertise = normalizeArray(mentor.expertise);
  return expertise.some((item) => normalizedExpertise.includes(normalize(item)));
}

function matchesOds(mentor: Mentor, ods: number[] = []): boolean {
  if (ods.length === 0) {
    return true;
  }

  return mentor.ods.some((value) => ods.includes(value));
}

function matchesRemote(mentor: Mentor, remote?: boolean): boolean {
  if (remote === undefined) {
    return true;
  }

  return mentor.remote === remote;
}

function matchesAvailability(mentor: Mentor, available?: boolean): boolean {
  if (available === undefined) {
    return true;
  }

  const text = normalize(mentor.availability);
  return available ? text.includes("dispon") : true;
}

function updateCounts(counts: FilterCounts, mentor: Mentor) {
  mentor.expertise.forEach((item) => {
    counts.expertise[item] = (counts.expertise[item] ?? 0) + 1;
  });

  mentor.ods.forEach((item) => {
    counts.ods[item] = (counts.ods[item] ?? 0) + 1;
  });

  mentor.languages.forEach((item) => {
    counts.lang[item] = (counts.lang[item] ?? 0) + 1;
  });
}

export function filterMentors(mentors: Mentor[], filters: Filters): FilterResult {
  const queryTokens = filters.q ? normalize(filters.q).split(" ").filter(Boolean) : [];
  const counts: FilterCounts = { expertise: {}, ods: {}, lang: {} };

  const items = mentors
    .filter((mentor) => matchesQuery(mentor, queryTokens))
    .filter((mentor) => matchesLocation(mentor, filters.location))
    .filter((mentor) => matchesRemote(mentor, filters.remote))
    .filter((mentor) => matchesAvailability(mentor, filters.available))
    .filter((mentor) => matchesExpertise(mentor, filters.expertise))
    .filter((mentor) => matchesOds(mentor, filters.ods))
    .filter((mentor) => matchesSeniority(mentor, filters.seniority))
    .filter((mentor) => matchesLanguages(mentor, filters.lang ?? []));

  items.forEach((mentor) => updateCounts(counts, mentor));

  const withScores = items.map((mentor) => ({
    ...mentor,
    score: score(mentor, filters),
  }));

  return { items: withScores, counts };
}

export function sortMentors(items: MentorWithScore[], sort: Filters["sort"] = "recommended"): MentorWithScore[] {
  const copy = [...items];

  if (sort === "availability") {
    const availabilityRank = (mentor: MentorWithScore) => {
      const text = normalize(mentor.availability);
      if (text.includes("dispon")) {
        return 0;
      }
      if (text.includes("agenda") || text.includes("limit")) {
        return 1;
      }
      if (text.includes("breve")) {
        return 2;
      }
      return 3;
    };

    return copy.sort((a, b) => {
      const diff = availabilityRank(a) - availabilityRank(b);
      if (diff !== 0) {
        return diff;
      }
      return b.score - a.score || a.name.localeCompare(b.name, "pt-BR");
    });
  }

  if (sort === "recent") {
    return copy.sort((a, b) => {
      const diff = new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
      if (diff !== 0) {
        return diff;
      }
      return b.score - a.score || a.name.localeCompare(b.name, "pt-BR");
    });
  }

  return copy.sort((a, b) => {
    const diff = b.score - a.score;
    if (diff !== 0) {
      return diff;
    }
    return a.name.localeCompare(b.name, "pt-BR");
  });
}

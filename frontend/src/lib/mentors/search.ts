import type { Mentor } from "@/types/mentor"

export type Filters = {
  q?: string
  expertise: string[]
  ods: number[]
  lang?: string[]
  sort?: "recommended" | "recent"
}

export type AppliedFilters = Omit<Filters, "sort">

export type MentorWithScore = Mentor & { score: number }

export interface FilterCounts {
  expertise: Record<string, number>
  ods: Record<number, number>
  lang: Record<string, number>
}

export interface FilterResult {
  items: MentorWithScore[]
  counts: FilterCounts
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export function normalize(text: string): string {
  return text
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function normalizeArray(values: string[]): string[] {
  return values.map((value) => normalize(value))
}

function matchOdsScore(mentor: Mentor, filters: Filters): number {
  if (filters.ods.length === 0) {
    const richness = clamp(mentor.ods.length, 0, 4) / 4
    return Math.round(25 + richness * 15)
  }

  const matches = mentor.ods.filter((value) => filters.ods.includes(value)).length
  if (matches === 0) {
    return 0
  }

  return Math.round((matches / filters.ods.length) * 40)
}

function matchExpertiseScore(mentor: Mentor, filters: Filters): number {
  if (filters.expertise.length === 0) {
    const diversity = clamp(mentor.expertise.length, 0, 4) / 4
    return Math.round(20 + diversity * 20)
  }

  const normalizedExpertise = normalizeArray(mentor.expertise)
  const matchCount = filters.expertise
    .map((value) => normalize(value))
    .filter((value) => normalizedExpertise.includes(value)).length

  if (matchCount === 0) {
    return 0
  }

  return Math.round((matchCount / filters.expertise.length) * 40)
}

function matchLanguageScore(mentor: Mentor, filters: Filters): number {
  if (!filters.lang || filters.lang.length === 0) {
    const count = clamp(mentor.languages.length, 0, 3) / 3
    return Math.round(15 + count * 10)
  }

  const normalizedLanguages = normalizeArray(mentor.languages)
  const matchCount = filters.lang
    .map((language) => normalize(language))
    .filter((language) => normalizedLanguages.includes(language)).length

  if (matchCount === 0) {
    return 0
  }

  return Math.round((matchCount / filters.lang.length) * 30)
}

export function score(mentor: Mentor, filters: Filters): number {
  const ods = matchOdsScore(mentor, filters)
  const expertise = matchExpertiseScore(mentor, filters)
  const language = matchLanguageScore(mentor, filters)

  return clamp(ods + expertise + language, 0, 100)
}

function matchesQuery(mentor: Mentor, queryTokens: string[]): boolean {
  if (queryTokens.length === 0) {
    return true
  }

  const locationParts = [mentor.location?.city, mentor.location?.state, mentor.location?.country]
    .filter(Boolean)
    .join(" ")

  const haystack = normalize(
    [
      mentor.name,
      mentor.headline,
      mentor.summary,
      mentor.valueStatement,
      locationParts,
      mentor.expertise.join(" "),
      mentor.ods.join(" "),
    ].join(" "),
  )

  return queryTokens.every((token) => haystack.includes(token))
}

function matchesLanguages(mentor: Mentor, languages: string[] = []): boolean {
  if (languages.length === 0) {
    return true
  }

  const normalizedLanguages = normalizeArray(mentor.languages)
  return languages.every((language) => normalizedLanguages.includes(normalize(language)))
}

function matchesExpertise(mentor: Mentor, expertise: string[] = []): boolean {
  if (expertise.length === 0) {
    return true
  }

  const normalizedExpertise = normalizeArray(mentor.expertise)
  return expertise.some((item) => normalizedExpertise.includes(normalize(item)))
}

function matchesOds(mentor: Mentor, ods: number[] = []): boolean {
  if (ods.length === 0) {
    return true
  }

  return mentor.ods.some((value) => ods.includes(value))
}

function updateCounts(counts: FilterCounts, mentor: Mentor) {
  mentor.expertise.forEach((item) => {
    counts.expertise[item] = (counts.expertise[item] ?? 0) + 1
  })

  mentor.ods.forEach((item) => {
    counts.ods[item] = (counts.ods[item] ?? 0) + 1
  })

  mentor.languages.forEach((item) => {
    counts.lang[item] = (counts.lang[item] ?? 0) + 1
  })
}

export function filterMentors(mentors: Mentor[], filters: Filters): FilterResult {
  const queryTokens = filters.q ? normalize(filters.q).split(" ").filter(Boolean) : []
  const counts: FilterCounts = { expertise: {}, ods: {}, lang: {} }

  const items = mentors
    .filter((mentor) => matchesQuery(mentor, queryTokens))
    .filter((mentor) => matchesExpertise(mentor, filters.expertise))
    .filter((mentor) => matchesOds(mentor, filters.ods))
    .filter((mentor) => matchesLanguages(mentor, filters.lang ?? []))

  items.forEach((mentor) => updateCounts(counts, mentor))

  const withScores = items.map((mentor) => ({
    ...mentor,
    score: score(mentor, filters),
  }))

  return { items: withScores, counts }
}

export function sortMentors(items: MentorWithScore[], sort: Filters["sort"] = "recommended"): MentorWithScore[] {
  const copy = [...items]

  if (sort === "recent") {
    return copy.sort((a, b) => {
      const diff = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      if (diff !== 0) {
        return diff
      }
      return b.score - a.score || a.name.localeCompare(b.name, "pt-BR")
    })
  }

  return copy.sort((a, b) => {
    const diff = b.score - a.score
    if (diff !== 0) {
      return diff
    }
    return a.name.localeCompare(b.name, "pt-BR")
  })
}

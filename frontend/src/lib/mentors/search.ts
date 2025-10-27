import type { Mentor, ProgramWindow } from "@/types/mentor"

export type Filters = {
  q?: string
  expertise: string[]
  ods: number[]
  lang?: string[]
  remote?: boolean
  programWindows?: string[]
  sort?: "recommended" | "recent"
}

export type AppliedFilters = Omit<Filters, "sort">

export type MentorWithScore = Mentor & { score: number }

export interface FilterCounts {
  expertise: Record<string, number>
  ods: Record<number, number>
  lang: Record<string, number>
  programWindows: Record<string, number>
}

export interface FilterResult {
  items: MentorWithScore[]
  counts: FilterCounts
}

export type ProgramWindowOption = {
  id: string
  label: string
  start?: string
  end?: string
}

export function createProgramWindowId(window: Pick<ProgramWindow, "start" | "end" | "label">): string {
  const parts = [window.start ?? "", window.end ?? "", window.label ?? ""]
  return parts.join("|")
}

export function parseProgramWindowId(id: string): ProgramWindowOption {
  const [start = "", end = "", label = ""] = id.split("|")
  return {
    id,
    start: start || undefined,
    end: end || undefined,
    label: label || undefined,
  }
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
      locationParts,
      mentor.expertise.join(" "),
      mentor.ods.join(" "),
    ].join(" "),
  )

  return queryTokens.every((token) => haystack.includes(token))
}

function matchesRemote(mentor: Mentor, remote?: boolean): boolean {
  if (remote === undefined) {
    return true
  }

  return Boolean(mentor.location?.remote) === remote
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

function windowOverlaps(target: ProgramWindow, filterWindow: ProgramWindowOption): boolean {
  const normalizedLabel = normalize(filterWindow.label ?? "")
  if (normalizedLabel) {
    const currentLabel = normalize(target.label ?? "")
    if (currentLabel.includes(normalizedLabel) || normalizedLabel.includes(currentLabel)) {
      return true
    }
  }

  if (!filterWindow.start || !filterWindow.end || !target.start || !target.end) {
    return false
  }

  const filterStart = new Date(filterWindow.start).getTime()
  const filterEnd = new Date(filterWindow.end).getTime()
  const targetStart = new Date(target.start).getTime()
  const targetEnd = new Date(target.end).getTime()

  if (Number.isNaN(filterStart) || Number.isNaN(filterEnd) || Number.isNaN(targetStart) || Number.isNaN(targetEnd)) {
    return false
  }

  return targetStart <= filterEnd && targetEnd >= filterStart
}

function matchesProgramWindows(mentor: Mentor, selected: string[] = []): boolean {
  if (!selected || selected.length === 0) {
    return true
  }

  const mentorWindows = mentor.program?.windows ?? []
  if (mentorWindows.length === 0) {
    return false
  }

  const filters = selected.map((id) => parseProgramWindowId(id))

  return filters.some((filterWindow) =>
    mentorWindows.some((window) => windowOverlaps(window, filterWindow)),
  )
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

  mentor.program?.windows.forEach((window) => {
    const id = createProgramWindowId(window)
    counts.programWindows[id] = (counts.programWindows[id] ?? 0) + 1
  })
}

export function filterMentors(mentors: Mentor[], filters: Filters): FilterResult {
  const queryTokens = filters.q ? normalize(filters.q).split(" ").filter(Boolean) : []
  const counts: FilterCounts = { expertise: {}, ods: {}, lang: {}, programWindows: {} }

  const items = mentors
    .filter((mentor) => matchesQuery(mentor, queryTokens))
    .filter((mentor) => matchesRemote(mentor, filters.remote))
    .filter((mentor) => matchesExpertise(mentor, filters.expertise))
    .filter((mentor) => matchesOds(mentor, filters.ods))
    .filter((mentor) => matchesLanguages(mentor, filters.lang ?? []))
    .filter((mentor) => matchesProgramWindows(mentor, filters.programWindows))

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

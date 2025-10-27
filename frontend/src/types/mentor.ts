export type MentorCase = {
  title: string
  result: string
  ods?: number
}

export type MentorLinks = {
  linkedin?: string
  lattes?: string
  website?: string
}

export type MentorLocation = {
  city?: string
  state?: string
  country?: string
  remote?: true
}

export type MentorProgram = {
  format: "collective"
  sessionFrequency: "weekly"
  sessionLengthMin: number
  channel: "remote"
}

export type Mentor = {
  id: string
  slug: string
  name: string
  headline: string
  valueStatement: string
  avatarUrl?: string
  location?: MentorLocation
  seniority: "Pleno" | "Sênior" | "Especialista"
  expertise: string[]
  ods: number[]
  languages: string[]
  summary: string
  helpsWith: string[]
  cases?: MentorCase[]
  cohorts?: string[]
  program: MentorProgram
  links?: MentorLinks
  updatedAt: string
}

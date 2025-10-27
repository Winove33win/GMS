export type ProgramWindow = {
  start: string
  end: string
  label?: string
}

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

export type Mentor = {
  id: string
  slug: string
  name: string
  headline: string
  avatarUrl?: string
  location?: MentorLocation
  seniority: "Pleno" | "Sênior" | "Especialista"
  expertise: string[]
  ods: number[]
  languages: string[]
  summary: string
  helpsWith: string[]
  cases?: MentorCase[]
  program: {
    sessionFrequency: "weekly"
    sessionLengthMin: 60
    channel: "remote"
    windows: ProgramWindow[]
  }
  links?: MentorLinks
  updatedAt: string
}

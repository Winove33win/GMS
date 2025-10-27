const weekdayShortFormatter = new Intl.DateTimeFormat("pt-BR", { weekday: "short" })
const weekdayLongFormatter = new Intl.DateTimeFormat("pt-BR", { weekday: "long" })
const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" })

function capitalize(text: string): string {
  if (!text) {
    return text
  }
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function parseDateTime(date: string, time: string): Date | undefined {
  if (!date || !time) {
    return undefined
  }
  const isoTime = time.includes(":") ? time : `${time.slice(0, 2)}:${time.slice(2)}`
  const value = new Date(`${date}T${isoTime}`)
  if (Number.isNaN(value.getTime())) {
    return undefined
  }
  return value
}

export function formatTimeLabel(time: string): string {
  if (!time) {
    return ""
  }
  const [hours = "", minutes = "00"] = time.split(":")
  return minutes === "00" ? `${hours}h` : `${hours}h${minutes}`
}

export function formatSessionCompact(date: string, time: string): string {
  const parsed = parseDateTime(date, time)
  if (!parsed) {
    return `${date} • ${time}`
  }
  const weekday = capitalize(weekdayShortFormatter.format(parsed).replace(".", ""))
  const dateLabel = dateFormatter.format(parsed)
  return `${weekday} • ${dateLabel} • ${formatTimeLabel(time)}`
}

export function formatSessionLong(date: string, time: string): string {
  const parsed = parseDateTime(date, time)
  if (!parsed) {
    return `${date} • ${time}`
  }
  const weekday = capitalize(weekdayLongFormatter.format(parsed))
  const dateLabel = dateFormatter.format(parsed)
  return `${weekday} • ${dateLabel} • ${formatTimeLabel(time)}`
}

const languageName: Record<string, string> = {
  pt: "Português",
  en: "Inglês",
  es: "Espanhol",
}

export function formatLanguageCode(code: string): string {
  return code.toUpperCase()
}

export function formatLanguageName(code: string): string {
  return languageName[code.toLowerCase()] ?? code
}

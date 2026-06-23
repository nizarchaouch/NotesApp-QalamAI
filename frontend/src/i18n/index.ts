import en from "./en.json"
import ar from "./ar.json"

type NestedMessages = {
  [key: string]: string | NestedMessages
}

function flattenMessages(messages: NestedMessages, prefix = ""): Record<string, string> {
  return Object.entries(messages).reduce<Record<string, string>>((acc, [key, value]) => {
    const id = prefix ? `${prefix}.${key}` : key

    if (typeof value === "string") {
      acc[id] = value
      return acc
    }

    return { ...acc, ...flattenMessages(value, id) }
  }, {})
}

export const messages = {
  en: flattenMessages(en),
  ar: flattenMessages(ar),
}

export const defaultLocale = "en"
export const supportedLocales = ["en", "ar"] as const

export type Locale = keyof typeof messages

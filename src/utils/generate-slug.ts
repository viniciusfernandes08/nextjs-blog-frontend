import slugify from "slugify"
import { generateRandomString } from "./generate-random-string"

export const generateSlug = (text: string): string => {
  const slug = slugify(text, {
    lower: true,
    strict: true,
    trim: true
  })

  return `${slug}-${generateRandomString()}`
}
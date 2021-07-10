import * as types from "../types"

export function getAPIURL(path = ""): string {
  return `${process.env.RULEBOOK_API_URL}/chapters${path}`
}

export async function fetchAPI(path: string, query = ""): Promise<types.Rulebook> {
  const requestUrl = getAPIURL(path) + query
  const response = await fetch(requestUrl)
  return await response.json()
}

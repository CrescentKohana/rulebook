import * as types from "../types"

/**
 * Gets the API URL for rules.
 *
 * @param path
 * @returns API URL as string
 */
export function getAPIURL(path = ""): string {
  const apiURL = process.env.RULEBOOK_API_URL || "http://localhost:5050/api/v1"
  return `${apiURL}${path}`
}

/**
 * Fetches JSON response from the API.
 *
 * @param path
 * @param query
 * @returns JSON response as Rulebook
 */
export async function fetchAPI(path: string, query = ""): Promise<types.Rulebook> {
  const requestUrl = getAPIURL(path) + query
  const response = await fetch(requestUrl)
  return await response.json()
}

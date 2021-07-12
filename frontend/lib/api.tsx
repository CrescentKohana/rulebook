import * as types from "../types"

/**
 * Gets the API URL for rules.
 *
 * @param path
 * @returns API URL as string
 */
function getAPIURL(path = ""): string {
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

/**
 * Sends a JSON POST request to the API.
 *
 * @param path
 * @param body JSON data
 * @returns JSON response
 */
export async function postAPI(path: string, data: { url: string }): Promise<{ code: number; message: string }> {
  const response = await fetch(getAPIURL(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

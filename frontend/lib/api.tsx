import * as types from "../types"

/**
 * Returns the API URL for rules with specified path.
 *
 * @param path
 * @param host  when true, returned format will be http://<only host><path>. Otherwise <full env URL><path>.
 * @returns API URL as string
 */
export function getAPIURL(path = "", host = false): string {
  const urlString = process.env.RULEBOOK_API_URL || "http://localhost:5050/api/v1"
  const url = new URL(urlString)
  url.protocol + "//" + url.host
  return host ? `${url.protocol}//${url.host}${path}` : `${urlString}${path}`
}

/**
 * Fetches JSON response from the backend API.
 *
 * @param path
 * @param query
 * @returns JSON response as Rulebook
 */
export async function fetchAPI(path: string, query = ""): Promise<types.Rulebook | types.Chapter> {
  const requestUrl = getAPIURL(path) + query
  const response = await fetch(requestUrl)
  return await response.json()
}

/**
 * Returns the domain of the site with specified path.
 *
 * @returns Domain as string
 */
export function getDomain(path = ""): string {
  const domain = process.env.RULEBOOK_DOMAIN || "http://localhost:8080"
  return `${domain}${path}`
}

/**
 * Sends a JSON POST request to the middleman API in Next.js.
 *
 * @param path
 * @param body JSON data
 * @returns JSON response
 */
export async function postNextAPI(path: string, data: { url: string }): Promise<{ code: number; message: string }> {
  const response = await fetch(getDomain(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

/**
 * Sends a JSON POST request to the middleman API in Next.js.
 *
 * @param path
 * @param body JSON data
 * @returns JSON response
 */
export async function getNextAPI(path: string): Promise<types.Rulebook> {
  const response = await fetch(getDomain(path))
  return await response.json()
}

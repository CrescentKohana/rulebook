export function getAPIURL(path = '') {
  return `${process.env.RULEBOOK_API_URL}/chapters${path}`
}

export async function fetchAPI(path: string, query = '') {
  const requestUrl = getAPIURL(path) + query
  const response = await fetch(requestUrl)
  return await response.json()
}

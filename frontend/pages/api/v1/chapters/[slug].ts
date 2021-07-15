import type { NextApiRequest, NextApiResponse } from "next"
import { getAPIURL } from "../../../../lib/api"

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === "GET") {
    const response = await fetch(getAPIURL(req.url, true))
    res.status(response.status).json(await response.json())
  }
}

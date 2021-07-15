import type { NextApiRequest, NextApiResponse } from "next"
import { getAPIURL } from "../../../lib/api"

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.url && req.method === "POST") {
    const response = await fetch(getAPIURL(req.url, true), {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    })

    // Possible fix for the rule data not refreshing on the first reload.
    // res.setPreviewData({}, { maxAge: 1 })
    res.status(response.status).json(await response.json())
  } else if (req.url && req.method === "GET") {
    const response = await fetch(getAPIURL(req.url, true))
    res.status(response.status).json(await response.json())
  }
}

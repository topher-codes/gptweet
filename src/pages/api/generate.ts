import type { NextApiResponse, NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetch(`http://localhost:3030/generate`, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const json = await data.text();

    res.status(200).json(json);
  } catch (error: any) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}


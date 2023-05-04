import type { NextApiResponse, NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = await fetch(`http://localhost:3030/generate`, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const json = await data.json();
    res.status(200).json(json);
}


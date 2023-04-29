import type { NextApiResponse, NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const response = await fetch(`https://api.twitter.com/2/users/${id}/tweets`, {
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
  });
  const data = await response.json();
  res.status(200).json(data);
}

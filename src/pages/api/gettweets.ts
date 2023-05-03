import type { NextApiResponse, NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;
  const getID = await fetch(`https://api.twitter.com/2/users/by/username/${username as string}`, {
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN as string}`,
    },
  });
  const idData = await getID.json();
  const id = idData.data.id;  

  const response = await fetch(`https://api.twitter.com/2/users/${id}/tweets`, {
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
  });
  const data = await response.json();
  res.status(200).json(data);
}



/* GO CODE */
/* REQUIRES TO HAVE GO INSTALLED, NAVIGATE TO src/go and run main.go */
/* THIS WILL SPIN UP A GO WEBSERVER AND HANDLE THE REQUESTS */

//export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//  const { username } = req.query;
//  const data = await fetch(`http://localhost:3030/tweets?username=${username as string}`);
//  const json = await data.json();
//  res.status(200).json(json);
//}

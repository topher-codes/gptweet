import type { NextApiResponse, NextApiRequest } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "org-6f5Q76l6Sg0J43Y2K7F3Z0nV",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// GO CODE, DO NOT TOUCH
//export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//  try {
//    const data = await fetch(`http://localhost:3030/generate`, {
//        method: "POST",
//        body: JSON.stringify(req.body),
//        headers: {
//            "Content-Type": "application/json",
//        },
//    });
//
//    const json = await data.json()
//
//    res.status(200).json(json);
//  } catch (error: any) {
//    res.status(500).json({ statusCode: 500, message: error.message });
//  }
//}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // desctructure the "prompt" key from the body of the request
    // this is the prompt that the user has entered
    const { prompt } = req.body;
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });
        const response = completion.data.choices[0]?.message?.content;
        res.status(200).json({ response });

    } catch (error: any) {
        res.status(500).json({ statusCode: 500, message: error.message });
    }


}

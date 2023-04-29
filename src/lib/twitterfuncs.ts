import { Client } from 'twitter-api-sdk';

export const client = new Client(process.env.BEARER_TOKEN as string);

export const getUserIdByUsername = async (username: string) => {
        const response = await client.users.findUserByUsername(username).then((res) => {
          return res.data.json();
        });
}

export const getTweetsByID = async (id: string) => {
  const res = await client.tweets.usersIdTimeline(id);
  const data = res.data.json();
  return data;
}

export const getTweets = async (username: string) => {
    const res = await fetch("/api/gettweets?username=" + username);
    const data = await res.json();
    return data.data;
  };


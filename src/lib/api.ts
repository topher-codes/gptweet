export const getTweets = async (username: string) => {
    const res = await fetch("/api/gettweets?username=" + username);
    const data = await res.json();
    return data.data;
  };

export const generate = async (data: any) => {
    const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({prompt: data}),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await res.text();
    return json;
}


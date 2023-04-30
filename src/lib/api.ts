export const getTweets = async (id) => {
    const res = await fetch("/api/gettweets?id=" + id);
    const data = await res.json();
    return data.data;
  };


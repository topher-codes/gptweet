'use client'
import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import {useState} from "react";


import { api } from "~/utils/api";
import Image from "next/image";


const Home: NextPage = () => {
  const { data: session, status } = useSession();

  const [ twitterUsername, setTwitterUsername ] = useState<string>("");
  const [ twitterID, setTwitterID ] = useState<string>("");
  const [ tweets, setTweets ] = useState<string[]>([]);


  const getID = async () => {
    const res = await fetch("/api/getid?username=" + twitterUsername); 
    const data = await res.json();
    return data.data.id ? data.data.id : "No ID found";
  };

  const showID = async () => {
    const twitterID = await getID();
    setTwitterID(twitterID.toString());
    console.log(twitterID);
  };

  const getTweets = async () => {
    const res = await fetch("/api/gettweets?id=" + twitterID);
    const data = await res.json();
    console.log(data.data)
    setTweets(data.data);
    return data.data;
  };

  return (
    <>
    
      <Head>
        <title>GPTweet</title>
        <meta name="description" content="GPTweet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">GPTweeet</h1>
        
        <p className="mt-3 text-2xl">
          {session ? (
            <>
              Welcome, {session.user.name}!{" "}
              <button
                onClick={() => signOut()}
                className="text-blue-500 underline"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              Not signed in{" "}
              <button
                onClick={() => signIn()}
                className="text-blue-500 underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
        {session && (
          <>
            <p className="mt-3 text-2xl">
              Your User ID is {session.user.id}
            </p>
            <p className="mt-3 text-2xl">
              Your Twitter username is {session.user.name}
            </p>
            <p className="mt-3 text-2xl">
              Your Twitter email is {session.user.email}
            </p>
            <p className="mt-3 text-2xl">
              Your Twitter image is <Image src={session.user.image} width={50} height={50} alt="img" />
            </p>
            <p className="my-4">
              Let's grab your Twitter ID so we can fetch tweets!
              <br />
              <input className="border-4" type="text" placeholder="twitter username" value={twitterUsername} onChange={(e) => setTwitterUsername(e.target.value)} />
              <button className="border-2 border-black rounded-md mx-2" onClick={showID}>Show ID</button>
              <button className="border-2 border-black rounded-md mx-2" onClick={getTweets}>Get Tweets</button>
            </p>
            {/* Create a div to display tweets */}
            <div className="flex flex-col">
              <p className="text-2xl">Tweets</p>
              <div className="flex flex-col">
                {tweets.map((tweet) => (
                  <div key={tweet.id} className="my-2 py-4 border-4 border-black rounded-md">
                    <p  className="text-xl">{tweet.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </>
        )}
      </main>
    </>
  );
};

export default Home;

'use client'
import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import {useState} from "react";


import { api } from "~/utils/api";


const Home: NextPage = () => {
  const { data: session, status } = useSession();

  const [ twitterID, setTwitterID ] = useState<string>("");

  const getTweets = async () => {
    const res = await fetch("/api/twitter?username=" + twitterID); 
    const data = await res.json();
    return data.data.id ? data.data.id : "No ID found";
  };

  const showID = async () => {
    const twitterID = await getTweets();
    console.log(twitterID);
  };


  return (
    <>
    
      <Head>
        <title>GPTweet</title>
        <meta name="description" content="GPTweet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-full flex-1 flex-col items-center justify-center px-20 text-center">
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
              Your Twitter image is {session.user.image}
            </p>
            <p>
              Let's grab your Twitter ID so we can fetch tweets!
              <br />
              <input className="border-4" type="text" placeholder="twitter username" value={twitterID} onChange={(e) => setTwitterID(e.target.value)} />
              <button onClick={showID}>Show ID</button>
            </p>
          </>
        )}
      </main>
    </>
  );
};

export default Home;

'use client'
import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import {useState, useEffect, useReducer} from "react";
import {ACTIONS, reducer} from "../hooks/reducer"
import TweetsContainer from "~/components/tweets";


import { api } from "~/utils/api";
import Image from "next/image";


const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [state, dispatch] = useReducer(reducer, {})

  const [ tweets, setTweets ] = useState<string[]>([]);
  const [ cleanedTweets, setCleanedTweets ] = useState<string[]>([]);

  console.log(state.twitterUsername)
  const getID = async () => {
    const res = await fetch("/api/getid?username=" + state.twitterUsername); 
    const data = await res.json();
    return data.data.id ? data.data.id : "No ID found";
  };

  const showID = async () => {
    
    const IdData = await getID(); 
    dispatch({type: ACTIONS.UPDATE_TWITTER_ID, 
      payload: {
      twitterID: IdData.toString(),
    }})
    console.log(state.twitterID);
  };

  const getTweets = async () => {
    const res = await fetch("/api/gettweets?id=" + state.twitterID);
    const data = await res.json();
    console.log(data.data)
    setTweets(data.data);
    return data.data;
  };

  // Add a useEffect hook to iterate through the tweets array and push only the text to the cleanedTweets array.
  useEffect(() => {
    for (const tweet of tweets) {
      setCleanedTweets((cleanedTweets) => [...cleanedTweets, tweet.text]);
    }
  }, [tweets]);

 /* form submission skeleton to prevent re-renders */
  const handleSubmit = (e) => {
    e.preventDefault()
    const usernameFieldInput = e.target.userNameField.value;

    if (usernameFieldInput.trim() === "" ) return;

    /*
    dispatch({
                  type: ACTIONS.UPDATE_TWITTER_USERNAME,
                payload: {
                  twitterUsername: usernameFieldInput,
                }})
    */
  }



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
            <form className="my-4">
              Let's grab your Twitter ID so we can fetch tweets!
              <br />

              { /* 
              figure out function order to change event handler from on change to onsubmit, and create input and other checks
               */
              }
              <input className="border-4" type="text" placeholder="twitter username" id="userNameField"
              value={state.twitterUsername} 
              /* onChange to be replaced */
              onChange={
                (e) => dispatch({
                  type: ACTIONS.UPDATE_TWITTER_USERNAME,
                payload: {
                  twitterUsername: e.target.value,
                }})
              } 
              />
              <button type="button" className="border-2 border-black rounded-md mx-2" onClick={showID}>Show ID</button>
              <button type="button" className="border-2 border-black rounded-md mx-2" onClick={getTweets}>Get Tweets</button>
            </form>
            {/* Create a div to display tweets */}
            <div className="flex flex-col">
              <p className="text-2xl">Tweets</p>
              <div className="flex flex-col">
                <TweetsContainer tweets={cleanedTweets} />
              </div>
            </div>

          </>
        )}
      </main>
    </>
  );
};

export default Home;
/* eddy_ontiveros8 */
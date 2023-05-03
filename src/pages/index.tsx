'use client'
import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import {useState, useEffect, useReducer} from "react";
import {ACTIONS, reducer} from "../hooks/reducer"
import TweetsContainer from "~/components/tweets";

import {getTweets} from "~/lib/api";
import Image from "next/image";
import OptionsForm from "~/components/OptionsForm/OptionsForm";


const Home: NextPage = () => {
  const { data: session, status } = useSession();
  /* placeholder obj, will create lazyInit function to clean state*/
  const [state, dispatch] = useReducer(reducer, 
    {tweets: [], cleanedTweets: []}
    )


  
    /* lib api for reference */
  const setTheTweets = async () => {
    const tweetsData = await getTweets(state.twitterUsername);
    dispatch({
      type: ACTIONS.GET_TWEETS,
      payload: {
        tweets: tweetsData,
      } 
    })
  }

  // Add a useEffect hook to iterate through the tweets array and push only the text to the cleanedTweets array.
  useEffect(() => {
    for (const tweet of state.tweets) {
      dispatch({
        type: ACTIONS.CLEANED_TWEETS, 
      payload: {
        cleanedTweets: tweet.text
      }});
    }
  }, [state.tweets]);


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
              <button type="button" className="border-2 border-black rounded-md mx-2" onClick={setTheTweets}>Get Tweets</button>
            </form>
            {/* Create a div to display tweets */}
            <div className="flex flex-col">
              <p className="text-2xl">Tweets</p>
              <div className="flex flex-col">
                {/* this should be conditional rendering later on. */}
                <OptionsForm />
                <TweetsContainer tweets={state.cleanedTweets} />
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

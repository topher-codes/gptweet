import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";


const Home: NextPage = () => {
  const { data: session, status } = useSession();


  return (
    <>
    
      <Head>
        <title>GPTweet</title>
        <meta name="description" content="GPTweet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">GPTweeet</h1>
            <h2 className="text-6xl font-bold">Welcome!</h2>
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
              Your Twitter ID is {session.user.id}
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
          </>
        )}
      </main>
    </>
  );
};

export default Home;

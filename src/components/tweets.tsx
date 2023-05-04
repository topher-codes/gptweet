
const TweetsContainer = ({ tweets }: { tweets: string[] }) => {


  function removeAtMentions(string: string) {
  // Remove all of the words that start with the "@" character.
  return string.replace(/@\w+/g, "");
}

function removeLinks(string: string) {
  // Remove all links from the end of the string (words that begin with "http").
  return string.replace(/https?:\/\/[^\s]+$/g, "");
}

function removeHashtags(string: string) {
  // Remove all hashtags from the string (words that begin with "#").
  return string.replace(/#\w+/g, "");
}


interface TweetObject {
    text: string;
    selected: boolean;
}
function createTweetsObject(tweets: string[]) {
  // Create an object that contains the tweets, with each tweet as a key-value pair.
  const newTweets: TweetObject[] = [];
  for (const tweet of tweets) {
    
    const cleanTweet = removeAtMentions(removeLinks(removeHashtags(tweet)));
    const tweetObject = {
        text: cleanTweet,
        selected: true,
    }
    newTweets.push(tweetObject);
  }
  return newTweets;
}

const newTweets = createTweetsObject(tweets);

const tweetPrompt = []
tweetPrompt.push("This is your task: You are an AI model that is going to take in a string of tweets, seperated by the ';' character. You will create a conversation based on the tweets. It should represent a story of some kind. You will then return the conversation as a string. You can use any of the tweets, and you can use them in any order. The tweets start here: ")

for (const tweet of newTweets) {
  if (tweet.selected) {
    tweetPrompt.push(tweet.text);
  }
}

const tweetPromptString = tweetPrompt.join(";");



  return (
    <div className="tweets-container">
      {newTweets.map((tweet, index) => {
        return (
          <div className="tweet border border-black my-4" key={index}>
            <p>{tweet.text}</p>
            <input type="checkbox" checked={tweet.selected} />
          </div>
        );
      })
      }
      </div>
  );
};

export default TweetsContainer;

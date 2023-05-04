
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

package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"os"

	openai "github.com/sashabaranov/go-openai"

	"github.com/michimani/gotwi"
	"github.com/michimani/gotwi/fields"
	"github.com/michimani/gotwi/resources"
	"github.com/michimani/gotwi/tweet/timeline"
	tlt "github.com/michimani/gotwi/tweet/timeline/types"

	"github.com/michimani/gotwi/user/userlookup"
	"github.com/michimani/gotwi/user/userlookup/types"
)

// The User and Tweet structs are used to help with refactoring
type User struct {
    ID string `json:"id"`
    Name string `json:"name"`
}

type TweetList struct {
    Data []Tweet `json:"data"`
}


// Get the User by username
func getUser (username string, c *gotwi.Client) (User, error) {
    p := &types.GetByUsernameInput{
        Username: username,
    }

    u, err := userlookup.GetByUsername(context.Background(), c, p)
    if err != nil {
        return User{}, err
    }

    return User{
        ID: gotwi.StringValue(u.Data.ID),
        Name: gotwi.StringValue(u.Data.Name),
    }, nil
}


type Tweet struct {
    Text string `json:"text"`
    AuthorID string `json:"author_id"`
    Hashtags []resources.TweetEntityTag `json:"hashtags"`
    Mentions []resources.TweetEntityTag `json:"mentions"`
}


// Get the Tweets by user ID
func getTweets (user User, c *gotwi.Client) (TweetList, error) {
    input := &tlt.ListTweetsInput{
        ID: user.ID,
        TweetFields: fields.TweetFieldList{
            fields.TweetFieldCreatedAt,
            fields.TweetFieldText,
            fields.TweetFieldAuthorID,
            fields.TweetFieldReferencedTweets,
            fields.TweetFieldEntities,
        },
        MaxResults: 20,
    }

    p2, err := timeline.ListTweets(context.Background(), c, input)
    if err != nil {
        return TweetList{}, err
    }

    var tweets []Tweet
    for _, t := range p2.Data {
        tweets = append(tweets, Tweet{
            Text: gotwi.StringValue(t.Text),
            AuthorID: gotwi.StringValue(t.AuthorID),
            Hashtags: t.Entities.HashTags,
            Mentions: t.Entities.Mentions,
        })
    }

    return TweetList{
        Data: tweets,
    }, nil
}




func main() {
    // Create Twitter Client
    c, err := gotwi.NewClient(&gotwi.NewClientInput{
        AuthenticationMethod: gotwi.AuthenMethodOAuth2BearerToken,
    })
    if err != nil {
        fmt.Println(err)
        return
    }

    // Create OpenAI Client
    aic := openai.NewClient(os.Getenv("OPENAI_API_KEY"))
    ctx := context.Background()

    // Http handler for the /generate endpoint
    http.HandleFunc("/generate", func(w http.ResponseWriter, r *http.Request) {
        // Get the prompt from the QueryString
        data, err := ioutil.ReadAll(r.Body)
        if err != nil {
            fmt.Println(err)
            return
        }

        // The body is a JSON object with a "prompt" key
        var objmap map[string]string
        json.Unmarshal(data, &objmap)
        prompt := objmap["prompt"]



        // Create the request
        req := openai.CompletionRequest{
            Model: openai.GPT3TextDavinci003,
            MaxTokens: 300,
            Prompt: prompt,
        }

        // Send the request
        resp, err := aic.CreateCompletion(ctx, req)
        if err != nil {
            fmt.Println(err)
            return
        }

        // Write the response
        w.Header().Set("Content-Type", "application/json")
        w.Write([]byte(resp.Choices[0].Text))
    })



    // Http handler for the /tweets endpoint
    http.HandleFunc("/tweets", func(w http.ResponseWriter, r *http.Request) {
        // Get the username from the QueryString
        username := r.URL.Query().Get("username")

        user, err := getUser(username, c)
        if err != nil {
            fmt.Println(err)
            return
        }

        tweets, err := getTweets(user, c)
        if err != nil {
            fmt.Println(err)
            return
        }

        // Convert the tweets to JSON
        js, err := json.Marshal(tweets)
        if err != nil {
            fmt.Println(err)
            return
        }

        // Write the JSON as the response
        w.Header().Set("Content-Type", "application/json")
        w.Write(js)

    })

    log.Fatal(http.ListenAndServe(":3030", nil))
    
}


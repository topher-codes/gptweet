package main

import (
    "fmt"
    "context"

    "github.com/michimani/gotwi"
    "github.com/michimani/gotwi/fields"
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

type Tweet struct {
    Text string `json:"text"`
    AuthorID string `json:"author_id"`

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


// Get the Tweets by user ID
func getTweets (user User, c *gotwi.Client) (TweetList, error) {
    var results tlt.ListMaxResults
    fmt.Print("Enter number of tweets to retrieve: ")
    fmt.Scan(&results)
    input := &tlt.ListTweetsInput{
        ID: user.ID,
        TweetFields: fields.TweetFieldList{
            fields.TweetFieldCreatedAt,
            fields.TweetFieldText,
            fields.TweetFieldAuthorID,
        },
        MaxResults: results,
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
        })
    }

    return TweetList{
        Data: tweets,
    }, nil
}




func main() {
    c, err := gotwi.NewClient(&gotwi.NewClientInput{
        AuthenticationMethod: gotwi.AuthenMethodOAuth2BearerToken,
    })
    if err != nil {
        fmt.Println(err)
        return
    }

    // Prompt user to enter username and store in variable
    var username string
    fmt.Print("Enter username: ")
    fmt.Scan(&username)




    u, err := getUser(username, c)
    if err != nil {
        fmt.Println(err)
        return
    }

    t, err := getTweets(u, c)
    if err != nil {
        fmt.Println(err)
        return
    }

    for i, tweet := range t.Data {
        fmt.Println(i, tweet.Text)
    }


}


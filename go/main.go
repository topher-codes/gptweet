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



func main() {
    c, err := gotwi.NewClient(&gotwi.NewClientInput{
        AuthenticationMethod: gotwi.AuthenMethodOAuth2BearerToken,
    })
    if err != nil {
        fmt.Println(err)
        return
    }

    p := &types.GetByUsernameInput{
        Username: "503dev",
    }

    u, err := userlookup.GetByUsername(context.Background(), c, p)
    if err != nil {
        fmt.Println(err)
        return
    }

        fmt.Println("ID: ", gotwi.StringValue(u.Data.ID))
        fmt.Println("Name: ", gotwi.StringValue(u.Data.Name))

    //List tweets input

    input := &tlt.ListTweetsInput{
        ID: gotwi.StringValue(u.Data.ID),
        TweetFields: fields.TweetFieldList{
            fields.TweetFieldCreatedAt,
            fields.TweetFieldText,
            fields.TweetFieldAuthorID,
        },
    }



    p2, err := timeline.ListTweets(context.Background(), c, input)
    if err != nil {
        fmt.Println(err)
        return
    }

    for _, t := range p2.Data {
        fmt.Println("Text: ", gotwi.StringValue(t.Text))
        fmt.Println("AuthorID: ", gotwi.StringValue(t.AuthorID))
    }

        

}


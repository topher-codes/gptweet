package main

import (
    "fmt"
    "context"

    "github.com/michimani/gotwi"

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


}


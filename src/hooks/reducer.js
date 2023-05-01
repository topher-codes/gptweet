export const ACTIONS = {
    UPDATE_TWITTER_USERNAME: "UPDATE_TWITTER_USERNAME",
    UPDATE_TWITTER_ID: "UPDATE_TWITTER_ID",
    GET_TWEETS: "GET_TWEETS",
    CLEANED_TWEETS: "CLEANED_TWEETS",
}

export function reducer(state, action) {

    switch(action.type) {
        case ACTIONS.UPDATE_TWITTER_USERNAME:
            return {...state, twitterUsername: action.payload.twitterUsername};
        case ACTIONS.UPDATE_TWITTER_ID:
            return {...state, twitterID: action.payload.twitterID};
        case ACTIONS.GET_TWEETS:
            return {...state, tweets: action.payload.tweets};
        case ACTIONS.CLEANED_TWEETS:
            return {state, cleanedTweets: action.payload.cleanedTweets}
    }
}
export const ACTIONS = {
    UPDATE_TWITTER_USERNAME: "UPDATE_TWITTER_USERNAME",
    UPDATE_TWITTER_ID: "UPDATE_TWITTER_ID"
}

export function reducer(state, action) {

    switch(action.type) {
        case ACTIONS.UPDATE_TWITTER_USERNAME:
            return {...state, twitterUsername: action.payload.twitterUsername};
        case ACTIONS.UPDATE_TWITTER_ID:
            return {...state, twitterID: action.payload.twitterID}
    }
}
import styles from "./OptionsForm.module.css";
import { useState } from "react";

export default function OptionsForm() {

    const [isMentionsChecked, setIsMentionsChecked] = useState(false);
    const [includeHashtags, setIncludeHashtags] = useState(false);
    const [includeLinks, setIncludeLinks] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();


        /* 
        still needs input checking and all that jazz, default values, etc. 
        */

        const options = {
            dateStart: e.target.dateStart.value,
            dateEnd: e.target.dateEnd.value,

            tweetQuantity: e.target.tweetQuantity.value,
            mentions: isMentionsChecked,
            hashtags: includeHashtags,
            links: includeLinks,
        }

        /* just send options to where it's needed :D */


        /* will clean the form after that and add functionality as we progess but it's enough to work with
         */
    }

    return (
        <form onSubmit={handleSubmit} className={styles.options}>
            <h2>Options: </h2>
            <div className={styles.options__date_range_container}>
                <label htmlFor="from">From:</label>
                <input type="date" id="from" name="dateStart" />
                <label htmlFor="to">To:</label>
                <input type="date" id="to" name="dateEnd" />
            </div>
            <label htmlFor="quantity">How many tweets?</label>
            <input type="number" id="quantity" name="tweetQuantity" />
            <label htmlFor="mentions">Include mentions</label>
            <input type="checkbox" id="mentions" onClick={
                () => setIsMentionsChecked(!isMentionsChecked)
            } />
            <label htmlFor="hashtags">Include Hashtags</label>
            <input type="checkbox" id="hashtags" onClick={
                () => setIncludeHashtags(!includeHashtags)
            } />
            <label htmlFor="links">Include Links</label>
            <input type="checkbox" id="links" onClick={
                () => setIncludeLinks(!includeLinks)
            } />
            <button className={styles.options_button}>Submit</button>
        </form>
    );
}
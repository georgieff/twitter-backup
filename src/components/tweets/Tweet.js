import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Tweet = ({tweet}) => {
    return (
        <div className="tweet">
            <img src={tweet.user.profile_image_url} alt="" />
            <div className="float-right text-right">
                {tweet.user.name}<br/>
                <a href={`https://twitter.com/${tweet.user.screen_name}`} target="_blank">@{tweet.user.screen_name}</a>
            </div>
            <p>{tweet.text} </p>
            <span>{moment(tweet.created_at).fromNow()}</span>
        </div>
    );
};

Tweet.propTypes = {
    tweet: PropTypes.object.isRequired
};

export default Tweet;

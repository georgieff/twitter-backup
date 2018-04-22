import React from 'react';
import PropTypes from 'prop-types';
import Tweet from './Tweet';

const TweetList = ({tweets, saved, onSave, onRemove}) => {
    return (
        <div>
            {tweets.map(tweet =>
                <div key={tweet.id_str} className="info-box -shadow clearfix">
                    <Tweet tweet={tweet} saveTweet={onSave} />
                    {onSave && <a href="#" className="button button-small float-right" onClick={(e) => onSave(e, tweet)}>save</a>}
                    {onRemove && <a href="#" className="button button-small float-right" onClick={(e) => onRemove(e, tweet)}>remove</a>}
                </div>
            )}
        </div>
    );
};

TweetList.propTypes = {
    tweets: PropTypes.array.isRequired,
    saved: PropTypes.bool,
    onSave: PropTypes.func,
    onRemove: PropTypes.func
};

export default TweetList;
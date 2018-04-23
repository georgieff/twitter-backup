import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, Section, Row, Column} from '../common/Grid';
import * as tweetsActions from '../../actions/tweetsActions';
import * as savedTweetsActions from '../../actions/savedTweetsActions';
import * as usersActions from '../../actions/usersActions';
import TweetsList from './TweetsList';
import UserBox from '../users/UserBox';

class TweetContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.saveTweet = this.saveTweet.bind(this);
        this.removeSavedTweet = this.removeSavedTweet.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.loadMoreTweets = this.loadMoreTweets.bind(this);
    }

    componentWillMount() {
        this.props.actions.loadTweets();
        this.props.actions.loadSavedTweets();
    }

    saveTweet(event, tweet) {
        event.preventDefault();
        this.props.actions.addSavedTweet(tweet);
    }

    loadMoreTweets(event) {
        event.preventDefault();
        this.props.actions.loadMoreTweets();
    }

    removeSavedTweet(event, tweet) {
        event.preventDefault();
        this.props.actions.removeSavedTweet(tweet);
    }

    logoutUser(event) {
        event.preventDefault();
        this.props.actions.logoutUser(this.props.user);
        this.props.actions.clearTweets();
        this.props.actions.clearSavedTweets();
    }

    render() {
        return (
            <Section>
                <Container>
                    <Row>
                        <Column className="column-66">
                            <h2>Tweets {this.props.tweets.length > 0  && `(${this.props.tweets.length})`}</h2>
                            <TweetsList tweets={this.props.tweets} onSave={this.saveTweet}  saved={false} />
                            <div className="text-center">
                                {this.props.tweets.length > 0  &&
                                <a href="#" onClick={this.loadMoreTweets} className="button">Load more</a>}
                            </div>
                        </Column>
                        <Column className="column-33">
                            <h2>You</h2>
                            <UserBox user={this.props.user} onLogout={this.logoutUser} />
                            <h2>Saved tweets  {this.props.savedTweets.length > 0 && `(${this.props.savedTweets.length})`}</h2>
                            <TweetsList tweets={this.props.savedTweets} onRemove={this.removeSavedTweet} saved />
                        </Column>
                    </Row>
                </Container>
            </Section>
        );
    }
}

TweetContainer.propTypes = {
    tweets: PropTypes.array.isRequired,
    savedTweets: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        tweets: state.tweets,
        savedTweets: state.savedTweets
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, tweetsActions, savedTweetsActions, usersActions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetContainer);

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
import Preloader from '../common/Preloader';
import toastr from 'toastr';

class TweetContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            saving: false,
            removing: false,
            logouting: false,
            loadingmore: false
        };

        this.saveTweet = this.saveTweet.bind(this);
        this.removeSavedTweet = this.removeSavedTweet.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.loadMoreTweets = this.loadMoreTweets.bind(this);
        this.retweet = this.retweet.bind(this);
    }

    componentWillMount() {
        this.props.actions.loadTweets().catch(error => {
            this._handleError(error);
        });
        this.props.actions.loadSavedTweets();
    }

    saveTweet(event, tweet) {
        event.preventDefault();
        this.setState({saving: true});
        this.props.actions.addSavedTweet(tweet).then(() => {
            this.setState({saving: false});
            toastr.success('Tweet saved');
        }).catch(error => {
            toastr.error(error);
        });
    }

    loadMoreTweets(event) {
        event.preventDefault();
        this.setState({loadingmore: true});
        this.props.actions.loadMoreTweets().then(() => {
            this.setState({loadingmore: false});
        }).catch(error => {
            this._handleError(error);
        });
    }


    retweet(event, tweet) {
        event.preventDefault();
        this.props.actions.retweetSavedTweet(tweet).then((res) => {
            toastr.success('Retweeted!');
        }).catch(error => {
            if(error.status === 401) {
                toastr.error(error.data.message);
                this._logoutAction();
            } else {
                toastr.error('Something went wrong. Please try again later');
            }
        });
    }

    removeSavedTweet(event, tweet) {
        event.preventDefault();
        this.props.actions.removeSavedTweet(tweet).then(() => {
            toastr.info('Tweet removed');
        }).catch(error => {
            this._handleError(error);
        });
    }

    logoutUser(event) {
        event.preventDefault();
        this._logoutAction();
    }

    _logoutAction() {
        this.setState({logouting: true});
        this.props.actions.logoutUser(this.props.user).then(() => {
            this.props.actions.clearTweets();
            this.props.actions.clearSavedTweets();
        });
    }

    _handleError(error) {
        if(error.status === 401) {
            toastr.error(error.data.message);
            this._logoutAction();
        } else {
            this._handleError(error);
        }
    }

    render() {
        const tweetsCount = this.props.tweets.length;
        const savedTweetsCount = this.props.savedTweets.length;
        return (
            <Section>
                <Container>
                    <Row>
                        <Column className="column-66">
                            <h2>Tweets {tweetsCount > 0  && `(${tweetsCount})`}</h2>
                            <TweetsList tweets={this.props.tweets} onSave={this.saveTweet}  saved={false} />
                            <div className="text-center">
                                {tweetsCount > 0 ?
                                <a href="#" onClick={this.loadMoreTweets} className="button" disabled={this.state.loadingmore}>
                                    {this.state.loadingmore ? <Preloader color="#fff" /> : 'Load more'}
                                </a> :
                                <Preloader />}
                            </div>
                        </Column>
                        <Column className="column-33">
                            <h2>You</h2>
                            <UserBox user={this.props.user} onLogout={this.logoutUser} logouting={this.state.logouting} />
                            <h2>Saved tweets  {savedTweetsCount > 0 && `(${savedTweetsCount})`}</h2>
                            <TweetsList tweets={this.props.savedTweets} onRemove={this.removeSavedTweet} onRetweet={this.retweet} saved />
                            {savedTweetsCount === 0 && <Preloader />}
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

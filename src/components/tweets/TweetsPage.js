import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usersActions from '../../actions/usersActions';
import TweetContainer from './TweetContainer';
import AuthContainer from './AuthContainer';
import Preloader from '../common/Preloader';
import {Section} from '../common/Grid';

class TweetsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: true
        };
    }

    componentWillMount() {
        this.props.actions.loadUser()
            .then()
            .catch(err=> {})
            .then(() => {
                this.setState({loading: false});
            });
    }

    render() {
        return (
            <div>
                {this.state.loading ?
                (
                    <Section className="-login">
                        <Preloader />
                    </Section>
                )
                :
                (
                    this.props.user.id ?
                    (    <TweetContainer user={this.props.user} /> )
                    :
                    (    <AuthContainer /> )
                )
                }
            </div>
        );
    }
}

TweetsPage.propTypes = {
    user: PropTypes.object,
    actions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(usersActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetsPage);

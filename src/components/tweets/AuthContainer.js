/*eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usersActions from '../../actions/usersActions';

import TwitterLogin from 'react-twitter-auth';
import TweetsList from './TweetsList';
import {Section} from '../common/Grid';

class AuthContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onSuccess = this.onSuccess.bind(this);
        this.onFailed = this.onFailed.bind(this);
    }

    onSuccess(response) {
        const token = response.headers.get('x-auth-token');
        response.json().then((user) => {
        if (token) {
            const { id, username, displayName, photos } = user;
            this.props.actions.authUser({ id, username, displayName, photos, token } );
        }
        });
    }

    onFailed(error) {
        console.log(error);
    }

    render() {
        return (
            <Section className="-login">
                <div className="login-box text-center">
                    <h1>Login</h1>
                    <h4>in order to see your tweets</h4>
                    <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
                      onFailure={this.onFailed} onSuccess={this.onSuccess}
                      requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"/>
                </div>
            </Section>
        );
    }
}

AuthContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, usersActions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usersActions from '../../actions/usersActions';

import TwitterLogin from 'react-twitter-auth';
import TweetsList from './TweetsList';
import {Section} from '../common/Grid';
import Preloader from '../common/Preloader';
import toastr from 'toastr';

import envConfig from '../../config';

class AuthContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: false
        };

        this.onSuccess = this.onSuccess.bind(this);
        this.onFailed = this.onFailed.bind(this);
    }

    onSuccess(response) {
        this.setState({loading: true});
        const token = response.headers.get('x-auth-token');
        response.json().then((user) => {
            if (token) {
                toastr.success('Successful login');
                const { id, username, displayName, photos } = user;
                this.props.actions.authUser({ id, username, displayName, photos, token } );
            }
        });
    }

    onFailed(error) {
        toastr.error('Unsuccessful login. Try again later');
    }

    render() {
        return (
            <Section className="-login">
                <div className="login-box text-center">
                    <h1>Login</h1>
                    <h4>in order to see your tweets</h4>

                    {this.state.loading ? <Preloader /> :
                    <TwitterLogin
                        loginUrl={`${envConfig.LOGIN_URL}`}
                        onFailure={this.onFailed}
                        onSuccess={this.onSuccess}
                        onClick={this.onAttempt}
                        requestTokenUrl={`${envConfig.REQUEST_TOKEN}`}/>
                    }
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

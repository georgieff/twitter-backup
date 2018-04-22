import React from 'react';
import PropTypes from 'prop-types';

const UserBox = ({user, onLogout}) => {
    return (
        <div className="info-box clearfix -shadow">
            <img src={user.photos[0].value} alt="" className="float-right" />
            <strong>{user.username}</strong>
            <h5>{user.displayName}</h5>
            <a href="#" onClick={onLogout} className="button button-small button-outline float-right">logout</a>
        </div>
    );
};

UserBox.propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default UserBox;

import React from 'react';
import PropTypes from 'prop-types';
import Preloader from '../common/Preloader';

const UserBox = ({user, onLogout, logouting}) => {
    return (
        <div className="info-box clearfix -shadow">
            <img src={user.photos[0].value} alt="" className="float-right" />
            <strong>{user.username}</strong>
            <h5>{user.displayName}</h5>
            <a href="#" onClick={onLogout} className="button button-small button-outline float-right" disabled={logouting}>
            {logouting ? <Preloader size="6"/> : 'logout'}
            </a>
        </div>
    );
};

UserBox.propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
    logouting: PropTypes.bool.isRequired
};

export default UserBox;


import React from 'react';
import PropTypes from 'prop-types';
import {Pop} from 'react-preloading-component';

const Preloader = ({color, size}) => {
    return (
        <Pop color={color || '#9b4dca'} size={parseInt(size) || 8} />
    );
};

Preloader.propTypes = {
    color: PropTypes.string,
    size: PropTypes.int
};

export default Preloader;


import React from 'react';
import {Pop} from 'react-preloading-component';

const Preloader = ({color, size}) => {
    return (
        <Pop color={color || '#9b4dca'} size={parseInt(size) || 8} />
    );
};

export default Preloader;

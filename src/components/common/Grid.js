import React from 'react';
import PropTypes from 'prop-types';

const Section = (props) => {
    return (
        <section className={'section ' + props.className}>
            {props.children}
        </section>
    );
};

Section.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

const Container = (props) => {
    return (
        <div className={'container ' + props.className}>
            {props.children}
        </div>
    );
};

Container.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string

};

const Row = (props) => {
    return (
        <div className={'row ' + props.className}>
            {props.children}
        </div>
    );
};

Row.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

const Column = (props) => {
    return (
        <div className={'column ' + props.className}>
            {props.children}
        </div>
    );
};

Column.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string

};

export {Section, Container, Row, Column};

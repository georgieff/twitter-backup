import React from 'react';
import PropTypes from 'prop-types';
import {Link, IndexLink} from 'react-router';
import {Container} from '../common/Grid';

const Footer = () => (
    <footer>
        <Container className="clearfix">
            <nav className="float-right">
                <IndexLink to="/" activeClassName="active">home</IndexLink>
                {" | "}
                <Link to="/tweets" activeClassName="active">tweets</Link>
            </nav>
        </Container>
    </footer>
);

export default Footer;

import React from 'react';
import PropTypes from 'prop-types';
import {Link, IndexLink} from 'react-router';
import {Container} from '../common/Grid';

const Header = () => (
    <header>
        <Container className="clearfix">
            <Link to="/" className="logo">Twitter<mark>Backup</mark></Link>
            <nav className="float-right">
                <IndexLink to="/" activeClassName="active">home</IndexLink>
                {" | "}
                <Link to="/tweets" activeClassName="active">tweets</Link>
            </nav>
        </Container>
    </header>
);

export default Header;

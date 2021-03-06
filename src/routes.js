import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import TweetsPage from './components/tweets/TweetsPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="twitter-backup" component={HomePage} />
        <Route path="tweets" component={TweetsPage} />
    </Route>
);

const BASE_SERVICE = 'http://localhost:4000/api/v1/';

const config = {
    PUBLIC_URL: 'http://localhost:3000/',
    BASE_SERVICE: `${BASE_SERVICE}`,
    LOGIN_URL: `${BASE_SERVICE}auth/twitter`,
    REQUEST_TOKEN: `${BASE_SERVICE}auth/twitter/reverse`,
    GET_TWEETS: `${BASE_SERVICE}gettweets`,
    RETWEET: `${BASE_SERVICE}retweet`
};

export default config;

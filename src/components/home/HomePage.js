import React from 'react';
import {Link} from 'react-router';
import {Section, Container, Row, Column} from '../common/Grid';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Section className="-hero">
                    <Container>
                        <h1>Save your favorite tweets</h1>
                        <h4>for later</h4>
                        <Link to="/tweets" className="button button-large button-white button-outline">Start now</Link>
                    </Container>
                </Section>
                <Section className="-marketing">
                    <Container>
                        <h2 className="text-center">Easy to use</h2>
                        <Row className="move-down">
                            <Column className="column-33 text-center">
                                <img src="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-lock.svg" alt="" />
                                <h3>Log in</h3>
                                <p>Easy login using your Twitter account.</p>
                            </Column>
                            <Column className="column-33 text-center">
                                <img src="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-clipboard-notes.svg" alt="" />
                                <h3>Choose tweets</h3>
                                <p>Pick your favorite tweets and save them.</p>
                            </Column>
                            <Column className="column-33 text-center">
                                <img src="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-social-twitter.svg" alt="" />
                                <h3>Retweet!</h3>
                                <p>Some valuable marketing text.</p>
                            </Column>
                        </Row>
                    </Container>
                </Section>
                <Section className="-marketing text-center">
                    <Container>
                        <h2>The title that will make you click this button</h2>
                        <p>Some less interesting text but still needed</p>
                        <Link to="/tweets" className="button">Start now</Link>
                    </Container>
                </Section>
            </div>
        );
    }
}

export default HomePage;

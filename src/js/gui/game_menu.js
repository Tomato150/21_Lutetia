import React, {Component} from 'react';
import {Button, Header, Icon, Grid, Segment, Sidebar} from 'semantic-ui-react';
// import PropTypes from 'prop-types';


export default class GameMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: true};
        this.changeVisibility = this.changeVisibility.bind(this);
    }

    changeVisibility() {
        this.setState({visible: !this.state.visible});
    }

    render() {
        const {children} = this.props;
        const {visible} = this.state;
        const style = {
            position: 'fixed',
            overflow: 'hidden'
        };

        return (
            <div style={style}>
                <Button
                    onClick={this.changeVisibility}
                    style={{
                        position: 'fixed',
                        bottom: '10px',
                        right: '10px',
                        zIndex: '1'
                    }}
                >
                    Open side menu
                </Button>
                <Sidebar.Pushable
                    style={{
                        padding: 0
                    }}
                >
                    <Sidebar
                        style={{
                            margin: '20px'
                        }}
                        as={Segment}
                        animation='overlay'
                        visible={visible}
                        icon='labeled'
                        width="very wide"
                        inverted
                    >
                        <Segment attached="top" clearing>
                            <Header as="h1" floated="left">!STATION_NAME</Header>
                            <Header as="h5" floated="right">!COORDS (XX, YY)</Header>
                        </Segment>
                        <Grid
                            as={Segment}
                            attached
                            divided
                        >
                            <Grid.Row columns>
                                <Grid.Column width={8}>
                                    Test Col 1: (Width 8)
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    Test Col 2: (Width 8)
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    Test Row 2
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Sidebar>
                    <Sidebar.Pusher>
                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}
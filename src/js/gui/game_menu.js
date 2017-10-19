import React, {Component} from 'react';
import {Button, Icon, Menu, Segment, Sidebar} from 'semantic-ui-react';
// import PropTypes from 'prop-types';


export default class GameMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: false};
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
                        left: '10px',
                        top: '10px',
                        'z-index': '1'
                    }}
                >
                    Baby alert here
                </Button>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='push'
                        width='thin'
                        visible={visible}
                        icon='labeled'
                        vertical inverted
                    >
                        <Menu.Item name='home'>
                            <Icon name='home'/>
                            Home
                        </Menu.Item>
                        <Menu.Item name='gamepad'>
                            <Icon name='gamepad'/>
                            Games
                        </Menu.Item>
                        <Menu.Item name='camera'>
                            <Icon name='camera'/>
                            Channels
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}
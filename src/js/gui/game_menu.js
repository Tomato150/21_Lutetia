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
                        animation='overlay'
                        visible={visible}
                        icon='labeled'
                        vertical inverted
                        className="custom"
                    >

                    </Sidebar>
                    <Sidebar.Pusher>
                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}
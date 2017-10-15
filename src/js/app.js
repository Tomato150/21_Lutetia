import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {createStore} from 'redux';
import {Provider} from 'react-redux'
import AppReducer from './reducers/index'

const PIXI = require('pixi.js');
import ReactPIXI from 'react-pixi';

const store = createStore(AppReducer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>Hey, that's pretty good</div>
            </Provider>
        )
    }
}

ReactDOM.render(
    <App/>
);

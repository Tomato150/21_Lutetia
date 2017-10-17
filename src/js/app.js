import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {logger} from 'redux-logger';

import AppReducer from './reducers/index';
import {trial} from './actions/index'

import GameMap from './gui/game_map';


const middleware = applyMiddleware(logger);
const store = createStore(AppReducer, middleware);

// For note, server_data is a global variable that allows access to data passed by server.
// See more within index.html

@connect(store => {
    return {worldState: store.World}
})
class App extends Component {
    render() {
        // const {dispatch, worldState} = this.props;
        const {world, world_metadata} = server_data;
        return (
            <div>
                <GameMap
                    data={world}
                    metadata={world_metadata}
                    width={world_metadata['TILE SIZE'] * world_metadata['WORLD WIDTH']}
                    height={world_metadata['TILE SIZE'] * world_metadata['WORLD HEIGHT']}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('react-entry')
);

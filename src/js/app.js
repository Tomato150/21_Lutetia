import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';

import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {logger} from 'redux-logger';

import AppReducer from './reducers/index';
// import {trial} from './actions/index';

import 'semantic-ui-css/semantic.min.css';
import '../css/sidebar.css'

import GameMap from './gui/game_map';
import GameMenu from './gui/game_menu';

import fetch from 'node-fetch';


function initAppWithData () {
    fetch('http://localhost:5000/get_world', {
        method: 'GET',
        mode:'no-cors',
        dataType: 'json'
    })
        .then(response => response.json())
        .then(response => {
            const middleware = applyMiddleware(logger);
            const store = createStore(AppReducer, middleware);

            @connect(store => {
                return {worldState: store.World}
            })
            class App extends Component {
                render() {
                    // const {dispatch, worldState} = this.props;
                    const {world, world_metadata} = response;
                    return (
                        <div>
                            <GameMenu>
                                <GameMap
                                    data={world}
                                    metadata={world_metadata}
                                    // width={world_metadata['TILE SIZE'] * world_metadata['WORLD WIDTH']}
                                    // height={world_metadata['TILE SIZE'] * world_metadata['WORLD HEIGHT']}
                                />
                            </GameMenu>
                        </div>
                    )
                }
            }

            ReactDOM.render(
                <Provider store={store}>
                    <App/>
                </Provider>, document.getElementById('react-entry')
            );
        })
        .catch(error => {
            initAppWithData()
        });
}

initAppWithData();

import {combineReducers} from 'redux';

import WorldReducer from './world_reducer';

const appReducers = combineReducers({
    World: WorldReducer
});

export default appReducers
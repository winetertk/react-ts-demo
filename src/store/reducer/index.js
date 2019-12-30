import { combineReducers } from 'redux'
import userReducer from './user'
import sysReducer from './sys'

const reducers = combineReducers ({
    userReducer,
    sysReducer
})

export default reducers

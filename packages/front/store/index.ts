import { combineReducers } from 'redux'
import userReducer from './user/reducer'
import chatsReducer from './chats/reducer'

export default combineReducers({
    userReducer,
    chatsReducer
})
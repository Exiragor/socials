import * as types from './types'

export const setChats = list => dispatch => dispatch({ type: types.SET_CHATS, payload: { list } })
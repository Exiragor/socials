import * as types from './types'

export const initialState = {
    list: []
}

export default (state = initialState, action: any) => {
    switch (action.type) {
        case types.SET_CHATS: 
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    } 
}

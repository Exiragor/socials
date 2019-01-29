import * as types from './types'

export const initialState = {
    user: null,
    token: null,
    lang: 'en'
}

export default (state = initialState, action: any) => {
    switch (action.type) {
        case types.SET_LANG: 
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    } 
}

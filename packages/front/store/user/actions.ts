import * as types from './types'

export const setToken = token => dispatch => dispatch({ type: types.SET_TOKEN, payload: { token } })
export const setLang = lang => dispatch => dispatch({ type: types.SET_LANG, payload: { lang }})
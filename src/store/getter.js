import store from './index'

export const user = () => store.getState().userReducer

export const sys = () => store.getState().sysReducer
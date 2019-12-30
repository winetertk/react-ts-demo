import { sys } from "../actions";

let sysState = {
    docTitle: localStorage.menuName || '自助申报端',
    sysId: '01',
}

const sysReducer = (state = sysState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    sys.map( actionItem => {
        if (action.type === actionItem.type) {
            if (actionItem.type === 'CHANGE_DOC_TITLE') localStorage.setItem('menuName', action.value)
            newState[actionItem.key] = action.value
            return newState
        }
    })
    return newState
}

export default sysReducer
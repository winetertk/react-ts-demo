import { user } from "../actions";

let userState = {
    name: '逸心丿',
    age: '25',
    place: '重庆',
}

const userReducer = (state = userState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    user.map( userAction => {
        if (action.type === userAction.type) {
            newState[userAction.key] = action.value
            return newState
        }
    })
    return newState
}

export default userReducer
// Store/Reducers/avatarReducer.js

const initialState = { avatar: 'https://egichem-bucket.s3.amazonaws.com/images/profile_photos/default.jpg' }

function setAvatar(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_PROFIL':
            nextState = {
                ...state,
                avatar: action.value
            }
            return nextState || state


        default:
            return state
    }
}

export default setAvatar
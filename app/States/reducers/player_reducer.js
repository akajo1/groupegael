// Store/Reducers/countryReducers

const initialState = { song: '' }

function setPlayer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_SONG':
            nextState = {
                ...state,
                song: action.value
            }
            return nextState || state
        case 'STOP':
            nextState = {
                ...state,
                song: ''
            }
            return nextState || state
        default:
            return state
    }
}

export default setPlayer
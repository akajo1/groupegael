import { darkTheme } from '../../Styled/Theme'


const initialState = {
    theme: darkTheme
}

const themeReducer = (state = initialState, action) => {
    let nextState
    switch (action.type) {
        case 'SWITCH_THEME':
            nextState = {
                ...state,
                theme: action.value
            }
            return nextState || state

        default:
            return state;
    }
}

export default themeReducer
const initialState = {
    connecter: '',
    isConnect: false
}

function connexionReducers(state = initialState, action) {
    let nextState = '';

    switch (action.type) {
        case 'CONNEXION_REUSSI':
            nextState = {
                ...state,
                connecter: action.value,
                isConnect: true
            }
            return nextState || state
        case 'DECONNEXION':
            nextState = {
                ...state,
                connecter: '',
                isConnect: false
            }
            return nextState || state
        default:
            return state;
    }
}
export default connexionReducers
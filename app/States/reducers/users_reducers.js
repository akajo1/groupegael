const initialState = { user: '' };

function usersReducers(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'RECCUPERATION':
            nextState = {
                ...state,
                user: action.value,
            };
            return nextState || state;
        case 'ADD_PROFIL':

            if (state.user.id == action.value.id) {
                // L'ATM est déjà dans les favoris, on le supprime de la liste
                nextState = {
                    ...state,
                    user: action.value
                }
            }
            return nextState || state
        default:
            return state;
    }
}
export default usersReducers;
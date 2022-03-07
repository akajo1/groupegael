const initialState = {
    favoritesPrestataire: []
}

function toggleFavorite(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_FAVORITE':

            nextState = {
                ...state,
                favoritesPrestataire: [...state.favoritesPrestataire, action.value]
            }
            return nextState || state
        case 'PROGRESS':

            const panierIndexs = state.favoritesPrestataire.findIndex(item => item.id === action.value.id)
            if (panierIndexs !== -1) {
                // L'ATM est déjà dans les favoris, on le supprime de la liste
                nextState = {
                    ...state,
                    favoritesPrestataire: state.favoritesPrestataire.filter((item, index) => item.quantite = action.value.progress)
                }
            } else {
                // L'ATM n'est pas dans les films favoris, on l'ajoute à la liste
                nextState = {
                    ...state,
                    favoritesPrestataire: [...state.favoritesPrestataire, action.value]
                }
            }
            return nextState || state
        case 'VIDE':
            nextState = {
                ...state,
                favoritesPrestataire: []
            }
            return nextState || state
        default:
            return state
    }
}
export default toggleFavorite
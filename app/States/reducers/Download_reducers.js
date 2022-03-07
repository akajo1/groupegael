const initialState = {
    downloads: []
}

function CurrentDownloads(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_DOWNLOAD':

            nextState = {
                ...state,
                downloads: [...state.downloads, action.value]
            }
            return nextState || state
        case 'PROGRESSING':

            const panierIndexs = state.downloads.findIndex(item => item.id === action.value.id)
            if (panierIndexs !== -1) {
                // L'ATM est déjà dans les favoris, on le supprime de la liste
                nextState = {
                    ...state,
                    downloads: state.downloads.filter((item, index) => item.progress = action.value.progress)
                }
            } else {
                // L'ATM n'est pas dans les films favoris, on l'ajoute à la liste
                nextState = {
                    ...state,
                    downloads: [...state.downloads, action.value]
                }
            }
            return nextState || state
        case 'VIDES':
            nextState = {
                ...state,
                downloads: []
            }
            return nextState || state
        default:
            return state
    }
}
export default CurrentDownloads
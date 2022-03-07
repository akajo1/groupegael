    const initialState={ message:''}
function inscriptionReducers(state=initialState,action){
    let nextState;
    switch(action.type){
        case 'INSCRIPTION_REUSSI':
            nextState={
                ...state,
                message : action.value
            }
            return nextState || state
        case 'SUPPRESSION_MESSAGE':
            nextState={
                ...state,
                message :''
            }
            return nextState || state
        default:
            return state;
    }
}
export default inscriptionReducers;
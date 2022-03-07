const initialState = {prestataire: ''};
function prestatairesReducers(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'RECCUPERATION':
      nextState = {
        ...state,
        prestataire: action.value,
      };
      return nextState || state;

    default:
      return state;
  }
}
export default prestatairesReducers;

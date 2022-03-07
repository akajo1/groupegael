// Store/Reducers/countryReducers

const initialState = { country: null }

function setCountry(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'ADD_COUNTRY':
      nextState = {
        ...state,
        country: action.value
      }
      return nextState || state
  default:
    return state
  }
}

export default setCountry
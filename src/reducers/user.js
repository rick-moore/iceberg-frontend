const initialState = {
  userProfile: {}
}

export default function usersState(state= initialState, action){
  switch(action.type) {
    case "FETCH_USER":
      console.log("users:", "fetchUser:", action.payload)
      return {...state, userProfile: action.payload}
    default:
      return state;
  }
}


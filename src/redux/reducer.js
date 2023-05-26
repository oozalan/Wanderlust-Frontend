const reducer = (state, action) => {
  if (action.type == "logout") {
    let newState = { ...state };

    for (let key in newState) newState[key] = undefined;
    newState.isLoggedIn = false;

    return newState;
  } else if (action.type == "login" || action.type == "signup") {
    return {
      ...action.payload,
      isLoggedIn: true,
    };
  }

  return state;
};

export default reducer;

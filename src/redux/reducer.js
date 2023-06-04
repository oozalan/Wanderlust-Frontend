const reducer = (state, action) => {
  if (action.type == "logout") {
    let newState = { ...state };

    for (let key in newState) newState[key] = undefined;
    newState.isLoggedIn = false;
    newState.searchResults = [];

    return newState;
  } else if (action.type == "login" || action.type == "signup") {
    return {
      ...action.payload,
      isLoggedIn: true,
      searchResults: [],
    };
  } else if (action.type == "search") {
    let newState = { ...state };
    newState.searchResults = action.payload;
    return newState;
  } else if (action.type == "userpage") {
    let newState = { ...state };
    newState.displayedUserId = action.payload;
    return newState;
  }

  return state;
};

export default reducer;

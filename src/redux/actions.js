export const getLogoutAction = () => {
  return {
    type: "logout",
  };
};

export const getLoginAction = (userInfo) => {
  return {
    type: "login",
    payload: userInfo,
  };
};

export const getSignupAction = (userInfo) => {
  return {
    type: "signup",
    payload: userInfo,
  };
};

export const getSearchAction = (searchResults) => {
  return {
    type: "search",
    payload: searchResults,
  };
};

export const getUserPageAction = (id) => {
  return {
    type: "userpage",
    payload: id,
  };
};

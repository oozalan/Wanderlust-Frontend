import { legacy_createStore as createStore } from "redux";
import reducer from "./reducer";

const configureStoreObj = () => {
  return createStore(reducer, {
    id: undefined,
    token: undefined,
    name: undefined,
    surname: undefined,
    username: undefined,
    email: undefined,
    password: undefined,
    image: undefined,
    isLoggedIn: false,
    searchResults: [],
  });
};

export default configureStoreObj;

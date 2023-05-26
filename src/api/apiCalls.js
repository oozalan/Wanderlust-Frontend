import axios from "axios";

export function signup(body) {
  return axios.post("/signup", body);
}

export function login(credentials) {
  return axios.post(
    "/login",
    {},
    {
      auth: credentials,
    }
  );
}

export function getFriends(username) {
  return axios.get(`${username}/friends`);
}

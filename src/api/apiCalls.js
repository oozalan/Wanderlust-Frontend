import axios from "axios";
const path = "http://localhost:8080";

export function signup(body) {
  return axios.post(`${path}/api/signupuser`, body);
}

export function login(credentials) {
  return axios.post(`${path}/api/login`, credentials);
}

export function getFriends(userInfo) {
  return axios.post(`${path}/api/getfriends`, userInfo);
}

export function getFriendsPosts(userInfo) {
  return axios.get(`${path}/api/getfriendsposts`, userInfo);
}

export function createPost(postInfo) {
  return axios.post(`${path}/api/generatepost`, postInfo);
}

export function addCommentApi(commentInfo) {
  return axios.post(`${path}/api/postcomment`, commentInfo);
}

export function performSearch(searchInfo) {
  return axios.post(`${path}/api/search`, searchInfo);
}

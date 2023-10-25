import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const createUser = (username) => {
    return api.post(`/users`, {username});
};

export const listUsers = (params) => {
    return api.get(`/users?sort=${params?.sort}`);
};

export const removeUser = (username) => {
  return api.delete(`/users/${username}`);
};

export const toggleStarUser = (username) => {
  return api.patch(`/users/${username}/toggle-star`);
};

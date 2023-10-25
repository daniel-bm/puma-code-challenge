const axios = require('axios');
const UserModel = require("../model/user.js");

const favoriteUsers = [];

const addUser = async (userData) => {
  if (favoriteUsers.length >= 5) {
    return { error: 'Limite de 5 usuários favoritos atingido.' };
  }

  if (favoriteUsers.some((user) => user.username === userData.username)) {
    return { error: 'Este usuário já está na lista de favoritos.' };
  }

  try {
    const response = await axios.get(`https://api.github.com/users/${userData.username}`);
  } catch (error) {
    if (error.code === 'ERR_BAD_REQUEST')
      return { error: `Usuário com username ${userData.username} não encontrado no github.`};
    return { error: 'Ocorreu um erro ao acessar o github. Tente novamente mais tarde.'}
  }

  const user = new UserModel(userData.username, userData.nome, userData.avatar, userData.url)
  favoriteUsers.push(user);
  return user;
};

const getAllUsers = () => {
  return favoriteUsers;
};

const deleteUser = (username) => {
  const index = favoriteUsers.findIndex((user) => user.username === username);
  if (index !== -1) {
    favoriteUsers.splice(index, 1);
    return { message: `Usuário com username ${username} deletado com sucesso.`}
  }
  return { error: `Usuário com username ${username} não encontrado.`}
};

const toggleStar = (username) => {
  const index = favoriteUsers.findIndex((user) => user.username === username);
  if (index !== -1) {
    favoriteUsers.forEach((user) => (user.starred = false)); // Retira a estrela de todos os usuários
    favoriteUsers[index].starred = true;
    return favoriteUsers[index];
  }
  return { error: `Usuário com username ${username} não encontrado.`}
};

module.exports = {
  addUser,
  getAllUsers,
  deleteUser,
  toggleStar,
};

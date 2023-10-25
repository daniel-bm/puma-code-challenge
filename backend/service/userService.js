const axios = require('axios');
const UserModel = require("../model/user.js");

const favoriteUsers = [];

const addUser = async (username) => {
  if (favoriteUsers.length >= 5) {
    return { error: 'Limite de 5 usuários favoritos atingido.' };
  }

  if (favoriteUsers.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
    return { error: 'Este usuário já está na lista de favoritos.' };
  }

  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const gitUser = response.data
    const user = new UserModel(gitUser.login, gitUser.name, gitUser.avatar_url, gitUser.html_url)
    favoriteUsers.push(user);
    return user;
  } catch (error) {
    if (error.code === 'ERR_BAD_REQUEST')
      return { error: 'Usuário não encontrado.'};
    return { error: 'Ocorreu um erro ao acessar o github. Tente novamente mais tarde.'}
  }
};

const getAllUsers = (params) => {
  const sortMethod = params.sort;
  if (sortMethod === 'nome') {
    favoriteUsers.sort((a, b) => a.nome?.localeCompare(b.nome));
  }
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
    const isUserStarred = favoriteUsers[index].starred;
    favoriteUsers.forEach((user) => (user.starred = false)); // Retira a estrela de todos os usuários
    favoriteUsers[index].starred = isUserStarred?false:true;
    return favoriteUsers[index];
  }
  return { error: `Usuário com username ${username} não encontrado.`}
};

module.exports = {
  addUser,
  getAllUsers,
  deleteUser,
  toggleStar,
  favoriteUsers,
};

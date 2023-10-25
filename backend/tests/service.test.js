const axios = require('axios');
const UserModel = require('../model/user.js');
const { addUser, getAllUsers, deleteUser, toggleStar, favoriteUsers } = require('../service/userService.js');

describe('Testes da Service', () => {
  let mockAxiosGet;

  beforeEach(() => {
    mockAxiosGet = jest.spyOn(axios, 'get');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should add a favorite user', async () => {
    const mockUserData = { login: 'daniel-bm', name: 'Usuário de Teste', avatar_url: 'avatar', html_url: 'html' };
    mockAxiosGet.mockResolvedValue({ data: mockUserData });
    const result = await addUser('daniel-bm');
    expect(result).toBeInstanceOf(UserModel);
    expect(result.username).toBe('daniel-bm');
    expect(result.nome).toBe('Usuário de Teste');
    expect(result.avatar).toBe('avatar');
    expect(result.url).toBe('html');
  });

  it('Should return an error when adding an existing user', async () => {
    const existingUser = new UserModel('existinguser', 'Existing User', 'avatar_url', 'html_url');
    favoriteUsers.push(existingUser);
    const result = await addUser('existinguser');
    expect(result.error).toBe('Este usuário já está na lista de favoritos.');
  });

  it('Should return an error when reaching the limit of 5 favorite users', async () => {
    favoriteUsers.push(new UserModel('user1', 'User 1', 'avatar_url', 'html_url'));
    favoriteUsers.push(new UserModel('user2', 'User 2', 'avatar_url', 'html_url'));
    favoriteUsers.push(new UserModel('user3', 'User 3', 'avatar_url', 'html_url'));
    favoriteUsers.push(new UserModel('user4', 'User 4', 'avatar_url', 'html_url'));
    favoriteUsers.push(new UserModel('user5', 'User 5', 'avatar_url', 'html_url'));
    const result = await addUser('user6');
    expect(result.error).toBe('Limite de 5 usuários favoritos atingido.');
  });

  it('Should delete a favorite user', () => {
    const deletedUser = favoriteUsers[0];
    const result = deleteUser(deletedUser.username);
    expect(result.message).toBe(`Usuário com username ${deletedUser.username} deletado com sucesso.`);
    expect(favoriteUsers).not.toContain(deletedUser);
  });

  it('Should return an error when trying to delete a non-existent user', () => {
    const result = deleteUser('usuarioinexistente');
    expect(result.error).toBe('Usuário com username usuarioinexistente não encontrado.');
  });

  it('Should star a favorite user', () => {
    const userToStar = favoriteUsers[0];
    const result = toggleStar(userToStar.username);
    expect(result.starred).toBe(true);
    favoriteUsers.forEach((user) => {
      if (user !== userToStar) {
        expect(user.starred).toBe(false);
      }
    });
  });

  it('Should return an error when trying to star a non-existent user', () => {
    const result = toggleStar('usuarioinexistente');
    expect(result.error).toBe('Usuário com username usuarioinexistente não encontrado.');
  });
});


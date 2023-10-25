const userService = require('../service/userService');
const { addUser, getAllUsers, deleteUser, toggleStar } = require('../controller/userController');

jest.mock('../service/userService');

describe('Controller Tests', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, query: {}, params: {} };
    res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
  });

  it('Should add a new user with success', async () => {
    const mockUser = { username: 'daniel-bm' };
    userService.addUser.mockResolvedValue(mockUser);

    req.body.username = 'daniel-bm';
    await addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('Should return an error when adding an already existing user', async () => {
    userService.addUser.mockResolvedValue({ error: 'Este usuário já está na lista de favoritos' });

    req.body.username = 'existinguser';
    await addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Este usuário já está na lista de favoritos' });
  });

  it('Should return an error when reaching the limit of 5 favorite users', async () => {
    userService.addUser.mockResolvedValue({ error: 'Limite de 5 usuários favoritos atingido.' });

    req.body.username = 'user6';
    await addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Limite de 5 usuários favoritos atingido.' });
  });

  it('Should retrieve all favorite users', () => {
    const mockUsers = [
      { username: 'user1' },
      { username: 'user2' },
    ];
    userService.getAllUsers.mockReturnValue(mockUsers);

    getAllUsers(req, res);

    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it('Should delete a favorite user', () => {
    const usernameToDelete = 'user1';
    userService.deleteUser.mockReturnValue({ message: `Usuário com username ${usernameToDelete} deletado com sucesso.` });

    req.params.username = usernameToDelete;
    deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: `Usuário com username ${usernameToDelete} deletado com sucesso.` });
  });

  it('Should return an error when trying to delete a non-existent user', () => {
    const usernameToDelete = 'usuarioinexistente';
    userService.deleteUser.mockReturnValue({ error: `Usuário com username ${usernameToDelete} não encontrado.` });

    req.params.username = usernameToDelete;
    deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: `Usuário com username ${usernameToDelete} não encontrado.` });
  });

  it('Should successfully star a favorite user', () => {
    const usernameToStar = 'user1';
    userService.toggleStar.mockReturnValue({ username: usernameToStar, starred: true });

    req.params.username = usernameToStar;
    toggleStar(req, res);

    expect(res.json).toHaveBeenCalledWith({ username: usernameToStar, starred: true });
  });

  it('Should return an error when trying to star a non-existent user', () => {
    const usernameToStar = 'usuarioinexistente';
    userService.toggleStar.mockReturnValue({ error: `Usuário com username ${usernameToStar} não encontrado.` });

    req.params.username = usernameToStar;
    toggleStar(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: `Usuário com username ${usernameToStar} não encontrado.` });
  });
});

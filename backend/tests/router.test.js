const express = require('express');
const supertest = require('supertest');
const userController = require('../controller/userController');
const app = express();

app.use(express.json());
app.use('/api', require('../router/userRouter'));

describe('Router Tests', () => {
  const request = supertest(app);

  it('Should add a favorite user via the POST route', async () => {
    const username = 'daniel-bm';

    userController.addUser = jest.fn().mockResolvedValue({username});

    const response = await request.post('/api/users').send({ username });

    expect(response.status).toBe(201);
  });

  it('Should retrieve all favorite users via the GET route', async () => {
    const mockUsers = [
      { username: 'daniel-bm' },
      { username: 'user2' },
    ];
    userController.getAllUsers = jest.fn().mockReturnValue(mockUsers);

    const response = await request.get('/api/users');

    expect(response.status).toBe(200);
  });

  it('Should star a favorite user via the PATCH route', async () => {
    const usernameToStar = 'daniel-bm';
    const mockResponse = { username: usernameToStar, starred: true };
    userController.toggleStar = jest.fn().mockReturnValue(mockResponse);

    const response = await request.patch(`/api/users/${usernameToStar}/toggle-star`);
    console.log(response.data)

    expect(response.status).toBe(200);
  });

  it('Should delete a favorite user via the DELETE route', async () => {
    const usernameToDelete = 'daniel-bm';
    const mockResponse = { message: `Usuário com username ${usernameToDelete} deletado com sucesso.` };
    userController.deleteUser = jest.fn().mockReturnValue(mockResponse);

    const response = await request.delete(`/api/users/${usernameToDelete}`);

    expect(response.status).toBe(200);
  });
});

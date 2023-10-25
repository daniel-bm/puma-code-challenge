const User = require('../model/user');

describe('Class User', () => {
  it('Should create a User instance with the correct properties', () => {
    const user = new User('exemplo-username', 'Nome de Exemplo', 'avatar.jpg', 'https://exemplo.com');

    expect(user.username).toBe('exemplo-username');
    expect(user.nome).toBe('Nome de Exemplo');
    expect(user.avatar).toBe('avatar.jpg');
    expect(user.url).toBe('https://exemplo.com');
    expect(user.starred).toBe(false);
  });
});

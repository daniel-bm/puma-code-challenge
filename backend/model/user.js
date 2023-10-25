class User {
    constructor(username, nome, avatar, url) {
      this.username = username;
      this.nome = nome;
      this.avatar = avatar;
      this.url = url;
      this.starred = false;
    }
}

module.exports = User;
  
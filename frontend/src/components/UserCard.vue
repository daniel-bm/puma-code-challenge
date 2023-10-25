<template>
    <div class="user-card">
      <a :href="user.url" target="_blank">
      <div class="user-photo">
        <img :src="user.avatar" alt="Foto do Usuário" />
      </div>
      <div class="user-details">
        <p class="user-name">{{ user.nome }}</p>
        <p class="user-username">{{ user.username }}</p>
      </div>
      </a>
      <div class="user-actions">
        <span @click="removeUser" class="action-icon">
          <img src="../assets/trash.svg"/>
        </span>
        <span v-if="user.starred" @click="toggleStar" class="action-icon">
          <img src="../assets/star.svg"/>
        </span>
        <span v-else @click="toggleStar" class="action-icon">
          <img src="../assets/unstar.svg"/>
        </span>
      </div>
    </div>
  </template>
  
  <script>
  import { removeUser, toggleStarUser } from '../services/api';

  export default {
    props: {
        user: Object,
    },
    methods: {
        async removeUser() {
            try {
              await removeUser(this.user.username);
              this.$emit('loadUsers', this.user);
            } catch (error) {
              this.$emit('error', error.response.data.error);
            }
        },
        async toggleStar() {
          try {
            const updatedUser = await toggleStarUser(this.user.username);
            this.$emit('loadUsers', updatedUser);
          } catch (error) {
            this.$emit('error', error.response.data.error);
          }
        },
    },
};
</script>
  
  <style scoped>
  .user-card {
    display: flex;
    flex-direction: column;
    height: 280px;
    width: 200px;
    background-color: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .user-card a {
  color: inherit;
  text-decoration: none;
  }

  .user-card a:hover {
  text-decoration: none;
  cursor: pointer;
  }

  
  .user-photo img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin: 0 auto;
    display: block;
  }
  
  .user-name {
    font-weight: bold;
    text-align: center;
  }
  
  .user-actions {
    display: flex;
    justify-content: space-around;
    margin-top: auto;
    height: 40px;
    background-color: #F3F3F3;
    width: 100%;
    align-items: center;
  }
  
  .action-icon {
    cursor: pointer;
    margin: 0 5px;
    font-size: 20px;
    color: #333;
  }
  
  .action-icon:hover {
    color: #007BFF;
  }
  </style>
  
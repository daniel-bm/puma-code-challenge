<template>
    <div class="add-user-bar">
      <input v-model="username" @input="clearError" placeholder="Username do GitHub" />
      <img src="../assets/add.svg" @click="addUser" alt="Adicionar" style="cursor: pointer;" />
      <p class="error-message" v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
import { createUser } from '../services/api';

  export default {
    data() {
      return {
        username: '',
        error: null,
      };
    },
    methods: {
      clearError() {
        this.error = null;
      },
      async addUser() {
        if (this.username.trim() === '') {
          this.error = 'Por favor, insira um nome de usuário válido.';
        } else {
          try {
            await createUser(this.username)
            this.$emit('loadUsers', this.username); // Emitir um evento para adicionar o usuário
            this.username = ''; // Limpar o campo de entrada
          } catch (error) {
            this.$emit('error', error.response.data.error);
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .add-user-bar {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  input {
    flex: 1;
    padding: 0 25px;
    border-radius: 25px;
    border: 1px solid #000;
    background: #FFF;
    width: 322px;
    height: 50px;
    font-size: 16px;
  }

  input::placeholder {
  color: #4F4F4F;
  }
  
  .error-message {
    color: red;
  }
  </style>
  
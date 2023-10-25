<template>
    <div class="alert">
      <div class="alert-message">
        <img src="../assets/warning.svg" alt="Warning"/>
        <p style="margin-left: 22px;">{{ message }}</p>
      </div>
      <div class="alert-button">
        <div class="line-style"></div>
        <img src="../assets/close.svg" alt="Close Image" @click="closeAlert" class="close-button"/>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: String,
    },
    methods: {
      closeAlert() {
        this.$emit('closeAlert');
      },
    },
  };
  </script>
  
  <style scoped>
  .alert {
    display: flex;
    width: 377px;
    height: 47px;
    justify-content: space-between;
    align-items: center;
    padding: 0 13px;
    border-radius: 5px;
    background-color: #BB0E22;
    color: white;
    position: fixed;
    bottom: 10px;
    align-self: center;
  }

  .alert-message {
    display: flex;
  }

  .alert-button {
    display: flex;
  }

  .line-style {
    width: 1px;
    height: 40px;
    background-color: white;
    margin-right: 5px;
  }
  
  .close-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #007BFF;
    margin-left: 10px;
  }
  </style>
  
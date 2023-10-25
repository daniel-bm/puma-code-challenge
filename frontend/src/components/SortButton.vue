<template>
    <button @click="sortByName">Ordenar por Nome (A-Z)</button>
  </template>
  
  <script>
  export default {
    methods: {
      sortByName() {
        this.$emit('sortByName');
      },
    },
  };
  </script>
  
  <style>

  button {
    border-radius: 25px;
    border: 1px solid #000;
    background: #000;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
    width: 250px;
    height: 50px;
    font-size: 16px;
    padding: 0 20px;
    transition: filter 0.2s;
  }

  button:hover {
    background-color: #282828;
  }

  </style>
  
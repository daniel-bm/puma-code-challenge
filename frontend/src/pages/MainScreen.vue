<template>
    <div class="container">
      <img src="../assets/logo.png" alt="gitStar">
      <div class="actions-container">
        <AddUserBar @loadUsers="handleLoadUsers" @error="setError" />
        <SortButton @sortByName="sortByName" 
        :style="{
          'margin-top': '24px'
        }"
      />
      </div>
    <div class="cards-container">
      <div class="user-card-container">
      <UserCard class="user-card"
        v-for="(user, index) in users"
        :key="user.username"
        :user="user"
        @loadUsers="handleLoadUsers"
        @error="setError"
        :style="{
          'grid-row': index < 3 ? '1' : '2',
          'grid-column': index < 3 ? (index + 1).toString() : (index - 2).toString(),
        }"
      />
      </div>
    </div>
    <AlertMessage v-if="isAlert" @closeAlert="closeAlert" :message="errorMessage"/>
  </div>
</template>
 
 <script>
 import UserCard from '../components/UserCard.vue';
 import AddUserBar from '../components/AddUserBar.vue';
 import SortButton from '../components/SortButton.vue';
 import AlertMessage from '../components/AlertMessage.vue';
 import { listUsers } from '../services/api';
 
 export default {
     name: 'MainScreen',
     components: { UserCard, AddUserBar, SortButton, AlertMessage },
     data() {
       return {
         users: [],
         isAlert: false,
         errorMessage: ''
       }
     },
     async created() {
       this.handleLoadUsers()
     },
     methods: {
       async handleLoadUsers(params) {
        try {
          const response = await listUsers(params)
          this.users = response.data
        } catch (error) {
          this.setError(error.response.data.error)
        }
       },
       sortByName() {
         this.handleLoadUsers({sort: "nome"});
       },
       closeAlert() {
        this.isAlert = false
       },
       setError(message) {
        this.errorMessage = message
        this.isAlert = true
       }
     }
 }
 </script>
 
 <!-- Add "scoped" attribute to limit CSS to this component only -->
 <style scoped>
 h3 {
   margin: 40px 0 0;
 }
 ul {
   list-style-type: none;
   padding: 0;
 }
 li {
   display: inline-block;
   margin: 0 10px;
 }
 a {
   color: #42b983;
 }

 .container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 0 300px;
 }
 
 .cards-container {
  display: flex;
  justify-content: center;
  margin-top: 78px;
 }
 .actions-container {
  display: flex;
  margin-top: 50px;
  flex-direction: column;
 }
 
 .user-card-container {
   display: grid;
   grid-template-rows: 1fr 1fr;
   grid-template-columns: repeat(3, 1fr);
   gap: 100px;
   height: auto;
 }
 
 .user-card[style*="grid-area: top"] {
   grid-area: top;
 }
 
 .user-card[style*="grid-area: bottom"] {
   grid-area: bottom;
 }
 
 </style>
 
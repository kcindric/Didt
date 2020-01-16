<template>
  <header class="header">
    <h1>DIDT</h1> 
    <img src="../../assets/logo.png" alt="logo" class="logo-image">
      <span v-if="currentUser"><router-link to="/">Home</router-link> | </span>
      <router-link to="/about">About</router-link> |
      <router-link to="/login" v-if="!currentUser">Login</router-link>
      <a href @click="logOut" v-if="currentUser">Logout </a>
      <div class="username" v-if="currentUser"><p>{{currentUser.username}}</p></div>

  </header>
</template>

<script>
export default {
    name: "Header",
    computed:{
        currentUser(){
            return this.$store.state.auth.user;
        }
    },
    methods:{
        logOut(){
            this.$store.dispatch('auth/logout');
            // this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
.header{
    background: #333;
    color:#fff;
    text-align:center;
    padding: 10px;
}

.header a{
    color: #acacac;
    text-decoration: none;
}
.header a.router-link-exact-active{
    color: #fff;
}

.logo-image{
    position:absolute;
    width: 45px;
    top: 23px;
    right: 8px;
}

.username{
    position: absolute;
    top: 3px;
   
}
.username p{
     color: #fff;
     font-size: 15px;
}
</style>
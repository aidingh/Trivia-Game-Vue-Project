<template  >
  <!-- Start of the App template. It will only contain a router link to the other Vue-components-->
  <div id="app">
    <p>
      <router-link to="/"></router-link>
      <router-link to="/question"></router-link>
      <router-link to="/result"></router-link>
    </p>
    <router-view></router-view>
  </div>
</template> 
<script>

export default {
  name: "App",
  components: {},
  methods: {},
};

</script>

<style>

/* ---Style that is added he is defined for the in a global scope for all the components--*/
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>

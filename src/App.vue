<template v-if="dataReady" >
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> 
  <h1>hello world</h1> 
  <start-screen  title="Trivia Game!"/>
  
  -->
    <div id="app">
        <p>
            <router-link to="/"></router-link>
            <router-link to="/question"></router-link>
        </p>
        <router-view></router-view>
    </div>
</template> 

<script>
import StartScreen from './components/StartScreen.vue'
import App from './App.vue'

export default {
  name: 'App',
  components: {
    //StartScreen,
    
  },
methods: {

  setUserToApi: async function(userName, intiHighScore, apiURL, apiKey) {
    let postRes = fetch(`${apiURL}/trivia`, {
    method: 'POST',
    headers: {
      'X-API-Key':apiKey ,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
        username: userName, 
        highScore: intiHighScore 
    })
  });

  if((await postRes).status == 200){
      postRes = await (await postRes).json();
      return;
  }
  else{
      console.log('Could not Http.get data with service url: ' + apiURL);
  }
  },

  setCategoryElements: async function() {
    let response = fetch('https://opentdb.com/api_category.php');
      if((await response).status == 200){
          let categoryData = await (await response).json();
          await StartScreen.methods.populateSelectCategories(categoryData);
      }
      else{
          console.log('Could not Http.get data with service url: https://opentdb.com/api_category.php');
      }
},

  deleteUser: async function(id, apiURL, apiKey) {
    fetch(`${apiURL}/trivia/` + id, {
      method: 'DELETE',
      headers: {
        'X-API-Key':apiKey ,
        'Content-Type': 'application/json'
      },

  });
},
},

  async mounted() {

    let apiURL = "https://noroff-trivia-api.herokuapp.com";
    let apiKey = "1b23229d-18ca-48ec-bdeb-9c7445384f23";
    const username = 'Arjan';
    //let token = "caae5c84-0e31-480a-b853-c4c4b1aec52d";

    let userResponse = fetch(`${apiURL}/trivia?username=${username}`)
          if((await userResponse).status == 200){
            console.log("User found");
            App.methods.setCategoryElements();
            this.dataReady = true;
          }
          else{
              console.log("No user found");
              App.methods.setUserToApi(username,"0",apiURL, apiKey);
              App.methods.setCategoryElements();
              this.dataReady = true;
          }
  }   
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  
}


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

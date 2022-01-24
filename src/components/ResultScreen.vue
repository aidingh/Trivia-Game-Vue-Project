<template>

    <header>
        <h2>Results!</h2>
    <div class="row">
        <div class="card">

            <p id= "result">{{this.$store.state.displayScore}}</p>
            <p id="questionList">{{this.$store.state.globalTriviaDataJson.results.questions}}</p>

        <div class="btn-group">
          <button id="btn-true" style="margin:5px;" type="button" class="btn" v-on:click="navigateStartScreen()">Back to start!</button>
          <button id="btn-false" style="margin:5px;" type="button" class="btn" v-on:click="rePlay()">Replay!</button> 

        </div>
           

        </div>
    </div>
       

    </header>
</template>

<script>

import {mapState} from "vuex"

export default {

    name: 'ResultScreen',
    props: {
        title: String,
    },

    data(){
        return {
            isHidden: false,
            globalTriviaData: String
        }
    },

    computed: {
        ...mapState(["correctAnswers"], ["globalTriviaDataJson"]),
    },

    mounted() {
    

    },


    methods: {
        navigateStartScreen(){
            this.$router.push({ path: '/' });
        },

        rePlay(){
            this.$router.push({ path: '/question' });
        },

        onChangeDifficulty(e) {
            console.log('The diff value is: ', e.target.value)
        },
        onChangeCategories(e) {
            console.log('The cat value is: ', e.target.value)
        },

        tester(){

        },

    }
    
}
</script>


<style scoped>
header {


  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}


/* Float four columns side by side */
.column {

  width: 25%;
  padding: 0 10px;
  align-content: center;
  align-items: center;
}

/* Remove extra left and right margins*/
.row {
    margin: 100px 100px;
    
    }

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive columns */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}

.cardItemColumn .card{
     width:300px;
     text-align: center;
     align-items: center;
     align-content: center;
}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  justify-content: space-evenly;
  padding: 5px;
  text-align: center;
  align-items: center;
  align-content: center;
}

/* Input fields */
.form-container input[type=string] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}

/* Set a style for the repay button */
.form-container .btn {
  background-color: #04AA6D;
  color: white;
  padding: 0px 0px;
  border: none;
  cursor: pointer;
  width: 50%;
  margin-bottom:10px;
  opacity: 0.8;
}

/* Set a style for the form container. */
.form-container{
  position: absolute;
    left: 50%;
    top: 20%;
    height: 200px;
    margin-top: -100px;
    width: 400px;
    margin-left: -200px;
   
}



</style>
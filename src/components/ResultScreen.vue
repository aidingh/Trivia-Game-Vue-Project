<template>

    <header>
        <h2>Results!</h2>
    <div class="row">
        <div class="card">
            <div class="cardItemColumn" >
                <label for="label" style="margin-right: 10px"><b>User: </b></label>
                <p id= "username" style="display:inline-block" >{{this.$store.state.currentUserObject[0].username}}</p>
             </div>
             <div class="cardItemColumn" >
                <label for="label" style="margin-right: 10px"><b>New score: </b></label>
                <p id= "result" style="display:inline-block" >{{this.$store.state.displayScore}}</p>
             </div>
             <div class="cardItemColumn" >
                <label for="label" style="margin-right: 10px"><b>Best score: </b></label>
                <p id= "result" style="display:inline-block" >{{this.$store.state.currentUserObject[0].score}}</p>
             </div>

        <div style="display: flex; justify-content: space-around"> 
            <div class="cardItemColumn" >
                <label for="label"><b>Questions </b></label>
                    <div v-for="quest in this.$store.state.globalTriviaDataJson.results" :key="quest.id">
                    <p>{{quest.question}}</p>
                    </div>
            </div>
            <div class="cardItemColumn" >
                <label for="label"><b>Correct answers </b></label>
                    <div v-for="corr in this.$store.state.globalTriviaDataJson.results" :key="corr.id">
                    <p>{{corr.correct_answer}}</p>
                    </div>
            </div>
             <div class="cardItemColumn" >
                <label for="label"><b>Your answers </b></label>
                    <div v-for="ans in this.$store.state.answers" :key="ans.id">
                    <p>{{ans}}</p>
                    </div>
            </div>
</div> 

        <div class="btn-group">
            <div v-if="!this.$store.state.toggleButton">
            <button id="btn-true" style="margin:5px;" type="button" class="btn" v-on:click="navigateStartScreen()">Back to start!</button>
            <button id="btn-false" style="margin:5px;" type="button" class="btn" v-on:click="resetQuestionMulti()">Replay!</button> 
        </div>
            <div v-if="this.$store.state.toggleButton">
            <button id="btn-true" style="margin:5px;" type="button" class="btn" v-on:click="navigateStartScreen()">Back to start!</button>
            <button id="btn-false" style="margin:5px;" type="button" class="btn" v-on:click="resetQuestion()">Replay!</button> 
            </div>
        </div>
        </div>
    </div>
    </header>
</template>

<script>

import {mapState, mapMutations} from "vuex"

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
        ...mapState(["correctAnswers"]),
        ...mapState(["globalTriviaDataJson"]),
        ...mapState(["nextQuestion"]),
    },

    mounted() {

    },

    methods: {

        ...mapMutations(["resetQuestion"]),
        ...mapMutations(["resetQuestionMulti"]),

        navigateStartScreen(){
            this.$store.state.answers.length = 0;
            this.$router.push({ path: '/' });
        },

        rePlay(){
            //this.$store.state.nextQuestion = this.$store.state.globalTriviaDataJson.results[0].questions;
            //this.$store.dispatch('test');
            this.$store.state.answers.length = 0;
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

.grid {
    display:inline-block;
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

</style>
<template>

    <header>
        <h2>Questions!</h2>
    <div class="row">
        <div class="card">
            <div class="cardItemColumn">
            <label for="label" style="margin-right: 10px"><b>Category: </b></label>
            <p id= "category" style="display:inline-block" >{{this.$store.state.category}}</p>
        </div>
        <div class="cardItemColumn">
        <label for="label" style="margin-right: 10px"><b>Difficulty: </b></label>
        <p id= "difficulty" style="display:inline-block">{{this.$store.state.difficulty}}</p>
        </div>
        <p id= "question">{{this.$store.state.nextQuestion}}</p>
        <div class="btn-group">
        <div v-if="this.$store.state.toggleButton">
          <button  id="btn-true" style="margin:5px;" type="button" class="btn" v-on:click="navToNextQuestion('True')">True</button>
          <button  id="btn-false" style="margin:5px;" type="button" class="btn" v-on:click="navToNextQuestion('False')">False</button> 
        </div>

        <div v-if="!this.$store.state.toggleButton">
          <button id="btn-ans1" style="margin:5px;" type="button" class="btn" v-on:click="navToNextQuestionMulti(this.$store.state.questionList[0])">{{this.$store.state.questionList[0]}}</button>
          <button id="btn-ans2" style="margin:5px;" type="button" class="btn" v-on:click="navToNextQuestionMulti(this.$store.state.questionList[1])">{{this.$store.state.questionList[1]}}</button>
          <button id="btn-ans3" style="margin:5px;" type="button" class="btn" v-on:click="navToNextQuestionMulti(this.$store.state.questionList[2])">{{this.$store.state.questionList[2]}}</button>
          <button id="btn-ans4" style="margin:5px;" type="button" class="btn" v-on:click="navToNextQuestionMulti(this.$store.state.questionList[3])">{{this.$store.state.questionList[3]}}</button>
        </div>

        </div>
        </div>
    </div>
    </header>
</template>

<script>

import {mapMutations, mapState} from "vuex"

export default {

    name: 'QuestionScreen',
    props: {
        title: String,
        jsonData: String
    },
    components: {},
    data(){
        return {
            isHidden: false,
        }
    },

    computed: {
        ...mapState(["globalTriviaDataJson"], ["toggleButton"]),
    },

    mounted() {

    },

    methods: {
        ...mapMutations(["navToNextQuestion"]),
        ...mapMutations(["navToNextQuestionMulti"]),

        onChangeDifficulty(e) {
            console.log('The diff value is: ', e.target.value)
        },
        onChangeCategories(e) {
            console.log('The cat value is: ', e.target.value)
        },
        toggleButtons() {
            this.isHidden = true;
        },
        populateQuestions(data){
            var questionList = document.querySelector("#questionList");
            questionList.innerHTML = data.results.map(i => `<li>${' ' + i.question + ' ' } </li>`).join('');
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

.cardItemColumn .{
    display: inline-block;
    flex-direction: row;
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
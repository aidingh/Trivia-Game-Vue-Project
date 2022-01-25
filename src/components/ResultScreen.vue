  <!-- 
  Start of the ResultScreen template. Contains HTML-elements and state variables to display from the Vuex state management.
  State management instance can be found in main.js file.
  -->
<template>
  <header>
    <h2>Results!</h2>
    <div class="row">
      <div class="card">
        <div class="cardItemColumn">
          <label for="label" style="margin-right: 10px"><b>User: </b></label>
          <p id="username" style="display: inline-block">
              <!-- Shows current user. This is updated by the Vuex-state management -->
            {{ this.$store.state.currentUserObject[0].username }}
          </p>
        </div>
        <div class="cardItemColumn">
          <label for="label" style="margin-right: 10px"
            ><b>New score: </b></label
          >
          <p id="result" style="display: inline-block">
              <!-- Shows the current score. This is updated by the Vuex-state management -->
            {{ this.$store.state.displayScore }}
          </p>
        </div>
        <div class="cardItemColumn">
          <label for="label" style="margin-right: 10px"
            ><b>Best score: </b></label
          >
          <p id="result" style="display: inline-block">
              <!-- Shows the highest score the user have made. Will be updated if it gets higher. This is updated by the Vuex-state management -->
            {{ this.$store.state.currentUserObject[0].score }}
          </p>
        </div>
            <!-- This whole div acts as a grid. Its will display questions, correct answers and the users answers. This is updated by the Vuex-state management -->
        <div style="display: flex; justify-content: space-around">
          <div class="cardItemColumn">
            <label for="label"><b>Questions </b></label>
            <div
              v-for="quest in this.$store.state.globalTriviaDataJson.results"
              :key="quest.id"
            >
              <p>{{ quest.question }}</p>
            </div>
          </div>
          <div class="cardItemColumn">
            <label for="label"><b>Correct answers </b></label>
            <div
              v-for="corr in this.$store.state.globalTriviaDataJson.results"
              :key="corr.id"
            >
              <p>{{ corr.correct_answer }}</p>
            </div>
          </div>
          <div class="cardItemColumn">
            <label for="label"><b>Your answers </b></label>
            <div v-for="ans in this.$store.state.answers" :key="ans.id">
              <p>{{ ans }}</p>
            </div>
          </div>
        </div>
        <!-- 
            This bit is tricky! As true/false questions and multi questions needs different mutation functions to run on replay.
            It will show the same buttons for the user. But run another function. Its a bit of a work-around.
        -->
        <div class="btn-group">
          <div v-if="!this.$store.state.toggleButton">
            <button
              id="btn-true"
              style="margin: 5px"
              type="button"
              class="btn"
              v-on:click="navigateStartScreen()"
            >
              Back to start!
            </button>
            <button
              id="btn-false"
              style="margin: 5px"
              type="button"
              class="btn"
              v-on:click="resetQuestionMulti()"
            >
              Replay!
            </button>
          </div>
          <div v-if="this.$store.state.toggleButton">
            <button
              id="btn-true"
              style="margin: 5px"
              type="button"
              class="btn"
              v-on:click="navigateStartScreen()"
            >
              Back to start!
            </button>
            <button
              id="btn-false"
              style="margin: 5px"
              type="button"
              class="btn"
              v-on:click="resetQuestion()"
            >
              Replay!
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ResultScreen",
  props: {
    title: String,
  },

  data() {
    return {
      isHidden: false,
      globalTriviaData: String,
    };
  },

  computed: {
    ...mapState(["correctAnswers"]),
    ...mapState(["globalTriviaDataJson"]),
    ...mapState(["nextQuestion"]),
  },

  mounted() {},

  methods: {
    /**
     * To run functions defined in as mutations in the store instance defined in main.js file. 
     *  With .....mapMutations(["resetQuestion"]) we can run a mutation function in a event handler.
     * @param {string} resetQuestion mutation reference
     * @param {string} resetQuestionMulti mutation reference
     */
    ...mapMutations(["resetQuestion"]),
    ...mapMutations(["resetQuestionMulti"]),

    /**
     * Navigates the user back to the StartScreen.
     * @param {void} undefined 
     */
    navigateStartScreen() {
      this.$store.state.answers.length = 0;
      this.$router.push({ path: "/" });
    },
  },
};
</script>


<style scoped>
header {
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}

.grid {
  display: inline-block;
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

.cardItemColumn .card {
  width: 300px;
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
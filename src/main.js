import { createApp } from 'vue'
import App from './App.vue'
import StartScreen from './components/StartScreen.vue'
import QuestionScreen from './components/QuestionScreen.vue'
import ResultScreen from './components/ResultScreen.vue'
import {createRouter, createWebHistory } from 'vue-router'
import {createStore}  from 'vuex'

/**
 * Defines a routing object with path to the screen and component which is the screen object.
 * @type {!Array<{path, component}>}
 */
const routes = [
    { path: '/', component: StartScreen},
    { path: '/question', component: QuestionScreen},
    { path: '/result', component: ResultScreen}
  ]

  /**
 * Defines a vue-router object with routes object as a parameter. 
 * When the application is created the routes object is added to the app instance.
 * @type {!createRouter<({history, routes, linkActiveClass})>}
 */
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    linkActiveClass: 'active',
});


/**
 * Defines a Vuex object with routes object. This object is used for state management for the application.
 * When the application is created the routes object is added to the app instance.
 * All the variables who need to be in a global scope are defined in the state function of the object.
 * Actions and mutations are function to update the UI when a new state needs to change.
 * @type {!createStore<({history, state(), actions, mutations})>}
 */
const store = createStore({
    state(){
        
        return{
            active:false,
            globalTriviaDataJson: "",
            nextQuestion: "",
            category: "",
            difficulty: "",
            shrink : 1,
            grow: 1,
            correctAnswers : 0,
            displayScore: 0,
            toggleButton: false,
            questionList: [],
            answers: [],
            currentUserObject : "",
            currentServiceUrl: "",
        }
    },

    actions: {
        /**
         * Function is ran on replay. And sets new questions with the same parameters as the game before.
         * As the function is async it needs to be defined as a action. 
         * @param {object} context defined but not used. It can be used to commit other mutation functions
         * @param {state()} ref instance of state
         * @return {object} returns json object from the request made. 
         */
        async getNewQuestions(context, ref){
            let response = fetch(ref.currentServiceUrl);

            if ((await response).status == 200) {
              let data = await (await response).json();
              ref.globalTriviaDataJson = data;
              ref.category = data.results[0].category;
              ref.difficulty = data.results[0].difficulty;
              ref.nextQuestion = data.results[0].question;
              return data;
            }
        },
        /**
         * Function is ran on replay(But for multi questions). And sets new questions with the same parameters as the game before.
         * As the function is async it needs to be defined as a action. 
         * @param {object} context defined but not used. It can be used to commit other mutation functions
         * @param {state()} ref instance of state
         * @return {object} returns json object from the request made. 
         */
        async getNewQuestionsMulti(context, ref){
            let response = fetch(ref.currentServiceUrl);

            if ((await response).status == 200) {
              let data = await (await response).json();
              ref.globalTriviaDataJson = data;

              ref.nextQuestion = data.results[0].question;
              ref.questionList = data.results[0].incorrect_answers
              ref.questionList.push(data.results[0].correct_answer);
              console.log(ref.nextQuestion);
              return data;
            }
        },
        /**
         * Updates the user to the Heroku text database if the users score is higher than his previous one.
         * As the function is async it needs to be defined as an action. 
         * @param {object} context defined but not used. It can be used to commit other mutation functions
         * @param {list} list with id and user name
         * @return {object} returns json object from the request made. 
         */
            async updateUserScore(context, ref){
                console.log("Updateing highscore " + ref);

                let apiURL = "https://noroff-trivia-api.herokuapp.com";
                let apiKey = "1b23229d-18ca-48ec-bdeb-9c7445384f23";
    
                let postRes = fetch(`${apiURL}/trivia/${ref[0]}`, {
                    method: 'PATCH',
                    headers: {
                    'X-API-Key':apiKey ,
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        score: parseInt(ref[1]),
                        })
                    });
        
                    if((await postRes).status == 200){
                        postRes = await (await postRes).json();
                        return;
                    }
                    else{
                        console.log('Could not register user with service url: ' + apiURL);
                        }
                },
        },
    

    mutations: {
        /**
         * Function is ran when user have chosen a answer for the question.(Multi questions)
         * The function appends new questions and sets new scores.
         * @param {object} state state instance to reference state variables. 
         * @param {string} payload The answer that the user specified when played the game.
         * @return {void} No return. Will return when there are no more questions.
         */
        navToNextQuestionMulti(state, payload){
            console.log(JSON.stringify(state.globalTriviaDataJson));
          
            state.answers.push(payload);
            if(payload == state.globalTriviaDataJson.results[state.grow-1].correct_answer){
                state.correctAnswers = state.correctAnswers + 1;
            }
            if(state.grow == state.globalTriviaDataJson.results.length){
                state.displayScore = state.correctAnswers*10;
                if(state.displayScore > state.currentUserObject[0].score){

                    let id = state.currentUserObject[0].id;
                    let newScore = state.displayScore;
                    let payLoadInj = [id, newScore];

                    store.dispatch('updateUserScore', payLoadInj);
                }
                router.push({ path: '/result' });
                state.grow = 1;
                state.correctAnswers = 0;
                return;
            }

            state.questionList = state.globalTriviaDataJson.results[state.grow].incorrect_answers
            state.questionList.push(state.globalTriviaDataJson.results[state.grow].correct_answer);
            
            //Shuffle the multiple answers. So the answers are not at the same place.
            let currentIndex = state.questionList.length,  randomIndex;
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [state.questionList[currentIndex], state.questionList[randomIndex]] = [state.questionList[randomIndex], state.questionList[currentIndex]];
            }
            
            state.nextQuestion = state.globalTriviaDataJson.results[state.grow].question;
            state.grow = state.grow + 1;
            
        },
        /**
         * Function is ran when user have chosen a answer for the question.(True/false questions)
         * The function appends new questions and sets new scores.
         * @param {object} state state instance to reference state variables. 
         * @param {string} payload The answer that the user specified when played the game.
         * @return {void} No return. Will return when there are no more questions.
         */
        navToNextQuestion(state, payload){
             console.log(payload);
             state.answers.push(payload);   
             if(payload == state.globalTriviaDataJson.results[state.shrink-1].correct_answer){
                state.correctAnswers = state.correctAnswers + 1;
            }
            if(state.shrink == state.globalTriviaDataJson.results.length){
                state.displayScore = state.correctAnswers*10;
                if(state.displayScore > state.currentUserObject[0].score){

                    let id = state.currentUserObject[0].id;
                    let newScore = state.displayScore;
                    let payLoadInj = [id, newScore];

                    store.dispatch('updateUserScore', payLoadInj);
                }
                router.push({ path: '/result' });
                state.shrink = 1;
                state.correctAnswers = 0;
                return;
            }

            console.log(state.shrink);
            console.log(JSON.stringify(state.globalTriviaDataJson.results[state.shrink].question));

            state.nextQuestion = state.globalTriviaDataJson.results[state.shrink].question;
            state.shrink = state.shrink + 1;
            
        },
        /**
         * Resets state variables on replay and fetches new questions
         * @param {object} state state instance to reference state variables. 
         */
        resetQuestion(state){
            store.dispatch('getNewQuestions', state);
            state.nextQuestion = state.globalTriviaDataJson.results[0].question;

            state.answers.length = 0;
            state.displayScore = 0;
            router.push({ path: '/question' });
        },
        /**
         * Resets state variables on replay and fetches new questions
         * @param {object} state state instance to reference state variables. 
         */
        resetQuestionMulti(state){
            console.log(state.currentServiceUrl);
            store.dispatch('getNewQuestionsMulti', state);

            state.answers.length = 0;
            state.displayScore = 0;
            router.push({ path: '/question' });
        },

        setTriviaStateDate(state, payload){
            state.globalTriviaDataJson = payload;
        },
    },
    getters: {
        isActive: state => state.active
    },
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');



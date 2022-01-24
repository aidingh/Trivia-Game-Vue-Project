import { createApp } from 'vue'
import App from './App.vue'
import StartScreen from './components/StartScreen.vue'
import QuestionScreen from './components/QuestionScreen.vue'
import ResultScreen from './components/ResultScreen.vue'
import {createRouter, createWebHistory } from 'vue-router'
import {createStore}  from 'vuex'


const routes = [
    { path: '/', component: StartScreen},
    { path: '/question', component: QuestionScreen},
    { path: '/result', component: ResultScreen}
  ]


const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    linkActiveClass: 'active',
});

const store = createStore({
    state(){
        
        return{
            active:false,
            globalTriviaDataJson: "",
            nextQuestion: "",
            category: "",
            difficulty: "",
            shrink : 1,
            correctAnswers : 0,
            displayScore: 0,
            toggleButton: false,
            questionList: []
        }
    },

    mutations: {

        navToNextQuestionMulti(state, payload){

            state.questionList = state.globalTriviaDataJson.results[state.shrink].incorrect_answers
            state.questionList.push(state.globalTriviaDataJson.results[state.shrink].correct_answer);
            //state.questionList = shuffle(state);
            
            state.shrink = state.shrink + 1;

            console.log("check");
            console.log(state);
            console.log(payload);
        },

        navToNextQuestion(state, payload){

            console.log(state.globalTriviaDataJson);

            if(state.shrink == state.globalTriviaDataJson.results.length){
                state.displayScore = state.correctAnswers*10;
                router.push({ path: '/result' });
                state.shrink = 1;
                state.correctAnswers = 0;
                return;
            }
            else if(payload == state.globalTriviaDataJson.results[state.shrink].correct_answer){
                state.correctAnswers = state.correctAnswers + 1;
            }

            state.nextQuestion = state.globalTriviaDataJson.results[state.shrink].question;
            state.shrink = state.shrink + 1;
        },

        setTriviaStateDate(state, payload){
            state.globalTriviaDataJson = payload;
        },
        test(state, payload){
            console.log("check");
            console.log(state);
            console.log(payload);
        }
    },
    getters: {
        isActive: state => state.active
        /*defaultTriviaData: state => () => {
            return state.globalTriviaDataJson;
        }*/
    },
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');



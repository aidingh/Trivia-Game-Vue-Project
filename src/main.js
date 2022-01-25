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
            grow: 1,
            correctAnswers : 0,
            displayScore: 0,
            toggleButton: false,
            questionList: [],
            answers: [],
            currentUserObject : "",
        }
    },

    actions: {

            async updateUserScore(state, ref){
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
            
            //Shuffle the multiple answers
            let currentIndex = state.questionList.length,  randomIndex;
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [state.questionList[currentIndex], state.questionList[randomIndex]] = [state.questionList[randomIndex], state.questionList[currentIndex]];
            }
            
            state.nextQuestion = state.globalTriviaDataJson.results[state.grow].question;
            state.grow = state.grow + 1;
            
        },

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

        resetQuestion(state){
            state.nextQuestion = state.globalTriviaDataJson.results[0].question;
            console.log(state.nextQuestion);
            state.answers.length = 0;
            state.displayScore = 0;
            router.push({ path: '/question' });
        },

        resetQuestionMulti(state){
            state.nextQuestion = state.globalTriviaDataJson.results[0].question;
            state.questionList = state.globalTriviaDataJson.results[0].incorrect_answers
            state.questionList.push(state.globalTriviaDataJson.results[0].correct_answer);
            console.log(state.nextQuestion);
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



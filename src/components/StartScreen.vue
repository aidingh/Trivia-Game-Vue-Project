<template v-if="dataReady">

    <header >
        <h2 class= 'display-1' style = "text-align: center;" id="header1">Trivia Game!</h2>
    <div class="row">
      <div class="card">
        <h2 id="usrInputTitle">Enter input!</h2>
        <div class="cardItemColumn">
            <label for="label"><b>Enter user name: </b></label>
            <input id='userForm' type="String" placeholder="John Doe " name="repay" required>  
        </div>
        <div class="cardItemColumn">
            <label for="label"><b>Enter number of questions:  </b></label>
            <input id='numberOfQuestForm' type="number" placeholder="limit is 50 " name="repay" required>  
        </div>
        <div class="cardItemColumn">
            <label for="label"><b>Enter categories: </b></label>
            <select id="categoryForm" @change="onChangeCategories" ></select>
        </div>
        <div class="cardItemColumn">
            <label for="label"><b>Enter type: </b></label>
            <select id="typeForm" @change="onChangeType" name="LeaveType" class="form-control">
            <option value="boolean">Any Type</option>
            <option value="multiple">Multiple choice</option>
            <option value="boolean">True / False</option>
            </select>
        </div>
        <div class="cardItemColumn">
            <label for="label"><b>Enter difficulty: </b></label>
            <select id="diffForm" name="LeaveType" @change="onChangeDifficulty" class="form-control">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
        <div class="btn-group">
          <button style="margin:5px;" type="button" class="btn" v-on:click="initQuestions()">Start Game!</button>
        </div>
      </div>   
    </div>
    </header>
</template>
<script>

export default {
    name: 'StartScreen',
    props: {},
    components: {},
    data() {
        return {
            leaveType: '',
            defaultUrl: 'https://opentdb.com/api.php?amount=5&category=10&difficulty=easy&type=boolean',
            apiURL : "https://noroff-trivia-api.herokuapp.com",
            apiKey : "1b23229d-18ca-48ec-bdeb-9c7445384f23",
            globalJson: "",
        }
    },
    async mounted() {
        this.setCategoryElements();
  }, 
    methods: {
        onChangeType(e) {
            console.log('The diff value is: ', e.target.value)
        },
        onChangeDifficulty(e) {
            console.log('The diff value is: ', e.target.value)
        },
        onChangeCategories(e) {
            console.log('The cat value is: ', e.target.value)
        },
        navigateToQuestionScreen() {

            this.$router.push({ path: '/question' });

        },
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
                console.log('Could not register user with service url: ' + apiURL);
                }
            },

        setCategoryElements: async function() {
        let response = fetch('https://opentdb.com/api_category.php');
        if((await response).status == 200){
            let categoryData = await (await response).json();
            await this.populateSelectCategories(categoryData);
        }
        else{
            console.log('Could not Http.get data with service url: https://opentdb.com/api_category.php');
        }
        },

        populateSelectCategories: function(categoryData) {
            var categoryForm = document.querySelector("#categoryForm");
            for(var i = 0; i < categoryData.trivia_categories.length; i++) {
                categoryForm.innerHTML =  categoryForm.innerHTML +'<option value=' + categoryData.trivia_categories[i].id + '>' + categoryData.trivia_categories[i].name + '</option>';
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

    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    },

        initGame : async function(serviceUrl, type) {
        
        let response = fetch(serviceUrl);

        if((await response).status == 200 && type == "boolean"){
            let data = await (await response).json();

            this.$store.state.globalTriviaDataJson = data;
            this.$store.state.category = data.results[0].category;
            this.$store.state.difficulty = data.results[0].difficulty;
            this.$store.state.nextQuestion= data.results[0].question;

            this.$store.state.toggleButton = true;

            this.$router.push({ path: '/question' });
        }
        else if((await response).status == 200 && type == "multiple"){
            let data = await (await response).json();

            console.log("object: " +  JSON.stringify(data));
            console.log("muli question");

            this.$store.state.globalTriviaDataJson = data;
            this.$store.state.category = data.results[0].category;
            this.$store.state.difficulty = data.results[0].difficulty;
            this.$store.state.nextQuestion = data.results[0].question;

            this.$store.state.questionList = data.results[0].incorrect_answers;
            this.$store.state.questionList.push(data.results[0].correct_answer);
            this.$store.state.questionList = this.shuffle(this.$store.state.questionList);

            this.$store.state.toggleButton = false;

            this.$router.push({ path: '/question' });
        }
        else{
            console.log('Could not send request with service url: ' + serviceUrl);
        }
        },

        initQuestions : async function() {

            var userName = document.querySelector("#userForm").value;
            var numberOfQ = document.querySelector("#numberOfQuestForm").value;
            var diff = document.querySelector("#diffForm").value;
            var categoryList = document.querySelector("#categoryForm").value;
            var typeList = document.querySelector("#typeForm").value;

            console.log(diff);
            console.log(userName);
            console.log(numberOfQ);
            console.log(categoryList);
            console.log(typeList);

            
            let apiURL = "https://noroff-trivia-api.herokuapp.com";
            let apiKey = "1b23229d-18ca-48ec-bdeb-9c7445384f23";
            let userUrl = 'https://opentdb.com/api.php?amount=' + numberOfQ + '&category=' + categoryList + '&difficulty=' + diff + '&type=' + typeList;

            if(userName == ""){
                alert("User name field is empty");
                console.log("default play");
                return;           
            }
           else if(userName != ""){
                let userResponse = fetch(`${apiURL}/trivia?username=${userName}`)
                if((await userResponse).status == 200){
                    console.log("User found");
                    //get user high score
                    await this.initGame(userUrl, typeList);
                    this.dataReady = true;
                    return;
                }
                else{
                    console.log("User set");
                    await this.setUserToApi(userName,"0",apiURL, apiKey);
                    await this.initGame(userUrl, typeList);
                    this.dataReady = true;
                }
            }
        }
    },

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
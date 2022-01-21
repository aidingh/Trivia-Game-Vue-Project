<template>

    <header v-on:click="navigateToQuestionScreen()">
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
            <label for="label"><b>Enter difficulty: </b></label>
            <select id="diffForm" name="LeaveType" @change="onChangeDifficulty" class="form-control">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
        </div>
        <div class="btn-group">
          <button style="margin:5px;" type="button" class="btn" v-on:click="registerUser()">Start Game!</button>
        </div>

      </div>
<ul id="questionList"></ul>
    </div>
    
    

    </header>
</template>

<script>
//import Button from './Button.vue'

export default {
    name: 'StartScreen',
    props: {
        title: String,
    },
    components: {
  //      Button,
    },
    data() {
        return {
            leaveType: '',
        }
    },

    methods: {
        onChangeDifficulty(e) {
            console.log('The diff value is: ', e.target.value)
        },
        onChangeCategories(e) {
            console.log('The cat value is: ', e.target.value)
        },
        navigateToQuestionScreen() {
            console.log("eyy");
            this.$router.push({ path: '/question' });

            //const router = this.$router;
            //router.push('/question-screen' );
           
        },
        mounted() {
            
        },
        populateSelectCategories: function(categoryData) {
            var categoryForm = document.querySelector("#categoryForm");
            
            console.log(categoryData.trivia_categories);
            //console.log(categoryData.trivia_categories[0].name);
            //console.log(categoryData.trivia_categories.length);

            for(var i = 0; i < categoryData.trivia_categories.length; i++) {
                categoryForm.innerHTML = categoryForm.innerHTML +'<option value=' + categoryData.trivia_categories[i].name + '>' + categoryData.trivia_categories[i].name + '</option>';
            }
        },
        registerUser : async function() {
            //let triviaServiceUrl = 'https://opentdb.com/api.php?amount=10';


            var userName = document.querySelector("#userForm").value;
            var numberOfQ = document.querySelector("#numberOfQuestForm").value;
            var diff = document.querySelector("#diffForm").value;
            var categoryList = document.querySelector("#categoryForm").value;

            console.log(diff);
            console.log(userName);
            console.log(numberOfQ);
            console.log(categoryList);

            var questionList = document.querySelector("#questionList");

            let response = fetch('https://opentdb.com/api.php?amount=10');


            if((await response).status == 200){
                let triviaData = await (await response).json();

                let obj = triviaData;
                console.log(obj);
                console.log(obj.results[0].question);

                questionList.innerHTML = obj.results.map(i => `<li>${' ' + i.question + ' ' } </li>`).join('');
            
            }
            else{
                console.log('Could not Http.get data with service url: ');
            }
        }
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
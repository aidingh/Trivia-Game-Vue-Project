<template>

    <header>
        <h2>Question Screen</h2>
        



    
    

    </header>
</template>

<script>

export default {
    name: 'QuestionScreen',
    props: {
        title: String,
    },



    methods: {
        onChangeDifficulty(e) {
            console.log('The diff value is: ', e.target.value)
        },
        onChangeCategories(e) {
            console.log('The cat value is: ', e.target.value)
        },
        mounted() {
            
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



</style>
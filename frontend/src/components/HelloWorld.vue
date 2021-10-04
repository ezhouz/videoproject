<template>
  <div>
    <label for="date">Enter your Hebrew date</label>
    <input v-model="engDate" type="date" name="" id="date">
<div></div>
    <button @click="convertDate(JSON.stringify(engDate))">Submit</button>
</div>
</template>

<script>

import axios from "axios";

export default {
  name: 'HelloWorld',
  data() {
    return {
      engDate: '',
    }
  },
  methods: {
    convertDate(date) {
      axios({
        method: 'post',
        url: "http://localhost:3000/convertdate",
        data: {
          date
        }
      })
      .then(res => console.log(res.data));
    }
  }
}
</script>

<style scoped>

</style>

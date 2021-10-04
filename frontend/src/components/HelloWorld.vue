<template>
  <div>
    <label for="date">Enter your Hebrew date</label>
    <input v-model="engDate" type="date" name="" id="date" />
    <button @click="convertDate(JSON.stringify(engDate), userIp)">Submit</button>

    {{ userIp }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  created() {
     axios.get(
        "http://api.ipstack.com/check?access_key=4eb1886879ef48f410afc7834ad84c31&fields=ip"
      )
      .then((res) => (this.userIp = res.data));
  },
  data() {
    return {
      engDate: "",
      userIp: "",
    };
  },
  methods: {
    convertDate(date, userIp) {
      axios({
        method: "post",
        url: "http://localhost:3000/create/convertdate",
        data: {
          date,
          userIp
        },
      }).then((res) => console.log(res.data));
    },
  },
};
</script>

<style scoped>
</style>

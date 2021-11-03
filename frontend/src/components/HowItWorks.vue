<template>
  <div class="how-it-works">
    <h3>How it works:</h3>
    <ul>
      <li v-for="(item, index) in items " :key="index">
        <div class="icon"><img :src="item.src" /></div><span>{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HowItWorks',
  data() {
    return {
      items: [
        {
          iconClass: 'calendar',
          src: 'images/vote/calendar.svg',
          text: 'Look up the date of your Jewish birthday, using our date converter.'
        },
        {
          iconClass: 'play',
          src: 'images/vote/play.svg',
          text: 'Record a video up to 1 minute (phone or camera) about how you will celebrate your birthday in a more meaningful and Jewish way, have some fun with it!'
        },
        {
          iconClass: 'upload',
          src: 'images/vote/upload.svg',
          text: 'Upload the video to A Jew is Born contest'
        },
        {
          iconClass: 'share',
          src: 'images/vote/share.svg',
          text: 'Share your submission with friends and family, to vote for you'
        },
        {
          iconClass: 'winner',
          src: 'images/vote/winner.svg',
          text: '8 winners will have a Jewish birthday bash, on the Chanukah Telethon, plus Birthday gifts to be gifted live on the telethon'
        }
      ]
    }
  }
}
</script>
<style scoped>
.how-it-works {
  margin: 4rem 0;
}
.how-it-works h3 {
  color: #EF91DC;
  font-size: 5rem;
  font-weight: bold;
}

.how-it-works ul {
  display: flex;
  flex-direction: column;
}

.how-it-works ul > li {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  font-size: 3rem;
  font-weight: 500;
  margin: 2rem 0;

}

.how-it-works ul > li .icon {
  width: 80px;
  height: 80px;
  margin: 0 2rem 0 0;
}

.how-it-works ul > li .icon img {
  width: auto;
  height: 100%;
}

.how-it-works ul > li span {

}
</style>

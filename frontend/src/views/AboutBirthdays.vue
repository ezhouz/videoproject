<template>
  <section>
    <Header title="WHAT IS A JEWISH BIRTHDAY AND HOW DO WE CELEBRATE?" />

    <div class="about-birthdate">
      <article class="so-great">
        <div class="so-great-text-and-image">
          <div class="so-great-text-wrapper">
            <div class="so-great-header medium">
              <h3 class="so-great-h3">
                WHAT’S SO GREAT ABOUT A JEWISH BIRTHDAY?
              </h3>
            </div>
            <div class="so-great-text">
              <p>
                The day you were born was the day you became your very own
                person.
              </p>
              <p class="thats-why-desktop">
                That’s why it’s a day to ponder: what have i accomplished by
                being here? Did the world change because i was born?
              </p>
            </div>
          </div>
          <div class="so-great-image-container">
            <img
              class="so-great-image"
              src="../../public/images/birthday/birthday-image.png"
              alt=""
            />
          </div>
        </div>

        <div class="thats-why-mobile">
          <p>
            THAT’S WHY IT’S A DAY TO PONDER: WHAT HAVE I ACCOMPLISHED BY BEING
            HERE? DID THE WORLD CHANGE BECAUSE I WAS BORN?
          </p>
        </div>
        <div class="heb-calendar">
          <p>
            When the Hebrew calendar comes back to the day you were born, try
            some of these customs:
          </p>
        </div>
      </article>
      <article style="margin-top: 2rem">
        <ul>
          <li
            style="display: flex; align-items: center"
            v-for="(custom, index) in customs"
            :key="index"
          >
            <div class="customs-image-wrapper" style="margin-right: 3rem">
              <img :src="custom.image" />
            </div>
            <div class="customs-text-wrapper">
              <p class="customs-text">
                {{ custom.text }}
              </p>
            </div>
          </li>
        </ul>
      </article>
      <article>
        <date-converter />
      </article>
      <telethon />
    </div>
  </section>
</template>

<script>
import DateConverter from "../components/DateConverter.vue";
import Telethon from '../components/Telethon.vue';
import Header from "../components/Header";

export default {
  name: "AboutBirthdays",
  components: {
    Header,
    DateConverter,
    Telethon,

  },
  data() {
    return {
      customs: [
        {
          image: "../../images/birthday/head.svg",
          text: "Think about what went right the past year, what went not-so-right, and what can be fixed",
        },
        {
          image: "../../images/birthday/walk.svg",
          text: "Take your life to a new level by committing to a new Mitzvah (good deed)",
        },
        {
          image: "../../images/birthday/extra-charity.svg",
          text: "Give extra charity",
        },
        {
          image: "../../images/birthday/book.svg",
          text: "Spend time praying, thank G-d, and ask for everything you need and desire",
        },
        {
          image: "../../images/birthday/celebrate.svg",
          text: "Celebrate with your friends and uplift each other to do more Mitzvot (good deeds)",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>

.about-birthdate {
  margin: 3rem;
}

.heb-calendar {
  margin-top: 2rem;
}
.heb-calendar p {
  font-size: 1.5rem;
  color: #316EDB;
  font-weight: 700;
  line-height: 1.5rem;
}
.so-great {
  display: flex;
  flex-direction: column;
}
.image-header {
  position: relative;
  text-align: center;
}
.so-great-text-and-image {
  display: flex;
}

.header-text-wrapper {
  width: 90%;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.so-great-image-container {
}
.so-great-image {
  width: 100%;
  height: auto;
}
.so-great-h3 {
  font-weight: bold;
  color: rgb(49, 110, 219);
  font-size: 2rem;
}
.so-great-text-wrapper {
  flex-basis: 60%;
}
.so-great-text p {
  font-size: 1.6rem;
}
.so-great-image-container {
  flex-basis: 40%;
}
.thats-why-desktop {
  display: none;
}
.thats-why-mobile {
  margin-top: 2rem;
  font-size: 1.6rem;
}

ul {
  padding-left: 0;
}
ul li p.customs-text {
  font-size: 2rem;
}

ul li .customs-image-wrapper {
  width: 80px;
  height: 80px;
}

ul li .customs-image-wrapper img {
  width: 100%;
  height: 100%;
  padding: 1rem;
}

@media (min-width: 600px) {
  .heb-calendar p {
    font-size: 3rem;
    line-height: 3rem;
  }
  .thats-why-desktop {
    display: block;
    font-size: 2.5rem;
  }
  .thats-why-mobile {
    display: none;
  }
  .so-great-h3 {
    font-size: 6rem;
    margin-bottom: 1rem;
  }
  .so-great-text {
    margin-top: 2rem;
  }
  .so-great-text p {
    font-size: 2.5rem;
  }
  ul li p.customs-text {
    font-size: 2rem;
  }

}
</style>

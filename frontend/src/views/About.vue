<template>
<section>
    <article>
        <ul>
            <li v-for="(program, index) in programlist" :key="index">
                <h3>{{program[0]}}</h3>
                <p v-if="program[1]">{{program[1]}}</p>
            </li>
        </ul>
    </article>
    <Telethon />
</section>
</template>

<script>
import Telethon from "../components/Telethon.vue"
export default {
  name: "about",
  components: {
      Telethon
  },
  data() {
    return {
      programlist: [
        ["The Chanukah Telethon Supports Life Saving Programs", ""],

        [
          "Good Deed Awards for Teenagers",
          "Annual Awards honoring High school students, regardless of race or religion, for their good deeds to humanity.",
        ],

        [
          "Drug & AIDS Prevention Outreach",
          "Narcan Training. Opioid Prevention Resources, Intervention and Drug Education. Visits to youth in Drug Rehabs, and outreach to those with AIDS.",
        ],

        [
          "Crisis Intervention Rehabilitation",
          "Disability Inclusion & Mental Health Awareness. No cost, confidential & broad range of social services for those at high risk. Helping to restore family stability. Domestic Violence Intervention.",
        ],

        [
          "Community Synagogue For the Unaffiliated.",
          "Adult Academy for Jewish Studies.",
        ],

        [
          "Toys for Hospitalized Children",
          "Visiting children in hospitals and bringing them gifts, and the feeling of belonging.",
        ],

        [
          "Hospital & Jail Visitation to the Lonely",
          "Brightening the spirits of senior citizens without family, in hospitals and nursing homes.",
        ],

        [
          "Hebrew Schools for the Unaffiliated",
          "Hundreds of children grades 1-6 learn of their Jewish heritage Sunday Hebrew schools.",
        ],

        [
          "Children’s Matzah Factory",
          "Thousands of children thrill with hands-on experience at making matzah. Brings joy & meaning to the Holidays.",
        ],

        [
          "The Friendship Circle",
          "Friends At Home Respite Program. Teenage volunteers extend a helping hand to children with special needs.",
        ],

        [
          "Bar/Bat Mitzvah for the Unaffiliated",
          "Providing children the lifetime chance to have a Bar/Bat Mitzvah without Synagogue affiliation.",
        ],

        [
          "Alternatives for Young Adults",
          "Advocacy & community service projects for young men & women facing judicial entanglement due to life’s challenges.",
        ],

        [
          "Taste of Shabbat",
          "Weekly delivery of challahs & grape juice to men & women in Shut-ins, Group Homes, Drug Rehabs & Correctional Centers.",
        ],

        [
          "The Renee & Jan Burman Chabad Center For The Arts",
          "Cultural Center for teenagers. Celebrating life through the language of music and the arts.",
        ],

        ["Weekly Radio Show ‘Jewish Talk’"],
      ],
    };
  },
};
</script>

<style scoped>
ul {
    list-style: none;
    padding: 0;
}
li {
    font-size: 1.8rem;
}
h3 {
    font-size: 2.4rem;
    margin: 3rem 0 1.5rem 0;
    font-weight: 700;
    color: #ef91dc;
}
h3:nth-child(odd) {
    color: #699af1;
}
</style>
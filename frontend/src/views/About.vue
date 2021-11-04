<template>
  <section>
    <article class="second-header">
      <article class="image-header">
        <div class="header-image-wrapper">
          <img
              src="../../public/images/register/Intersection_3_bl.png"
              alt=""
              class="header-image"
          />
        </div>
        <div class="header-text-wrapper">
          <h1 class="header-text" :class="$mq">
            The Chanukah Telethon<br/>
            Supports Life Saving Programs
          </h1>
        </div>
      </article>
      <div class="about-content">
        <h2>WHERE TO WATCH THE CHANUKAH TELETHON</h2>
        <h3 class="mbt-60">Watch The Presentation of Jewish Birthday Makeover Awards!</h3>
        <div class="two-cols-wrapper row">
          <div class="col-md-6 col-sm-12 col-xs-12 col medium">
            <h2 class="mbt-20">Live Music, Dancing Rabbis and many Surprises!</h2>
            <p><span class="marked">Telethon Hosts:</span>
              Jay Oliver, Rabbi Anchelle Perl and Kive Strickoff</p>
            <p>
              JBS TV Jewish Broadcasting Service NY, Long Island, 5 Boros, NJ, CT, FL
            </p>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <img class="photo-full" :class="$mq" src="images/about/photo-1.svg"/>
          </div>
        </div>
        <p class="medium">
          Comcast CH 1684, Optimum CH 138, Verizon Fios CH 798, Spectrum CH 219, 838,1223, Amazon TV, Apple TV.
        </p>
        <p class="medium">
          Streaming Online www.chanukahtelethon.com and Facebook Live
        </p>
        <h2 class="mbt-60">CORPORATE & COMMUNITY INVOLVEMENT</h2>
        <p class="bold">The Chanukah Telethon has become a tradition on in the Tri-State for its upbeat and uplifting
          presentation. This year marks the incredible 29th Telethon. Leaders in building and construction trades join
          us on the Live Telethon to let the public know they’re taking an active role in the efforts to help the
          community at large.
        </p>
        <img class="photo-full" src="images/about/photo-2.svg"/>
        <h2 class="mbt-60">CELEBRITY SUPPORT</h2>
        <p>Every year, a veritable “Who’s Who” of entertainers, leaders in business, government and glitterati of all
          persuasions are well represented and participate in the Chanukah Telethon. They come to show their support of
          the on-going humanitarian programs of the NCFJE Chabad Mineola.</p>
        <div class="two-cols-wrapper row">
          <div class="col-md-6 col-sm-12 col">
            <h2 class="mbt-60">AN EXTRAVAGANZA OF ENTERTAINMENT & SAVING LIVES
            </h2>
            <p>Behind the fun and entertainment of the Chabad Chanukah Telethon is a very serious purpose. It’s all
              about meeting the serious challenges of our times, it’s all about providing a warm “home away from home”
              for those who fall between the cracks.</p>
          </div>
          <div class="col-md-6 col-sm-12 col">
            <img class="photo-full" src="images/about/photo-3.svg"/>
          </div>
        </div>
        <h2 class="mbt-60">WHAT DOES THE TELETHON SUPPORT?</h2>
        <p>Always focused on the big picture, funds raised on the Chanukah Telethon provide the vital resources in
          uplifting the lives of individuals and families, in an atmosphere of inclusiveness and caring. The support and
          acceptance of every human being regardless of race, religion age or financial status is the trademark of the
          NCFJE Chabad Mineola.
        </p>
        <ul>
          <li v-for="(item, index) in items" :key="index">
            <div class="icon"><img class="photo-full" :src="'images/about/photo-list-' + (index + 1) + '.svg'" /></div>
            <div>
              <h4>{{item.title}}</h4>
              <p>{{item.text}}</p>
            </div>
          </li>
        </ul>
      </div>
    </article>
    <Telethon/>
  </section>
</template>

<script>
import Telethon from "../components/Telethon.vue"

export default {
  name: "About",
  components: {
    Telethon
  },
  data() {
    return {
      items: [
        {
          title: 'Good Deed Awards for Teenagers',
          text: 'Annual Awards honoring High school students, regardless of race or religion, for their good deeds to humanity.'
        },
        {
          title: 'Drug & AIDS Prevention Outreach',
          text: 'Narcan Training. Opioid Prevention Resources, Intervention and Drug Education. Visits to youth in Drug Rehabs, and outreach to those with AIDS.'
        },
        {
          title: 'Crisis Intervention Rehabilitation',
          text: 'Disability Inclusion & Mental Health Awareness. No cost, confidential & broad range of social services for those at high risk. Helping to restore family stability. Domestic Violence Intervention.'
        },
        {
          title: 'Community Synagogue',
          text: 'For the Unaffiliated. Adult Academy for Jewish Studies.'
        },
        {
          title: 'Toys for Hospitalized Children',
          text: 'Visiting children in hospitals and bringing them gifts, and the feeling of belonging. '
        },
        {
          title: 'Hospital & Jail Visitation to the Lonely',
          text: 'Brightening the spirits of senior citizens without family, in hospitals and nursing homes.'
        },
        {
          title: 'Hebrew Schools for the Unaffiliated ',
          text: 'Hundreds of children grades 1-6 learn of their Jewish heritage Sunday Hebrew schools.'
        },
        {
          title: 'Alternatives for Young Adults ',
          text: 'Advocacy & community service projects for young men & women facing judicial entanglement due to life’s challenges.'
        },
        {
          title: 'The Friendship Circle',
          text: 'Friends At Home Respite Program. Teenage volunteers extend a helping hand to children with special needs.'
        },
        {
          title: 'Bar/Bat Mitzvah for the Unaffiliated',
          text: 'Providing children the lifetime chance to have a Bar/Bat Mitzvah without Synagogue affiliation. '
        },
        {
          title: 'Children’s Matzah Factory',
          text: 'Thousands of children thrill with hands-on experience at making matzah. Brings joy & meaning to the Holidays.'
        },
        {
          title: 'Taste of Shabbat',
          text: 'Weekly delivery of challahs & grape juice to men & women in Shut-ins, Group Homes, Drug Rehabs & Correctional Centers.'
        },
        {
          title: 'The Renee & Jan Burman Chabad Center For The Arts.',
          text: 'Cultural Center for teenagers. Celebrating life through the language of music and the arts.'
        },
        {
          title: 'Weekly Radio Show ‘Jewish Talk’',
          text: ''
        },
      ]
    }
  },
};
</script>

<style scoped>
.about-content {
  padding: 8rem 10rem;
}

h2 {
  font-size: 4.6rem;
  font-weight: bold;
  color: #699AF1;
}

h3 {
  font-weight: bold;
  color: #000;
  font-size: 3rem;
}

p {
  font-size: 2.8rem;
  line-height: 5.2rem;
}

.photo-full {
  width: 100%;
}

.marked {
  color: #EF91DC;
  font-size: 4.6rem;
}


.about-content ul {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.about-content ul > li {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  font-size: 3rem;
  font-weight: 500;
  margin: 2rem 0;

}

.about-content ul > li .icon {
  width: 200px;
  height: 200px;
  margin: 0 2rem 0 0;
}

.about-content ul > li .icon img {
  width: auto;
  height: 100%;
}

.about-content ul > li h4 {
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
}
</style>

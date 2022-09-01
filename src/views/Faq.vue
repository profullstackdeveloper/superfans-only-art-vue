<template>
  <div class="creators">
    <div class="title-section">
      <h1 class="title is-left" :class="darkMode ? 'darkText' : ''">FAQ</h1>
      <p class="subtitle is-left pt-3" :class="darkMode ? 'darkText' : ''">
        Have Any Questions?
      </p>
    </div>
    <section class="FAQGroup Basic" :class="darkMode ? 'darkGroupMode' : ''">
      <div class="row-accordion">
        <div class="col-accordion columns is-gapless">
          <div class="tabs-accordion column is-two-thirds contact">
            <div v-for="(item, i) in items" :key="item" v-on:click="func(i)" class="tab-accordion">
              <input type="checkbox" :checked="item.show" name="rd" />
              <label class="tab-accordion-label" for="rd1">
                {{ item.title }}
              </label>
              <div
                class="tab-accordion-content"
                :class="darkMode ? 'darkText' : ''"
                v-if="item.show"
              >
               {{ item.content }}
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </section>
    <section class="FAQGroup About" :class="darkMode ? 'darkGroupMode' : ''">
      <div class="row-accordion">
        <div class="tabs-accordion is-two-thirds contact">
          <div class="tab-accordion">
            <input type="checkbox" id="rd17" name="rd" />
            <label class="tab-accordion-label" for="rd17">
              What is Super Fans Only?
            </label>
            <div
              class="tab-accordion-content"
              :class="darkMode ? 'darkText' : ''"
            >
              Super Fans Only is an NFT marketplace platform where NFTs can be
              stored, displayed, traded, and also minted.
            </div>
          </div>
          <div class="tab-accordion">
            <input type="checkbox" id="rd18" name="rd" />
            <label class="tab-accordion-label" for="rd18">
              What is Creator in Super Fans Only?
            </label>
            <div
              class="tab-accordion-content"
              :class="darkMode ? 'darkText' : ''"
            >
              Creator is a person that can mint NFT on Super Fans Only.
            </div>
          </div>
          <div class="tab-accordion">
            <input type="checkbox" id="rd19" name="rd" />
            <label class="tab-accordion-label" for="rd19">
              What is Creator Drops in Super Fans Only?
            </label>
            <div
              class="tab-accordion-content"
              :class="darkMode ? 'darkText' : ''"
            >
              Creator Drop is the specific NFT of a creator that is displayed on
              the User Site for sale and Auction.
            </div>
          </div>
          <div class="tab-accordion">
            <input type="checkbox" id="rd20" name="rd" />
            <label class="tab-accordion-label" for="rd20">
              What is Gallery in Super Fans Only?
            </label>
            <div
              class="tab-accordion-content"
              :class="darkMode ? 'darkText' : ''"
            >
              Gallery is the view of the purchased NFT of a specific creator.
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

export default {
  name: "Faq",
  mounted() {
    const store = useStore();
    store.dispatch("trackingPages", {
      protocol: window && window.location ? window.location.protocol : null,
      host: window && window.location ? window.location.host : null,
      port: window && window.location ? window.location.port : null,
      origin: window && window.location ? window.location.origin : null,
      pathname: window && window.location ? window.location.pathname : null,
      url: window && window.location ? window.location.href : null,
    });
  },
  components() {},
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    return {
      darkMode,
    };
  },
  data: () => {
    return {
      items:[
        {
          title:'What is Web 3.0?',
          content:"Web 3.0 (also known as web3) is the Internet's third iteration,which integrates data in a decentralized manner to provide a faster and more personalized user experience. It's made withartificial intelligence, machine learning, and the semantic web,and it employs the blockchain security system to keep your data safe.",
          show: false
        },
        {
          title:'What are the factors that are influencing the world of web 3.0?',
          content:"Web 3.0 (also known as web3) is the Internet's third iteration,which integrates data in a decentralized manner to provide a faster and more personalized user experience. It's made withartificial intelligence, machine learning, and the semantic web,and it employs the blockchain security system to keep your data safe.",
          show: false
        },
        {
          title:'What is NFT?',
          content:"Web 3.0 (also known as web3) is the Internet's third iteration,which integrates data in a decentralized manner to provide a faster and more personalized user experience. It's made withartificial intelligence, machine learning, and the semantic web,and it employs the blockchain security system to keep your data safe.",
          show: false
        },
        {
          title:'What is Web 3.0?',
          content:"Web 3.0 (also known as web3) is the Internet's third iteration,which integrates data in a decentralized manner to provide a faster and more personalized user experience. It's made withartificial intelligence, machine learning, and the semantic web,and it employs the blockchain security system to keep your data safe.",
          show: false
        },
        {
          title:'What is Web 3.0?',
          content:"Web 3.0 (also known as web3) is the Internet's third iteration,which integrates data in a decentralized manner to provide a faster and more personalized user experience. It's made withartificial intelligence, machine learning, and the semantic web,and it employs the blockchain security system to keep your data safe.",
          show: false
        },
        {
          title:'What is Web 3.0?',
          content:"Web 3.0 (also known as web3) is the Internet's third iteration,which integrates data in a decentralized manner to provide a faster and more personalized user experience. It's made withartificial intelligence, machine learning, and the semantic web,and it employs the blockchain security system to keep your data safe.",
          show: false
        },
        {
          title:'What is Web 3.0?',
          content:"Web 3.0 (also known as web3) is the Internet's third iteration,which integrates data in a decentralized manner to provide a faster and more personalized user experience. It's made withartificial intelligence, machine learning, and the semantic web,and it employs the blockchain security system to keep your data safe.",
          show: false
        },
        {
          title:'What is Web 3.0?',
          content:"Web 3.0 (also known as web3) is the Internet's third iteration,which integrates data in a decentralized manner to provide a faster and more personalized user experience. It's made withartificial intelligence, machine learning, and the semantic web,and it employs the blockchain security system to keep your data safe.",
          show: false
        },
        {
          title:'What is Web 3.0?',
          content:"Web 3.0 (also known as web3) is the Internet's third iteration,which integrates data in a decentralized manner to provide a faster and more personalized user experience. It's made withartificial intelligence, machine learning, and the semantic web,and it employs the blockchain security system to keep your data safe.",
          show: false
        },
        {
          title:'What is Web 3.0?',
          content:"Web 3.0 (also known as web3) is the Internet's third iteration,which integrates data in a decentralized manner to provide a faster and more personalized user experience. It's made withartificial intelligence, machine learning, and the semantic web,and it employs the blockchain security system to keep your data safe.",
          show: false
        },
        {
          title:'What is Web 3.0?',
          content:"Web 3.0 (also known as web3) is the Internet's third iteration,which integrates data in a decentralized manner to provide a faster and more personalized user experience. It's made withartificial intelligence, machine learning, and the semantic web,and it employs the blockchain security system to keep your data safe.",
          show: false
        },
      ]
    };
  },
  methods: {
    func: function(i) {
         this.items[i].show = !this.items[i].show;
         this.items.forEach((corrent, index) => {
            if(index !== i) corrent.show = false;
         });
    }
  },
};
</script>
<style scoped lang="scss">
@import "bulma/sass/utilities/mixins.sass";

@include tablet {
  .title-section {
    padding-bottom: 50px !important;
    padding-top: 50px !important;
  }
}

.title-section {
  padding-bottom: 20px;
  padding-top: 10px;
}

.creators {
  max-width: 1000px;
  margin: 0 auto;
}

.is-left {
  text-align: left;
}
h1 {
  margin: 0;
  line-height: 2;
  text-align: center;
}
h2 {
  margin: 0 0 0.5em;
  font-weight: normal;
}
input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
.FAQGroup {
  border: 1px solid #24252d;
  border-radius: 20px;
  position: relative;
  padding: 20px 40px;
  box-sizing: border-box;
}
.Basic::after {
  content: "Basic Domain Knowledge";
  color: #24252d;
  font-size: 26px;
  position: absolute;
  top: -20px;
  left: 20px;
  background-color: #fff;
  padding: 0 10px;
}
.About {
  margin-top: 50px;
}
.darkGroupMode {
  border-color: white;
}
.darkGroupMode.Basic::after {
  color: white !important;
  background-color: #24252d !important;
}
.darkGroupMode.About::after {
  color: white !important;
  background-color: #24252d !important;
}
.About::after {
  content: "About Platform";
  color: #24252d;
  font-size: 26px;
  position: absolute;
  top: -20px;
  left: 20px;
  background-color: #fff;
  padding: 0 10px;
}

.row-accordion.col-accordion {
  flex: 1;
}
.row-accordion.col-accordion:last-child {
  margin-left: 1em;
}
.tabs-accordion {
  overflow: hidden;
  width: 99.6666% !important;
}
.tab-accordion {
  overflow: hidden;
  margin-top: 15px;
  margin-bottom: 20px;
  max-width: 1100px;
  text-align: left;
}
.tab-accordion-label {
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background: #2d2e36;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  color: #fff;
}
.tab-accordion-content {
  max-height: 0;
  padding: 0 1em;
  color: #000;
  font-weight: 400;
  font-size: 1.7vw;
  position: relative;
}
@media screen and (max-width: 768px) {
  .tab-accordion-content {
    font-size: 1.2em;
  }
}
  

// .tab-accordion-content::after {
//   content: "\276F";
//   position: absolute;
//   width: 1em;
//   height: 1em;
//   left: 30px;
//   transition: all 0.35s;
//   top: 50%;
//   font-size: 18px;
//   transform: translate(0, -20%);
// }
.tab-accordion-label::after {
  content: "\276F";
  width: 1em;
  height: 1em;
  text-align: center;
  transition: all 0.35s;
  transform: rotate(0deg);
}

input:checked ~ .tab-accordion-label::after {
  transform: rotate(90deg);
}
input:checked ~ .tab-accordion-content {
  padding: 15px 33px 0px 55px;
  max-height: 100vh;
}
@media screen and(max-width:600px) {
  input:checked ~ .tab-accordion-content {
    padding: 10px 20px 0px 30px !important;
  }
  .tab-accordion-content::after {
    left: 15px !important;
  }
}
@media screen and(max-width:475px) {
  .FAQGroup {
    padding: 15px 20px;
  }
}
@media screen and(max-width:388px) {
  .Basic::after {
    font-size: 20px;
    top: -17px;
  }
  .About::after {
    font-size: 20px;
    top: -17px;
  }
}
@media screen and (max-width: 340px) {
  input:checked ~ .tab-accordion-content {
    padding: 5px 0px 0px 20px !important;
  }
  .tab-accordion-content::after {
    left: 5px !important;
  }
}
</style>

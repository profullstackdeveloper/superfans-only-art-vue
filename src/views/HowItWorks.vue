<template>
  <div class="how">
    <div class="title-section">
      <h1 class="title-contact" :class="darkMode ? 'darkText' : ''">
        How It Works
      </h1>
      <p class="subtitle-contact pt-3" :class="darkMode ? 'darkText' : ''">
        SuperFansOnly.art is the first & largest
      </p>
      <p class="subtitle-contact" :class="darkMode ? 'darkText' : ''">
        NFT store for NSFW content
      </p>
    </div>
    <section class="home-section">
      <div class="columns is-vcentered is-multiline">
        <div
          class="column is-12-mobile is-4-desktop"
          v-for="(item, index) in collections"
          :key="index"
        >
          <div class="card">
            <div class="card-image">
            <video  controls>
               <source :src="require(`../assets/videos/${item.video}`)" type="video/mp4">
              </video>
            </div>
            <div class="card-content">
              <div class="content">
                <p class="title is-6 mb-3">Method {{ item.id }}</p>
                {{item.description}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="py-4 px-6" :class="darkMode ? 'darkText' : ''">
      Features of Metamask:
       Use Metamask key vault, secure login, and digital wallet to manage your digital assets
       Generate passwords and keys on your phone and keep your account secure
       Browse and connect to the decentralized websites
       Control what information you share with the sites you use and what to keep private

      </p>
      <p class="py-4 px-6" :class="darkMode ? 'darkText' : ''">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </section>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
export default {
  name: "HowItWorks",
  mounted() {
    const store = useStore();
    document.getElementById('WEB3_CONNECT_MODAL_ID').style.display = 'none';
    store.dispatch("trackingPages", {
      protocol: window && window.location ? window.location.protocol : null,
      host: window && window.location ? window.location.host : null,
      port: window && window.location ? window.location.port : null,
      origin: window && window.location ? window.location.origin : null,
      pathname: window && window.location ? window.location.pathname : null,
      url: window && window.location ? window.location.href : null,
    });
  },
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    return {
      darkMode,
    };
  },
  data: function () {
    return {
      collections: [
        {
          id: 1,
          title: "Nanoe",
          description: "How to buy NFTs from Super Fans Only. ",
          video:"1.mp4"
        },
        {
          id: 2,
          title: "Nanoe",
          description: "Steps to set up your wallet using Browser::",
          video:"2.mp4"
        },
        {
          id: 3,
          title: "Nanoe",
          description: "How to set up a wallet, with explanations about seeds and private keys?",
          video:"3.mp4"

        },
      ],
    };
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
.how {
  max-width: 1000px;
  margin: 0 auto;
}

.title-contact {
  font-family: "Gilroy", sans-serif !important;
  font-style: normal;
  font-weight: 800;
  text-align: left;
  font-size: 2rem;
}
.subtitle-contact {
  font-family: "Montserrat", sans-serif !important;
  font-style: normal;
  text-align: left;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 105.7%;
  display: none;
}
@media screen and (max-width: 768px) {
  .subtitle-contact {
    display: flex;
  }
}
.card-content {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 5px;
  padding-right: 5px;
}
</style>

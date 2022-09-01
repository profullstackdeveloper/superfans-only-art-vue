<template>
  <div class="home">
    <section class="hero home-hero">
      <figure class="image inverted hero-image">
        <img :src="heroImg" />
      </figure>
    </section>
  </div>
  <Notification />
  <section class="home-section">
    <notable-drops-view />
    <creators-view />
  </section>
  <section class="banner-bottom-section pt-6">
    <figure class="image inverted">
      <img :src="bannerImg" />
    </figure>
  </section>
</template>

<script>
import avatarImg from "@/assets/avatar-img.png";
import cardImg from "@/assets/card-img.png";
import heroImg from "@/assets/hero.png";
import bannerImg from "@/assets/banner-img.png";
import Notification from "@/components/Notification.vue";
import CreatorsView from "./Creators.vue";
import NotableDropsView from "./NotableDrops.vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

export default {
  name: "Home",
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
    // store.dispatch("toggleShowAlert", {
    //   message: "Testing the Notification",
    //   isShow: true,
    //   notShowAlert: false,
    // });
  },
  setup() {
    const store = useStore();

    return {
      darkMode: computed(() => store.state?.darkMode),
    };
  },
  components: {
    CreatorsView,
    NotableDropsView,
    Notification,
  },
  data: function () {
    return {
      bannerImg,
      heroImg,
      cardImg,
      avatarImg,
      showDropsNum: 6,
      showCreatorsNum: 3,
    };
  },
};
</script>
<style lang="scss">
@import "bulma/sass/utilities/mixins.sass";

@include mobile {
  .home {
    margin: 0 auto;
  }
}
@include tablet {
  .home {
    margin: 0 auto;
  }
}
.is-left {
  text-align: left;
}
.card {
  background-color: black !important;
  border-radius: 1.25rem !important;
}
.card-content {
  width: 100%;
}
.is-horizontal {
  display: flex;
  flex-basis: 50ex;
  flex-grow: 0;
  flex-shrink: 1;
}

.media-left {
  padding-top: 30px;
  padding-left: 20px;
  font-size: 2.25rem;
  font-weight: bold;
  color: white;
}
.title-1 {
  margin-right: 9rem;
}
.button-load {
  color: #007de7;
  border: 1px solid #007de7;
  border-radius: 10px;
  padding: 10px 20px;
  width: 260px;
  background-color: white;
}
.button-load:hover {
  background-color: #3e8ed0;
  border-color: #3e8ed0;
  color: #fff;
}
.m-auto {
  margin: auto;
}
.green-background {
  background: turquoise;
}
.height-200 {
  height: 200px;
}
.splide__arrow--prev {
  left: -2em !important;
}
.splide__arrow--next {
  right: -2em !important;
}
.splide__pagination {
  bottom: -2em !important;
}
.hero-image {
  padding-top: 60px !important;
}
</style>

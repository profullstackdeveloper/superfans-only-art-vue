<template>
  <div v-show="!selectedGalleryToken?.tokenId">
    <Loader />
  </div>

  <div class="columns" v-show="selectedGalleryToken?.tokenId">
    <div class="column">
      <div class="">
        <img
          :src="selectedGalleryToken?.metadata?.image"
          alt=""
          class="cardImg"
        />
      </div>
      <section class="p-1">
        <h2 class="font-size-2em" :class="darkMode ? 'darkText' : ''">
          Media Assets
        </h2>
        <div class="gallery">
          <figure
            v-for="(item, index) in selectedGalleryToken?.metadata
              ?.media_assets"
            :key="index"
          >
            <img :src="item?.gatewayUrl" />

            <figcaption>
              <h3>{{ item?.contentType }}</h3>
              <div class="additional">
                <p v-for="(x, y) in item?.traits" :key="y">
                  {{ x?.trait_type }} : {{ x?.value }}
                </p>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
    <div class="column">
      <div class="is-left">
        <h1
          class="is-size-3 title pt-5 pb-3"
          :class="darkMode ? 'darkText' : ''"
        >
          {{ selectedGalleryToken?.metadata?.name }}
        </h1>
        <div class="columns is-multiline">
          <div
            v-for="(x, y) in selectedGalleryToken?.metadata?.traits"
            :key="y"
            :class="
              x.trait_type == 'superfansonly'
                ? ' column'
                : x.trait_type == 'onlyfans'
                ? 'is-one-quarter column'
                : 'is-full column'
            "
          >
            <div v-if="x?.trait_type === 'creator'">
              <p class="subtitle pt-2" :class="darkMode ? 'darkText' : ''">
                {{ x?.trait_type }}
              </p>
              <p
                class="is-flex is-align-content-center title avatar-desc"
                :class="darkMode ? 'darkText' : ''"
              >
                {{ x?.value }}
              </p>
            </div>
            <div v-if="x.trait_type == 'onlyfans'" title="Only Fans">
              <a :href="x.value">
                <svg
                  :fill="darkMode ? '#FFFFFF' : '#000000'"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 100 100"
                  width="50px"
                  height="50px"
                  style="enable-background: new 0 0 50 50"
                  xml:space="preserve"
                >
                  <path
                    :fill="darkMode ? '#FFFFFF' : '#000000'"
                    class="st0"
                    d="M46.1,0C20.6,0,0,20.7,0,46.3s20.7,46.2,46.3,46.1c25.5,0,46.1-20.7,46.1-46.2C92.4,20.7,71.7,0,46.1,0
                    C46.2,0,46.2,0,46.1,0z M46.1,87.6C23.2,87.5,4.7,68.9,4.8,46.1S23.4,4.8,46.3,4.8c22.8,0.1,41.3,18.6,41.3,41.4
                    c0,22.9-18.5,41.4-41.4,41.4C46.2,87.6,46.1,87.6,46.1,87.6L46.1,87.6z"
                  />
                  <path
                    :fill="darkMode ? '#FFFFFF' : '#000000'"
                    class="st1"
                    d="M65,42.4v-3.8c0-4.5-1.8-8.8-5.1-12c-3.2-3.2-7.6-5-12.2-5h-3.1c-4.6,0-8.9,1.8-12.2,5c-3.2,3.1-5.1,7.5-5.1,12
                    v3.8l-2.1,3.8v5.6c0,5,2,9.8,5.6,13.3c3.6,3.6,8.5,5.5,13.6,5.5h3.5c5.1,0,9.9-2,13.5-5.5c3.6-3.5,5.6-8.3,5.6-13.3v-5.6L65,42.4z
                    M48.2,59.5V64l0,0c0,0.7-0.3,1.3-0.9,1.6h-2c-0.6-0.4-0.9-1-0.9-1.7v-4.5c-2.7-1.1-4.1-4.1-3-6.9c0.8-2,2.8-3.4,4.9-3.4h0.3
                    c2.9,0,5.3,2.3,5.3,5.3c0,2.2-1.3,4.2-3.4,5H48.2z M57.3,42.6H35.1v-3.9c0-2.5,1-4.9,2.8-6.7c1.8-1.8,4.2-2.8,6.7-2.8h3.1
                    c2.5,0,4.9,1,6.7,2.8c1.8,1.7,2.8,4.1,2.8,6.6L57.3,42.6z"
                  />
                </svg>
              </a>
            </div>
            <p
              class="is-flex is-align-content-center avatar-desc"
              :class="darkMode ? 'darkText' : ''"
              v-if="x.trait_type == 'superfansonly'"
            >
              <a :href="x.value"> View Details in Super Fans </a>
            </p>
          </div>
        </div>

        <div class="description-container mt-6">
          <p
            class="is-size-4 title py-4 description"
            :class="darkMode ? 'darkText' : ''"
          >
            Description
          </p>
          <p class="subtitle py-3" :class="darkMode ? 'darkText' : ''">
            {{ selectedGalleryToken?.metadata?.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatarImg from "../assets/avatar-img.png";
import cardImg from "../assets/detail-img.png";
import eth from "../assets/eth.png";
import Loader from "@/components/Loader";

import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { watch } from "vue-demi";
export default {
  components: {
    Loader,
  },
  data: () => {
    return {
      cardImg,
      avatarImg,
      collection: {
        cardImg,
        avatarImg,
        eth,
        price: "0.549 ETH",
        dollar: "($2,233.90)",
        title: "Nanoe",
        description: "Mystery Drop 1 out of XX",
        buttonText: "Buy for 4.5 ETH",
      },
    };
  },
  mounted() {
    const route = useRoute();
    const store = useStore();
    const tokenId = route.params.id;
    store.dispatch("toggleLoader", { gallery: true });

    store.dispatch("getDetailedGallery", {
      tokenId,
      owner: "0x679bc59cd4A6de94A5f54B0030cAaef0ea763409",
      offset: 0,
      limit: 3,
    });
  },
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    const selectedGalleryToken = computed(
      () => store.state.selectedGalleryToken
    );
    watch(selectedGalleryToken, (curr) => {
      // console.log("monitoring my tokens", curr);
      if (curr) {
        store.dispatch("toggleLoader", { gallery: false });
      }
    });
    return {
      darkMode,
      selectedGalleryToken,
    };
  },
};
</script>

<style lang="scss" scoped>
.cardImg-container {
  padding: 50px;
}
.cardImg {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 25px;
}
.avatar-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.avatarImg-container {
  width: 70px;
  height: 70px;
}
.avatar {
  border-radius: 50%;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.avatar-desc {
  padding-left: 30px;
}
.info-container {
  padding: 50px;
}
.description {
  border-bottom: 1px solid black;
}
.coin-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.price {
  font-weight: bolder;
}
.button-container {
  width: 100%;
  max-width: 400px;
}
.btn-explore {
  background: #007de7;
  border-radius: 10px;
  border: none;
  color: #fff;
  padding: 10px 20px;
}
.bordered-top {
  border-top: 2px solid #f5f5f5;
}
.font-size-2em {
  font-size: 2em;
  margin-bottom: 0;
}
.gallery {
  display: grid;
  grid-template-columns: repeat(4, auto);

  figure {
    margin: 3px;
    overflow: hidden;
    position: relative;
    background-color: yellow;
    transition: background-color 0.5s;

    img {
      width: calc(100% + 60px);
      opacity: 0.7;
      transform: translate3d(0, -20px, 0) scale(1.12);
      transition: all 0.5s;
    }

    figcaption {
      position: absolute;
      padding: 1em 2em;
      top: 0;
      color: #fff;
      text-align: center;

      h3 {
        font-weight: bold;
        text-transform: uppercase;
        background: black;
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 3px;
      }

      .additional {
        font-family: "Montserrat";

        p {
          margin-bottom: 20px;
        }

        a {
          display: inline-block;
          background: white;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.5em;
          font-weight: bold;
          color: black;
          border-radius: 4px;
        }

        a:last-child {
          background: none;
          border: 1px solid white;
          color: white;
          margin-left: 5px;
        }
      }
    }

    figcaption::before {
      content: "";
      border-top: 60px solid white;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 30px;
      left: -75%;
      height: 100%;
      transform: rotateZ(-45deg) translate3d(0, -30%, 0);
      transition: transform 0.5s;
    }

    .additional {
      opacity: 0;
      transform: scale(1.3);
      transition: all 0.5s;
    }
  }

  figure:hover {
    background: black;
  }

  figure:first-child {
    margin-left: 0;
  }

  figure:hover img {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 0.4;
  }

  figure:hover .additional {
    padding-top: 30px;
    opacity: 1;
    transform: scale(1);
  }

  figure:hover figcaption::before {
    transform: rotateZ(-45deg) translate3d(0, 0, 0);
  }

  .width-100 {
    width: 100px;
  }
  .modify-bottom {
    width: 60%;
    margin-top: 30px;
  }
  .modify-top {
    margin-top: -10%;
  }
}
</style>
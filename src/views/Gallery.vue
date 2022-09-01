<template>
  <Loader v-show="showLoader?.gallery" />
  <div class="gallery">
    <div class="title-section columns">
      <div class="column is-12-mobile is-left">
        <h1 class="title is-left" :class="darkMode ? 'darkText' : ''">
          Gallery
        </h1>
        <p class="subtitle is-left pt-3" :class="darkMode ? 'darkText' : ''">
          Have a look at your personal collection
        </p>
      </div>

      <div v-if="!wallet?.connected" class="column is-12-mobile is-right">
        <button
          v-if="!wallet.connected"
          class="button btn-explore btn-connect connect-button px-2"
          @click="connectWallet()"
          ref="Btn"
        >
          Connect Wallet
        </button>
      </div>

      <div v-if="wallet?.connected" class="column is-12-mobile is-right">
        <div>
          <p :class="darkMode ? 'darkText' : ''">Account:</p>
          <p :class="darkMode ? 'darkText' : ''">
            {{ wallet?.account }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="
        title-section
        columns
        is-multiline
        is-flex
        is-justify-content-space-between
        is-align-items-center
      "
      v-if="wallet.connected"
    >
      <div>
        <!-- <p :class="darkMode ? 'darkText' : ''">Account:</p>
        <p :class="darkMode ? 'darkText' : ''">
          {{ wallet?.account }}
        </p> -->
      </div>
      <div class="column is-right" v-show="!isEmpty(myGalleryTokens)">
        <DropDown />
      </div>
    </div>

    <section class="gallery-section" v-if="wallet?.connected">
      <div v-show="isEmpty(myGalleryTokens)">
        <p :class="darkMode ? 'darkText' : ''">
          You don't own any SuperFansOnly NFTs yet. Have a look at one of the
          ongoing drops and buy your first NFT
        </p>
        <p :class="darkMode ? 'darkText' : ''">
          Use this link to buy some <a href="/explore">Notable Drops</a>
        </p>
      </div>
      <div
        class="columns is-multiline is-vcentered is-mobile"
        v-show="myGalleryTokens"
      >
        <div
          class="column is-6-mobile is-6-tablet is-4-desktop mt-6"
          v-for="(item, index) in myGalleryTokens"
          :key="index"
        >
          <Card
            :overlay="``"
            :overlayText="`NOT REVEALED YET`"
            :cardImg="item?.metadata?.image"
            :title="`${item?.metadata?.name}`"
            :description="FindTraits(item?.metadata?.traits, 'creator')?.value"
            :buttonText="`View Details`"
            :routeUrl="`/gallery/${item?.tokenId}`"
            :trackData="item"
            :trackEvent="`FLIP GALLERY NFT`"
            :trackExploreEvent="`VIEW GALLERY NFT DETAILS`"
          >
            <div class="section is-centered">
              <p :class="darkMode ? '' : 'darkText dark'">
                <strong
                  class="break-word"
                  :class="darkMode ? '' : 'darkText dark'"
                  >{{ item?.metadata?.description }}</strong
                >
              </p>
            </div>
          </Card>
        </div>
      </div>
      <!-- <div
        class="columns is-multiline is-vcentered is-mobile"
        v-show="galleryLists"
      >
        <div
          class="column is-6-mobile is-6-tablet is-4-desktop mt-6"
          v-for="(item, index) in galleryLists[0]?.tokens"
          :key="index"
        >
          <Card
            :overlay="``"
            :overlayText="`NOT REVEALED YET`"
            :cardImg="item?.metadata?.image"
            :title="`${item?.metadata?.name}`"
            :description="FindTraits(item?.metadata?.traits, 'creator')?.value"
            :buttonText="`View Details`"
            :routeUrl="`/gallery/${item?.tokenId}`"
            :trackData="item"
            :trackEvent="`FLIP GALLERY NFT`"
            :trackExploreEvent="`VIEW GALLERY NFT DETAILS`"
          >
            <div class="section is-centered">
              <p :class="darkMode ? '' : 'darkText dark'">
                <strong
                  class="break-word"
                  :class="darkMode ? '' : 'darkText dark'"
                  >{{ item?.metadata?.description }}</strong
                >
              </p>
            </div>
          </Card>
        </div>
      </div> -->
    </section>
  </div>

  <Modal :modalActive="modalActive" :darkMode="darkMode">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <div class="title-container is-border-bottom py-4">
            <div class="wallet-container" :class="darkMode ? '' : 'dark'">
              <img v-if="!darkMode" :src="walletWhite" alt="" />
              <img v-if="darkMode" :src="walletDark" alt="" />
            </div>
            <p
              class="title is-centered pl-3"
              :class="darkMode ? 'darkText' : ''"
            >
              Scan
            </p>
          </div>
        </div>
        <div class="message-container mx-3">
          <p class="py-4" :class="darkMode ? 'darkText' : ''">
            Scanning to retrive your tokens
          </p>
        </div>
        <div class="binance-container py-4">
          <div class="binance-img">
            <img :src="binanceLogo" alt="" />
          </div>
          <div class="binance-title-container">
            <p class="binance-title is-uppercase">BINANCE SMART CHAIN</p>
          </div>
        </div>
        <div
          class="address-info-container is-black-border"
          :class="darkMode ? 'is-white-border' : ''"
        >
          <div
            class="
              contract-container
              is-black-border-bottom is-flex is-justify-content-center
            "
            :class="darkMode ? 'is-white-border-bottom' : ''"
          >
            <p class="has-text-weight-bold" :class="darkMode ? 'darkText' : ''">
              Contract Address:
            </p>
            <p
              class="has-text-weight-normal pl-3"
              :class="darkMode ? 'darkText' : ''"
            >
              xxxxxxxxxx
            </p>
          </div>
          <div
            class="
              contract-container
              is-black-border-bottom is-flex is-justify-content-center
            "
            :class="darkMode ? 'is-white-border-bottom' : ''"
          >
            <p class="has-text-weight-bold" :class="darkMode ? 'darkText' : ''">
              Token Symbol:
            </p>
            <p
              class="has-text-weight-normal pl-3"
              :class="darkMode ? 'darkText' : ''"
            >
              SFO
            </p>
          </div>
          <div class="contract-container is-flex is-justify-content-center">
            <p class="has-text-weight-bold" :class="darkMode ? 'darkText' : ''">
              Token Found:
            </p>
            <p
              class="has-text-weight-normal pl-3"
              :class="darkMode ? 'darkText' : ''"
            >
              13
            </p>
          </div>
        </div>
        <div class="progress-container">
          <div class="message-container mx-3">
            <p class="py-4" :class="darkMode ? 'darkText' : ''">
              Scan Progress
            </p>
          </div>
          <div class="progress-bar">
            <progress class="progress is-info" value="60" max="100"></progress>
          </div>
          <div class="button-container py-6">
            <button @click="closeModalHandler()" class="btn-explore">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </article>
  </Modal>
</template>

<script>
import Card from "@/components/Card";
import DropDown from "@/components/DropDown";
import avatarImg from "../assets/avatar-img.png";
import walletDark from "../assets/wallet-dark.png";
import walletWhite from "../assets/wallet-white.png";
import cardImg from "../assets/card-img.png";
import binanceLogo from "../assets/binance-logo.png";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";

import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import { watch } from "vue-demi";
export default {
  name: "Gallery",
  mounted() {
    const store = useStore();
    const wallet = computed(() => store.state.wallet);
    console.log("checking wallet before loading", wallet.value);
    if (!wallet.value.connected) {
      store.dispatch("connectWallet");
    } else {
      store.dispatch("toggleLoader", { gallery: true });
      store.dispatch("getMyGalleryTokens", {
        // contract: "0x98c7D56a3DDC6Fe7096741a900460d47D36b0d67",
        owner: wallet.value?.account, //"0x679bc59cd4A6de94A5f54B0030cAaef0ea763409",
        offset: 0,
        limit: 3,
      });
    }
    // this.loadMarkerSDK();
    document.getElementById('WEB3_CONNECT_MODAL_ID').style.display = 'block';
  },

  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    const showLoader = computed(() => store.state.showLoader);
    const modalActive = computed(() => store.state.modalActive);
    const galleryLists = computed(() => store.state.gallery);
    const myGalleryTokens = computed(() => store.state.myGalleryTokens);
    const wallet = computed(() => store.state.wallet);
    // const FindGalleryImage = async (url) => {
    //   const res = await fetch(url);
    //   console.log(res, "chk img");
    //   return res.status;
    // };
    const isEmpty = (value) => {
      return (
        value === null || // check for null
        value === undefined || // check for undefined
        value === "" || // check for empty string
        (Array.isArray(value) && value.length === 0) || // check for empty array
        (typeof value === "object" && Object.keys(value).length === 0) // check for empty object
      );
    };
    watch(wallet, (curr, prev) => {
      console.log("after: ", curr, "before:", prev);
      if (curr.connected && !prev.connected) {
        console.log("it was not connect wen we came to the page");
        store.dispatch("getMyGalleryTokens", {
          // contract: "0x98c7D56a3DDC6Fe7096741a900460d47D36b0d67",
          owner: curr?.account, //"0x679bc59cd4A6de94A5f54B0030cAaef0ea763409",
          offset: 0,
          limit: 3,
        });
      }
    });
    watch(myGalleryTokens, (curr) => {
      console.log("monitoring my tokens", curr, typeof curr, isEmpty(curr));
      if (curr) {
        store.dispatch("toggleLoader", { gallery: false });
      }
    });
    const FindTraits = (arraylists, trait_type) =>
      arraylists?.find((item) => item.trait_type === trait_type);

    const closeModalHandler = () => {
      store.dispatch("toggleModal", {
        modalActive: false,
        modalActiveContent: "",
      });
    };
    const connectWallet = () => {
      store.dispatch("connectWallet");
    };

    return {
      darkMode,
      showLoader,
      modalActive,
      closeModalHandler,
      wallet,
      connectWallet,
      galleryLists,
      myGalleryTokens,
      // FindGalleryImage,
      FindTraits,
      isEmpty,
    };
  },
  data: () => {
    return {
      cardImg,
      avatarImg,
      walletDark,
      walletWhite,
      binanceLogo,
      collections: [
        {
          id: 1,
          cardImg,
          avatarImg,
          title: "Nanoe",
          description: "Mystery Drop 1 out of XX",
        },
        {
          id: 2,
          cardImg,
          avatarImg,
          title: "Nanoe",
          description: "Mystery Drop 1 out of XX",
        },
        {
          id: 3,
          cardImg,
          avatarImg,
          title: "Nanoe",
          description: "Mystery Drop 1 out of XX",
        },
        {
          id: 4,
          cardImg,
          avatarImg,
          title: "Nanoe",
          description: "Mystery Drop 1 out of XX",
        },
        {
          id: 5,
          cardImg,
          avatarImg,
          title: "Nanoe",
          description: "Mystery Drop 1 out of XX",
        },
        {
          id: 6,
          cardImg,
          avatarImg,
          title: "Nanoe",
          description: "Mystery Drop 1 out of XX",
        },
      ],
    };
  },

  components: {
    Card,
    Modal,
    DropDown,
    Loader,
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

.is-right {
  text-align: right;
}
.is-left {
  text-align: left;
}
.gallery {
  max-width: 1000px;
  margin: 0 auto;
}
.title-section {
  padding-bottom: 50px;
  padding-top: 20px;
}
.display-none {
  display: none;
}
.break-word {
  inline-size: 400px;
  overflow-wrap: break-word;
}
.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.wallet-container {
  border-radius: 50%;
  width: 54px;
  height: 54px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wallet-container img {
  width: 22px;
  height: 22px;
  object-fit: cover;
}
.is-border-bottom {
  border-bottom: 2px solid #f1f0f1;
}
.binance-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.binance-img {
  width: 40px;
  height: 40px;
}
.binance-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.binance-title-container {
  width: 100px;
  height: 46px;
}
.binance-title {
  color: #f3ba2f;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 21px;
  text-align: center;
}
.address-info-container {
  border-radius: 20px;
}
.is-black-border {
  border: 2px solid black;
}
.is-white-border {
  border: 2px solid #fff;
}
.is-black-border-bottom {
  border-bottom: 2px solid black;
}
.is-white-border-bottom {
  border-bottom: 2px solid #fff;
}
.progress-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.progress-bar {
  width: 300px;
  display: flex;
  justify-content: center;
}
.connect-button {
  font-size: 1rem !important;
}
</style>

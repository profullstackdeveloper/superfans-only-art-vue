<template>
  <nav
    class="navbar"
    :class="darkMode ? 'dark' : ''"
    role="navigation"
    aria-label="main navigation"
  >
    <div
      class="
        navbar-brand
        is-vcentered is-align-items-center is-justify-content-center
      "
    >
      <router-link
        class="navbar-item"
        to="/"
        :class="darkMode ? 'navitem' : ''"
      >
        <img :src="logo" width="140" class="" />
      </router-link>

      <a
        role="button"
        :class="openMenu ? 'navbar-burger is-active' : 'navbar-burger'"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="menuOpen()"
      >
        <span aria-hidden="true" :class="darkMode ? 'darkText' : ''"></span>
        <span aria-hidden="true" :class="darkMode ? 'darkText' : ''"></span>
        <span aria-hidden="true" :class="darkMode ? 'darkText' : ''"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-basic"
      :class="
        openMenu
          ? darkMode
            ? 'dark is-active'
            : 'is-active'
          : darkMode
          ? 'dark nav-hide'
          : 'nav-hide'
      "
    >
      <div class="navbar-end">
        <router-link
          to="/explore"
          class="navbar-item nav-list-menu"
          :class="darkMode ? 'darkText' : ''"
          v-on:click="menuOpen()"
        >
          Explore
        </router-link>

        <router-link
          to="/creators"
          class="navbar-item nav-list-menu"
          :class="darkMode ? 'darkText' : ''"
          v-on:click="menuOpen()"
        >
          Our Creators
        </router-link>

        <router-link
          to="/gallery"
          class="navbar-item nav-list-menu"
          :class="darkMode ? 'darkText' : ''"
          v-on:click="menuOpen()"
        >
          Gallery
        </router-link>

        <router-link
          to="/how-it-works"
          class="navbar-item nav-list-menu"
          :class="darkMode ? 'darkText' : ''"
          v-on:click="menuOpen()"
        >
          How It Works
        </router-link>
        <div class="navbar-item">
          <div class="nav-button buttons">
            <a
              class="button btn-connect"
              v-if="!wallet.connected"
              @click="connectWallet()"
              v-on:click="menuOpen()"
            >
              <strong>Connect</strong>
            </a>
            <a
              class="button btn-connect"
              v-if="wallet.connected"
              @click="disconnectWallet()"
              v-on:click="menuOpen()"
            >
              <strong>Disconnect</strong>
            </a>

            <a @click="toggleDarkMode()" v-on:click="menuOpen()">
              <img
                :src="darkMode ? sunImg : moonImg"
                width="25"
                height="25"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<style>
.btn-connect {
  background-color: #007de7 !important;
  border-radius: 10px !important;
  border: none !important;
  color: #fff !important;
  margin-right: 1rem;
}
</style>
<script>
import sunImg from "../assets/Sun.png";
import moonImg from "../assets/Moon.png";
import logo from "../assets/SuperFansOnly_Logo-Black-Background.svg";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
export default {
  name: "Navbar",

  setup() {
    var img = darkMode ? sunImg : moonImg;
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    const wallet = computed(() => store.state.wallet);
    const toggleDarkMode = () => {
      store.dispatch("trackingEvents", {
        event: "CHANGE THEME",
        data: darkMode.value,
      });
      store.dispatch("toggleDarkMode");
      img = moonImg;
      let navbarBurger = document.getElementsByClassName("navbar-burger");
      if (navbarBurger.length > 0) {
        if (navbarBurger[0].classList.contains("is-active"))
          navbarBurger[0].classList.remove("is-active");
      }
    };
    const disconnectWallet = () => {
      store.dispatch("disconnectWallet");
    };
    const connectWallet = () => {
      store.dispatch("connectWallet");
    };

    return {
      img,
      darkMode,
      toggleDarkMode,
      wallet,
      disconnectWallet,
      connectWallet,
    };
  },

  mounted() {},
  data: () => {
    return {
      sunImg,
      moonImg,
      logo,
      openMenu: false,
    };
  },
  methods: {
    menuOpen: function () {
      console.log("menu open called!!", this.openMenu);
      this.openMenu = !this.openMenu;
    },
  },
};
</script>

<style scoped>
.navbar-menu.is-active .navbar-end {
  width: 200px;
  margin: 0px auto;
  text-align: justify;
}
.navbar-item img {
  max-height: 150px;
  max-width: 150px;
  margin-right: 1rem;
  margin-left: 1rem;
}
.navbar-basic {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
@media (max-width: 1024px) {
  .navbar-basic {
    display: unset;
    justify-content: unset;
    width: unset;
  }
  .nav-hide {
    display: none !important;
  }
}
@media screen and (max-width: 768px) {
  .navbar-item img {
    max-height: 90px;
    max-width: 90px;
  }

  .nav-button {
    justify-content: center;
  }

  .nav-list-menu {
    padding-left: 3rem;
  }
}
.navbar-burger {
  position: absolute;
  right: 5%;
}
a.navbar-item:focus,
a.navbar-item:focus-within,
a.navbar-item:hover {
  background-color: transparent !important;
}
a.navbar-item:visited,
a.navbar-item:visited {
  background-color: transparent !important;
}
.navbar-burger span {
  width: 36px !important;
}
.navbar-burger span:nth-child(1) {
  top: calc(50% - 12px) !important;
}
.navbar-burger span:nth-child(3) {
  top: calc(50% + 10px) !important;
}
.navbar-burger.is-active span:nth-child(1) {
  transform: translateY(11px) rotate(45deg) !important;
}
.navbar-burger.is-active span:nth-child(3) {
  transform: translateY(-11px) rotate(-45deg) !important;
}
.navbar-burger span {
  left: calc(50% - 16px) !important;
}
</style>

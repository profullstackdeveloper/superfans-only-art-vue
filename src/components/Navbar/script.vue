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
<template>
  <Loader v-show="showLoader?.payments" />
  <div class="content">
    <div class="logo-container">
      <p class="title is-centered" :class="darkMode ? 'darkText' : ''">
        <img :src="logo" width="60" height="60" class="" />
      </p>
    </div>
    <div class="information-container">
      <div class="qrcode-container" v-show="showQRCode">
        <qrcode-vue
          :value="
            FindDeepLink(
              paymentDeposit?.result?.transferInstruction?.links,
              selected?.symbol
            )?.link
          "
          :size="200"
          level="H"
          class="py-1 px-2"
        />
      </div>
      <p
        class="is-centered"
        :class="darkMode ? 'darkText' : ''"
        v-show="showQRCode"
      >
        Scan payment address
      </p>
      <div class="amount-container">
        <div class="is-flex is-justify-content-center is-align-content-start">
          <p
            class="is-size-2 is-centered mt-5"
            :class="darkMode ? 'darkText' : ''"
          >
            {{ paymentDeposit?.result?.amount }}
          </p>
          <figure class="image is-48x48">
            <img
              v-if="paymentDeposit"
              :src="FindIcon(paymentDeposit?.result?.currency)"
              alt=""
            />
          </figure>
        </div>
        <div class="smaller-container">
          <p class="is-centered pr-2 pt-4" :class="darkMode ? 'darkText' : ''">
            {{ paymentDeposit?.result?.transferInstruction?.tokenAmount }}
          </p>
          <div class="coinImg-container">
            <img
              v-if="paymentDeposit"
              :src="
                FindIcon(
                  paymentDeposit?.result?.transferInstruction?.tokenSymbol
                )
              "
              alt=""
            />
          </div>
        </div>
        <p class="is-centered" :class="darkMode ? 'darkText' : ''">
          <span>WARNING: </span>
          This is a testnet transaction. Please ensure funds are sent from your
          test wallets.
        </p>
      </div>
      <div class="paywith-container is-left pt-4 px-4">
        <p :class="darkMode ? 'darkText' : ''">Paying With:</p>
        <div class="selected-payment pt-2">
          <p
            class="is-centered pr-2 pt-5 is-flex is-flex-direction-column"
            :class="darkMode ? 'darkText' : ''"
            v-if="paymentDeposit"
          >
            <span class="is-size-4">
              {{
                FindIconName(
                  paymentDeposit?.result?.transferInstruction?.tokenSymbol
                )?.name
              }}
            </span>
            <span class="is-size-6">
              Chain Name: ({{
                FindIconName(
                  paymentDeposit?.result?.transferInstruction?.tokenSymbol
                )?.chainName
              }})
            </span>
          </p>
          <div class="coinSelectImg-container">
            <img
              v-if="paymentDeposit"
              :src="
                FindIcon(
                  paymentDeposit?.result?.transferInstruction?.tokenSymbol
                )
              "
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="paywith-container is-left p-4">
        <p :class="darkMode ? 'darkText' : ''">Wallet Provider :</p>
        <div class="is-flex is-justify-content-center is-align-items-center">
          <div class="selector">
            <div class="selectField" @click="toggleShowDropdown()">
              <div v-if="selected" class="selectedField">
                <img :src="selected.img" alt="" />
                <span class="pl-3"> {{ selected.description }} </span>
              </div>
              <p v-else>
                <span> Select Wallet </span>
              </p>
              <span class="icon" :class="showDropdown ? 'rotate' : ''">
                <i class="fas fa-chevron-down"></i>
              </span>
            </div>
            <ul class="walletList" v-show="showDropdown">
              <li
                class="walletOption"
                :class="selected.id === item.id ? 'selectedOption' : ''"
                v-for="item in walletImgs"
                v-bind:key="item.id"
                @click="SelectedWalletHandler(item)"
              >
                <img :src="item.img" alt="" />
                <p>{{ item.description }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="count-down">
        <counter
          :showDay="false"
          :showHour="false"
          :deadlineISO="deadlineISO"
          :stop="stop"
        />
      </div>
      <div class="buttons is-flex is-justify-content-center are-medium">
        <button class="button is-info is-outlined" @click="cancelPayment()">
          Cancel
        </button>
        <button
          v-show="payBtn"
          class="button btn-explore"
          @click="isMobile() ? payHandler() : desktopPay()"
        >
          Pay
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import logo from "../assets/SuperFansOnly_Logo-Black-Background.svg";
import QrcodeVue from "qrcode.vue";
import Loader from "@/components/Loader";

import METAMASK from "../assets/METAMASK-payment.svg";
import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";
import moment from "moment";
import { watch } from "@vue/runtime-core";
import Counter from "./Counter.vue";
import { onMounted } from "vue";
import { useMobileDetection } from "vue3-mobile-detection";

export default {
  data: () => {
    return {
      deadlineISO: moment(moment()).add(15, "m").toDate(),
      stop: false,
    };
  },
  mounted() {},
  setup() {
    const { isMobile } = useMobileDetection();
    const store = useStore();
    const showLoader = computed(() => store.state.showLoader);

    const darkMode = computed(() => store.state.darkMode);
    const paymentDeposit = computed(() => store.state.payment);
    const collection = computed(() => store.state.collection);
    const selected_coin = computed(() => store.state.selected_coin);
    const selected_coin_data = computed(() => store.state.selected_coin_data);
    const coin_providers = computed(() => store.state.coin_providers);
    const modalActiveContent = computed(() => store.state.modalActiveContent);
    const walletImgs = computed(() => store.state.walletImgs);
    const selectedCreatorDropAsset = computed(
      () => store.state.selectedCreatorDropAsset
    );
    const selectedCreator = computed(() => store.state.selectedCreator);

    const FindWalletImgs = (arraylist, wallet) =>
      arraylist?.find((item) => item.name === wallet);
    const FindDeepLink = (arraylist, symbol) => {
      const res = arraylist?.find((item) => item.wallet === symbol);
      return res;
    };
    const selected = ref(null);
    const message = ref(null);
    const showDropdown = ref(false);
    const payBtn = ref(false);
    const showQRCode = ref(false);
    onMounted(() => {
      if (isMobile()) {
        const res = FindWalletImgs(walletImgs.value, "METAMASK_MOBILE");
        selected.value = res;
        payBtn.value = true;
        showQRCode.value = false;
      } else {
        if (typeof window.ethereum !== "undefined") {
          const res = FindWalletImgs(walletImgs.value, "METAMASK_WALLET");
          selected.value = res;
          payBtn.value = true;
          showQRCode.value = false;
          message.value = null;
        } else if (typeof window.BinanceChain !== "undefined") {
          const res = FindWalletImgs(walletImgs.value, "BINANCE_WALLET");
          selected.value = res;
          payBtn.value = true;
          showQRCode.value = false;
          message.value = null;
        } else {
          const res = FindWalletImgs(walletImgs.value, "METAMASK_MOBILE");
          selected.value = res;
          payBtn.value = false;
          showQRCode.value = true;
          message.value = null;
        }
      }
    });

    const toggleShowDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const SelectedWalletHandler = (wallet) => {
      selected.value = wallet;
      showDropdown.value = !showDropdown.value;
      if (isMobile()) {
        if (wallet.name === "METAMASK_MOBILE") {
          payBtn.value = true;
          showQRCode.value = false;
        } else {
          payBtn.value = true;
          showQRCode.value = false;
        }
      } else {
        if (wallet.name === "METAMASK_WALLET") {
          if (typeof window.ethereum !== "undefined") {
            payBtn.value = true;
            showQRCode.value = false;
            message.value = null;
          } else {
            payBtn.value = false;
            showQRCode.value = false;
            message.value = "Please Unlock your Metamask";
          }
        } else if (wallet.name === "BINANCE_WALLET") {
          if (typeof window.BinanceChain !== "undefined") {
            payBtn.value = true;
            showQRCode.value = false;
            message.value = null;
          } else {
            payBtn.value = false;
            showQRCode.value = false;
            message.value = "Please Unlock your Binance Chain Wallet";
          }
        } else if (wallet.name === "METAMASK_MOBILE") {
          payBtn.value = false;
          showQRCode.value = true;
        } else {
          payBtn.value = false;
          showQRCode.value = true;
        }
      }
    };
    watch(showLoader, (curr) => {
      if (!curr.payments) {
        payBtn.value = true;
        return;
      }
    });
    watch(modalActiveContent, (curr) => {
      let counter = 0;

      if (curr == "DEPOSIT") {
        var i = setInterval(function () {
          counter++;
          if (counter % 5 === 0) {
            if (
              paymentDeposit?.value?.result?.status === "not seen" ||
              paymentDeposit?.value?.result?.status === "pending"
            )
              store.dispatch("getPaymentDeposit", {
                customerId: paymentDeposit?.value.result?.customerId,
                depositId: paymentDeposit?.value.result?._id,
                dropDetails: {
                  creatorId: selectedCreator.value?.Drop?.creatorId,
                  dropId: selectedCreator.value?.Drop?.creatorDropId,
                  assetId: selectedCreatorDropAsset.value?._id,
                  status: "SOLD",
                },
              });
          } else if (paymentDeposit?.value?.result?.status === "confirmed") {
            this.stop = true;
            counter = 0;
            clearInterval(i);
            store.dispatch("toggleLoader", { payments: false });
            store.dispatch("toggleModal", {
              modalActive: true,
              modalActiveContent: "PAY-SUCCESS",
            });
          } else if (paymentDeposit?.value?.result?.status === "cancelled") {
            this.stop = true;
            counter = 0;
            clearInterval(i);
          }
          if (counter === 15 * 60) {
            this.stop = true;
            counter = 0;
            clearInterval(i);
            store.dispatch("cancelPaymentDeposit", {
              customerId: paymentDeposit?.value.result?.customerId,
              depositId: paymentDeposit?.value.result?._id,
              dropDetails: {
                creatorId: selectedCreator.value?.Drop?.creatorId,
                dropId: selectedCreator.value?.Drop?.creatorDropId,
                assetId: selectedCreatorDropAsset.value?._id,
                status: "FOR SALE",
              },
            });
            store.dispatch("toggleModal", {
              modalActive: false,
              modalActiveContent: "",
            });
          }
        }, 1000);
      }
    });
    const closeModalHandler = () => {
      store.dispatch("toggleModal", {
        modalActive: false,
        modalActiveContent: "",
      });
    };
    const payHandler = () => {
      store.dispatch("toggleLoader", { payments: true });
      payBtn.value = false;
      store.dispatch("trackingEvents", {
        event: "PAY NFT WITH DESKTOP WALLET",
        data: paymentDeposit.value,
      });
      window.open(
        FindDeepLink(
          paymentDeposit.value?.result?.transferInstruction?.links,
          selected.value?.symbol
        )?.link
      );
    };
    const desktopPay = () => {
      store.dispatch("toggleLoader", { payments: true });
      payBtn.value = false;
      if (selected.value?.name === "METAMASK_WALLET") {
        if (typeof window.ethereum !== "undefined") {
          store.dispatch("sendWalletTransaction", {
            wallet: "METAMASK",
            toAddress:
              paymentDeposit.value?.result?.transferInstruction
                ?.tokenContractAddress ||
              paymentDeposit.value?.result?.transferInstruction?.toAddress,
            data: paymentDeposit.value?.result?.transferInstruction?.data,
            customerId: paymentDeposit?.value.result?.customerId,
            depositId: paymentDeposit?.value.result?._id,
            chainId: paymentDeposit.value?.result?.transferInstruction?.chainId,
          });
        } else {
          message.value = "Please Unlock Metamask";
        }
      } else if (selected.value?.name === "BINANCE_WALLET") {
        if (typeof window.BinanceChain !== "undefined") {
          store.dispatch("sendWalletTransaction", {
            wallet: "BINANCE",
            toAddress:
              paymentDeposit.value?.result?.transferInstruction
                ?.tokenContractAddress ||
              paymentDeposit.value?.result?.transferInstruction?.toAddress,
            data: paymentDeposit.value?.result?.transferInstruction?.data,
            customerId: paymentDeposit?.value.result?.customerId,
            depositId: paymentDeposit?.value.result?._id,
            chainId: paymentDeposit.value?.result?.transferInstruction?.chainId,
          });
        } else {
          message.value = "Please Unlock your Binance Chain Wallet";
        }
      } else {
        return;
      }
    };
    const cancelPayment = () => {
      store.dispatch("cancelPaymentDeposit", {
        customerId: paymentDeposit?.value.result?.customerId,
        depositId: paymentDeposit?.value.result?._id,
        dropDetails: {
          creatorId: selectedCreator.value?.Drop?.creatorId,
          dropId: selectedCreator.value?.Drop?.creatorDropId,
          assetId: selectedCreatorDropAsset.value?._id,
          status: "FOR SALE",
        },
      });
      store.dispatch("toggleModal", {
        modalActive: false,
        modalActiveContent: "",
      });
      if (isMobile()) {
        const res = FindWalletImgs(walletImgs.value, "METAMASK_MOBILE");
        selected.value = res;
        payBtn.value = true;
        showQRCode.value = false;
      } else {
        if (typeof window.ethereum !== "undefined") {
          const res = FindWalletImgs(walletImgs.value, "METAMASK_WALLET");
          selected.value = res;
          payBtn.value = true;
          showQRCode.value = false;
          message.value = null;
        } else if (typeof window.BinanceChain !== "undefined") {
          const res = FindWalletImgs(walletImgs.value, "BINANCE_WALLET");
          selected.value = res;
          payBtn.value = true;
          showQRCode.value = false;
          message.value = null;
        } else {
          const res = FindWalletImgs(walletImgs.value, "METAMASK_MOBILE");
          selected.value = res;
          payBtn.value = false;
          showQRCode.value = true;
          message.value = null;
        }
      }
    };
    const FindWalletLogo = (wallet) => {
      return wallet !== "METAMASK" ? METAMASK : METAMASK;
    };
    let walletLogo;
    switch (
      paymentDeposit?.value?.result?.transferInstruction?.links[0].wallet
    ) {
      case "METAMASK":
        walletLogo = METAMASK;
        break;

      default:
        walletLogo = logo;
        break;
    }

    const FindIcon = (key) =>
      coin_providers.value?.find((item) => item.symbol === key)?.icon;

    const FindIconName = (key) =>
      coin_providers.value?.find((item) => item.symbol === key);

    return {
      logo,
      walletLogo,
      closeModalHandler,
      darkMode,
      paymentDeposit,
      selected_coin,
      selected_coin_data,
      collection,
      payHandler,
      desktopPay,
      cancelPayment,
      FindWalletLogo,
      FindIcon,
      FindIconName,
      isMobile,
      walletImgs: isMobile()
        ? walletImgs.value?.filter((item) => item.mobile)
        : walletImgs.value,
      SelectedWalletHandler,
      selected,
      showDropdown,
      toggleShowDropdown,
      payBtn,
      showQRCode,
      FindDeepLink,
      showLoader,
    };
  },
  components: {
    QrcodeVue,
    Counter,
    Loader,
  },
};
</script>
<style scoped>
.qrcode-container canvas {
  background: #fff;
}
.smaller-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.coinImg-container {
  width: 24px;
  height: 24px;
}
.coinImg-container img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.coinSelectImg-container {
  width: 28px;
  height: 28px;
}
.coinSelectImg-container img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.full-width {
  width: 100%;
}
.modal-content {
  max-height: calc(100vh - 100px);
}
.selected-payment {
  display: flex;
  justify-content: center;
  align-items: center;
}

.selector {
  width: 350px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}
.selectField {
  width: 100%;
  padding: 15px 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.selectField img {
  width: 12px;
}

.selectedField {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.selectedField img {
  width: 25px;
}
.walletList {
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  overflow: hidden;
  transition: max-height 0.5s, overflow 0s;
}
.walletOption {
  width: 100%;
  padding: 15px 0 15px 70px;
  list-style: none;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  transition: max-height 0.5s, overflow 0.5s 0.5s;
}
.walletOption img {
  width: 25px;
  position: absolute;
  top: 12px;
  left: 25px;
}
.walletOption:hover {
  background: rgba(255, 255, 255, 0.7);
}
.selectedOption {
  background: rgba(255, 255, 255, 0.7);
}
.rotate {
  transform: rotate(180deg);
}

.icon {
  transition: transform 0.5s;
}
.content ul {
  list-style: disc outside;
  margin-left: 0px;
  margin-top: 0px;
}
</style>
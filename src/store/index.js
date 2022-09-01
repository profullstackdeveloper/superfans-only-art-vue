import { createStore } from "vuex";
import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { BscConnector } from "@binance-chain/bsc-connector";
import * as uccSdk from "ucc-sdk";

import eth from "@/assets/eth.png";
import avatarImg from "@/assets/avatar-img.png";
import cardImg from "@/assets/detail-img.png";
import smallImg from "@/assets/small-img.png";

import BNBICON from "@/assets/BNB-icon.png";
import ETHICON from "@/assets/ETH-icon.png";
import MATICICON from "@/assets/MATIC-icon.png";
import PRTICON from "@/assets/PRT-icon.png";
import USDCICON from "@/assets/USDC-logo.png";
import METAMASKICON from "@/assets/METAMASK-payment.svg";
import TWTICON from "@/assets/TWT.png";

const providerOptions = {
  binancechainwallet: {
    package: true,
    display: {
      name: "Binance Chain",
    },
  },
  walletconnect: {
    package: WalletConnectProvider, // required
    display: {
      name: "Wallet Connect",
    },
    options: {
      infuraId: "8acc78d5beb44a14aa0a70a712c14811",
      rpc: {
        56: "https://bsc-dataseed.binance.org/",
        97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      },
    },
  },
};

let provider;

let bsc = new BscConnector({
  supportedChainIds: [56, 97], // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
});

const InititalizeTracking = () => {
  const apiKey = "live_soon_to_be_deprecated";
  const stage = "dev";
  uccSdk.track.initialize(
    process.env.VUE_APP_VUE_CUSTOMER_ID,
    process.env.VUE_APP_VUE_PROJECT_ID,
    apiKey,
    null,
    stage
  );
};

const state = {
  myGalleryTokens: [],
  selectedGalleryToken: {},
  gallery: [],
  walletImgs: [
    {
      id: 1,
      img: METAMASKICON,
      name: "METAMASK_WALLET",
      symbol: "METAMASK",
      description: "Metamask",
      mobile: false,
    },
    {
      id: 2,
      img: BNBICON,
      name: "BINANCE_WALLET",
      symbol: "METAMASK",
      description: "Binance Chain Wallet",
      mobile: false,
    },
    {
      id: 3,
      img: METAMASKICON,
      name: "METAMASK_MOBILE",
      symbol: "METAMASK",
      description: "Metamask (mobile app)",
      mobile: true,
    },
    {
      id: 4,
      img: TWTICON,
      name: "TRUST_WALLET",
      symbol: "TRUSTWALLET",
      description: "Trust Wallet",
      mobile: true,
    },
  ],
  showAlert: {
    isShow: false,
    notShowAlert: true,
    message: "",
  },
  showLoader: {
    creators: false,
    notableDrops: false,
    payments: false,
    explores: false,
    gallery: false,
  },
  tracking: false,
  metamaskWallet: {
    account: "",
    chainId: "",
    connected: false,
    sent: false,
  },
  binanceWallet: {
    account: "",
    chainId: "",
    connected: false,
    sent: false,
  },
  web3Modal: new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
  }),
  library: null,
  active: false,
  account: null,
  chainId: 0,
  wallet: {
    account: "",
    chainId: "",
    balance: "",
    connected: false,
  },
  selected_coin: "",
  selected_coin_data: {},
  chains: [
    {
      chainName: "Binance Smart Chain",
      networks: [
        {
          name: "Mainnet",
          id: 56,
        },
        {
          name: "Testnet",
          id: 97,
        },
      ],
    },
    {
      chainName: "Ethereum",
      networks: [
        {
          name: "Mainnet",
          id: 1,
        },
        {
          name: "Görli",
          id: 5,
        },
      ],
    },
    {
      chainName: "Polygon",
      networks: [
        {
          name: "Mainnet",
          id: 137,
        },
        {
          name: "Testnet",
          id: 80001,
        },
      ],
    },
  ],
  coin_providers: [
    {
      symbol: "BNB",
      icon: BNBICON,
      name: "Binance Coin",
      chainName: "Binance Smart Chain",
      networks: [
        {
          link: "https://bscscan.com/address/",
          name: "Mainnet",
          id: 56,
        },
        {
          link: "https://testnet.bscscan.com/address/",
          name: "Testnet",
          id: 97,
        },
      ],
    },
    {
      symbol: "USDC",
      icon: USDCICON,
      name: "USDC stablecoin",
      chainName: "Binance Smart Chain",
      networks: [
        {
          link: "https://bscscan.com/address/",
          name: "Mainnet",
          id: 56,
        },
        {
          link: "https://testnet.bscscan.com/address/",
          name: "Testnet",
          id: 97,
        },
      ],
    },
    {
      symbol: "PRT",
      icon: PRTICON,
      name: "Pornrocket",
      chainName: "Binance Smart Chain",
      networks: [
        {
          link: "https://bscscan.com/address/",
          name: "Mainnet",
          id: 56,
        },
        {
          link: "https://testnet.bscscan.com/address/",
          name: "Testnet",
          id: 97,
        },
      ],
    },
    {
      symbol: "MATIC",
      icon: MATICICON,
      name: "Polygon Matic",
      chainName: "Polygon",
      networks: [
        {
          name: "Mainnet",
          id: 137,
        },
        {
          name: "Testnet",
          id: 80001,
        },
      ],
    },
    {
      symbol: "ETH",
      icon: ETHICON,
      name: "Ether",
      chainName: "Ethereum",
      networks: [
        {
          link: "https://etherscan.io/address/",
          name: "Mainnet",
          id: 1,
        },
        {
          link: "https://goerli.etherscan.io/address/",
          name: "Görli",
          id: 5,
        },
      ],
    },
  ],
  collection: {
    eth,
    cardImg,
    avatarImg,
    smallImg,
    price: "0.549",
    coin: "ETH",
    dollar: "$2,233.90",
    title: "Nanoe",
    description: "Mystery Drop 1 out of XX",
    buttonText: "Buy Now",
  },
  darkMode: true,
  openMenu: false,
  modalActive: false,
  modalActiveContent: "",
  payment: {},
  creatorsLists: [],
  creatorDrops: [],
  creatorsListsForCreators: [],
  selectedCreator: {},
  selectedCreatorDropAssets: [],
  selectedCreatorDropAsset: {},
  limitCreators: 6,
  offsetCreators: 0,
  sortCreators: 1,
  limitNotableDrops: 6,
  offsetNotableDrops: 0,
  notableDrops: [],
  exploreDrops: [],
  limitExploreDrops: 6,
  offsetExploreDrops: 0,
  sortExploreDrops: 1,
};
const getChainTokens = async (contractAddress, owner, offset, limit) => {
  try {
    const result = await fetch(
      `${process.env.VUE_APP_TEST_URL}public/tokens?contract=${contractAddress}&owner=${owner}&offset=${offset}&limit=${limit}`
    );
    const res = await result.json();
    const tokens = res?.data?.tokens;
    console.log("tokens:", tokens);
    return tokens;
  } catch (error) {
    const err = await error.message;
    console.log("error:", err);
    return;
  }
};

const UpdateCurrentAssetStatus = (creatorId, dropId, assetId, status) => {
  fetch(
    `${process.env.VUE_APP_TEST_URL}/creators/${creatorId}/drops/${dropId}/assets/${assetId}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
const WalletPlugins = () => {};

async function runProvider() {
  if (!provider) {
    provider = new WalletConnectProvider({
      infuraId: "8acc78d5beb44a14aa0a70a712c14811",
      rpc: {
        56: "https://bsc-dataseed.binance.org/",
        97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      },
    });
  }
  await provider
    .enable()
    .then(() => console.log("first call resolved"))
    .catch(() => {
      provider = null;
    });
}
async function ConnectAllWallet(wallettype) {
  let wallet = {};
  if (wallettype === "METAMASK") {
    const response = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (response) {
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      const account = await window.ethereum.request({
        method: "eth_accounts",
      });

      wallet = {
        chainId,
        account: account[0],
        connected: true,
      };
    }
  } else if (wallettype === "BINANCE") {
    const activate = await bsc.activate();
    if (activate) {
      const account = await bsc.getAccount();
      const chainId = await bsc.getChainId();
      wallet = {
        account,
        chainId,
        connected: true,
      };
    }
  } else {
    return;
  }
  return wallet;
}
const actions = {
  async connectWallet({ commit, state, dispatch }) {
    const provider = await state.web3Modal.connect();
    const library = new ethers.providers.Web3Provider(provider);

    library.pollingInterval = 12000;
    commit("setLibrary", library);

    const accounts = await library.listAccounts();
    if (accounts.length > 0) {
      commit("setAccount", accounts[0]);
    }
    const network = await library.getNetwork();
    commit("setChainId", network.chainId);
    commit("setActive", true);
    const wallet = {
      chainId: network.chainId,
      account: accounts.length > 0 ? accounts[0] : "",
      connected: true,
    };
    commit("CONNECT_WALLET", wallet);
    provider.on("connect", async (info) => {
      let chainId = parseInt(info.chainId);
      commit("setChainId", chainId);
      const wallet = {
        chainId,
      };
      commit("CHAIN_CHANGED", wallet);
    });

    provider.on("accountsChanged", async (accounts) => {
      if (accounts.length > 0) {
        commit("setAccount", accounts[0]);
        const wallet = {
          account: accounts[0],
          connected: true,
        };

        commit("ACCOUNT_CHANGED", wallet);
      } else {
        await dispatch("resetApp");
      }
    });
    provider.on("chainChanged", async (chainId) => {
      chainId = parseInt(chainId);
      commit("setChainId", chainId);
      const wallet = {
        chainId,
      };
      commit("CHAIN_CHANGED", wallet);
    });
  },
  async resetApp({ state, commit }) {
    try {
      await state.web3Modal.clearCachedProvider();
    } catch (error) {
      console.error(error);
    }
    const wallet = {
      chainId: "",
      account: "",
      balance: "",
      connected: false,
    };
    commit("DISCONNECT", wallet);
    commit("setAccount", null);
    commit("setActive", false);
    commit("setLibrary", null);
  },
  connectWalletx({ commit }) {
    if (!provider) {
      provider = new WalletConnectProvider({
        infuraId: "8acc78d5beb44a14aa0a70a712c14811",
        rpc: {
          56: "https://bsc-dataseed.binance.org/",
          97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
      });
    }

    if (!provider.connected) {
      //  Enable session (triggers QR Code modal)
      runProvider();
    } else {
      const wallet = {
        chainId: provider.chainId,
        account: provider.accounts[0],
        connected: true,
      };
      commit("CONNECT_WALLET", wallet);
      commit("GET_BALANCE", provider.accounts[0]);
    }
  },

  async connectBinanceWallet({ commit }) {
    const activate = await bsc.activate();
    const account = await bsc.getAccount();
    const chainId = await bsc.getChainId();
    commit("CONNECT_BINANCE_WALLET", {
      activate,
      account,
      chainId,
      connected: true,
      sent: false,
    });
  },
  async connectMetamask({ commit }) {
    //  Enable session (triggers QR Code modal)
    if (typeof window.ethereum !== "undefined") {
      const metamaskWallet = await ConnectAllWallet("METAMASK");
      commit("CONNECT_METAMASK_WALLET", metamaskWallet);
    } else {
      const binanceWallet = await ConnectAllWallet("BINANCE");
      commit("CONNECT_BINANCE_WALLET", binanceWallet);
    }
  },
  async sendWalletTransaction({ commit }, value) {
    if (value.wallet === "METAMASK") {
      const metamaskWallet = await ConnectAllWallet(value.wallet);
      // Switch to appropriate network
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: ethers.utils.hexStripZeros(
              ethers.utils.hexlify(parseInt(value.chainId))
            ),
          },
        ],
      });
      // Send Eth Transaction
      const params = [
        {
          from: metamaskWallet?.account,
          to: value.toAddress,
          data: value.data,
        },
      ];
      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params,
        })
        .then((result) => {
          console.log("results from metamask sign transaction", result);

          uccSdk.payments
            .updateDeposit(value?.customerId, value?.depositId, result)
            .then((response) => {
              console.log("updated transaction metamask", response);
              console.log("dont stop the loader");
              // commit("TOGGLE_LOADER", { payments: false });
            })
            .catch((err) => {
              console.log("error checking", err);
              console.log(" stop the loader");
              commit("TOGGLE_LOADER", { payments: false });
            });

          // The result varies by by RPC method.
          // For example, this method will return a transaction hash hexadecimal string on success.
        })
        .catch((error) => {
          console.log("rejecting might come from here: ", error);
          commit("TOGGLE_LOADER", { payments: false });
          // If the request fails, the Promise will reject with an error.
        });
      commit("SIGN_TRANSACTION");
    } else if (value.wallet === "BINANCE") {
      const binanceWallet = await ConnectAllWallet(value.wallet);
      const params = [
        {
          from: binanceWallet?.account,
          to: value.toAddress,
          data: value.data,
        },
      ];
      window.BinanceChain.request({
        method: "eth_sendTransaction",
        params: params,
      })
        .then((result) => {
          console.log("results from binance sign transaction", result);
          uccSdk.payments
            .updateDeposit(value?.customerId, value?.depositId, result)
            .then((response) => {
              console.log("updated transaction binance", response);
              commit("TOGGLE_LOADER", { payments: false });
            })
            .catch((err) => {
              console.log(err);
              commit("TOGGLE_LOADER", { payments: false });
            });
          // The result varies by by RPC method.
          // For example, this method will return a transaction hash hexadecimal string on success.
        })
        .catch((error) => {
          console.log(error);
          // If the request fails, the Promise will reject with an error.
        });
      commit("SIGN_TRANSACTION");
    }
  },

  async disconnectWallet({ commit }) {
    try {
      await state.web3Modal.clearCachedProvider();
    } catch (error) {
      console.error(error);
    }

    const wallet = {
      chainId: "",
      account: "",
      balance: "",
      connected: false,
    };
    commit("DISCONNECT", wallet);
    // commit("DISCONNECT");
  },

  menuOpen () {
    console.log('menu open called!', state.openMenu )
    state.openMenu = !state.openMenu;
  },

  toggleShowAlert({ commit }, payload) {
    commit("TOGGLE_SHOW_ALERT", payload);
  },
  toggleDarkMode({ commit }) {
    commit("TOGGLE_DARK_MODE");
  },
  toggleLoader({ commit }, value) {
    // console.log("loader values:", value);
    commit("TOGGLE_LOADER", value);
  },

  changeCoin({ commit }, value) {
    // console.log("event triggered: ", value);
    commit("CHANGE_COIN", value);
  },
  async getDetailedGallery({ commit }, payload) {
    try {
      const response = await fetch(
        "https://test.api.superfansonly.app/smart-contracts"
      );
      const contracts = await response.json();
      const contractLists = contracts?.data;
      // let counter = 0;
      await contractLists?.map(async (item) => {
        commit("TOGGLE_LOADER", { gallery: true });

        const res = await getChainTokens(
          item.contractAddress,
          payload.owner,
          payload.offset,
          payload.limit
        );
        console.log(res, "responses");
        const findDetailToken = await res?.find(
          (item) => item?.tokenId === payload?.tokenId
        );
        console.log("my detail token:", findDetailToken);
        if (findDetailToken) {
          commit("GET_MY_TOKEN_DETAIL", await findDetailToken);
          return;
        }
      });
    } catch (error) {
      const err = await error;
      console.log(err);
      commit("TOGGLE_LOADER", { gallery: false });
    }
  },

  async getMyGalleryTokens({ commit }, payload) {
    try {
      const response = await fetch(
        "https://test.api.superfansonly.app/smart-contracts"
      );
      const contracts = await response.json();
      const contractLists = contracts?.data;
      let counter = 0;
      await contractLists?.map(async (item) => {
        commit("TOGGLE_LOADER", { gallery: true });
        counter++;
        const res = await getChainTokens(
          item.contractAddress,
          payload.owner,
          payload.offset,
          payload.limit
        );
        commit("GET_MY_TOKENS", await res);
        if (counter === contractLists.length - 1) {
          commit("TOGGLE_LOADER", { gallery: false });
        }
      });
    } catch (error) {
      const err = await error;
      console.log(err);
      commit("TOGGLE_LOADER", { gallery: false });
    }
  },

  async getCreators({ commit }) {
    try {
      const result = await fetch(`${process.env.VUE_APP_TEST_URL}creators`);
      const res = await result.json();
      commit("GET_CREATORS", await res?.data);
      commit("TOGGLE_LOADER", {
        creators: false,
      });
    } catch (error) {
      const err = await error;
      console.log(err);
      commit("TOGGLE_LOADER", { creators: false });
    }
  },
  async getCreatorDrops({ commit }, value) {
    try {
      const result = await fetch(
        `${process.env.VUE_APP_TEST_URL}creators/${value?.creatorId}/drops`
      );
      const res = await result.json();
      commit("GET_CREATOR_DROPS", await res?.data);
    } catch (error) {
      const err = await error;
      console.log(err);
      commit("TOGGLE_LOADER", { creators: false });
    }
  },
  getCreatorsForCreators({ commit }, payload) {
    let sortString = JSON.stringify(
      JSON.stringify({ displayName: payload.sort })
    );
    fetch(
      `${process.env.VUE_APP_TEST_URL}creators/?limit=` +
        payload.limit +
        `&offset=` +
        payload.offset +
        `&sort_by=` +
        sortString
    )
      .then((res) => res.json())
      .then((data) => {
        commit("TOGGLE_LOADER", { creators: false });
        commit("GET_CREATORS_FOR_CREATORS", data?.data);
        commit("UPDATE_LIMIT_CREATORS", payload.limit);
        commit("UPDATE_OFFSET_CREATORS", payload.offset);
        commit("UPDATE_SORT_CREATORS", payload.sort);
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { creators: false });
      });
  },
  getNotableDrops({ commit }, payload) {
    fetch(
      `${process.env.VUE_APP_TEST_URL}notable-drops/?limit=` +
        payload.limit +
        `&offset=` +
        payload.offset
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        commit("TOGGLE_LOADER", { notableDrops: false });
        commit("GET_NOTABLE_DROPS", data?.data);
        commit("UPDATE_LIMIT_NOTABLE_DROPS", payload.limit);
        commit("UPDATE_OFFSET_NOTABLE_DROPS", payload.offset);
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { notableDrops: false });
      });
  },
  getExploreDrops({ commit }, payload) {
    console.log("-----------getExploreDrops-------------");
    let sortString = JSON.stringify(
      JSON.stringify({ displayName: payload.sort })
    );

    fetch(
      `${process.env.VUE_APP_TEST_URL}notable-drops/?limit=` +
        payload.limit +
        `&offset=` +
        payload.offset +
        `&sort_by=` +
        sortString
    )
      .then((res) => res.json())
      .then((data) => {
        commit("TOGGLE_LOADER", { notableDrops: false });
        commit("GET_EXPLORE_DROPS", data?.data);
        commit("UPDATE_LIMIT_EXPLORE_DROPS", payload.limit);
        commit("UPDATE_OFFSET_EXPLORE_DROPS", payload.offset);
        commit("UPDATE_SORT_EXPLORE_DROPS", payload.sort);
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { notableDrops: false });
      });
  },

  getCreatorDropsAsset({ commit }, payload) {
    fetch(
      `${process.env.VUE_APP_TEST_URL}creators/${payload.creatorId}/drops/${payload?.dropId}`
    )
      .then((res) => res.json())
      .then((data) => {
        commit("SELECTED_CREATOR", data?.data);
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { creators: false });
      });

    fetch(
      `${process.env.VUE_APP_TEST_URL}creators/${payload.creatorId}/drops/${payload?.dropId}/assets`
    )
      .then((res) => res.json())
      .then((data) => {
        commit("TOGGLE_LOADER", { creators: false });
        commit("SELECTED_CREATOR_DROP_ASSETS", data?.data);
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { creators: false });
      });
  },

  getCreatorDropAsset({ commit }, payload) {
    let filterString = JSON.stringify(JSON.stringify({ _id: payload.assetId }));

    fetch(
      `${process.env.VUE_APP_TEST_URL}creators/${payload.creatorId}/drops/${payload?.dropId}/assets?filter=${filterString}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("selected asset only ", data.data[0]);
        commit("TOGGLE_LOADER", { creators: false });
        commit("SELECTED_CREATOR_DROP_ASSET", data?.data[0]);
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { creators: false });
      });
  },

  trackingPages({ state }, payload) {
    console.log(state);
    uccSdk.track
      .submitEvent(
        process.env.VUE_APP_VUE_CUSTOMER_ID,
        process.env.VUE_APP_VUE_PROJECT_ID,
        "PAGE_VIEWED",
        {
          protocol: payload.protocol,
          host: payload.host,
          port: payload.port,
          origin: payload.origin,
          pathname: payload.pathname,
          url: payload.url,
        },
        {},
        "page"
      )
      .then((response) => console.log("page tracking:", response))
      .catch((err) => console.log(err.response.data));
  },

  trackingEvents({ commit }, payload) {
    const user = {};
    const type = "track";
    InititalizeTracking();
    uccSdk.track
      .submitEvent(
        process.env.VUE_APP_VUE_CUSTOMER_ID,
        process.env.VUE_APP_VUE_PROJECT_ID,
        payload?.event,
        payload?.data,
        user,
        type
      )
      .then((response) => {
        commit("REQUEST_TRACK_EVENT", response);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  requestPaymentDeposit({ commit }, payload) {
    uccSdk.payments
      .createDeposit(
        payload?.customerId,
        payload?.chainName,
        payload?.userId,
        payload?.currency,
        payload?.price,
        payload?.coin,
        payload?.events
      )
      .then((response) => {
        UpdateCurrentAssetStatus(
          payload.dropDetails.creatorId,
          payload.dropDetails.dropId,
          payload.dropDetails.assetId,
          payload.dropDetails.status
        );
        commit("REQUEST_PAYMENT_DEPOSIT", response);
        commit("TOGGLE_LOADER", { payments: false });
        commit("TOGGLE_MODAL", {
          modalActive: true,
          modalActiveContent: "DEPOSIT",
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        commit("TOGGLE_SHOW_ALERT", {
          message: err.response.data.error,
          isShow: true,
          notShowAlert: false,
        });
        commit("TOGGLE_LOADER", { payments: false });
      });
  },
  getPaymentDeposit({ commit }, payload) {
    uccSdk.payments
      .getDeposit(payload?.customerId, payload?.depositId)
      .then((response) => {
        commit("GET_PAYMENT_DEPOSIT", response);
        if (response?.result?.status === "confirmed") {
          UpdateCurrentAssetStatus(
            payload.dropDetails.creatorId,
            payload.dropDetails.dropId,
            payload.dropDetails.assetId,
            payload.dropDetails.status
          );
          // commit("TOGGLE_LOADER", { payments: false });
        }
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { payments: false });
      });
  },
  cancelPaymentDeposit({ commit }, payload) {
    uccSdk.payments
      .cancelDeposit(payload?.customerId, payload?.depositId)
      .then((response) => {
        const updated = UpdateCurrentAssetStatus(
          payload.dropDetails.creatorId,
          payload.dropDetails.dropId,
          payload.dropDetails.assetId,
          payload.dropDetails.status
        );
        console.log(updated);
        commit("TOGGLE_LOADER", { payments: false });
        commit("CANCEL_PAYMENT_DEPOSIT", response);
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { payments: false });
      });
  },

  toggleModal({ commit }, value) {
    console.log("toggleModal value", value)
    commit("TOGGLE_MODAL", value);
  },
  toggleModalContent({ commit }, value) {
    commit("TOGGLE_MODAL_CONTENT", value);
  },
};
const mutations = {
  setWeb3Modal(state, web3Modal) {
    state.web3Modal = web3Modal;
  },
  setLibrary(state, library) {
    state.library = library;
  },
  setActive(state, active) {
    state.active = active;
  },
  setAccount(state, account) {
    state.account = account;
  },
  setChainId(state, chainId) {
    state.chainId = chainId;
  },
  SIGN_TRANSACTION(state) {
    console.log(state.binanceWallet);
  },
  CONNECT_WALLET(state, wallet) {
    state.wallet = {
      ...state.wallet,
      ...wallet,
    };
  },

  CONNECT_BINANCE_WALLET(state, payload) {
    state.binanceWallet = {
      ...state.binanceWallet,
      ...payload,
    };
  },
  CONNECT_METAMASK_WALLET(state, payload) {
    state.metamaskWallet = {
      ...state.metamaskWallet,
      ...payload,
    };
  },

  ACCOUNT_CHANGED(state, payload) {
    state.wallet = {
      ...state.wallet,
      ...payload,
    };
  },
  METAMASK_ACCOUNT_CHANGED(state, payload) {
    state.wallet = {
      ...state.wallet,
      ...payload,
    };
  },
  CHAIN_CHANGED(state, payload) {
    state.wallet = {
      ...state.wallet,
      ...payload,
    };
  },
  DISCONNECT(state, payload) {
    state.wallet = {
      ...state.wallet,
      ...payload,
    };
  },
  REQUEST_TRACK_EVENT(state, payload) {
    state.tracking = payload;
  },
  REQUEST_PAYMENT_DEPOSIT(state, payload) {
    state.payment = payload;
  },

  GET_PAYMENT_DEPOSIT(state, payload) {
    state.payment = payload;
  },

  CANCEL_PAYMENT_DEPOSIT(state, payload) {
    state.payment = payload;
  },

  GET_BALANCE(state, payload) {
    const web3Provider = new providers.Web3Provider(provider);
    web3Provider.getBalance(payload).then((response) => {
      state.wallet = {
        ...state.wallet,
        balance: ethers.utils.formatUnits(response, 18),
      };
    });
  },

  GET_CREATORS(state, payload) {
    state.creatorsLists = payload;
  },
  GET_MY_TOKEN_DETAIL(state, payload) {
    state.selectedGalleryToken = payload;
  },
  GET_MY_TOKENS(state, payload) {
    state.myGalleryTokens = { ...state.myGalleryTokens, ...payload };
  },

  GET_CREATOR_DROPS(state, payload) {
    state.creatorDrops = {
      ...state.creatorDrops,
      ...payload,
    };
  },
  GET_CREATORS_FOR_CREATORS(state, payload) {
    state.creatorsListsForCreators = payload;
  },
  GET_NOTABLE_DROPS(state, payload) {
    state.notableDrops = payload;
  },
  GET_EXPLORE_DROPS(state, payload) {
    state.exploreDrops = payload;
  },
  SELECTED_CREATOR(state, payload) {
    state.selectedCreator = payload;
  },

  SELECTED_CREATOR_DROP_ASSETS(state, payload) {
    state.selectedCreatorDropAssets = payload;
  },

  SELECTED_CREATOR_DROP_ASSET(state, payload) {
    state.selectedCreatorDropAsset = payload;
  },

  TOGGLE_SHOW_ALERT(state, payload) {
    state.showAlert = {
      isShow: payload.isShow,
      notShowAlert: payload.notShowAlert,
      message: payload.message,
    };
  },
  TOGGLE_DARK_MODE(state) {
    state.darkMode = !state.darkMode;
  },
  TOGGLE_LOADER(state, payload) {
    state.showLoader = {
      ...state.showLoader,
      ...payload,
    };
  },
  CHANGE_COIN(state, payload) {
    state.selected_coin = payload;
    const selected_data = state?.coin_providers?.find(
      (item) => item?.symbol === payload
    );
    state.selected_coin_data = selected_data;
  },
  TOGGLE_MODAL(state, payload) {
    console.log("toggle Modal called!")
    state.modalActive = payload.modalActive;
    state.modalActiveContent = payload.modalActiveContent;
  },
  TOGGLE_MODAL_CONTENT(state, payload) {
    state.modalActiveContent = payload;
  },
  UPDATE_LIMIT_CREATORS(state, payload) {
    state.limitCreators = payload;
  },
  UPDATE_OFFSET_CREATORS(state, payload) {
    state.offsetCreators = payload;
  },
  UPDATE_SORT_CREATORS(state, payload) {
    state.sortCreators = payload;
  },
  UPDATE_LIMIT_NOTABLE_DROPS(state, payload) {
    state.limitNotableDrops = payload + 6;
  },
  UPDATE_OFFSET_NOTABLE_DROPS(state, payload) {
    state.offsetNotableDrops = payload;
  },
  UPDATE_LIMIT_EXPLORE_DROPS(state, payload) {
    state.limitExploreDrops = payload;
  },
  UPDATE_OFFSET_EXPLORE_DROPS(state, payload) {
    state.offsetExploreDrops = payload;
  },
  UPDATE_SORT_EXPLORE_DROPS(state, payload) {
    state.sortExploreDrops = payload;
  },
};

export default createStore({
  state,
  mutations,
  actions,
  plugins: [WalletPlugins],
});

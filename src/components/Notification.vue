<template>
  <div class="container">
    <div
      class="alert"
      :class="[
        showAlert?.isShow ? 'show showAlert' : 'hide',
        showAlert?.notShowAlert ? 'notShowAlert' : '',
      ]"
    >
      <span class="icon">
        <i class="fas fa-exclamation-circle"></i>
      </span>
      <span class="msg">{{ showAlert.message }}</span>
      <div class="close-btn">
        <span class="icon" @click="closeAlertHandler()">
          <i class="fas fa-times"></i>
        </span>
      </div>
    </div>
    <!-- <button @click="showHandler()">Show Alert</button> -->
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
const showAlert = computed(() => store.state?.showAlert);
watch(showAlert, (curr) => {
  if (curr.isShow) {
    AutomatedClose();
  }
});

// const showHandler = () => {
//   store.dispatch("toggleShowAlert", {
//     isShow: !showAlert.value.isShow,
//     notShowAlert: false,
//   });
// };
const closeAlertHandler = () => {
  store.dispatch("toggleShowAlert", {
    isShow: false,
    notShowAlert: false,
    message: showAlert.value.message,
  });
};

const AutomatedClose = () => {
  setTimeout(() => {
    store.dispatch("toggleShowAlert", {
      isShow: false,
      notShowAlert: false,
      message: showAlert.value.message,
    });
  }, 5000);
};
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
  //   height: 100vh;
}
.alert {
  background: #ffdb9b;
  min-width: 420px;
  padding: 20px 40px;
  position: fixed;
  right: 0px;
  top: 10px;
  z-index: 999999;
  border-radius: 4px;
  border-left: 8px solid #ffa502;
  overflow: hidden;
  //   opacity: 0;
  //   pointer-events: none;
}

.alert.showAlert {
  opacity: 1;
  pointer-events: auto;
}
.alert.notShowAlert {
  opacity: 0;
  pointer-events: none;
}
.alert.show {
  animation: show_slide 1s ease forwards;
}
@keyframes show_slide {
  0% {
    transform: translateX(100%);
  }
  40% {
    transform: translateX(-10%);
  }
  80% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-10px);
  }
}
.alert.hide {
  animation: hide_slide 1s ease forwards;
}

@keyframes hide_slide {
  0% {
    transform: translateX(-10px);
  }
  40% {
    transform: translateX(0%);
  }
  80% {
    transform: translateX(-10%);
  }
  100% {
    transform: translateX(100%);
  }
}

.alert .icon .fa-exclamation-circle {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #ce8500;
  font-size: 30px;
}
.alert .msg {
  padding: 0 20px;
  font-size: 18px;
  color: #ce8500;
}
.alert .close-btn {
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  background: #ffd080;
  padding: 20px 18px;
  cursor: pointer;
}
.close-btn:hover {
  background: #ffc766;
}
.close-btn .icon .fa-times {
  color: #ce8500;
  font-size: 22px;
  line-height: 40px;
}
</style>
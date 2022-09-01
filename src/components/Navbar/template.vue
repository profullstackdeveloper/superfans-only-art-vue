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
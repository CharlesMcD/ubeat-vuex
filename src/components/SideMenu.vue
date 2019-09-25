<template>
  <div class="parent-navigation-container">
    <div class="mobile-navbar">
      <div id="sidebar-open">
        <a role="button" @click="toggleMenu()" class="navbar-burger" aria-label="menu"
           aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </div>
    <div class="side-menu-container hidden">
      <aside class="menu">

        <div>
          <div class="logo-container">
            <router-link to="/">
              <img class="logo" src="../assets/logo_ubeat.png" alt="Ubeat">
            </router-link>
          </div>

          <div id="sidebar-close">
            <a role="button" id="sidebar-close-button" @click="toggleMenu()" class="navbar-burger is-active"
               aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
        </div>

        <ul class="menu-list">
          <li>
            <router-link class="menu-item" to="/" @click.native="toggleMenu()">
              <font-awesome-icon icon="home"/>
              <span class="menu-item">Home</span>
            </router-link>
          </li>
          <li>
            <router-link class="menu-item" to="/search" @click.native="toggleMenu()">
              <font-awesome-icon icon="search"/>
              <span class="menu-item">Search</span>
            </router-link>
          </li>
          <li>
            <router-link class="menu-item" to="/playlists" @click.native="toggleMenu()">
              <font-awesome-icon icon="book"/>
              <span class="menu-item">Playlists</span>
            </router-link>
          </li>
        </ul>

        <p class="menu-label">
          Listened recently
        </p>
        <ul class="menu-list">
          <li>
            <router-link :to="{ name: 'Artist', params: { id: 5468295 } }" @click.native="toggleMenu()">
              Daft Punk
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Artist', params: { id: 889780 } }" @click.native="toggleMenu()">
              Red Hot Chili Peppers
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Artist', params: { id: 111051 } }" @click.native="toggleMenu()">
              Eminem
            </router-link>
          </li>
        </ul>

        <div class="menu-user-section">
          <p class="menu-label" v-if="user">
            Hi {{ user.name }} !
          </p>
          <ul class="menu-list">
            <li>
              <router-link class="menu-item" :to="{ name: 'User', params: { id: user.id }}" @click.native="toggleMenu()">
                <font-awesome-icon icon="user"/>
                <span class="menu-item">Account</span>
              </router-link>
            </li>
          </ul>
          <ul class="menu-list">
            <li>
              <router-link class="menu-item" to="" @click.native="logout()">
                <font-awesome-icon icon="sign-out-alt"/>
                <span class="menu-item">Logout</span>
              </router-link>
            </li>
          </ul>
        </div>

      </aside>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import * as types from '../store/types';

  export default {
    computed: {
      ...mapGetters('auth', {
        user: types.GET_USER
      }),
    },
    methods: {
      toggleMenu() {
        document.querySelector('.side-menu-container')
          .classList
          .toggle('hidden');
      },
      logout() {
        this.$store.dispatch(`auth/${types.LOGOUT}`);
        this.$router.push('/login');
        this.toggleMenu();
      }
    }
  };

</script>

<style scoped>

  .parent-navigation-container {
    position: fixed;
    margin-bottom: inherit;
    top: 0;
    bottom: 0;
    z-index: 999;
  }

  .side-menu-container {
    display: flex;
    padding: 10px;
    background-color: #0F1616;
    height: 100%;
    width: 14rem;
  }

  .menu {
    display: flex;
    flex-direction: column;

  }

  .menu-item {
    padding-left: 5px;
  }

  .logo-container {
    text-align: center;
    padding: 10px 0;
  }

  #sidebar-close {
    display: none;
  }

  #sidebar-open {
    background-color: hsla(0, 0%, 0%, 0.8);
  }

  .logo {
    max-height: 80px;
  }

  .menu-user-section {
    margin-top: auto;
    margin-bottom: 20px;
  }

  .mobile-navbar {
    display: none;
  }

  @media (max-width: 768px) {

    .hidden {
      display: none;
    }

    .mobile-navbar {
      display: flex;
      position: absolute;
      width: 100%;
      background-color: #0F1616;
      align-items: center;
      z-index: 99;
    }

    .side-menu-container {
      position: absolute;
      z-index: 99;
    }

    .logo-container {
      padding: 10px 10px;
      display: inline-block;
    }

    #sidebar-close {
      display: inline-block;
      float: right;
    }
  }

</style>

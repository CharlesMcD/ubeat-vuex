<template>
  <div id="app">
    <div :class="{ 'bottom-bar-displayed': bottomBarIsDisplayed() }">
      <nav-bar v-if="!isLoggedIn"></nav-bar>
      <side-menu v-else></side-menu>
      <div :class="{'side-menu-is-displayed': isLoggedIn}">
        <div id="content" class="container is-fluid">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <bottom-bar v-if="isLoggedIn"></bottom-bar>
  </div>
</template>

<script>
  import Cookie from 'js-cookie';
  import { mapState, mapGetters } from 'vuex';
  import SideMenu from './components/SideMenu';
  import BottomBar from './components/BottomBar';
  import NavBar from './components/NavBar';
  import { ubeatApi } from './common/api';
  import { LOGOUT, IS_LOGGED_IN } from './store/types';
  import { accessDeniedErrorMessages } from './common/errors';
  import { TOKEN_KEY } from './store/modules/auth';

  export default {
    components: {
      sideMenu: SideMenu,
      BottomBar,
      NavBar
    },
    computed: {
      ...mapState('player', [
        'currentlyPlayingTrack',
      ]),
      ...mapGetters('auth', {
        isLoggedIn: IS_LOGGED_IN,
      })
    },
    methods: {
      bottomBarIsDisplayed() {
        return this.currentlyPlayingTrack !== null;
      }
    },
    created() {
      ubeatApi.defaults.headers.common.Authorization = Cookie.get(TOKEN_KEY);
      ubeatApi.interceptors.response.use(undefined, (error) => {
        // response.data is 'Unauthorized' only when the authentication
        // (email/password combination) fails and this error is handled
        // by the Login component.
        if (error.response.status === 401 && error.response.data !== 'Unauthorized') {
          this.$store.dispatch(`auth/${LOGOUT}`);
          this.$router.push({
            path: 'login',
            query: { errorMsg: accessDeniedErrorMessages[error.response.data.message] }
          });
        }
        if (error.response.status === 500) {
          this.$toast.open({ message: 'There was an error with the server processing your request.', type: 'is-danger' });
        }
        return Promise.reject(error);
      });
    }
  };
</script>

<style lang="scss">
  @import "~bulmaswatch/darkly/_variables.scss";
  @import "~bulma";
  @import "~bulmaswatch/darkly/_overrides.scss";
  @import "~buefy/src/scss/buefy";
  @import "~bulma-divider";

  body {
    height: 100%;
  }

  #app {
    font-family: "Source Sans Pro", sans-serif;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  #content {
    flex: 1;
    padding-top: 5rem;
  }

  .side-menu-is-displayed {
    margin-left: 14rem;
  }

  .bottom-bar-displayed {
    margin-bottom: 6rem;
  }

  .tile {
    background-color: transparent;
  }

  @media (max-width: 768px) {
    .side-menu-is-displayed {
      margin-left: 0;
    }
  }

  /* Hack too prevent unwanted zoom on iOS
   https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone
   */
  input[type='text'],
  input[type='number'],
  textarea {
    font-size: 16px;
  }
</style>


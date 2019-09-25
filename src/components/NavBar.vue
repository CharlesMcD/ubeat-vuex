<template>
  <section :class="[showNav ? 'nav-mobile-container' : 'mobile-navbar']">
      <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
        <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false"
           @click="toggleMenu()" :class="{ 'is-active': showNav }">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

        <div class="navbar-menu" id="navMenu" :class="{ 'is-active': showNav }">
          <router-link class="navbar-item" to="/" @click.native="toggleMenu()">Home</router-link>
          <router-link class="navbar-item" to="/signup" @click.native="toggleMenu()">Sign Up</router-link>
          <router-link class="navbar-item" to="/login" @click.native="toggleMenu()">Log in</router-link>
        </div>
      </nav>
  </section>
</template>

<script>
  export default {
    name: 'NavBar',
    data() {
      return {
        showNav: false
      };
    },
    methods: {
      toggleMenu() {
        this.showNav = !this.showNav;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .navbar {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
    border-radius: 0;
  }

  .nav-mobile-container {
    background-color: #0F1616;
  }

  .navbar-burger {
    background-color: #0F1616;
    margin-left: 0;
    margin-right: auto;
  }

  .navbar-menu {
    justify-content: flex-end;
  }

  .navbar-item {
    color: #a9acbc;
    text-transform: uppercase;
    padding: 0px 40px;
  }

  /* Added in javascript */
  .router-link-exact-active {
    color: white;
  }



  @media (max-width: 1088px) {
    .navbar {
      position: relative;
    }

    .navbar-menu {
      background-color: #0F1616;
    }

    .mobile-navbar {
      position: absolute;
      z-index: 100;
    }

    .navbar-item {
      height: 2rem;
    }

  }


</style>

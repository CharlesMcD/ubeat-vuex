<template>
    <div class="artist-content" v-if="properties">
      <div class="tile header-container" :style="getBackgroundStyle">
        <div class="tile is-parent is-3 is-vertical is-hidden-touch">
          <figure class="image is-3by3">
            <img :src="properties.artworkUrl">
          </figure>
        </div>

        <b-tabs position="is-centered" v-model="selectedTab" class="block">
          <b-tab-item label="Overview">
            <div id="artist-overview" class="tile is-parent is-vertical">
              <div class="tile is-child">
                <p class="title">{{properties.artistName}}</p>
                <p class="subtitle">{{properties.primaryGenreName}}</p>
                <div class="content is-hidden-touch">
                  <p>{{properties.bio}}</p>
                </div>
                <div class="links-container">
                  <a class="itunes-link" :href="properties.artistLinkUrl" target="_blank">
                    <figure class="image is-48x48">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/ITunes_logo.svg">
                    </figure>
                  </a>
                </div>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item label="About" :visible="isMobile">
            <div id="artist-about" class="tile is-parent is-vertical">
              <div class="tile is-child">
                <p class="title">Bio</p>
                <div class="content">
                  <p>{{properties.bio}}</p>
                </div>
              </div>
            </div>
          </b-tab-item>
        </b-tabs>

      </div>

      <Albums></Albums>

    </div>
</template>

<script>

  import { mapState } from 'vuex';
  import * as types from '../store/types';
  import Albums from './Albums';

  export default {
    props: [
      'id'
    ],
    components: {
      Albums
    },
    data() {
      return {
        windowWidth: 0,
        selectedTab: 0,
        tabs: Object.freeze({
          OVERVIEW: 0,
          ABOUT: 1
        }),
      };
    },
    computed: {
      ...mapState('artist', [
        'properties'
      ]),
      isMobile() {
        return this.windowWidth <= 1087;
      },
      getBackgroundStyle() {
        return this.isMobile ? {
          backgroundImage: `linear-gradient(rgba(31,36,36,0.2), rgb(31,36,36)), url(${this.properties.artworkUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          alignItems: 'stretch'
        } : null;
      }
    },
    methods: {
      refreshInfo() {
        if (this.properties === null ||
          this.properties.artistId.toString() !== this.id.toString()) {
          this.$store.commit(`album/${types.MUTATE_ALBUMS}`, []);
          this.$store.commit(`album/${types.MUTATE_ALBUMS_WITH_TRACKS}`, []);

          this.$store.dispatch(`artist/${types.FETCH_ARTIST_INFO}`, this.id);
          this.$store.dispatch(`artist/${types.FETCH_ARTIST_ALBUMS}`, this.id);
        }
      },
      refreshWindowWidth(event) {
        this.windowWidth = event.target.innerWidth;
        if (!this.isMobile && this.selectedTab !== this.tabs.OVERVIEW) {
          this.selectedTab = this.tabs.OVERVIEW;
        }
      },
    },
    watch: {
      id() {
        this.refreshInfo();
      },
    },
    created() {
      this.refreshInfo();
    },
    mounted() {
      this.windowWidth = window.innerWidth;
      window.addEventListener('resize', this.refreshWindowWidth);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.refreshWindowWidth);
    }
  };

</script>

<style lang="scss" scoped>

  .b-tabs {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;

    .tab-item {
      display: flex;
      align-items: center;
      height: 100%;
    }

    /deep/ .tab-content {
      height: 100%;
    }
  }

  @media (max-width: 1087px) {

    .artist-content {
      margin-top: -5rem;
    }

    .header-container {
      display: flex;
      align-items: center;
      min-height: calc(100vh - 10rem);
    }

    .title {
      font-size:3rem;
      text-align: center;
      text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
    }

    .subtitle {
      text-align: center;
    }

    .links-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

</style>

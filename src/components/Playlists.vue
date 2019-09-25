<template>
  <div class="tile">
    <div class="tile is-parent is-vertical">
      <div class="tile is-child" v-if="userPlaylists.length === 0">
        <template v-if="isLoading">
          <font-awesome-icon icon="spinner" class="fa-spin fa-2x" style="margin-right: 1rem;"/>
          <span class="info-title">Loading your playlist...</span>
        </template>
        <span v-else class="info-title">No playlist found, create one now !</span>
      </div>
      <div class="tile is-child" v-for="playlist in userPlaylists" :key="playlist.id">
        <Playlist :playlist="playlist" :is-user-playlist="true"/>
      </div>
      <div>
        <button class="button create-playlist-button" @click="createPlaylist()">Create a new playlist</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import * as types from '../store/types';
  import Playlist from './Playlist';

  export default {
    components: {
      Playlist
    },
    computed: {
      ...mapState('playlists', [
        'userPlaylists',
        'isLoading'
      ]),
    },
    methods: {
      refreshPlaylists() {
        this.$store.dispatch(`playlists/${types.FETCH_PLAYLISTS}`);
      },
      createPlaylist() {
        this.$dialog.prompt({
          message: 'What\'s your playlist name?',
          inputAttrs: {
            pattern: '.*\\S.*',
            placeholder: 'My super playlist',
            maxlength: 25,
          },
          confirmText: 'Create',
          onConfirm: (name) => {
            this.$store.dispatch(`playlists/${types.CREATE_PLAYLIST}`, name);
          }
        });
      },
    },
    created() {
      this.refreshPlaylists();
    }
  };
</script>

<style scoped>

  .info-title {
    font-size: 2rem;
  }
  .create-playlist-button {
    border-color: #4c9c9c;
  }
</style>

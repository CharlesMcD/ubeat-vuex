<template>
  <div class="modal-card modal-size">
    <header class="modal-card-head">
      <p class="modal-card-title">Add to a playlist
        <font-awesome-icon v-if="isLoading" icon="spinner" class="loading-indicator fa-spin"/>
      </p>

    </header>
    <div class="modal-card-body">
      <b-notification type="is-warning" class="text-notif" :closable="false"
                      v-if="userPlaylists.length === 0 && !isLoading">
        No playlists found.
        <router-link @click.native="close()" to="/playlists" style="color: black">Create one?</router-link>
      </b-notification>
      <b-table :data="userPlaylists"
               :checked-rows.sync="checkedPlaylists"
               checkable>
        <template slot-scope="props">
          <b-table-column field="playlist_name" label="Playlist">
            {{ props.row.name }}
          </b-table-column>
        </template>
      </b-table>
    </div>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="close()">Cancel</button>
      <button class="button is-primary" @click="addTrack()" :disabled="checkedPlaylists.length === 0">Add</button>
    </footer>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import * as types from '../store/types';
  import { formatAlbumArtworkUrl, millisToMinutesAndSeconds } from '../common/helpers';

  export default {
    name: 'PlaylistsModal',
    props: [
      'tracks'
    ],
    data() {
      return {
        checkedPlaylists: [],
      };
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
      addTrack() {
        if (this.checkedPlaylists.length !== 0 && this.tracks.length !== 0) {
          const playlists = [...new Set(this.checkedPlaylists)];
          playlists.forEach((playlist) => {
            this.tracks.forEach((track) => {
              const data = [playlist, track];
              this.$store.dispatch(`playlists/${types.ADD_TRACK_TO_PLAYLIST}`, data);
            });
          });
          this.close();
        }
      },
      close() {
        this.$parent.close();
      },
      formatArtworkUrl: formatAlbumArtworkUrl,
      millisToMinutesAndSeconds
    },
    created() {
      this.refreshPlaylists();
    }
  };
</script>

<style scoped>
  .modal-size {
    min-width: 1rem;
  }

  .loading-indicator {
    margin-right: 1rem;
    float: right;
  }

  .text-notif {
    color: black;
  }
</style>

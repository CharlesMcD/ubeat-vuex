<template>
  <div>
    <span class="title is-2">
      {{ playlist.name }}
      <font-awesome-icon v-if="isUserPlaylist === true" icon="edit" @click="renamePlaylist(playlist)" class="icon edit-button"/>
    </span>
    <button v-if="isUserPlaylist === true" class="button delete-playlist-button minimalist-button" @click="removePlaylist(playlist)">
      Delete playlist
    </button>
    <Tracks :trackList="playlist" :show-delete-option="isUserPlaylist" :show-artist="true"></Tracks>
    <button v-if="isUserPlaylist === true" class="button minimalist-button" @click="addTrackToPlaylist(playlist)">Add track</button>
  </div>
</template>

<script>
import * as types from '../store/types';
import Tracks from './Tracks';
import SongSearch from './SongSearch';

export default {
  components: {
    Tracks
  },
  props: [
    'playlist',
    'isUserPlaylist'
  ],
  methods: {
    removePlaylist(playlist) {
      this.$dialog.confirm({
        title: 'Delete playlist',
        message: `Are you sure you want to delete ${playlist.name} ?`,
        onConfirm: () => this.$store.dispatch(`playlists/${types.DELETE_PLAYLIST}`, playlist)
      });
    },
    addTrackToPlaylist(playlist) {
      this.$modal.open({
        parent: this,
        props: { playlist },
        component: SongSearch,
        hasModalCard: true,
      });
    },
    renamePlaylist(playlist) {
      this.$dialog.prompt({
        message: 'What\'s your playlist name?',
        inputAttrs: {
          pattern: '.*\\S.*',
          placeholder: 'My super playlist',
          maxlength: 25,
        },
        confirmText: 'Rename',
        onConfirm: (newName) => {
          const data = [playlist, newName];
          this.$store.dispatch(`playlists/${types.RENAME_PLAYLIST}`, data);
        }
      });
    },
  }
};

</script>

<style scoped>
  .delete-playlist-button {
    float: right;
  }

  .minimalist-button {
    color: #4c9c9c;
    background-color: transparent;
    border: none;
  }

  .minimalist-button:focus {
    box-shadow: none;
  }

  .edit-button {
    color: #707373;
    vertical-align: super;
  }

  .edit-button:hover {
    cursor: pointer;
    color: #60b9b9;
  }
</style>

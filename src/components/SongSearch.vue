<template>
  <div class="modal-card" style="min-width: 300px">
    <header class="modal-card-head">
      <p class="modal-card-title">Search for your track</p>
    </header>
    <section class="modal-card-body">
      <p class="content"><b>Selected track:</b></p>
      <div class="media" v-if="selected">
        <div class="media-left">
          <img width="100" :src="selected.artworkUrl100">
        </div>
        <div class="media-content">
          <span>
            <b>{{ selected.artistName}}</b><br>
            {{ selected.trackName }}
          </span>
        </div>
      </div>
      <b-field label="Find by song name:">
        <b-autocomplete
          v-model="name"
          :data="foundTracks"
          placeholder="My super song"
          @select="option => apply(option)"
          @input="debouncedSearch"
          open-on-focus
          keep-first
          expanded>
          <template slot-scope="props">
          <div class="media">
            <div class="media-left">
              <img width="60" :src="props.option.artworkUrl60">
            </div>
            <div class="media-content">
              <span>
                <b>{{ props.option.artistName}}</b><br>
                {{ props.option.trackName }}
              </span>
            </div>
          </div>
          </template>
          <template slot="empty">No results found</template>
        </b-autocomplete>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Cancel</button>
      <button class="button is-primary" @click="addTrackToPlaylist()" :disabled="!songSelected()">Add</button>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import debounce from 'lodash.debounce';
import * as types from '../store/types';

export default {
  data() {
    return {
      name: '',
      selected: ''
    };
  },
  props: ['playlist'],
  computed: {
    ...mapState('tracks', ['foundTracks'])
  },
  methods: {
    searchForTracks() {
      if (this.name !== undefined && this.name !== '') {
        this.$store.dispatch(`tracks/${types.FIND_TRACKS}`, this.name);
      }
    },
    apply(option) {
      this.selected = option;
    },
    songSelected() {
      return this.selected;
    },
    addTrackToPlaylist() {
      const data = [this.playlist, this.selected];
      this.$store.dispatch(`playlists/${types.ADD_TRACK_TO_PLAYLIST}`, data);
      this.$parent.close();
    }
  },
  created() {
    this.debouncedSearch = debounce(this.searchForTracks, 200);
  }
};
</script>

<style scoped>
.modal-card-body {
  overflow: visible;
}
.modal-card {
  overflow: visible;
}
</style>

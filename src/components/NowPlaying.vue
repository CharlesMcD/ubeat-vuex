<template>
  <div class="currently-playing">
    <figure class="image is-64x64 is-hidden-mobile">
      <img :src="currentlyPlayingTrack.artworkUrl100">
    </figure>
    <div class="track-info">
      <router-link :id="currentlyPlayingTrack.collectionId"
                   :to="{ name: 'SelectedAlbum', params: { id: currentlyPlayingTrack.collectionId } }">
        <span class="song-title"> {{currentlyPlayingTrack.trackName}} </span>
      </router-link>
      <router-link :id="currentlyPlayingTrack.collectionId"
                   :to="{ name: 'Artist', params: { id: currentlyPlayingTrack.artistId } }">
        <span class="artist"> {{currentlyPlayingTrack.artistName}} </span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState('player', [
        'currentlyPlayingTrack'
      ]),
    },
  };
</script>

<style lang="scss" scoped>

  .currently-playing {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }

  .track-info {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    margin: 0 14px;
  }

  .song-title {
    font-size: 1.25rem;
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 100%;

    &:hover {
      border-bottom: 1px solid currentColor;
    }
  }

  .artist {
    text-align: left;
    color: hsla(0, 0%, 100%, 0.5);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 100%;

    &:hover {
      color: #fff;
    }
  }


</style>

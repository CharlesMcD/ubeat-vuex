<template>
  <div class="player-container">
    <div v-if="currentAudioSources.length !== 0" class="player">
      <div class="left">
        <now-playing></now-playing>
      </div>
      <div class="center">
        <audio-player :sources="currentAudioSources" :autoplay="true"></audio-player>
      </div>
      <div class="right"></div>
    </div>
  </div>

</template>

<script>
  import { mapState } from 'vuex';
  import AudioPlayer from './AudioPlayer';
  import NowPlaying from './NowPlaying';

  export default {
    components: {
      AudioPlayer,
      NowPlaying
    },
    computed: {
      ...mapState('player', {
        track: 'currentlyPlayingTrack'
      }),
      currentAudioSources() {
        return this.track ? [this.track.previewUrl] : [];
      }
    },
  };
</script>

<style lang="scss" scoped>

  .player-container {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 999;
  }

  .player {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    min-width: 520px;
    height: 6rem;
    padding: 0 1rem;
    background-color: #282828;
    border-top: 1px solid #000;

    .left {
      width: 30%;
    }

    .center {
      width: 40%;
      max-width: 722px;
    }

    .right {
      width: 30%;
    }
  }

</style>

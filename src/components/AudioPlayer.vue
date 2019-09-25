<template>
  <div class="audio-player">
    <div class="player-controls-buttons">
      <font-awesome-icon :icon="['fa', 'step-backward']" style="visibility: hidden;" />
      <font-awesome-icon :icon="playing ? ['far', 'pause-circle'] : ['far', 'play-circle']" class="play-pause-button" @click="togglePlayerPlayback" />
      <font-awesome-icon :icon="['fa', 'step-forward']" style="visibility: hidden;"/>
    </div>
    <div class="seek-container is-hidden-mobile">
      <div class="seek-region">
        <span class="time">{{formatedProgress}}</span>
        <div class="slider" @click="seekTo">
          <div class="progress" :style="{ width: progress * 100 + '%' }">
          </div>
        </div>
        <span class="time">{{formatedRemaining}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import VueHowler from 'vue-howler';
  import * as types from '../store/types';
  import * as playerStates from '../store/playerStates';

  export default {
    mixins: [
      VueHowler
    ],
    computed: {
      ...mapState('player', [
        'playerState',
      ]),
      formatedProgress() {
        return !isNaN(this.seek) ? this.formatTime(this.seek) : '0:00';
      },
      formatedRemaining() {
        return !isNaN(this.seek) ? this.formatTime(this.duration - this.seek) : '0:00';
      },
    },
    watch: {
      playerState(value) {
        this.updatePlayerState(value);
      },
    },
    methods: {
      updatePlayerState(state) {
        switch (state) {
          case playerStates.PLAYING:
            this.play();
            break;
          case playerStates.PAUSED:
            this.pause();
            break;
          case playerStates.STOPED:
            this.stop();
            break;
          default:
        }
      },
      togglePlayerPlayback() {
        this.$store.dispatch(`player/${types.SET_AUDIO_PLAYER_STATE}`, this.playing ? playerStates.PAUSED : playerStates.PLAYING);
      },
      trackFinishedHandler() {
        this.$store.dispatch(`player/${types.SET_AUDIO_PLAYER_STATE}`, playerStates.STOPED);
      },
      formatTime(time) {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${(sec < 10) ? (`0${sec}`) : sec}`;
      },
      seekTo(event) {
        const slider = event.target;
        const offsetX = event.clientX - slider.offsetLeft;
        const width = slider.clientWidth;

        this.setSeek(this.duration * (offsetX / width));
      },
    },
    mounted() {
      this.$on('end', this.trackFinishedHandler);
    },
    beforeDestroy() {
      this.$off('end', this.trackFinishedHandler);
    }
  };
</script>

<style lang="scss" scoped>

  .audio-player {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .player-controls-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row nowrap;
    width: 8rem;
    margin-bottom: 0.5rem;
  }

  .seek-container {
    display: flex;
    width: 100%;
    min-width: 300px;
    justify-content: space-between;
    align-items: center;

    .seek-region {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
      align-items: center;
      margin-left: 2rem;
      margin-right: 2rem;
      color: white;
      line-height: 1.5rem;
      font-family: 'Roboto', sans-serif;
      font-size: 1rem;

      .slider {
        flex-grow: 1;
        position: relative;
        margin-left: 1rem;
        margin-right: 1rem;
        height: 4px;
        border-radius: 2px;
        cursor: pointer;
        background-color: lightgray;

        .progress {
          border-radius: inherit;
          position: absolute;
          background-color: #4c9c9c;
          height: 100%;
          width: 0;
          pointer-events: none;   // important
        }
      }
      span {
        cursor: default;
      }
    }
  }

  .play-pause-button {
    color:#4c9c9c;
    font-size: 35px;

    &:hover {
      color: #60b9b9;
    }
  }

  .time {
    color: hsla(0, 0%, 100%, 0.5);
  }

</style>

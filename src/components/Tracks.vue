<template>
  <div v-if="trackList && trackList.tracks" class="tile">
    <table v-if="trackList.tracks.length" class="table is-hoverable is-fullwidth">
      <thead>
      <tr>
        <th width="5%"></th>
        <th v-if="showIndexes" width="5%"></th>
        <th></th>
        <th v-if="showArtist" width="20%"></th>
        <th width="5%"></th>
        <th width="5%"></th>
        <th v-if="showDeleteOption" width="5%"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="track in trackList.tracks" :key="composeKey(trackList, track.trackId)" class="show-options" :style="isPlaying(track.trackId) ? 'color:#4c9c9c' : 'color:#fff'">
        <td>
          <font-awesome-icon v-if="isPlaying(track.trackId)" :icon="['far', 'pause-circle']" class="play-pause-button" @click="pause"/>
          <font-awesome-icon v-else :icon="['far', 'play-circle']" class="play-pause-button" @click="setTrack(track)"/>
        </td>
        <td v-if="showIndexes" class="track-index">{{ track.trackNumber }}</td>
        <td>{{ track.trackName }}</td>
        <td v-if="showArtist">{{ track.artistName }}</td>
        <td class="track-time">{{ millisToMinutesAndSeconds(track.trackTimeMillis) }}</td>
        <td>
          <b-dropdown position="is-bottom-left" :mobile-modal="true" class="ellipsis">
            <p slot="trigger" class="tag">
              <font-awesome-icon icon="ellipsis-h"/>
            </p>
            <b-dropdown-item @click="showPlaylistsModal([track])"><a>Add to playlist</a></b-dropdown-item>
          </b-dropdown>
        </td>
        <td v-if="showDeleteOption" class="track-time">
          <font-awesome-icon :icon="['far', 'trash-alt']" class="remove-button"
                             @click="removeTrack(trackList, track)"/>
        </td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th v-if="showArtist"></th>
        <th v-if="showDeleteOption"></th>
        <th v-if="showIndexes"></th>
      </tr>
      </tfoot>
    </table>
    <span v-else>This playlist contains no tracks, add one now !</span>
  </div>
</template>

<script>

  import { mapState } from 'vuex';
  import * as playerStates from '../store/playerStates';
  import * as types from '../store/types';
  import PlaylistsModal from './PlaylistsModal';
  import { millisToMinutesAndSeconds } from '../common/helpers';

  export default {
    props: [
      'trackList',
      'showArtist',
      'showDeleteOption',
      'showIndexes'
    ],
    components: {
      PlaylistsModal
    },
    computed: {
      ...mapState('player', [
        'playerState',
        'currentlyPlayingTrack',
      ]),
    },
    methods: {
      setTrack(track) {
        this.$store.dispatch(`player/${types.SET_CURRENTLY_PLAYING_TRACK}`, track);
      },
      pause() {
        this.$store.dispatch(`player/${types.SET_AUDIO_PLAYER_STATE}`, playerStates.PAUSED);
      },
      isPlaying(trackId) {
        return this.currentlyPlayingTrack &&
          this.currentlyPlayingTrack.trackId === trackId &&
          this.playerState === playerStates.PLAYING;
      },
      removeTrack(trackList, track) {
        this.$dialog.confirm({
          title: 'Remove track',
          message: `Are you sure you want to remove ${track.trackName} from ${trackList.name} ?`,
          onConfirm: () => {
            const data = [trackList, track];
            this.$store.dispatch(`playlists/${types.DELETE_TRACK_FROM_PLAYLIST}`, data);
          }
        });
      },
      composeKey(trackList, trackId) {
        return trackList.collectionId ? `${trackList.collectionId}_${trackId}` : `${trackList.id}_${trackId}`;
      },
      showPlaylistsModal(tracks) {
        this.$modal.open({
          parent: this,
          component: PlaylistsModal,
          hasModalCard: true,
          props: {
            tracks
          }
        });
      },
      millisToMinutesAndSeconds,
    },
  };

</script>

<style scoped>

  .tag {
    cursor: pointer;
    background-color: transparent;
  }

  .tag:hover {
    transform: scale(1.3);
    cursor: pointer;
  }

  .ellipsis {
    visibility: hidden;
  }

  .show-options:hover .ellipsis {
    visibility: visible;
  }

  .table {
    background-color: transparent;
  }

  .track-index, .track-time {
    color: hsla(0, 0%, 100%, 0.5);
  }

  .play-pause-button {
    font-size: 1.50rem;
    cursor: pointer;
  }

  .play-pause-button:hover {
    color: #60b9b9;
    cursor: pointer;
  }

  .remove-button:hover {
    color: #60b9b9;
    cursor: pointer;
  }

  @media (max-width: 1088px) {
    .ellipsis {
      visibility: visible;
    }
  }

</style>

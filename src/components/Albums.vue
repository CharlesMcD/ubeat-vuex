<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="applicationBusyLoadingTracks" infinite-scroll-immediate-check="false" infinite-scroll-distance="800">
    <h1 class="title album-label">Albums</h1>
    <template v-for="album in albumsWithLoadedTracks">
      <div class="tile album-container" :key="album.collectionId">
        <div class="tile is-vertical is-12">
          <div class="tile">
            <div class="tile is-parent is-3 is-vertical">
              <div class="tile is-child">
                <AlbumDescription :album="album"></AlbumDescription>
              </div>
            </div>
            <div class="tile is-parent is-vertical">
              <Tracks :trackList="album" :show-indexes="true"></Tracks>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

  import { mapState, mapGetters } from 'vuex';
  import * as types from '../store/types';
  import Tracks from './Tracks';
  import AlbumDescription from './AlbumDescription';

  export default {
    components: {
      AlbumDescription,
      Tracks
    },
    computed: {
      ...mapState('album', [
        'albumsWithLoadedTracks',
        'applicationBusyLoadingTracks'
      ]),
      ...mapGetters('album', {
        isRemainingTracksToLoad: types.IS_REMAINING_TRACKS_TO_LOAD
      })
    },
    methods: {
      loadMore() {
        if (this.isRemainingTracksToLoad) {
          this.$store.dispatch(`album/${types.FETCH_TRACKS_DYNAMICALLY}`);
        }
      },
    }
  };

</script>

<style scoped>

  .album-label {
    padding: 0.75rem;
  }

  @media (max-width: 768px) {
    .album-label {
      font-size:3rem;
      text-align: center;
      font-weight: 200;
      letter-spacing: -1px;
    }
  }
</style>

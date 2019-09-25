<template>
  <div v-if="album" class="tile">
    <div class="tile is-parent is-3">
      <div class="tile is-child is-vertical">
        <AlbumDescription :album="album"></AlbumDescription>
        <div class="buttons-div">
          <div class="custom-button">
            <a class="button is-rounded is-grey-lighter" @click="showPlaylistsModal(album.tracks)">Add to playlist</a>
          </div>
          <div class="custom-button">
            <a :href="album.collectionViewUrl" target="_blank">
              <figure class="image is-48x48">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/ITunes_logo.svg">
              </figure>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="tile is-parent is-vertical">
      <Tracks :trackList="album" :show-indexes="true"></Tracks>
    </div>
  </div>
</template>

<script>

  import { mapState } from 'vuex';
  import * as types from '../store/types';

  import AlbumDescription from './AlbumDescription';
  import Tracks from './Tracks';
  import PlaylistsModal from './PlaylistsModal';
  import { formatAlbumArtworkUrl } from '../common/helpers';

  export default {
    props: [
      'id'
    ],
    components: {
      AlbumDescription,
      Tracks,
      PlaylistsModal,
    },
    computed: {
      ...mapState('album', {
        album: 'selectedAlbum'
      }),
    },
    methods: {
      refreshAlbum(id) {
        if ((this.album === null) ||
          this.album.collectionId.toString() !== id.toString()) {
          this.$store.dispatch(`album/${types.FETCH_SELECTED_ALBUM}`, id);
        }
      },
      formatArtworkUrl: formatAlbumArtworkUrl,
      showPlaylistsModal(tracks) {
        this.$modal.open({
          parent: this,
          component: PlaylistsModal,
          hasModalCard: true,
          props: {
            tracks
          }
        });
      }
    },
    watch: {
      id(albumId) {
        this.refreshAlbum(albumId);
      },
    },
    created() {
      window.scrollTo(0, 0);
      this.refreshAlbum(this.id);
    },
  };

</script>

<style scoped>

  .custom-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.2rem;
  }

  .buttons-div {
    display: flex;
    flex-wrap: wrap;
    padding-top: 1rem;
  }

  @media (max-width: 768px) {
    .buttons-div {
      justify-content: center;
    }
  }

</style>

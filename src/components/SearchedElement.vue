<template>
  <div>
    <router-link :id="data.id" :to="data.link">
      <figure class="image is-1by1">
        <img :src="data.image">
        <div v-if="isTrackOrAlbum" class="custom-overlay is-overlay">
          <font-awesome-icon @click.prevent="prepareTracksAndShowPlaylistModal" class="overlay-button" icon="plus-circle"/>
        </div>
        <div v-if="isUser" class="custom-overlay is-overlay">
          <font-awesome-icon v-if="isFollowed" @click.prevent="unfollowUser" class="overlay-button" icon="times-circle" style="color: #f96161;"/>
          <font-awesome-icon v-else @click.prevent="followUser" class="overlay-button" icon="plus-circle"/>
        </div>
      </figure>
    </router-link>
    <h1 class="title album-title">
      {{ data.title }}
    </h1>
    <p class="subtitle is-6">
      {{data.subtitle}}
    </p>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import { formatAlbumArtworkUrl } from '../common/helpers';
  import * as types from '../store/types';
  import WRAPPER_TYPES_ENUM from '../store/wrapperTypes';
  import PlaylistsModal from './PlaylistsModal';

  export default {
    props: [
      'element'
    ],
    components: {
      PlaylistsModal
    },
    computed: {
      ...mapState('album', [
        'selectedAlbum'
      ]),
      ...mapGetters('auth', {
        user: types.GET_USER
      }),
      isFollowed() {
        return !!this.user.following.find(current => current.id === this.data.id);
      },
      isTrackOrAlbum() {
        return this.element.wrapperType === WRAPPER_TYPES_ENUM.ALBUM ||
          this.element.wrapperType === WRAPPER_TYPES_ENUM.TRACK;
      },
      isUser() {
        return this.element.wrapperType === WRAPPER_TYPES_ENUM.USER;
      },
      data() {
        switch (this.element.wrapperType) {
          case WRAPPER_TYPES_ENUM.ARTIST:
            return {
              id: this.element.artistId,
              link: { name: 'Artist', params: { id: this.element.artistId } },
              image: this.element.artworkUrl,
              title: this.element.artistName,
              subtitle: '',
            };
          case WRAPPER_TYPES_ENUM.ALBUM:
            return {
              id: this.element.collectionId,
              link: { name: 'SelectedAlbum', params: { id: this.element.collectionId } },
              image: formatAlbumArtworkUrl(this.element.artworkUrl100),
              title: this.element.collectionName,
              subtitle: this.element.artistName
            };
          case WRAPPER_TYPES_ENUM.TRACK:
            return {
              id: this.element.trackId,
              link: { name: 'SelectedAlbum', params: { id: this.element.collectionId } },
              image: formatAlbumArtworkUrl(this.element.artworkUrl100),
              title: this.element.trackName,
              subtitle: this.element.artistName
            };
          case WRAPPER_TYPES_ENUM.USER:
            return {
              id: this.element.id,
              link: { name: 'User', params: { id: this.element.id } },
              image: this.element.artworkUrl,
              title: this.element.name,
              subtitle: ''
            };
          default:
            return null;
        }
      }
    },
    methods: {
      prepareTracksAndShowPlaylistModal() {
        if (this.element.wrapperType === WRAPPER_TYPES_ENUM.ALBUM) {
          this.$store.commit(`album/${types.MUTATE_SELECTED_ALBUM}`, this.element);
          this.$store.dispatch(`album/${types.FETCH_SELECTED_ALBUM_TRACKS}`)
            .then(() => {
              this.showPlaylistsModal(this.selectedAlbum.tracks);
            });
        } else {
          this.showPlaylistsModal([this.element]);
        }
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
      followUser() {
        this.$store.dispatch(`user/${types.FOLLOW_USER}`, this.data.id);
      },
      unfollowUser() {
        this.$store.dispatch(`user/${types.UNFOLLOW_USER}`, this.data.id);
      }
    },
  };

</script>

<style scoped>

  .album-title {
    font-weight: 300;
    font-size: 1.25rem;
    text-align: center;
    padding-top: 0.5rem;
  }

  .subtitle {
    font-weight: 200;
    font-size: 1rem;
    text-align: center;
  }

  .overlay-button {
    font-size: 1.75rem;
    margin: 1rem;
  }

  .overlay-button:hover {
    font-size: 2em;
    margin: 0.87rem;
    color: #23deb9;
  }

  .custom-overlay {
    visibility: hidden;
  }

  figure:hover .custom-overlay {
    visibility: visible;
  }

  @media (max-width: 768px) {
    .custom-overlay {
      visibility: visible;
    }
  }
</style>

<template>
  <div>
    <router-link :id="album.collectionId" :to="{ name: 'SelectedAlbum', params: { id: album.collectionId } }">
      <figure class="image is-1by1">
        <img :src="formatAlbumArtworkUrl(album.artworkUrl100)">
      </figure>
      <h1 class="title album-title">{{ album.collectionName }}</h1>
    </router-link>
    <p class="subtitle is-6">{{album.artistName}}</p>
    <p class="infos">{{ new Date(album.releaseDate).getFullYear() }} • {{ album.trackCount }} songs</p>
    <p class="infos">{{album.primaryGenreName}}</p>
  </div>
</template>

<script>

  import { formatAlbumArtworkUrl } from '../common/helpers';

  export default {
    props: [
      'album'
    ],
    methods: {
      formatAlbumArtworkUrl,
    },
  };

</script>

<style scoped>

  .album-title {
    font-size: 1.75rem;
    padding-top:0.5rem;
  }

  @media (max-width: 1087px) {
    .album-title {
      font-size: 1.25rem;
      padding-top: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    .album-title {
      font-size: 3rem;
      text-align: center;
      font-weight: 100;
      letter-spacing: -1px;
    }

    .subtitle {
      font-size: 2rem;
      text-align: center;
      font-weight: 200;
    }

    .infos {
      text-align: center;
    }
  }
</style>

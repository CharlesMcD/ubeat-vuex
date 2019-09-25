<template>
  <router-link class="media" :to="{ name: 'User', params: { id: entry.id }}">
    <figure class="media-left">
      <p class="image is-32x32">
        <img :src="getGravatar(entry.email)">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>{{ entry.name }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
  import { getGravatar } from '../common/helpers';

  export default {
    props: [
      'entry'
    ],
    methods: {
      getGravatar
    }
  };

</script>

<style scoped>

</style>

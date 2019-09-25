<template>
  <div class="tile">
    <div v-if="isLoadingUser" class="tile is-parent">
      <div class="tile is-child">
        <font-awesome-icon icon="spinner" class="fa-spin fa-2x" style="margin-right: 1rem;"/>
        <span class="info-title tile">Loading user</span>
      </div>
    </div>
    <div v-if="user && !isLoadingUser" class="tile is-parent is-vertical">
      <div class="tile is-child">
        <div class="tile is-vertical">
          <h2 class="title is-2">{{ user.name }}</h2>
          <h2 class="subtitle is-5">{{ user.email }}</h2>
          <img :src="getGravatar(user.email)" class="user-avatar"/>
          <span>You can modify your profile image at <a href="https://gravatar.com">Gravatar</a></span>
          <div v-if="!isCurrentUser" class="tile is-child">
            <button v-if="!isFollowedByUser" class="button is-success is-small" @click="followUser">FOLLOW</button>
            <button v-else @click="unfollowUser" class="button is-danger is-small">UNFOLLOW</button>
          </div>
        </div>
      </div>
      <div class="tile is-child is-vertical">
        <h3 class="title is-3">Following</h3>
        <Following v-if="user.following.length > 0" v-for="following in user.following" :key="following.id" :entry="following"></Following>
        <p v-else>This user does not follow anyone</p>
      </div>
      <div class="tile is-child is-vertical">
        <h3 class="title is-3">Playlist</h3>
        <template v-if="isLoadingPlaylist">
          <font-awesome-icon icon="spinner" class="fa-spin fa-2x" style="margin-right: 1rem;"/>
          <span class="info-title">Loading the playlist...</span>
        </template>
        <Playlist v-if="userPlaylist !== null" :playlist="userPlaylist" :is-user-playlist="false"/>
        <h2 v-if="!isLoadingPlaylist && userPlaylist === null">This user has no playlist !</h2>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { getGravatar } from '../common/helpers';
  import * as types from '../store/types';
  import Following from './Following';
  import Playlist from './Playlist';

  export default {
    components: {
      Following,
      Playlist
    },
    props: [
      'id'
    ],
    computed: {
      ...mapState('user', {
        user: 'selectedUser',
        isCurrentUser: 'isCurrentUser',
        isFollowedByUser: 'isFollowedByUser',
        userPlaylist: 'selectedUserPlaylist',
        isLoadingUser: 'isLoadingSelectedUser',
        isLoadingPlaylist: 'isLoadingPlaylist'
      }),
    },
    methods: {
      getGravatar,
      refreshUser(id) {
        this.$store.dispatch(`user/${types.FETCH_SELECTED_USER}`, id);
      },
      followUser() {
        this.$store.dispatch(`user/${types.FOLLOW_USER}`, this.id);
      },
      unfollowUser() {
        this.$store.dispatch(`user/${types.UNFOLLOW_USER}`, this.id);
      }
    },
    watch: {
      id(userId) {
        this.refreshUser(userId);
      },
    },
    created() {
      window.scrollTo(0, 0);
      this.refreshUser(this.id);
    }
  };
</script>

<style>
  .user-avatar {
    width: 80px;
    height: 80px;
  }
</style>

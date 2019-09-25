/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import Vuex from 'vuex';

import album from './modules/album';
import artist from './modules/artist';
import playlists from './modules/playlists';
import tracks from './modules/tracks';
import player from './modules/player';
import auth from './modules/auth';
import search from './modules/search';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    album,
    artist,
    playlists,
    tracks,
    player,
    auth,
    search,
    user
  }
});

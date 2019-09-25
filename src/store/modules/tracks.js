import { ubeatApi } from '../../common/api';
import * as types from '../types';

const state = {
  foundTracks: []
};

const getters = {
};

const mutations = {
  [types.MUTATE_FOUND_TRACKS]: (state, tracks) => {
    state.foundTracks = tracks;
  }
};

const actions = {
  [types.FIND_TRACKS]: ({ commit }, stringToFind) => {
    const parameter = encodeURIComponent(stringToFind);
    ubeatApi.get(`search/tracks?q=${parameter}`)
      .then((response) => {
        const tracks = response.data.results;
        commit(types.MUTATE_FOUND_TRACKS, tracks);
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

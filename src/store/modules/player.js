import * as types from '../types';
import * as playerStates from '../playerStates';

const state = {
  currentlyPlayingTrack: null,
  playerState: playerStates.STOPED
};

const getters = {
};

const mutations = {
  [types.MUTATE_CURRENTLY_PLAYING_TRACK]: (state, track) => {
    state.currentlyPlayingTrack = track;
  },
  [types.MUTATE_AUDIO_PLAYER_STATE]: (state, newState) => {
    state.playerState = newState;
  }
};

const actions = {
  [types.SET_CURRENTLY_PLAYING_TRACK]: ({ commit }, track) => {
    commit(types.MUTATE_CURRENTLY_PLAYING_TRACK, track);
    commit(types.MUTATE_AUDIO_PLAYER_STATE, playerStates.PLAYING);
  },
  [types.SET_AUDIO_PLAYER_STATE]: ({ commit }, newPlayerState) => {
    commit(types.MUTATE_AUDIO_PLAYER_STATE, newPlayerState);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

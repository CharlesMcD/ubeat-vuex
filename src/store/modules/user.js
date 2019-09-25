import { ubeatApi } from '../../common/api';
import * as types from '../types';

const state = {
  selectedUser: null,
  isLoadingSelectedUser: null,
  isCurrentUser: null,
  isFollowedByUser: null,
  selectedUserPlaylist: null,
  isLoadingPlaylist: null,
};

const mutations = {
  [types.MUTATE_SELECTED_USER](state, user) {
    state.selectedUser = user;
  },
  [types.MUTATE_SELECTED_USER_LOADING_STATE](state, value) {
    state.isLoadingSelectedUser = value;
  },
  [types.MUTATE_IS_CURRENT_USER](state, value) {
    state.isCurrentUser = value;
  },
  [types.MUTATE_USER_IS_FOLLOWED](state, value) {
    state.isFollowedByUser = value;
  },
  [types.MUTATE_FOLLOWED_USER](state) {
    state.isFollowedByUser = true;
  },
  [types.MUTATE_UNFOLLOWED_USER](state) {
    state.isFollowedByUser = false;
  },
  [types.MUTATE_SELECTED_USER_PLAYLIST](state, playlist) {
    state.selectedUserPlaylist = playlist;
  },
  [types.MUTATE_SELECTED_USER_PLAYLIST_LOADING_STATE](state, value) {
    state.isLoadingPlaylist = value;
  },
};

const actions = {
  [types.FETCH_SELECTED_USER]: ({ commit, dispatch }, userID) => {
    commit(types.MUTATE_SELECTED_USER, null);
    commit(types.MUTATE_SELECTED_USER_LOADING_STATE, true);

    ubeatApi.get(`users/${userID}`)
      .then((response) => {
        commit(types.MUTATE_SELECTED_USER, response.data);
        dispatch(types.LOOK_IF_USER_IS_CURRENT, userID);
        dispatch(types.LOOK_IF_USER_IS_FOLLOWED, userID);
        commit(types.MUTATE_SELECTED_USER_LOADING_STATE, false);
        dispatch(types.FETCH_SELECTED_USER_PLAYLIST, userID);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  [types.LOOK_IF_USER_IS_CURRENT]: ({ commit, rootState }, userID) => {
    commit(types.MUTATE_IS_CURRENT_USER, rootState.auth.user.id === userID);
  },
  [types.LOOK_IF_USER_IS_FOLLOWED]: ({ commit, rootState }, userID) => {
    ubeatApi.get(`users/${rootState.auth.user.id}`)
      .then((response) => {
        commit(
          types.MUTATE_USER_IS_FOLLOWED,
          !!response.data.following.find(current => current.id === userID)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },
  [types.FOLLOW_USER]: ({ commit, dispatch }, userID) => {
    const data = {
      id: `${userID}`
    };

    ubeatApi.post('follow', data, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        const updatedUserInformation = response.data;
        dispatch(`auth/${types.UPDATE_USER}`, updatedUserInformation, { root: true });
        commit(types.MUTATE_FOLLOWED_USER);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  [types.UNFOLLOW_USER]: ({ commit, dispatch }, userID) => {
    ubeatApi.delete(`follow/${userID}`)
      .then((response) => {
        const updatedUserInformation = response.data;
        dispatch(`auth/${types.UPDATE_USER}`, updatedUserInformation, { root: true });
        commit(types.MUTATE_UNFOLLOWED_USER);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  [types.FETCH_SELECTED_USER_PLAYLIST]: ({ commit }, userID) => {
    commit(types.MUTATE_SELECTED_USER_PLAYLIST, null);
    commit(types.MUTATE_SELECTED_USER_PLAYLIST_LOADING_STATE, true);

    ubeatApi.get('playlists/')
      .then((response) => {
        const userPlaylists = response.data.filter(
          playlist => typeof playlist.owner !== 'undefined' &&
            playlist.owner.id === userID
        );
        if (userPlaylists.length > 0) {
          commit(types.MUTATE_SELECTED_USER_PLAYLIST, userPlaylists[0]);
        }
        commit(types.MUTATE_SELECTED_USER_PLAYLIST_LOADING_STATE, false);
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

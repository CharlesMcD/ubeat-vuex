import { ubeatApi } from '../../common/api';
import * as types from '../types';

const state = {
  userPlaylists: [],
  isLoading: false
};

const getters = {};

const mutations = {
  [types.MUTATE_USER_PLAYLISTS]: (state, userPlaylists) => {
    state.isLoading = false;
    state.userPlaylists = userPlaylists;
  },
  [types.MUTATE_USER_PLAYLISTS_LOADING_STATE]: (state, loadingState) => {
    state.isLoading = loadingState;
  },
  [types.MUTATE_REMOVED_PLAYLIST]: (state, removedPlaylist) => {
    const playlists = state.userPlaylists;
    playlists.splice(playlists.indexOf(removedPlaylist), 1);
  },
  [types.MUTATE_CREATED_PLAYLIST]: (state, createdPlaylist) => {
    const playlists = state.userPlaylists;
    playlists.push(createdPlaylist);
  },
  [types.MUTATE_DELETED_TRACK_ON_PLAYLIST]: (state, [modifiedPlaylist, deletedTrack]) => {
    const tracks = state.userPlaylists.find(current => current.id === modifiedPlaylist.id).tracks;
    tracks.splice(tracks.indexOf(deletedTrack), 1);
  },
  [types.MUTATE_NEW_PLAYLIST_NAME]: (state, [modifiedPlaylist, newName]) => {
    const playlist = state.userPlaylists.find(current => current === modifiedPlaylist);
    playlist.name = newName;
  },
  [types.MUTATE_ADDED_TRACK_ON_PLAYLIST]: (state, [modifiedPlaylist, addedTrack]) => {
    const tracks = state.userPlaylists.find(current => current.id === modifiedPlaylist.id).tracks;
    tracks.push(addedTrack);
  }
};

const actions = {
  [types.FETCH_PLAYLISTS]: ({ commit, rootState }) => {
    commit(types.MUTATE_USER_PLAYLISTS_LOADING_STATE, true);
    ubeatApi.get('playlists/')
      .then((response) => {
        const userPlaylists = response.data.filter(
          playlist => typeof playlist.owner !== 'undefined' &&
            playlist.owner.id === rootState.auth.user.id
        );
        commit(types.MUTATE_USER_PLAYLISTS, userPlaylists);
      });
  },
  [types.DELETE_PLAYLIST]: ({ commit }, playlist) => {
    ubeatApi.delete(`playlists/${playlist.id}`)
      .then(() => {
        commit('MUTATE_REMOVED_PLAYLIST', playlist);
      });
  },
  [types.CREATE_PLAYLIST]: ({ commit, rootState }, name) => {
    const data = {
      name: `${name}`
    };

    ubeatApi.post('playlists/', data)
      .then((response) => {
        commit('MUTATE_CREATED_PLAYLIST', response.data);
      });
  },
  [types.DELETE_TRACK_FROM_PLAYLIST]: ({ commit }, [playlist, track]) => {
    ubeatApi.delete(`playlists/${playlist.id}/tracks/${track.trackId}`)
      .then(() => {
        commit('MUTATE_DELETED_TRACK_ON_PLAYLIST', [playlist, track]);
      });
  },
  [types.ADD_TRACK_TO_PLAYLIST]: ({ commit }, [playlist, track]) => {
    ubeatApi.post(`playlists/${playlist.id}/tracks/`, track)
      .then(() => {
        commit('MUTATE_ADDED_TRACK_ON_PLAYLIST', [playlist, track]);
      });
  },
  [types.RENAME_PLAYLIST]: ({ commit, rootState }, [playlist, newName]) => {
    const data = {
      name: `${newName}`
    };
    ubeatApi.put(`playlists/${playlist.id}`, data)
      .then(() => {
        commit('MUTATE_NEW_PLAYLIST_NAME', [playlist, newName]);
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

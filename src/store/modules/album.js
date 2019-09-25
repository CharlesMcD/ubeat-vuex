import { ubeatApi } from '../../common/api';
import * as types from '../types';

const NUMBER_OF_ALBUMS_TO_LOAD_AT_EACH_DYNAMIC_FETCH = 3;

const state = {
  albumsSummary: [],
  albumsWithLoadedTracks: [],
  applicationBusyLoadingTracks: false,
  selectedAlbum: null
};

const getters = {
  [types.NEXT_ALBUMS_INDEX_TO_LOAD]: state => state.albumsWithLoadedTracks.length,

  [types.IS_REMAINING_TRACKS_TO_LOAD]: state => (
    state.albumsSummary.length !== state.albumsWithLoadedTracks.length
    && state.albumsSummary.length !== 0
  )
};

const mutations = {
  [types.MUTATE_ALBUMS](state, albumsSummary) {
    state.albumsSummary = albumsSummary;
  },
  [types.MUTATE_ALBUMS_WITH_TRACKS](state, albums) {
    state.albumsWithLoadedTracks = albums;
  },
  [types.MUTATE_APPLICATION_BUSY_LOADING_TRACKS](state, isBusy) {
    state.applicationBusyLoadingTracks = isBusy;
  },
  [types.MUTATE_SELECTED_ALBUM](state, album) {
    state.selectedAlbum = album;
  }
};

const actions = {
  [types.FETCH_SELECTED_ALBUM]: ({ commit, dispatch }, albumId) => {
    commit(types.MUTATE_SELECTED_ALBUM, null);

    ubeatApi.get(`albums/${albumId}`)
      .then((response) => {
        commit(types.MUTATE_SELECTED_ALBUM, response.data.results[0]);
        dispatch(types.FETCH_SELECTED_ALBUM_TRACKS);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  [types.FETCH_SELECTED_ALBUM_TRACKS]: ({ commit, state }) => {
    commit(types.MUTATE_APPLICATION_BUSY_LOADING_TRACKS, true);

    return ubeatApi.get(`albums/${state.selectedAlbum.collectionId}/tracks`)
      .then((tracksResponse) => {
        const selectedAlbumsWithTracks = {
          ...state.selectedAlbum,
          tracks: tracksResponse.data.results
        };

        commit(types.MUTATE_SELECTED_ALBUM, selectedAlbumsWithTracks);
        commit(types.MUTATE_APPLICATION_BUSY_LOADING_TRACKS, false);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  [types.FETCH_TRACKS_DYNAMICALLY]: ({ commit, state, getters }) => {
    commit(types.MUTATE_APPLICATION_BUSY_LOADING_TRACKS, true);

    const nextAlbumIndexToLoad = getters[types.NEXT_ALBUMS_INDEX_TO_LOAD];
    const albumsToSearchForTracks = state.albumsSummary.slice(
      nextAlbumIndexToLoad,
      nextAlbumIndexToLoad + NUMBER_OF_ALBUMS_TO_LOAD_AT_EACH_DYNAMIC_FETCH
    );

    const tracksPromisesArray = albumsToSearchForTracks.map(album =>
      ubeatApi.get(`albums/${album.collectionId}/tracks`)
    );

    Promise.all(tracksPromisesArray)
      .then((tracksResponse) => {
        const searchedAlbumsWithTracks = tracksResponse.map((albumTracks, index) => ({
          ...state.albumsSummary[index + nextAlbumIndexToLoad],
          tracks: albumTracks.data.results
        }));
        commit(
          types.MUTATE_ALBUMS_WITH_TRACKS,
          state.albumsWithLoadedTracks.concat(...searchedAlbumsWithTracks)
        );
        commit(types.MUTATE_APPLICATION_BUSY_LOADING_TRACKS, false);
      })
      .catch((error) => {
        console.log(error);
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

import { ubeatApi, lastFmApi } from '../../common/api';
import { formatArtistArtworkUrl, formatArtistBio, trimSpecialCharactersAndReplaceSpace, onlyContainSpaces } from '../../common/helpers';
import * as types from '../types';

const NO_ARTWORK_PLACEHOLDER = '/static/artist_placeholder.png';

const state = {
  properties: null,
};

const getters = {
};

const mutations = {
  [types.MUTATE_ARTIST_INFO](state, properties) {
    state.properties = properties;
  }
};

const actions = {
  [types.FETCH_ARTIST_INFO]: ({ commit }, artistId) => {
    commit(types.MUTATE_ARTIST_INFO, null);

    ubeatApi.get(`artists/${artistId}`)
      .then((response) => {
        const artistInfo = response.data.results[0];

        lastFmApi.get(`?method=artist.getinfo&artist=${trimSpecialCharactersAndReplaceSpace(artistInfo.artistName)}&autocorrect=1`)
          .then((r) => {
            if (r.data.error) {
              artistInfo.bio = 'No biography available';
              artistInfo.artworkUrl = NO_ARTWORK_PLACEHOLDER;
            } else {
              artistInfo.bio = formatArtistBio(r.data.artist.bio.summary);
              artistInfo.artworkUrl = formatArtistArtworkUrl(r.data.artist.image[0]['#text']);

              if (onlyContainSpaces(artistInfo.bio)) {
                artistInfo.bio = 'No biography available';
              }

              if (onlyContainSpaces(artistInfo.artworkUrl)) {
                artistInfo.artworkUrl = NO_ARTWORK_PLACEHOLDER;
              }
            }

            commit(types.MUTATE_ARTIST_INFO, artistInfo);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  [types.FETCH_ARTIST_ALBUMS]: ({ commit, dispatch }, artistId) => {
    ubeatApi.get(`artists/${artistId}/albums`)
      .then((albumsResponse) => {
        commit(`album/${types.MUTATE_ALBUMS}`, albumsResponse.data.results, { root: true });
        dispatch(`album/${types.FETCH_TRACKS_DYNAMICALLY}`, null, { root: true });
      })
      .catch((error) => {
        console.log(error);
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

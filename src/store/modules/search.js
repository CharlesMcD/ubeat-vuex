import { ubeatApi, lastFmApi } from '../../common/api';
import {
  formatArtistArtworkUrl,
  trimSpecialCharactersAndReplaceSpace,
  onlyContainSpaces,
  getGravatar
} from '../../common/helpers';
import * as types from '../types';
import SEARCH_TYPES from '../searchTypes';

const NUMBER_OF_VALUES = 18;
const NUMBER_OF_USERS_TO_KEEP_ON_GLOBAL_SEARCH = 6;
const NO_ARTWORK_PLACEHOLDER = '/static/artist_placeholder.png';

const state = {
  result: null,
  isLoading: false,
  searchTextValue: '',
  selectedSearchType: SEARCH_TYPES.GLOBAL
};

const getters = {};

const mutations = {
  [types.MUTATE_SEARCH_TEXT_VALUE](state, textValue) {
    state.searchTextValue = textValue;
  },
  [types.MUTATE_SEARCH_TYPE](state, type) {
    state.selectedSearchType = type;
  },
  [types.MUTATE_SEARCH_RESULT](state, result) {
    state.result = result;
  },
  [types.MUTATE_SEARCH_LOADING_STATE](state, isLoading) {
    state.isLoading = isLoading;
  },
};

const actions = {
  [types.GLOBAL_SEARCH]: ({ commit, dispatch, state }) => {
    commit(types.MUTATE_SEARCH_RESULT, {});

    if (!onlyContainSpaces(state.searchTextValue)) {
      commit(types.MUTATE_SEARCH_LOADING_STATE, true);

      let url;
      const searchType = state.selectedSearchType;

      switch (searchType) {
        case SEARCH_TYPES.GLOBAL:
          url = 'search';
          break;
        case SEARCH_TYPES.TRACKS:
          url = '/search/tracks';
          break;
        case SEARCH_TYPES.ARTIST:
          url = '/search/artists';
          break;
        case SEARCH_TYPES.ALBUM:
          url = '/search/albums';
          break;
        case SEARCH_TYPES.USER:
          url = '/search/users';
          break;
        default:
          url = 'search';
      }

      url = `${url}?q=${trimSpecialCharactersAndReplaceSpace(state.searchTextValue)}
                  &limit=${NUMBER_OF_VALUES}`;

      const promisesArray = [];

      if (searchType === SEARCH_TYPES.USER) {
        promisesArray.push(dispatch(types.SEARCH_USERS, NUMBER_OF_VALUES));
      } else {
        if (searchType === SEARCH_TYPES.GLOBAL) {
          promisesArray.push(
            dispatch(types.SEARCH_USERS, NUMBER_OF_USERS_TO_KEEP_ON_GLOBAL_SEARCH)
          );
        }

        promisesArray.push(ubeatApi.get(url)
          .then((response) => {
            const searchResult = { ...state.result };

            response.data.results.forEach((element) => {
              const key = element.wrapperType;
              const type = searchResult[key] || [];
              type.push(element);
              searchResult[key] = type;
            });

            if (searchResult.artist) {
              searchResult.artist = searchResult.artist.map(artist => ({
                ...artist,
                artworkUrl: NO_ARTWORK_PLACEHOLDER
              }));
              dispatch(types.FETCH_ARTIST_ARTWORK, searchResult.artist);
            }

            commit(types.MUTATE_SEARCH_RESULT, searchResult);
          })
          .catch((error) => {
            console.log(error);
          })
        );
      }

      Promise.all(promisesArray)
        .finally(() => {
          commit(types.MUTATE_SEARCH_LOADING_STATE, false);
        });
    } else {
      commit(types.MUTATE_SEARCH_RESULT, null);
    }
  },
  [types.FETCH_ARTIST_ARTWORK]: ({ commit, state }, artists) => {
    if (artists) {
      const artworkPromisesArray = artists.map(artist =>
        lastFmApi.get(`?method=artist.getinfo
        &artist=${trimSpecialCharactersAndReplaceSpace(artist.artistName)}&autocorrect=1`)
      );

      Promise.all(artworkPromisesArray)
        .then((artworksResponse) => {
          const artistsWithArtwork = artworksResponse.map((info, index) => {
            let artworkUrl = info.data.error ?
              NO_ARTWORK_PLACEHOLDER :
              formatArtistArtworkUrl(info.data.artist.image[0]['#text']);

            if (onlyContainSpaces(artworkUrl)) {
              artworkUrl = NO_ARTWORK_PLACEHOLDER;
            }

            return ({
              ...artists[index],
              artworkUrl
            });
          });

          const currentState = state.result;
          currentState.artist = artistsWithArtwork;
          commit(types.MUTATE_SEARCH_RESULT, currentState);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  [types.SEARCH_USERS]: ({ commit, state }, numberOfUsersToKeep) =>
    ubeatApi.get(`search/users?q=${trimSpecialCharactersAndReplaceSpace(state.searchTextValue)}`)
      .then((response) => {
        const searchResult = { ...state.result };

        response.data.slice(0, numberOfUsersToKeep)
          .forEach((element) => {
            const key = 'users';
            const type = searchResult[key] || [];
            element.artworkUrl = getGravatar(element.email);
            element.wrapperType = 'user';
            type.push(element);
            searchResult[key] = type;
          });

        commit(types.MUTATE_SEARCH_RESULT, searchResult);
      })
      .catch((error) => {
        console.log(error);
      })
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

import Cookie from 'js-cookie';
import { ubeatApi } from '../../common/api';
import * as types from '../types';

export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';

const state = {
  token: Cookie.get(TOKEN_KEY) || '',
  user: Cookie.getJSON(USER_KEY) || null,
};

const getters = {
  [types.IS_LOGGED_IN]: state => !!state.token,
  [types.GET_USER]: state => state.user
};

const mutations = {
  [types.MUTATE_AUTH_SUCCESS]: (state, [theUser, token]) => {
    state.token = token;
    state.user = theUser;
  },
  [types.MUTATE_LOGOUT]: (state) => {
    state.token = '';
    state.user = null;
  },
  [types.MUTATE_USER]: (state, user) => {
    state.user = user;
  },
};

const actions = {
  [types.LOGIN]({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('email', data.email);
      params.append('password', data.password);
      ubeatApi.post('login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
        .then((response) => {
          const token = response.data.token;
          const theUser = {
            name: response.data.name,
            email: response.data.email,
            id: response.data.id,
            following: response.data.following
          };
          ubeatApi.defaults.headers.common.Authorization = token;
          Cookie.set(TOKEN_KEY, token, { expires: 1 });
          Cookie.set(USER_KEY, theUser, { expires: 1 });
          commit(types.MUTATE_AUTH_SUCCESS, [theUser, token]);
          resolve(response);
        })
        .catch((error) => {
          dispatch(types.LOGOUT);
          reject(error);
        });
    });
  },
  [types.LOGOUT]: ({ commit, dispatch }) => {
    ubeatApi.get('/logout');
    ubeatApi.defaults.headers.common.Authorization = null;
    Cookie.remove(TOKEN_KEY);
    Cookie.remove(USER_KEY);
    commit(types.MUTATE_LOGOUT);
    dispatch(`player/${types.SET_CURRENTLY_PLAYING_TRACK}`, null, { root: true });
  },
  [types.SIGNUP]({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('name', data.name);
      params.append('email', data.email);
      params.append('password', data.password);

      ubeatApi.post('signup', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
        .then(() => {
          dispatch(types.LOGIN, data)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  [types.UPDATE_USER]({ commit }, user) {
    Cookie.set(USER_KEY, user, { expires: 1 });
    commit(types.MUTATE_USER, user);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

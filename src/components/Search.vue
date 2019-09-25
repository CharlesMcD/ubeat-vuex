<template>
  <div>
    <p class="control is-expanded">
      <input v-model="searchTextValue" class="input" type="text" placeholder="Start typing...">
    </p>

    <section class="search-type-container">
      <div class="block">
        <b-radio v-for="type in searchTypes" :key="type" v-model="selectedSearchType" :native-value="type">
          {{type}}
        </b-radio>
      </div>
    </section>

    <template v-if="result">
      <template v-if="!Object.keys(result).length">
        <template v-if="isLoading">
          <font-awesome-icon icon="spinner" class="fa-spin fa-2x" style="margin-right: 1rem;"/>
          <span class="info-title">Searching...</span>
        </template>
        <template v-else>
          <span class="info-title">No result</span>
        </template>
      </template>

      <template v-if="result.artist">
        <h1 class="title category">Artists</h1>

        <div class="columns is-multiline is-mobile">
          <div v-for="artist in result.artist" class="column is-2-desktop is-4-tablet is-6-mobile">
            <SearchedElement :element="artist"></SearchedElement>
          </div>
        </div>
      </template>

      <template v-if="result.collection">
        <h1 class="title category">Albums</h1>

        <div class="columns is-multiline is-mobile">
          <div v-for="album in result.collection" class="column is-2-desktop is-4-tablet is-6-mobile">
            <SearchedElement :element="album"></SearchedElement>
          </div>
        </div>
      </template>

      <template v-if="result.track">
        <h1 class="title category">Tracks</h1>

        <div class="columns is-multiline is-mobile">
          <div v-for="track in result.track" class="column is-2-desktop is-4-tablet is-6-mobile">
            <SearchedElement :element="track"></SearchedElement>
          </div>
        </div>
      </template>

      <template v-if="result.users">
        <h1 class="title category">Users</h1>

        <div class="columns is-multiline is-mobile">
          <div v-for="user in result.users" class="column is-2-desktop is-4-tablet is-6-mobile">
            <SearchedElement :element="user"></SearchedElement>
          </div>
        </div>
      </template>
    </template>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import debounce from 'lodash.debounce';
  import SEARCH_TYPES_ENUM from '@/store/searchTypes';
  import * as types from '@/store/types';

  import SearchedElement from './SearchedElement';

  export default {
    components: {
      SearchedElement
    },
    data() {
      return {
        searchTypes: SEARCH_TYPES_ENUM
      };
    },
    computed: {
      ...mapState('search', [
        'result',
        'isLoading',
      ]),
      searchTextValue: {
        get() {
          return this.$store.state.search.searchTextValue;
        },
        set(value) {
          this.$store.commit(`search/${types.MUTATE_SEARCH_TEXT_VALUE}`, value);
        }
      },
      selectedSearchType: {
        get() {
          return this.$store.state.search.selectedSearchType;
        },
        set(value) {
          this.$store.commit(`search/${types.MUTATE_SEARCH_TYPE}`, value);
        }
      }
    },
    methods: {
      search() {
        this.$store.dispatch(`search/${types.GLOBAL_SEARCH}`);
      },
    },
    watch: {
      searchTextValue() {
        this.debouncedSearch();
      },
      selectedSearchType() {
        this.debouncedSearch();
      }
    },
    created() {
      this.debouncedSearch = debounce(this.search, 300);
    }
  };

</script>

<style scoped>

  .search-type-container {
    margin-top: 1rem;
  }

  .info-title {
    font-size: 2rem;
  }

  .columns {
    margin-left: 0;
    margin-right: 0;
  }

  .category {
    margin-top: 2rem;
    text-align: center;
  }
</style>

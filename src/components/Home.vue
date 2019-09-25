<template>
  <section>
    <h1 class="title is-1 has-text-centered">Welcome on UBeat</h1>
    <h1 class="subtitle is-3 has-text-centered">Artists of the day</h1>

    <div class="tile">
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent is-6">
            <div class="tile is-child">
                <figure class="image is-4by4">
                  <router-link :to="{ name: 'Artist', params: { id: 5468295 } }">
                    <img src="https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/e7/e0/dc/e7e0dc6f-f791-e32b-62d3-7c98e189ef9c/source/800x800cc.jpg"/>
                  </router-link>
                </figure>
            </div>
          </div>
          <div class="tile is-parent is-vertical">
            <div class="tile is-child">
                <figure class="image is-4by4">
                  <router-link :to="{ name: 'Artist', params: { id: 358714030 } }">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/917HrbUVJiL._SX522_.jpg"/>
                  </router-link>
                </figure>
            </div>
            <div class="tile is-child">
                <figure class="image is-4by4">
                  <router-link :to="{ name: 'Artist', params: { id: 358714030 } }">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/A1QsthUoerL._SL1500_.jpg"/>
                  </router-link>
                </figure>
            </div>
          </div>
          <div class="tile is-parent is-vertical">
            <div class="tile is-child">
                <figure class="image is-4by4">
                  <router-link :to="{ name: 'Artist', params: { id: 580391756 } }">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/71d8gXwt1fL._SL1500_.jpg"/>
                  </router-link>
                </figure>
            </div>
            <div class="tile is-child">
                <figure class="image is-4by4">
                  <router-link :to="{ name: 'Artist', params: { id: 3996865 } }">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/81r3FVfNG3L._SL1425_.jpg"/>
                  </router-link>
                </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

  .title {
    padding: 0 1rem;
  }

  .subtitle {
    padding-bottom: 1em;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 2.75rem;
      font-weight: 100;
      letter-spacing: -1px;
    }

    .subtitle {
      font-weight: 200;
    }
  }

</style>

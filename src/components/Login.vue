<template>
  <section class="login-container">
    <div class="header row-full">
      <div class="logo-container">
        <figure class="image is-96x96">
          <img class="logo" src="../assets/logo_ubeat.png">
        </figure>
      </div>
      <div class="is-divider"></div>
    </div>

    <div class="container has-text-centered is-fluid">

      <div class="column is-centered" v-if="!!errorMessage || !!localErrorMessage">
        <div class="column is-half is-offset-one-quarter">
          <b-message class="errorContainer" type="is-danger">
            <span v-if="localErrorMessage">{{ localErrorMessage }}</span>
            <span v-else>{{ errorMessage }}</span>
          </b-message>
        </div>
      </div>

      <div class="column">
        <div class="column is-half is-offset-one-quarter">

          <p class="subtitle"><b>To continue, log in to Ubeat.</b></p>

          <form @submit.prevent="doLogin" novalidate>
            <b-field :type="{'is-danger': errors.has('email')}"
                     :message="errors.first('email')">
              <b-input placeholder="Email"
                       name="email"
                       v-model="email"
                       icon="envelope"
                       v-validate="{ required: true, email: true }"
                       autocomplete="true"></b-input>
            </b-field>
            <b-field :type="{'is-danger': errors.has('password')}"
                     :message="errors.first('password')">
              <b-input placeholder="Password"
                       type="password"
                       name="password"
                       v-model="password"
                       :password-reveal="true"
                       icon="unlock-alt"
                       v-validate="{ required: true }"
                       autocomplete="false">
              </b-input>
            </b-field>
            <b-field horizontal>
              <p class="control is-pulled-right">
                <button class="button is-success is-medium">
                  LOG IN
                </button>
              </p>
            </b-field>
          </form>

          <div class="column division">
            <div class="column is-half is-offset-one-quarter">
              <div class="is-divider"></div>
            </div>
          </div>

          <div class="column">
            <div class="column is-half is-offset-one-quarter">
              <p class="subtitle"><b>Don't have an account?</b></p>
              <router-link to="/signup" class="button is-info is-medium">
                SIGN UP
              </router-link>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>
<script>
  import * as types from '../store/types';
  import { accessDeniedErrorMessages } from '../common/errors';

  export default {
    name: 'Login',
    props: [
      'redirect',
      'errorMessage'
    ],
    data() {
      return {
        email: '',
        password: '',
        localErrorMessage: ''
      };
    },
    methods: {
      doLogin() {
        this.$validator.validate().then((isValid) => {
          if (isValid) {
            this.$store.dispatch(`auth/${types.LOGIN}`, { email: this.email, password: this.password })
              .then(() => {
                this.$router.push(this.redirect || '/');
              })
              .catch(() => {
                this.localErrorMessage = accessDeniedErrorMessages.Invalid_Credentials;
              });
            this.password = '';
          }
        });
      },
    }
  };
</script>

<style scoped>
  .login-container {
    margin-top: -5rem;
  }

  .division {
    margin-top: 3rem;
  }

  .logo-container {
    padding-top: 1rem;
    display: flex;
    justify-content: center;
  }

  .row-full {
    width: 100vw;
    position: relative;
    margin-left: -50vw;
    left: 50%;
  }
</style>

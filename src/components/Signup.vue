<template>
  <section class="sign-in-container">
    <div class="header row-full">
      <div class="logo-container">
        <figure class="image is-96x96">
          <img class="logo" src="../assets/logo_ubeat.png">
        </figure>
      </div>
      <div class="is-divider"></div>
    </div>
    <div class="container has-text-centered is-fluid">
      <div class="column is-centered" v-if="!!localErrorMessage">
        <div class="column is-half is-offset-one-quarter">
          <b-message class="errorContainer" type="is-danger">
            <span v-if="localErrorMessage">{{ localErrorMessage }}</span>
          </b-message>
        </div>
      </div>
      <div class="column">
        <div class="column is-half is-offset-one-quarter">
          <p class="subtitle"><b>Fill the form to create your account.</b></p>
          <form @submit.prevent="doSignUp" novalidate>
            <b-field :type="{'is-danger': errors.has('user')}"
                :message="errors.first('user')">
              <b-input placeholder="Full name"
                       type="text"
                       v-model="name"
                       icon="user"
                       name="user"
                       v-validate="{ required: true }"
                       autocomplete="true"></b-input>
            </b-field>
            <b-field :type="{'is-danger': errors.has('email')}"
                :message="errors.first('email')">
              <b-input placeholder="Email"
                       v-model="email"
                       icon="envelope"
                       name="email"
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
            <b-field :type="{'is-danger': errors.has('confirm-password')}"
                :message="[{
                    'The confirm password field is required.' : errors.firstByRule('confirm-password', 'required'),
                    'Passwords do not match.' : errors.firstByRule('confirm-password', 'is')
                }]">
              <b-input placeholder="Confirm password"
                        type="password"
                        v-model="confirmPassword"
                        :password-reveal="true"
                        name="confirm-password"
                        icon="unlock-alt"
                        v-validate="{ required: true, is: password}"
                       autocomplete="false"></b-input>
            </b-field>
            <b-field horizontal>
              <p class="control is-pulled-right">
                <button class="button is-success is-medium">
                  SIGN UP
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
              <p class="subtitle"><b>Already have an account?</b></p>
              <router-link to="/login" class="button is-info is-medium">
                LOG IN
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
    name: 'Signin',
    props: [
      'errorMessage'
    ],
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        localErrorMessage: ''
      };
    },
    methods: {
      doSignUp() {
        this.$validator.validate().then((isValid) => {
          if (isValid) {
            this.$store.dispatch(`auth/${types.SIGNUP}`, { name: this.name, email: this.email, password: this.password })
              .then(() => {
                this.$router.push('/');
              })
              .catch(() => {
                this.localErrorMessage = accessDeniedErrorMessages.User_Already_Exists;
              });
            this.password = '';
            this.confirmPassword = '';
          }
        });
      },
    },
  };
</script>

<style scoped>
  .sign-in-container {
    margin-top: -5rem;
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

  .division {
    margin-top: 3rem;
  }
</style>


<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 offset-sm-3">
          <h2>Login</h2>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="text"
                v-model="user.email"
                name="email"
                v-validate="'required'"
                id="email"
                class="form-control"
                :class="{ 'is-invalid':  errors.has('email') }"
              >
              <div class="invalid-feedback">
                <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                v-model="user.password"
                name="password"
                v-validate="'required'"
                class="form-control"
                :class="{ 'is-invalid': errors.has('password') }"
              >
              <div class="invalid-feedback">
                <span v-show="errors.has('password')">{{ errors.first('password') }}</span>
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" :disabled="isValidForm">Login</button>
              <router-link to="/register" class="btn btn-link">Register</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions } from "vuex";
import { State, Action, Getter } from "vuex-class";
const namespace: string = "login";

import {
  isValidForm,
  formControlDirtyStatus,
  CONSTANT,
  STORE_TYPE
} from "../_helpers/";

@Component({
  components: {}
})
export default class Login extends Vue {
  @Action(STORE_TYPE.LOGIN, { namespace }) login: any;

  user = {
    email: "om@g.com",
    password: "omprakash"
  };

  get isValidForm() {
    return isValidForm(this["veeFields"]);
  }

  handleSubmit() {
    this.login(this.user);
  }
}
</script>
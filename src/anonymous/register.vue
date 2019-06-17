<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 offset-sm-3">
          <h2>Register</h2>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                type="text"
                v-model="user.firstName"
                v-validate="{ required: true , regex:PATTERNS.firstName}"
                name="firstName"
                class="form-control"
                :class="{ 'is-invalid':  errors.has('firstName')  }"
              >
              <div class="invalid-feedback">
                <span v-show="errors.has('firstName')">{{ errors.first('firstName') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                v-model="user.lastName"
                v-validate="'required'"
                name="lastName"
                class="form-control"
                :class="{ 'is-invalid': errors.has('lastName') }"
              >
              <div class="invalid-feedback">
                <span v-show="errors.has('lastName')">{{ errors.first('lastName') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="lastName">Email</label>
              <input
                type="text"
                v-model="user.email"
                v-validate="{ required: true , regex:PATTERNS.email}"
                name="email"
                class="form-control"
                :class="{ 'is-invalid':errors.has('email') }"
              >
              <div class="invalid-feedback">
                <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                v-model="user.username"
                v-validate="'required'"
                name="username"
                class="form-control"
                :class="{ 'is-invalid':  errors.has('username') }"
              >
              <div class="invalid-feedback">
                <span v-show="errors.has('username')">{{ errors.first('username') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                v-model="user.password"
                v-validate="{ required: true, min: 6 }"
                name="password"
                class="form-control"
                ref="password"
                :class="{ 'is-invalid':  errors.has('password')}"
              >
              <div class="invalid-feedback">
                <span v-show="errors.has('password')">{{ errors.first('password') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm password</label>
              <input
                type="password"
                v-model="user.confirmPassword"
                v-validate="{ required: true, min: 6 ,confirmed: 'password' }"
                name="confirmPassword"
                class="form-control"
                :class="{ 'is-invalid': errors.has('confirmPassword')}"
              >
              <div class="invalid-feedback">
                <span v-show="errors.has('confirmPassword')">{{ errors.first('confirmPassword') }}</span>
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" :disabled="isValidForm">Register</button>
              <router-link to="/login" class="btn btn-link">Cancle</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PATTERNS, isValidForm } from "../_helpers";

@Component
export default class Register extends Vue {
  @Prop() private msg!: string;

  PATTERNS = PATTERNS;
  user = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  };

  get isValidForm() {
    return isValidForm(this["veeFields"]);
  }
}
</script>
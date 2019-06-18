<template>
  <div class="col-sm-6 offset-sm-3">
    <h2>Add Employee</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Name</label>
        <input
          type="text"
          v-model="employee.employee_name"
          name="employee_name"
          v-validate="'required'"
          id="employee_name"
          class="form-control"
          :class="{ 'is-invalid': errors.has(CONSTANT.EMPLOYEE_NAME) }"
        >
        <div class="invalid-feedback">
          <span
            v-show="errors.has(CONSTANT.EMPLOYEE_NAME)"
          >{{ errors.first(CONSTANT.EMPLOYEE_NAME) }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Age</label>
        <input
          type="text"
          v-model="employee.employee_age"
          name="employee_age"
          v-validate="'required'"
          id="employee_age"
          class="form-control"
          :class="{ 'is-invalid': errors.has(CONSTANT.EMPLOYEE_AGE) }"
        >
        <div class="invalid-feedback">
          <span v-show="errors.has(CONSTANT.EMPLOYEE_AGE)">{{ errors.first(CONSTANT.EMPLOYEE_AGE) }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="password">Salary</label>
        <input
          type="text"
          v-model="employee.employee_salary"
          name="employee_salary"
          v-validate="'required'"
          class="form-control"
          :class="{ 'is-invalid':errors.has(CONSTANT.EMPLOYEE_SALARY) }"
        >
        <div class="invalid-feedback">
          <span
            v-show="errors.has(CONSTANT.EMPLOYEE_SALARY)"
          >{{ errors.first(CONSTANT.EMPLOYEE_SALARY) }}</span>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="isValidForm">Submit</button>
        <router-link to="/" class="btn btn-link">Cancle</router-link>
      </div>
    </form>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import {
  isValidForm,
  formControlDirtyStatus,
} from '../_helpers/formValidation';
import { mapActions, mapGetters } from 'vuex';
import { STORE_TYPE, CONSTANT } from '../_helpers/constant';

const namespace: string = 'employees';

@Component({
  components: {},
})
export default class AddUpdateEmployee extends Vue {
  @Action(STORE_TYPE.ADD_EMPLOYEE, { namespace }) public addEmployee: any;
  @Action(STORE_TYPE.SET_CURRENT_URL, { namespace }) public setCurrentURL: any;
  @Action(STORE_TYPE.EDIT_EMPLOYEE, { namespace }) public editEmployee: any;
  @Getter(STORE_TYPE.EMPLOYEE, { namespace }) public employee!: any;

  public veeFields: any;
  public user = {
    email: '',
    password: '',
  };
  public CONSTANT = CONSTANT;
  public employeeId!: string;

  public mounted() {
    this.setCurrentURL(CONSTANT.URL_EMPLOYEE);
    if (this.$route.params.id) {
      this.employeeId = this.$route.params.id;
    }
  }

  public handleSubmit() {
    if (this.employeeId) {
      this.editEmployee({
        employeeId: this.employeeId,
        employee: this.employee,
      });
      return;
    }
    this.addEmployee(this.employee);
  }

  get isValidForm() {
    return isValidForm(this.veeFields);
  }

  public beforeDestroy() {
    this.setCurrentURL(CONSTANT.URL_BLANK);
  }
}
</script>
<template>
  <div class="container">
    <div class="row" v-show="$route.path===CONSTANT.URL_HOME">
      <div class="text-right mb-2">
        <b-button
          variant="primary"
          @click="addNewEmployee"
          v-b-tooltip.hover
          title="Add new employee"
        >Add new</b-button>
      </div>
      <b-table striped hover :items="currentPageData" :fields="columns">
        <template slot="actions" slot-scope="row">
          <b-button variant="info" size="sm" @click="editEmployee(row.item)" class="mr-1">Edit</b-button>
          <b-button variant="danger" size="sm" @click="deleteEmployee(row.item.id)">Delete</b-button>
        </template>
      </b-table>

      <div class="center">
        <b-pagination
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          :limit="limit"
          aria-controls="my-table"
          @change="pageChange"
        ></b-pagination>
      </div>
    </div>
    <div class="row">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { columns } from "../_models/employee";
import { State, Action, Getter } from "vuex-class";
import { STORE_TYPE, CONSTANT } from "../_helpers";

const namespace: string = "employees";

@Component({
  components: {}
})
export default class EmployeeList extends Vue {
  @State(STORE_TYPE.CURRENT_URL, { namespace }) currentUrl: string;
  @State(STORE_TYPE.IS_RESET_STATE, { namespace }) isResetState: string;
  @Getter(STORE_TYPE.CURRENT_PAGE_DATA, { namespace }) currentPageData: any[];
  @Getter(STORE_TYPE.TOTAL, { namespace }) total: number;
  @Action(STORE_TYPE.LOAD_CURRENT_PAGE_DATA, { namespace })
  loadCurrentPageData: any;
  @Action(STORE_TYPE.SET_IS_RESTE_STATE, { namespace })
  setIsResetSatte: any;
  @Action(STORE_TYPE.SELECTED_EMPLOYEE, { namespace }) selectedEmployee: any;
  @Action(STORE_TYPE.DELETE_EMPLOYEE, { namespace }) deleteEmployee: any;

  currentPage = 1;
  limit = 10;
  perPage = 10;
  columns = columns;
  CONSTANT = CONSTANT;
  STORE_TYPE = STORE_TYPE;

  mounted() {
    this.loadCurrentPageData({
      currentPage: this.currentPage,
      perPage: this.perPage
    });
  }

  addNewEmployee() {
    this[STORE_TYPE.SELECTED_EMPLOYEE](null);
    this.$router.push(CONSTANT.URL_ADD_EMPLOYEE);
  }

  editEmployee(employee) {
    this[STORE_TYPE.SELECTED_EMPLOYEE](employee);
    this.$router.push(CONSTANT.URL_EMPLOYEE + "/" + employee.id);
  }

  pageChange(page) {
    this.currentPage = page;
    this[STORE_TYPE.LOAD_CURRENT_PAGE_DATA]({
      currentPage: this.currentPage,
      perPage: this.perPage
    });
  }

  @Watch("isResetState")
  onPropertyChanged(newValue: string, oldValue: string) {
    if (this[STORE_TYPE.IS_RESET_STATE]) {
      this[STORE_TYPE.SET_IS_RESTE_STATE](false);
      this.pageChange(1);
    }
  }
}
</script>
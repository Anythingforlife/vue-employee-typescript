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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { columns } from '../_models/employee';
import { State, Action, Getter } from 'vuex-class';
import { STORE_TYPE, CONSTANT } from '../_helpers';

const namespace: string = 'employees';

@Component({
  components: {},
})
export default class EmployeeList extends Vue {
  @State(STORE_TYPE.CURRENT_URL, { namespace }) public currentUrl!: string;
  @State(STORE_TYPE.IS_RESET_STATE, { namespace }) public isResetState!: string;
  @Getter(STORE_TYPE.CURRENT_PAGE_DATA, { namespace })
  public currentPageData!: any;
  @Getter(STORE_TYPE.TOTAL, { namespace }) public total!: number;
  @Action(STORE_TYPE.LOAD_CURRENT_PAGE_DATA, { namespace })
  public loadCurrentPageData: any;
  @Action(STORE_TYPE.SET_IS_RESTE_STATE, { namespace })
  public setIsResetState: any;
  @Action(STORE_TYPE.SELECTED_EMPLOYEE, { namespace })
  public selectedEmployee: any;
  @Action(STORE_TYPE.DELETE_EMPLOYEE, { namespace }) public deleteEmployee: any;

  public currentPage = 1;
  public limit = 10;
  public perPage = 10;
  public columns = columns;
  public CONSTANT = CONSTANT;
  public STORE_TYPE = STORE_TYPE;

  public mounted() {
    this.loadCurrentPageData({
      currentPage: this.currentPage,
      perPage: this.perPage,
    });
  }

  public addNewEmployee() {
    this.selectedEmployee(null);
    this.$router.push(CONSTANT.URL_ADD_EMPLOYEE);
  }

  public editEmployee(employee: { id: string }) {
    this.selectedEmployee(employee);
    this.$router.push(CONSTANT.URL_EMPLOYEE + '/' + employee.id);
  }

  public pageChange(page: number) {
    this.currentPage = page;
    this.loadCurrentPageData({
      currentPage: this.currentPage,
      perPage: this.perPage,
    });
  }

  @Watch('isResetState')
  public onPropertyChanged(newValue: string, oldValue: string) {
    if (this.isResetState) {
      this.setIsResetState(false);
      this.pageChange(1);
    }
  }
}
</script>
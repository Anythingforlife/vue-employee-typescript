import { employeeService } from '../_services/employeeService';
import { sharedSerivce } from '../_services/sharedService';
import { STORE_TYPE, CONSTANT } from '../_helpers/constant';
import { router } from '../_helpers';
import { employee } from '../_models/employee';

const state = {
  total: 0,
  currentPage: 1,
  employees: {},
  currentPageData: [],
  employee: sharedSerivce.cloneObject(employee),
  currentUrl: '/',
  isResetState: false,
};


const getters = {
  [STORE_TYPE.EMPLOYEE](stateInstance: { employee: any; }) {
    return stateInstance.employee;
  },
  allPaginationsData(stateInstance: { employees: any[]; currentPage: number }) {
    return stateInstance.employees[stateInstance.currentPage];
  },
  currentPageData(stateInstance: { currentPageData: any[]; }) {
    return stateInstance.currentPageData;
  },
  total(stateInstance: { total: number }) {
    return stateInstance.total;
  },
  errorMesssage(stateInstance: { errorMesssage: string }) {
    return stateInstance.errorMesssage;
  },
};

const mutations = {
  [STORE_TYPE.UPDATE_CURRENT_PAGE_DATA](stateInstance: any, payload: { employeeId: number; employee: any; }) {
    const index = stateInstance.currentPageData.findIndex((data: { id: number }) => {
      return data.id === payload.employeeId;
    });
    stateInstance.employees[stateInstance.currentPage][index] = payload.employee;
    stateInstance.currentPageData = stateInstance.employees[stateInstance.currentPage];
  },
  [STORE_TYPE.EMPLOYEE](stateInstance: { employee: any; }, payload: any) {
    stateInstance.employee = sharedSerivce.cloneObject(payload ? payload : employee);
  },
  [STORE_TYPE.CURRENT_URL](stateInstance: { currentUrl: string }, payload: any) {
    stateInstance.currentUrl = payload;
  },
  [STORE_TYPE.IS_RESET_STATE](stateInstance: any, payload: boolean) {
    stateInstance.isResetState = payload;
  },
  [STORE_TYPE.CLEAR](stateInstance: any) {
    stateInstance.employees = {};
    stateInstance.employee = sharedSerivce.cloneObject(employee);
    stateInstance.total = 0;
    stateInstance.currentPage = 1;
    stateInstance.currentPageData = [];
  },
  allPaginationsData(stateInstance: { employees: any; }, payload: { currentPage: number; data: any; }) {
    stateInstance.employees[payload.currentPage] = payload.data;
  },
  [STORE_TYPE.CURRENT_PAGE](stateInstance: { currentPage: any; }, payload: any) {
    stateInstance.currentPage = payload;
  },
  total(stateInstance: any, payload: number) {
    stateInstance.total = payload;
  },
  currentPageData(stateInstance: any, payload: { currentPage: string | number; data: never[]; }) {
    if (payload.currentPage) {
      stateInstance.currentPageData = stateInstance.employees[payload.currentPage];
      return;
    }
    stateInstance.currentPageData = payload.data;
  },
  errorMesssage(stateInstance: { errorMesssage: any; }, payload: any) {
    stateInstance.errorMesssage = payload;
  },
};


const actions = {
  [STORE_TYPE.DELETE_EMPLOYEE]({ dispatch, commit }: any, payload: string) {
    employeeService.deleteEmployee(payload).then((response: any) => {
      dispatch(STORE_TYPE.TOASTER_SUCCESS, response.message, { root: true });
      commit(STORE_TYPE.CLEAR);
      commit(STORE_TYPE.IS_RESET_STATE, true);
      router.push({ path: CONSTANT.URL_BLANK });
    }, (error) => {
      dispatch(STORE_TYPE.TOASTER_ERROR, error.message, { root: true });
    });
  },
  [STORE_TYPE.SELECTED_EMPLOYEE]({ commit }: any, payload: any) {
    commit(STORE_TYPE.EMPLOYEE, payload);
  },
  [STORE_TYPE.SET_CURRENT_URL]({ commit }: any, payload: any) {
    commit(STORE_TYPE.CURRENT_URL, payload);
  },
  [STORE_TYPE.SET_IS_RESTE_STATE]({ commit }: any, payload: any) {
    commit(STORE_TYPE.IS_RESET_STATE, payload);
  },
  loadCurrentPageData({ dispatch, commit }: any, payload: { currentPage: number, perPage: number }) {
    commit(STORE_TYPE.CURRENT_PAGE, payload.currentPage);
    if (Object.keys(state.employees).includes(payload.currentPage.toString())) {
      commit(STORE_TYPE.CURRENT_PAGE_DATA, { currentPage: payload.currentPage });
    } else {
      employeeService.employeesData({ currentPage: payload.currentPage, perPage: payload.perPage })
        .then((response: any) => {
          commit(STORE_TYPE.ALL_PAGINATION_DATA, { data: response.data, currentPage: payload.currentPage });
          commit(STORE_TYPE.CURRENT_PAGE_DATA, { data: response.data });
          commit(STORE_TYPE.TOTAL, response.total);
        }, (error) => {
          dispatch(STORE_TYPE.TOASTER_ERROR, error.message, { root: true });
        });
    }
  },
  [STORE_TYPE.ADD_EMPLOYEE]({ dispatch, commit }: any, payload: any) {
    employeeService.addEmployee(payload).then((response: any) => {
      dispatch(STORE_TYPE.TOASTER_SUCCESS, response.message, { root: true });
      commit(STORE_TYPE.CLEAR);
      commit(STORE_TYPE.IS_RESET_STATE, true);
      router.push({ path: CONSTANT.URL_BLANK });
    }, (error: { message: any; }) => {
      dispatch(STORE_TYPE.TOASTER_ERROR, error.message, { root: true });
    });
  },
  [STORE_TYPE.EDIT_EMPLOYEE]({ dispatch, commit }: any, payload: any) {
    employeeService.editEmployee(payload.employeeId, payload.employee).then((response: any) => {
      dispatch(STORE_TYPE.TOASTER_SUCCESS, response.message, { root: true });
      commit(STORE_TYPE.UPDATE_CURRENT_PAGE_DATA, payload);
      router.push({ path: CONSTANT.URL_BLANK });
    }, (error) => {
      dispatch(STORE_TYPE.TOASTER_ERROR, error.message, { root: true });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

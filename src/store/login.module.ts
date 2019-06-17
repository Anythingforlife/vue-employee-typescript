import { storageService, authenticationService } from '../_services';
import { STORE_TYPE, CONSTANT } from '../_helpers/constant';
import { router } from '../_helpers';

const state = {
  user: storageService.getData(CONSTANT.USER),
};

const getters = {
  profile(stateInstance: { user: any; }) {
    return stateInstance.user;
  },
};

const mutations = {
  profile(stateInstance: { user: any; }, payload: any) {
    stateInstance.user = payload;
    storageService.storeData(CONSTANT.USER, payload);
  },
  logout(stateInstance: { user: null; }) {
    stateInstance.user = null;
    storageService.removeData(CONSTANT.USER);
    router.push({ path: CONSTANT.URL_LOGIN });
  },
};

const actions = {
  [STORE_TYPE.LOGIN]({ dispatch, commit }: any, payload: any) {
    authenticationService.login(payload).then((response) => {
      commit(STORE_TYPE.PROFILE, response);
      router.push({ path: CONSTANT.URL_HOME });
    }, (error) => {
      dispatch(STORE_TYPE.TOASTER_ERROR, error.message, { root: true });
    });
  },
  [STORE_TYPE.REGISTER]({ dispatch }: any, payload: any) {
    authenticationService.register(payload).then((response: any) => {
      dispatch(STORE_TYPE.TOASTER_SUCCESS, response.message, { root: true });
      router.push({ path: CONSTANT.URL_LOGIN });
    }, (error: { message: any; }) => {
      dispatch(STORE_TYPE.TOASTER_ERROR, error.message, { root: true });
    });
  },
  logout({ commit }: any) {
    commit(STORE_TYPE.LOGOUT);
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};

const state = {
  showLoader: false,
};



const mutations = {
  showLoader(stateInstance: { showLoader: boolean }, payload: boolean) {
    stateInstance.showLoader = payload;
  },
};

const actions = {
  showHideLoader({ commit }: any, payload: boolean) {
    commit('showLoader', payload);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};

const state = {
  type: null,
  message: null,
};

const actions = {
  success({ commit }: any, payload: any) {
    commit('message', { message: payload, type: 'success' });
  },
  error({ commit }: any, payload: any) {
    commit('message', { message: payload, type: 'error' });
  },
  info({ commit }: any, payload: any) {
    commit('message', { message: payload, type: 'info' });
  },
  warning({ commit }: any, payload: any) {
    commit('message', { message: payload, type: 'warning' });
  },
  clear({ commit }: any, message: any) {
    commit('clear', message);
  },
};

const mutations = {
  message(stateInstance: { type: any; message: any; }, payload: { type: any; message: any; }) {
    stateInstance.type = payload.type;
    stateInstance.message = payload.message;
  },
  clear(stateInstance: { type: null; message: null; }) {
    stateInstance.type = null;
    stateInstance.message = null;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};

export const SET_TOKEN = "SET_TOKEN";
export const SET_TYPE = "SET_TYPE";

export default {
  state: {
    token: localStorage.getItem("token") || "",
    adminType: sessionStorage.getItem("adminType") || 1
  },
  mutations: {
    [SET_TOKEN](state, token) {
      localStorage.setItem("token", token);
      state.token = token;
    },
    [SET_TYPE](state, type) {
      sessionStorage.setItem("adminType", type);
      state.adminType = type;
    }
  },
  actions: {
    [SET_TOKEN]({ commit }, token) {
      commit("SET_TOKEN", token);
    },
    [SET_TYPE]({ commit }, type) {
      commit("SET_TYPE", type);
    }
  }
};

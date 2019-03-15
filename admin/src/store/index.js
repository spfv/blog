import Vue from "vue";
import Vuex from "vuex";
import self from "./self.js";

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    self
  }
});
export default store;

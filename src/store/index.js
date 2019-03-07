import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import search from "./search.module";
import media from "./media.module";
import profile from "./profile.module";
import communication from "./communication.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    search,
    media,
    profile,
    communication
  }
});

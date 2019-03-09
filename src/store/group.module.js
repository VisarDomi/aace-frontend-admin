import { GroupService } from "@/common/api.service";

import { FETCH_GROUPS } from "./actions.type";

import { SET_GROUPS } from "./mutations.type";

const initialState = {
  groups: []
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_GROUPS](context, payload) {
    const { slug } = payload;
    console.log(slug)
    const { data } = await GroupService.getGroup(slug);
    context.commit(SET_GROUPS, data);
  }
};

export const mutations = {
  [SET_GROUPS](state, data) {
    console.log(data);
    state.groups = data;
  }
};

const getters = {
  groups() {
    return state.groups;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

import { GroupService } from "@/common/api.service";

import {
  FETCH_GROUPS,
  FETCH_GROUP_MEMBERS,
  SELECT_GROUP_MEMBERS,
  DISPLACE_MEMBER_IN_GROUP
} from "./actions.type";

import {
  SET_GROUPS,
  SET_GROUP_MEMBERS,
  SET_SELECTED_GROUP_MEMBERS,
  FETCH_START,
  FETCH_END
} from "./mutations.type";

const initialState = {
  groups: [],
  groupMembers: [],
  selectedGroupMembers: [],
  isLoading: true
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_GROUPS](context, payload) {
    context.commit(FETCH_START);
    const { slug } = payload;
    const { data } = await GroupService.getGroup(slug);
    context.commit(SET_GROUPS, data);

  },
  async [FETCH_GROUP_MEMBERS](context, payload) {
    context.commit(FETCH_START);
    const { slug } = payload;
    const { data } = await GroupService.getGroupMembers(slug);
    context.commit(SET_GROUP_MEMBERS, data);

  },
  [SELECT_GROUP_MEMBERS](context, payload) {
    context.commit(SET_SELECTED_GROUP_MEMBERS, payload);
  },
  async [DISPLACE_MEMBER_IN_GROUP](context, payload) {
    context.commit(FETCH_START);
    const { oldId, newId } = payload;
    let userIds = state.selectedGroupMembers.map(member => member.id);
    await GroupService.removeGroupMembers(oldId, { ids: userIds })
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
    await GroupService.setGroupMembers(newId, { ids: userIds });

  }
};

//fetch end is redundant in this case

export const mutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state) {
    state.isLoading = false;
  },
  [SET_GROUPS](state, data) {
    state.groups = data;
    state.isLoading = false;
  },
  [SET_GROUP_MEMBERS](state, data) {
    state.groupMembers = data;
    state.isLoading = false;
  },
  [SET_SELECTED_GROUP_MEMBERS](state, data) {
    state.selectedGroupMembers = data;
    state.isLoading = false;
  }
};

const getters = {
  groups() {
    return state.groups;
  },
  groupMembers() {
    return state.groupMembers;
  },
  selectedGroupMembers() {
    return state.selectedGroupMembers;
  },
  isLoading() {
    return state.isLoading;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

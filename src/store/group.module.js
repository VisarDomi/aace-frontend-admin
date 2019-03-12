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
  [DISPLACE_MEMBER_IN_GROUP](context, payload) {
    context.commit(FETCH_START);
    const { oldId, newId } = payload;
    for (var member in state.selectedGroupMembers) {
      console.log("moving user:")
      console.log(state.selectedGroupMembers[member].id)
      console.log("from old id: " + oldId);
      console.log("to new id " + newId);
      GroupService.removeGroupMember(oldId, state.selectedGroupMembers[member])
        .then(() => {
          GroupService.setGroupMember(
            newId,
            state.selectedGroupMembers[member]
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
    context.commit(FETCH_END);
  }
};

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

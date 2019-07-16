// import Vue from "vue";

import { MediaService } from "@/common/api.service";

import { FETCH_COMMUNICATION_DOCS } from "./actions.type";
import { FETCH_EVENT_DOCS } from "./actions.type";
import { FETCH_POLL_DOCS } from "./actions.type";
import { SET_COMM_DOCS, SET_EVENT_DOCS, SET_POLL_DOCS } from "./mutations.type";

const initialState = {
  communicationDocuments: [],
  eventDocuments: [],
  pollDocuments: []
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_COMMUNICATION_DOCS](context, payload) {
    const { data } = await MediaService.getCommunicationDocuments(payload.id);
    context.commit(SET_COMM_DOCS, data);
  },
  async [FETCH_EVENT_DOCS](context, payload) {
    const { data } = await MediaService.getEventDocuments(payload.id);
    context.commit(SET_EVENT_DOCS, data);
  },
  async [FETCH_POLL_DOCS](context, payload) {
    const { data } = await MediaService.getPollDocuments(payload.id);
    context.commit(SET_POLL_DOCS, data);
  }

};

export const mutations = {
  [SET_COMM_DOCS](state, data) {
    state.communicationDocuments = data;
  },
  [SET_EVENT_DOCS](state, data) {
    state.eventDocuments = data;
  },
  [SET_POLL_DOCS](state, data) {
    state.pollDocuments = data;
  }
};

const getters = {
  communicationDocuments() {
    return state.communicationDocuments;
  },
  eventDocuments() {
    return state.eventDocuments;
  },
  pollDocuments() {
    return state.pollDocuments;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

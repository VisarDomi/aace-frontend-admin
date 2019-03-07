import Vue from "vue";

import { MediaService } from "@/common/api.service";

import { FETCH_DOCS } from "./actions.type";

import { SET_COMM_DOCS } from "./mutations.type";

const initialState = {
  documents: []
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_DOCS](context, payload) {
    const { data } = await MediaService.getCommunicationDocuments(payload.id);
    context.commit(SET_COMM_DOCS, data);
  }
};

export const mutations = {
  [SET_COMM_DOCS](state, data) {
    state.documents = data;
  }
};

const getters = {
  communicationDocuments() {
    return state.documents;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

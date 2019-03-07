// import ApiService from "@/common/api.service";
import { CommunicationService } from "@/common/api.service";
import { FETCH_COMMS, FETCH_COMM } from "./actions.type";
import { SET_COMM, SET_COMMS } from "./mutations.type";

const initialState = {
  communications: [],
  comm: {}
};

export const state = { ...initialState };

const getters = {
  communications(state) {
    return state.communications;
  },
  comm(state) {
    return state.comm;
  }
};

export const actions = {
  async [FETCH_COMMS](context) {
    const { data } = await CommunicationService.getCommunications();
    context.commit(SET_COMMS, data);
  },
  async [FETCH_COMM](context, commId) {
    const { id } = commId;
    const { data } = await CommunicationService.getCommunication(id);
    context.commit(SET_COMM, data);
  }
};

export const mutations = {
  [SET_COMMS](state, communications) {
    state.communications = communications;
  },
  [SET_COMM](state, communication) {
    state.comm = communication;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

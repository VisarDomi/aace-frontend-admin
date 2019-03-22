// import ApiService from "@/common/api.service";
import { CommunicationService } from "@/common/api.service";
import { FETCH_COMMS, FETCH_COMM, MAKE_COMM } from "./actions.type";
import { SET_COMM, SET_COMMS, FETCH_START, FETCH_END } from "./mutations.type";

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
  },
  async [MAKE_COMM](context, payload) {
    context.commit(FETCH_START)
    const { name, description, body, groups, files } = payload;
    let commId;
    console.log("starting make communication calls");
    await CommunicationService.makeCommunication({
      name: name,
      description: description,
      body: body
    })
      .then(({ data }) => {
        console.log("comm created.")

        commId = data.id;
        console.log("starting to upload files to communication");
        console.log("comm id is still " + commId);
        CommunicationService.uploadFiles(commId, files);
        console.log("starting to add communication to groups");
        for (var group in groups) {
          console.log("adding comm to group " + group)
          CommunicationService.addGroupToCommunication(commId, groups[group]);
        }
      })
      .catch(() => {});
      console.log("finished making communication and assigning it to groups")
      CommunicationService.sendEmails(commId);
    // CommunicationService.uploadFiles(commId, files)
    context.commit(FETCH_END);
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

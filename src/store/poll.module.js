// import ApiService from "@/common/api.service";
import { PollService } from "@/common/api.service";
import { FETCH_POLLS, FETCH_POLL, MAKE_POLL, DELETE_POLL } from "./actions.type";
import { SET_POLL, SET_POLLS, FETCH_START, FETCH_END } from "./mutations.type";

const initialState = {
  polls: [],
  poll: {}
};

export const state = { ...initialState };

const getters = {
  polls(state) {
    return state.polls;
  },
  poll(state) {
    return state.poll;
  }
};

export const actions = {
  async [FETCH_POLLS](context) {
    const { data } = await PollService.getPolls();
    context.commit(SET_POLLS, data);
  },
  async [FETCH_POLL](context, pollId) {
    const { id } = pollId;
    const { data } = await PollService.getPoll(id);
    context.commit(SET_POLL, data);
  },
  async [DELETE_POLL](context, id){
    
    await PollService.deletePoll({id: id}).then(({data})=>{
      console.log(data);
      // CommunicationService.getCommunications().then(({data})=>{
      //   context.commit(SET_COMMS, data);
      // });
      
    });
  },
  async [MAKE_POLL](context, payload) {
    context.commit(FETCH_START);
    const { name, description, body, groups, files, time_start, options } = payload; //why extract then pack again? 
    console.log("editor body is: ", body)
    let pollId;
    await PollService.makePoll({
      name: name,
      description: description,
      body: body,
      time_start: time_start,
      options: options
    })
      .then(({ data }) => {
        pollId = data.id;
        console.log("poll created successfully.")
        for (var group in groups) {
            PollService.addGroupToPoll(pollId, groups[group]);
        }
      })
      .catch(() => {});
    console.log("poll id is: ", pollId);
    console.log("files are:", files);
    
    if (files!=null) {
      console.log("there are files to send");
      await PollService.uploadFiles(pollId, files);
      console.log("finished sending files to poll and assigning it to groups");
    }

    await PollService.sendEmails(pollId);
    context.commit(FETCH_END);
  }
};

export const mutations = {
  [SET_POLLS](state, polls) {
    state.polls = polls;
  },
  [SET_POLL](state, poll) {
    state.poll = poll;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

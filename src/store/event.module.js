// import ApiService from "@/common/api.service";
import { EventService } from "@/common/api.service";
import { FETCH_EVENTS, FETCH_EVENT, MAKE_EVENT, DELETE_EVENT } from "./actions.type";
import { SET_EVENT, SET_EVENTS, FETCH_START, FETCH_END } from "./mutations.type";

const initialState = {
  events: [],
  event: {}
};

export const state = { ...initialState };

const getters = {
  events(state) {
    return state.events;
  },
  event(state) {
    return state.event;
  }
};

export const actions = {
  async [FETCH_EVENTS](context) {
    const { data } = await EventService.getEvents();
    context.commit(SET_EVENTS, data);
  },
  async [FETCH_EVENT](context, eventId) {
    const { id } = eventId;
    const { data } = await EventService.getEvent(id);
    context.commit(SET_EVENT, data);
  },
  async [DELETE_EVENT](context, id){
    
    await EventService.deleteEvent({id: id}).then(({data})=>{
      console.log(data);
      // CommunicationService.getCommunications().then(({data})=>{
      //   context.commit(SET_COMMS, data);
      // });
      
    });
  },
  async [MAKE_EVENT](context, payload) {
    context.commit(FETCH_START);
    const { name, description, body, groups, files } = payload;
    console.log("editor body is: ", body)
    let eventId;
    await EventService.makeEvent({
      name: name,
      description: description,
      body: body
    })
      .then(({ data }) => {
        eventId = data.id;
        console.log("event created successfully.")
        for (var group in groups) {
            EventService.addGroupToEvent(eventId, groups[group]);
        }
      })
      .catch(() => {});
    console.log("event id is: ", eventId);
    console.log("files are:", files);
    
    if (files!=null) {
      console.log("there are files to send");
      await EventService.uploadFiles(eventId, files);
      console.log("finished sending files to event and assigning it to groups");
    }

    await EventService.sendEmails(eventId);
    context.commit(FETCH_END);
  }
};

export const mutations = {
  [SET_EVENTS](state, events) {
    state.events = events;
  },
  [SET_EVENT](state, event) {
    state.event = event;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

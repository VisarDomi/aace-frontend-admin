import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/common/jwt.service";
import { API_URL } from "@/common/config";

const ApiService = {
  init() {
    axios.defaults.headers.common = {
      "Secure-Api-Key": "asdfasdfetyeq",
      "Content-Type": "application/json"
    };
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
  },
  setHeaderMultipart() {
    Vue.axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
  },
  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  upload(resource, params) {
    console.log("is gonna upload");
    console.log(params);
    ApiService.setHeaderMultipart();
    // for(let param of params){
    //   console.log(param)
    // }
    return Vue.axios.post(`${resource}`, params);
  },

  login(resource, params) {
    return Vue.axios.post(`${resource}`, {}, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const MemberService = {
  get(slug) {
    return ApiService.get("user", slug);
  },
  search(membername) {
    return ApiService.post("user/search", membername);
  },
  accepted() {
    return ApiService.get("user/accepted");
  },
  //admin
  getMember(slug) {
    return ApiService.get("admin/user", slug);
  },
  changeStatus(slug, params) {
    return ApiService.put(`admin/user/${slug}`, params);
  }
};

export const MediaService = {
  getPicture(slug) {
    return ApiService.get("user", `${slug}/media/all`);
  },
  getCommunicationDocuments(slug) {
    return ApiService.get("communication", `${slug}/media/all`);
  },
  getEventDocuments(slug) {
    return ApiService.get("event", `${slug}/media/all`);
  },
  getPollDocuments(slug) {
    return ApiService.get("poll", `${slug}/media/all`);
  }
  //setUserEducation(){},
  //setUserExperience(){},
  //setUserSkills
};

export const EducationService = {
  getEducations(slug) {
    return ApiService.get("user", `${slug}/education/all`);
  }
};

export const ExperienceService = {
  getExperiences(slug) {
    return ApiService.get("user", `${slug}/experience/all`);
  }
};

export const SkillService = {
  getSkills(slug) {
    return ApiService.get("user", `${slug}/skill/all`);
  }
};

export const PaymentService = {
  getPayments(slug) {
    return ApiService.get("user", `${slug}/payment/all`);
  }
};

export const CommunicationService = {
  getCommunications() {
    return ApiService.get("communication", "all");
  },
  getCommunication(id) {
    return ApiService.get("communication", id);
  },
  makeCommunication(comm) {
    return ApiService.post("communication", comm);
  },
  deleteCommunication(payload){
    console.log("payload in delete: ", payload);
    return ApiService.delete(`communication/${payload.id}`);
  },
  addGroupToCommunication(commId, groupId) {
    return ApiService.put(
      `communication/${commId}/organizationgroup/${groupId}`
    );
  },
  uploadFiles(commId, formData) {
    return ApiService.upload(`communication/${commId}/media`, formData);
  },
  sendEmails(commId) {
    return Vue.axios.post(`communication/${commId}/email`, {});
  }
};

export const EventService = {
  getEvents() {
    return ApiService.get("event", "all");
  },
  getEvent(id) {
    return ApiService.get("event", id);
  },
  makeEvent(event) {
    return ApiService.post("event", event);
  },
  deleteEvent(payload){
    console.log("payload in delete: ", payload);
    return ApiService.delete(`event/${payload.id}`);
  },
  addGroupToEvent(eventId, groupId) {
    return ApiService.put(
      `event/${eventId}/organizationgroup/${groupId}`
    );
  },
  uploadFiles(eventId, formData) {
    return ApiService.upload(`event/${eventId}/media`, formData);
  },
  sendEmails(eventId) {
    return Vue.axios.post(`event/${eventId}/email`, {});
  }
};


export const PollService = {
  getPolls() {
    return ApiService.get("poll", "all");
  },
  getPoll(id) {
    return ApiService.get("poll", id);
  },
  makePoll(poll) {
    return ApiService.post("poll", poll);
  },
  deletePoll(payload){
    console.log("payload in delete: ", payload);
    return ApiService.delete(`poll/${payload.id}`);
  },
  addGroupToPoll(pollId, groupId) {
    return ApiService.put(
      `poll/${pollId}/organizationgroup/${groupId}`
    );
  },
  uploadFiles(pollId, formData) {
    return ApiService.upload(`poll/${pollId}/media`, formData);
  },
  sendEmails(pollId) {
    return Vue.axios.post(`poll/${pollId}/email`, {});
  }
};


export const GroupService = {
  getGroup(slug) {
    return ApiService.get("organizationgroup", slug);
  },
  getGroupMembers(slug) {
    return ApiService.get("organizationgroup", `${slug}/user/all`);
  },
  setGroupMembers(slug, users) {
    return ApiService.put(`organizationgroup/${slug}/user`, users);
  },
  removeGroupMembers(group, users) {
    return Vue.axios
      .delete(`organizationgroup/${group}/user`, { data: users })
      .catch(error => {
        throw new Error(`[RWV] ApiService ${error}`);
      });
  }
};


import UserService from "@/common/userstorage.service";
import {
  MemberService,
  MediaService,
  EducationService,
  ExperienceService
} from "@/common/api.service";
import {
  FETCH_PROFILE,
  FETCH_STATUS,
  //admin
  FETCH_MEMBERS,
  ACCEPT_APPLICANT,
  REJECT_APPLICANT,
  REBUTT_APPLICANT
} from "./actions.type";
import {
  SET_PROFILE,
  SET_PICTURE,
  SET_EDUCATION,
  SET_EXPERIENCE,
  SET_STATUS,
  //admin
  SET_MEMBERS
} from "./mutations.type";

const state = {
  errors: {},
  profile: {},
  profilePicture: "",
  educations: {},
  experience: {},
  status: "",
  //admin
  members: {}
};

const getters = {
  profile(state) {
    return state.profile;
  },
  profilePicture(state) {
    return state.profilePicture;
  },
  educations(state) {
    return state.educations;
  },
  experience(state) {
    return state.experience;
  },
  status(state) {
    return state.status;
  },
  //admin
  members(state) {
    return state.members;
  }
};

const actions = {
  async [FETCH_STATUS](context) {
    const id = UserService.getUser().id;
    const { data } = await MemberService.get(id);
    context.commit(SET_STATUS, data.register_status);
  },
  [FETCH_PROFILE](context, payload) {
    const { id } = payload;
    MemberService.get(id)
      .then(({ data }) => {
        context.commit(SET_PROFILE, data);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      });

    MediaService.getPicture(id)
      .then(({ data }) => {
        if (data.length != 0) {
          context.commit(SET_PICTURE, data[0].url);
        } else {
          context.commit(SET_PICTURE, "https://aace.ml/static/dpi.jpg");
        }
      })
      .catch(() => {});

    EducationService.getEducation(id)
      .then(({ data }) => {
        context.commit(SET_EDUCATION, data);
      })
      .catch(() => {});

    ExperienceService.getExperience(id)
      .then(({ data }) => {
        context.commit(SET_EXPERIENCE, data);
      })
      .catch(() => {});
  },
  //admin
  async [FETCH_MEMBERS](context, payload) {
    const { users } = payload;
    if (users == "all") {
      const { data } = await MemberService.get(users);
      context.commit(SET_MEMBERS, data);
    } else {
      const { data } = await MemberService.getMember(users);
      context.commit(SET_MEMBERS, data);
    }
  },
  async [ACCEPT_APPLICANT](context, payload) {
    const { id } = payload.id;
    const { comment_from_administrator } = payload;
    MemberService.changeStatus(id, { comment_from_administrator , register_status: "approved"});
  },
  async [REBUTT_APPLICANT](context, payload) {
    const { id } = payload.id;
    const { comment_from_administrator } = payload;
    MemberService.changeStatus(id, { comment_from_administrator , register_status: "rebutted"});
  },
  async [REJECT_APPLICANT](context, payload) {
    const { id } = payload.id;
    const { comment_from_administrator } = payload;
    MemberService.changeStatus(id, { comment_from_administrator , register_status: "rejected"});
  }
};

const mutations = {
  // [SET_ERROR] (state, error) {
  //   state.errors = error
  // },
  [SET_PROFILE](state, profile) {
    state.profile = profile;
    state.errors = {};
  },
  [SET_PICTURE](state, picture) {
    state.profilePicture = picture;
  },
  [SET_EDUCATION](state, education) {
    state.educations = education;
  },
  [SET_EXPERIENCE](state, experience) {
    state.experience = experience;
  },
  [SET_STATUS](state, status) {
    state.status = status;
  },
  //admin
  [SET_MEMBERS](state, data){
    state.members = data;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

import UserService from "@/common/userstorage.service";
import {
  MemberService,
  MediaService,
  GroupService,
  EducationService,
  ExperienceService,
  SkillService
} from "@/common/api.service";
import {
  FETCH_PROFILE,
  FETCH_STATUS,
  //admin
  FETCH_MEMBERS,
  FETCH_MEMBER_NAMES,
  ACCEPT_APPLICANT,
  REJECT_APPLICANT,
  REBUTT_APPLICANT
} from "./actions.type";
import {
  SET_PROFILE,
  SET_PICTURE,
  SET_EDUCATIONS,
  SET_EXPERIENCES,
  SET_SKILLS,
  SET_STATUS,
  //admin
  SET_MEMBERS,
  SET_MEMBER_NAMES
} from "./mutations.type";

const state = {
  errors: {},
  profile: {},
  profilePicture: "",
  educations: {},
  experiences: {},
  skills: {},
  status: "",
  //admin
  members: {},
  memberNames: []
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
  experiences(state) {
    return state.experiences;
  },
  skills(state) {
    return state.skills;
  },
  status(state) {
    return state.status;
  },
  //admin
  members(state) {
    return state.members;
  },
  memberNames(state) {
    return state.memberNames;
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

    EducationService.getEducations(id)
      .then(({ data }) => {
        context.commit(SET_EDUCATIONS, data);
      })
      .catch(() => {});

    ExperienceService.getExperiences(id)
      .then(({ data }) => {
        context.commit(SET_EXPERIENCES, data);
      })
      .catch(() => {});

    SkillService.getSkills(id)
      .then(({ data }) => {
        context.commit(SET_SKILLS, data);
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
    MemberService.changeStatus(id, {
      comment_from_administrator,
      register_status: "accepted"
    });
    GroupService.setGroupMembers(1, { ids: [id] }).catch(error => {
      console.log("The user is already a member." + error);
    }); //id 1 is members
  },
  async [REBUTT_APPLICANT](context, payload) {
    const { id } = payload.id;
    const { comment_from_administrator } = payload;
    MemberService.changeStatus(id, {
      comment_from_administrator,
      register_status: "rebutted"
    });
  },
  async [REJECT_APPLICANT](context, payload) {
    const { id } = payload.id;
    const { comment_from_administrator } = payload;
    MemberService.changeStatus(id, {
      comment_from_administrator,
      register_status: "rejected"
    });
  },
  async [FETCH_MEMBER_NAMES](context) {
    const { data } = await MemberService.get("all");
    var memberNames = [];
    for (var name in data) {
      memberNames.push(data[name].first_name + " " + data[name].last_name);
    }
    context.commit(SET_MEMBER_NAMES, memberNames);
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
  [SET_EDUCATIONS](state, educations) {
    state.educations = educations;
  },
  [SET_EXPERIENCES](state, experiences) {
    state.experiences = experiences;
  },
  [SET_SKILLS](state, skills) {
    state.skills = skills;
  },
  [SET_STATUS](state, status) {
    state.status = status;
  },
  //admin
  [SET_MEMBERS](state, data) {
    state.members = data;
  },
  [SET_MEMBER_NAMES](state, data) {
    state.memberNames = data;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

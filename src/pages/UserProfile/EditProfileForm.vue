<template>
<div>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Applicant Profile</h4>
        <p class="category">Review the applicant</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>First Name</label>
              <md-input v-model="profile.first_name" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="profile.last_name" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Profession</label>
              <md-input v-model="profile.profession" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Summary</label>
              <md-input v-model="profile.summary" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Country</label>
              <md-input v-model="profile.country" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Address</label>
              <md-input v-model="profile.address" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Website</label>
              <md-input v-model="profile.website" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Email</label>
              <md-input v-model="profile.email" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Gender</label>
              <md-input v-model="profile.sex" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Birthday</label>
              <md-input v-model="profile.birthday" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Phone</label>
              <md-input v-model="profile.phone" disabled></md-input>
            </md-field>
          </div>
          <!-- <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>Komento aplikimin</label>
              <md-textarea v-model="comment_from_administrator" placeholder="Bashkangjisni nje koment qe shpjegon vendimin."></md-textarea>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right"></div> -->
        </div>
      </md-card-content>
    </md-card>
  </form>

  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Applicant Education</h4>
        <p class="category">Review the applicant's education</p>
      </md-card-header>

      <md-card-content v-for="(education,index) in educations" :key="education.id">
        <h5>Edukimi {{index+1}}</h5>
        <div class="md-layout">
          
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Lloji i edukimit</label>
              <md-input v-model="education.education_type" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Niveli i edukimit</label>
              <md-input v-model="education.degree" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Dega e studimit</label>
              <md-input v-model="education.field_of_study" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Emri i institucionit</label>
              <md-input v-model="education.school" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Pershkrimi i deges</label>
              <md-input v-model="education.description" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Data e fillimit</label>
              <md-input v-model="education.from_date" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Data e mbarimit</label>
              <md-input v-model="education.to_date" disabled></md-input>
            </md-field>
          </div>
          <br>
        </div>
      </md-card-content>
    </md-card>
  </form>

  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Applicant Experience</h4>
        <p class="category">Review the applicant's experience</p>
      </md-card-header>

      <md-card-content v-for="(experience,index) in experience" :key="experience.id">
        <h5>Eksperienca {{index+1}}</h5>
        <div class="md-layout">
          
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Emri i kompanise</label>
              <md-input v-model="experience.company" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Emri i punedhenesit</label>
              <md-input v-model="experience.employer" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Pershkrimi i eksperiences</label>
              <md-input v-model="experience.description" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Data e fillimit</label>
              <md-input v-model="experience.from_date" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Data e mbarimit</label>
              <md-input v-model="experience.to_date" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Vendndodhja</label>
              <md-input v-model="experience.location" disabled></md-input>
            </md-field>
          </div>
          <br>
        </div>
      </md-card-content>
    </md-card>
  </form>

      <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Comment the application</h4>
        <p class="category">Review the applicant</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>Komento aplikimin</label>
              <md-textarea v-model="comment_from_administrator" placeholder="Bashkangjisni nje koment qe shpjegon vendimin."></md-textarea>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right"></div>
        </div>
      </md-card-content>
    </md-card>
  </form>        
  
  <div class="md-layout-item md-size-100 text-center">
            <md-button
              class="md-raised md-danger text-left" style="margin-right: 10px;"
              @click="rejectApplication(comment_from_administrator)"
            >Reject Applicant</md-button>
            <md-button
              class="md-raised md-warning text-right" style="margin-right: 10px;"
              @click="rebuttApplication(comment_from_administrator)"
            >Rebutt Applicant</md-button>
            <md-button
              class="md-raised md-success text-right"
              @click="acceptApplication(comment_from_administrator)"
            >Accept Applicant</md-button>
          </div>


  </div>
</template>
<script>

import { mapGetters } from "vuex";
import {
  FETCH_PROFILE,
  REJECT_APPLICANT,
  REBUTT_APPLICANT,
  ACCEPT_APPLICANT
} from "@/store/actions.type";
import store from "@/store";

export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      comment_from_administrator: ""
    }
  },
  methods: {
    rejectApplication: function(comment_from_administrator) {
      this.$store.dispatch(REJECT_APPLICANT, {id:this.$route.params,comment_from_administrator:comment_from_administrator})
      .then(() => this.$router.push({ name: "Dashboard" }));
    },
    rebuttApplication: function(comment_from_administrator) {
      this.$store.dispatch(REBUTT_APPLICANT, {id:this.$route.params,comment_from_administrator:comment_from_administrator})
      .then(() => this.$router.push({ name: "Dashboard" }));
    },
    acceptApplication: function(comment_from_administrator) {
      this.$store.dispatch(ACCEPT_APPLICANT, {id:this.$route.params,comment_from_administrator:comment_from_administrator})
      .then(() => this.$router.push({ name: "Dashboard" }));
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_PROFILE, this.$route.params);
  },
  computed: {
    ...mapGetters(["profile", "educations","experience"])
  },  
  watch: {
    $route(to) {
      this.$store.dispatch(FETCH_PROFILE, to.params);
    }
  }
};
</script>
<style>
</style>

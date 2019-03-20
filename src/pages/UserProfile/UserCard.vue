<template>
  <div>
    <md-card class="md-card-profile">
      <div class="md-card-avatar">
        <img class="img" :src="profilePicture">
      </div>
      <md-card-content>
        <h6 class="category text-gray">{{profile.profession}}</h6>
        <h4 class="card-title">{{profile.first_name}} {{profile.last_name}}</h4>
        <p class="card-description">{{profile.summary}}</p>
        <!-- <md-button class="md-round md-success">Follow</md-button> -->
      </md-card-content>
    </md-card>

    <md-card class="md-card-profile">
      <md-card-header>
        <h3>Dokumentat e aplikimit</h3>
      </md-card-header>
      <md-card-content v-if="educations.length || experiences.length || skills.length">
        <template v-for="(education, index) in educations">
          <template v-for="media_id in education.media_education_ids">
            <button
              :key="media_id + '-education'"
              type="button"
              class="md-button md-raised md-info text-right md-theme-default"
              @click="downloadDocument(media_id,profile.first_name + profile.last_name + '_arsim_' + media_id, 'education')"
            >
              <div class="md-ripple">
                <i class="material-icons">attachment</i>
                <div class="md-button-content">Shkarko dokumentat e arsimit nr. {{index+1}}</div>
                <span></span>
              </div>
            </button>
          </template>
        </template>

        <template v-for="(experience, index) in experiences">
          <template v-for="media_id in experience.media_experience_ids">
            <button
              :key="media_id + '-experience'"
              type="button"
              class="md-button md-raised md-info text-right md-theme-default"
              @click="downloadDocument(media_id, profile.first_name + profile.last_name + '_eksperience_' + media_id, 'experience')"
            >
              <div class="md-ripple">
                <i class="material-icons">attachment</i>
                <div class="md-button-content">Shkarko dokumentat e eksperiences nr. {{index+1}}</div>
                <span></span>
              </div>
            </button>
          </template>
        </template>

        <template v-for="(skill, index) in skills">
          <template v-for="media_id in skill.media_skill_ids">
            <button
              :key="media_id + '-skill'"
              type="button"
              class="md-button md-raised md-info text-right md-theme-default"
              @click="downloadDocument(media_id, profile.first_name + profile.last_name + '_kualifikim_' + media_id, 'skill')"
            >
              <div class="md-ripple">
                <i class="material-icons">attachment</i>
                <div class="md-button-content">Shkarko dokumentat e kualifikimit nr. {{index+1}}</div>
                <span></span>
              </div>
            </button>
          </template>
        </template>
      </md-card-content>
      <md-card-content v-else>
        <md-card>S'ka dokumenta pagese</md-card>
      </md-card-content>
    </md-card>

    <md-card class="md-card-profile">
      <md-card-header>
        <h3>Dokumentat e mandat pageses</h3>
      </md-card-header>
      <md-card-content v-if="payments.length">
        <template v-for="(payment, index) in payments">
          <template v-for="media_id in payment.media_payment_ids">
            <button
              :key="media_id + '-payment'"
              type="button"
              class="md-button md-raised md-info text-right md-theme-default"
              @click="downloadDocument(media_id, profile.first_name + profile.last_name + '_vertetim_pagese_' + media_id, 'payment')"
            >
              <div class="md-ripple">
                <i class="material-icons">attachment</i>
                <div class="md-button-content">Shkarko dokumentat e pageses nr. {{index+1}}</div>
                <span></span>
              </div>
            </button>
          </template>
        </template>
      </md-card-content>
      <md-card-content v-else>
        <md-card>S'ka dokumenta pagese</md-card>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
import axios from "axios";
const FileSaver = require("file-saver");
import { mapGetters } from "vuex";
import JwtService from "@/common/jwt.service";
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/marc.jpg")
    }
  },
  methods: {
    // downloadEducation(docID, docName) {
    //   axios
    //     .get("https://aace.ml/api/admin/media_education/" + docID, {
    //       responseType: "arraybuffer",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + JwtService.getToken(),
    //         Accept: "application/pdf"
    //       }
    //     })
    //     .then(res => {
    //       // response.data is an empty object
    //       const blob = new Blob([res.data], {
    //         type: "application/pdf"
    //       });
    //       FileSaver.saveAs(
    //         blob,
    //         docName
    //       );
    //     });
    // },
    // downloadExperience(docID, docName) {
    //   axios
    //     .get("https://aace.ml/api/admin/media_experience/" + docID, {
    //       responseType: "arraybuffer",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + JwtService.getToken(),
    //         Accept: "application/pdf"
    //       }
    //     })
    //     .then(res => {
    //       // response.data is an empty object
    //       const blob = new Blob([res.data], {
    //         type: "application/pdf"
    //       });
    //       FileSaver.saveAs(
    //         blob,
    //         docName
    //       );
    //     });
    // },
    downloadDocument(docID, docName, type) {
      axios
        .get("https://aace.ml/api/admin/media_" + type + "/" + docID, {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + JwtService.getToken(),
            Accept: "application/pdf"
          }
        })
        .then(res => {
          // response.data is an empty object
          console.log(res.headers["content-type"]);
          const blob = new Blob([res.data], {
            type: res.headers["content-type"]
          });
          FileSaver.saveAs(blob, docName);
        });
    }
  },
  computed: {
    ...mapGetters([
      "profilePicture",
      "profile",
      "educations",
      "experiences",
      "skills",
      "payments"
    ])
  }
};
</script>
<style>
</style>

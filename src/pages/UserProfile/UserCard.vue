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
      <md-card-content>
        <h3>Dokumentat e aplikimit</h3>
      </md-card-content>
      <md-card-content v-if="educations.length || experiences.length || skills.length">
        <template v-for="(education, index) in educations">
          <template v-for="media in education.education_medias">
            <div>
            <button
              :key="'education' + media.id"
              type="button"
              class="md-button md-raised md-info text-right md-theme-default"
              @click="downloadDocument(media.id, profile.first_name + profile.last_name + '_arsim_' + media.id, 'education')"
            >
              <div class="md-ripple">
                <i class="material-icons">attachment</i>
                <div class="md-button-content">Arsimi nr. {{index+1}} -</div>
                
                <div style="font-size:12px;">&nbsp;{{media.timestamp}}</div>
              </div>
            </button> &nbsp;</div>
          </template>
        </template>

        <template v-for="(experience, index) in experiences">
          <template v-for="media in experience.experience_medias">
            <div>
            <button
              :key="'experience' + media.id"
              type="button"
              class="md-button md-raised md-info text-right md-theme-default"
              @click="downloadDocument(media.id, profile.first_name + profile.last_name + '_eksperience_' + media.id, 'experience')"
            >
              <div class="md-ripple">
                <i class="material-icons">attachment</i>
                <div class="md-button-content">Eksperienca nr. {{index+1}} -</div>
                <div style="font-size:12px;">&nbsp;{{media.timestamp}}</div>
              </div>
            </button> &nbsp;</div>
          </template>
        </template>

        <template v-for="(skill, index) in skills">
          <template v-for="media in skill.skill_medias">
            <div>
            <button
              :key="'skill' + media.id"
              type="button"
              class="md-button md-raised md-info text-right md-theme-default"
              @click="downloadDocument(media.id, profile.first_name + profile.last_name + '_kualifikim_' + media.id, 'skill')"
            >
              <div class="md-ripple">
                <i class="material-icons">attachment</i>
                <div class="md-button-content">Kualifikimit nr. {{index+1}} -</div>
                <div style="font-size:12px;">&nbsp;{{media.timestamp}}</div>
              </div>
            </button> &nbsp;</div>
          </template>
        </template>
      </md-card-content>
      <md-card-content v-else>
        <md-card>S'ka dokumenta</md-card>
      </md-card-content>
    </md-card>

    <md-card class="md-card-profile">
      <md-card-content>
        <h3>Dokumentat e mandat pageses</h3>
      </md-card-content>
      <md-card-content v-if="payments.length">
        <template v-for="(payment, index) in payments">
          <template v-for="media in payment.payment_medias">
            <div>
            <button
              :key="media.id + '-payment'"
              type="button"
              class="md-button md-raised md-info text-right md-theme-default"
              @click="downloadDocument(media.id, profile.first_name + profile.last_name + '_mandat_pagese_' + media.id, 'payment')"
            >
              <div class="md-ripple">
                <i class="material-icons">attachment</i>
                <div class="md-button-content">Pageses nr. {{index+1}} -</div>
                <div style="font-size:12px;">&nbsp;{{media.timestamp}}</div>
              </div>
            </button> &nbsp;</div>
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

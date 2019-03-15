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
        <template v-for="education_media in educations">
          <button
            :key="education_media.id"
            type="button"
            class="md-button md-raised md-info text-right md-theme-default"
            @click="downloadDoc(education_media.id,education_media.filename)"
          >
            <div class="md-ripple">
              <i class="material-icons">attachment</i>
              <div class="md-button-content">Download education_media {{education_media.id}}</div>
              <span></span>
            </div>
          </button>
        </template>
        <template v-for="experience_media in experience">
          <button
            :key="experience_media.id"
            type="button"
            class="md-button md-raised md-info text-right md-theme-default"
            @click="downloadDoc(experience_media.id,experience_media.filename)"
          >
            <div class="md-ripple">
              <i class="material-icons">attachment</i>
              <div class="md-button-content">Download experience_media {{experience_media.id}}</div>
              <span></span>
            </div>
          </button>
        </template>
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
    downloadDoc(docID, docName) {
      axios
        .get("https://aace.ml/api/admin/media_education/" + docID, {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + JwtService.getToken(),
            Accept: "application/pdf"
          }
        })
        .then(res => {
          // response.data is an empty object
          const blob = new Blob([res.data], {
            type: "application/pdf"
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
      "experience",
      "profilePicture"
    ])
  }
};
</script>
<style>
</style>

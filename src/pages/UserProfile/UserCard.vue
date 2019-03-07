<template>
  <div>
    <md-card class="md-card-profile">
      <div class="md-card-avatar">
        <img class="img" :src="profile_picture">
      </div>

      <md-card-content>
        <h6 class="category text-gray">{{this.profession}}</h6>
        <h4 class="card-title">{{this.first_name}} {{this.last_name}}</h4>
        <p class="card-description">{{this.summary}}</p>
        <!-- <md-button class="md-round md-success">Follow</md-button> -->
      </md-card-content>
    </md-card>

    <md-card class="md-card-profile">
      <md-card-content>
        <template v-for="education_media in this.education_medias">
          <button
            :key="education_media.id"
            type="button"
            class="md-button md-raised md-info text-right md-theme-default"
            @click="downloadDoc(education_media)"
          >
            <div class="md-ripple">
              <i class="material-icons">attachment</i>
              <div class="md-button-content">Download education_media {{education_media}}</div>
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
export default {
  name: "user-card",
  props: {
    user_id: "",
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/marc.jpg")
    }
  },
  data() {
    return {
      first_name: "",
      last_name: "",
      profession: "",
      summary: "",
      profile_picture: null,
      education_medias: []
    };
  },
  mounted() {
    console.log(
      'localStorage.getItem("admin_token")' +
        localStorage.getItem("admin_token")
    );
    axios
      .get("https://aace.ml/api/admin/user/" + this.user_id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("admin_token")
        }
      })
      .then(res => {
        console.log("res.data :", res.data);
        this.first_name = res.data.first_name;
        this.last_name = res.data.last_name;
        this.profession = res.data.profession;
        this.summary = res.data.summary;
        // this.profile_picture =
        //   "https://aace.ml/static/files/" + res.data.profile_picture;
        this.education_medias = res.data.media_education_ids;
        console.log("The media is: ", this.education_medias);
      });
  },
  methods: {
    downloadDoc(docID) {
      console.log("inside downloads");
      console.log("tring to download doc with ID: " + docID);

      axios
        .get("https://aace.ml/api/admin/media_education/" + docID, {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("admin_token"),
            Accept: "application/pdf"
          }
        })
        .then(res => {
          console.log("Media with id " + docID + " downloaded successfully");
          console.log("res :", res);
          // response.data is an empty object
          const blob = new Blob([res.data], {
            type: "application/pdf"
          });
          FileSaver.saveAs(blob);
        });
    }
  }
};
</script>
<style>
</style>

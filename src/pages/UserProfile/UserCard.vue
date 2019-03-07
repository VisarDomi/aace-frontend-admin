<template>
  <div>
    <md-card class="md-card-profile">
      <div class="md-card-avatar">
        <img class="img" :src="profile_picture">
      </div>

      <md-card-content>
        <h6 class="category text-gray">{{this.headline}}</h6>
        <h4 class="card-title">{{this.first_name}} {{this.last_name}}</h4>
        <p class="card-description">{{this.summary}}</p>
        <!-- <md-button class="md-round md-success">Follow</md-button> -->
      </md-card-content>
    </md-card>

    <md-card class="md-card-profile">
      <md-card-content>
        
        <template v-for="document in this.medias" >
          <button :key="document.id" type="button" class="md-button md-raised md-info text-right md-theme-default" @click="downloadDoc(document)">
            <div class="md-ripple">
              <i class="material-icons">attachment</i>
              <div class="md-button-content">Download Document {{document}}</div>
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
      headline: "",
      summary: "",
      profile_picture: null,
      medias: []
    };
  },
  mounted() {
    axios
      .get("https://aace.ml/api/user/" + this.user_id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("admin_token")
        }
      })
      .then(res => {
        this.first_name = res.data.first_name;
        this.last_name = res.data.last_name;
        this.headline = res.data.headline;
        this.summary = res.data.summary;
        this.profile_picture =
          "https://aace.ml/static/files/" + res.data.profile_picture;
        this.medias = res.data.document_ids;
      });
  },
  methods: {
    downloadDoc(docID) {
      axios
        .get("https://aace.ml/api/admin/media/" + docID, {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("admin_token"),
            Accept: "application/pdf"
          }
        })
        .then(res => {
          // response.data is an empty object
          const blob = new Blob([res.data], {
            type: "application/pdf"
          });
          FileSaver.saveAs(
            blob,
            this.first_name + "_" + this.last_name + docID
          );
        });
    }
  }
};
</script>
<style>
</style>

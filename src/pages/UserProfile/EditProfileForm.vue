<template>
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
              <md-input v-model="first_name" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="last_name" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Headline</label>
              <md-input v-model="headline" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Summary</label>
              <md-input v-model="summary" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Country</label>
              <md-input v-model="country" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Address</label>
              <md-input v-model="address" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Website</label>
              <md-input v-model="website" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Email</label>
              <md-input v-model="email" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Industry</label>
              <md-input v-model="industry" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Birthday</label>
              <md-input v-model="birthday" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Phone</label>
              <md-input v-model="phone" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>Komento aplikimin</label>
              <md-textarea v-model="comment_from_administrator"></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-center">
            <md-button
              class="md-raised md-danger text-left"
              @click="rejectApplication"
            >Reject Applicant</md-button>
            <md-button
              class="md-raised md-warning text-right"
              @click="rebuttApplication"
            >Rebutt Applicant</md-button>
            <md-button
              class="md-raised md-success text-right"
              @click="acceptApplication"
            >Accept Applicant</md-button>
          </div>
          <div class="md-layout-item md-size-100 text-right"></div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import axios from "axios";

export default {
  name: "edit-profile-form",
  props: {
    user_id: "",
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // disabled: null,
      first_name: "",
      last_name: "",
      headline: "",
      summary: "",
      country: "",
      industry: "",
      phone: "",
      address: "",
      birthday: "",
      website: "",
      email: "",
      comment_from_administrator: "",
      file: ""
    };
  },
  methods: {
    rejectApplication: function() {
      axios
        .put(
          "https://aace.ml/api/admin/user/" + this.user_id,
          {
            register_status: "rejected"
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("admin_token")
            }
          }
        )
        .then(res => {
          this.$router.push({
            name: "Dashboard"
          });
        });
    },
    rebuttApplication: function() {
      axios
        .put(
          "https://aace.ml/api/admin/user/" + this.user_id,
          {
            comment_from_administrator: this.comment_from_administrator,
            register_status: "rebutted"
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("admin_token")
            }
          }
        )
        .then(res => {
          this.$router.push({
            name: "Dashboard"
          });
        });
    },
    acceptApplication: function() {
      axios
        .put(
          "https://aace.ml/api/admin/user/" + this.user_id,
          {
            register_status: "approved"
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("admin_token")
            }
          }
        )
        .then(res => {
          this.$router.push({
            name: "Dashboard"
          });
        }).catch(err => {
          console.log(err)
        });
    }
  },
  mounted() {
    axios
      .get("https://aace.ml/api/user/" + this.user_id, {
        responseType: "json"
      })
      .then(res => {
        console.log(res);
        this.first_name = res.data.first_name;
        this.last_name = res.data.last_name;
        this.headline = res.data.headline;
        this.summary = res.data.summary;
        this.country = res.data.country;
        this.industry = res.data.industry;
        this.email = res.data.email;
        this.phone = res.data.phone;
        this.address = res.data.address;
        this.birthday = res.data.birthday;
        this.website = res.data.website;
        this.comment_from_administrator = res.data.comment_from_administrator;
      });
  }
};
</script>
<style>
</style>

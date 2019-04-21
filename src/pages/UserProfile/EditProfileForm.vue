<template>
  <div>
    <form>
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">Profili i aplikuesit</h4>
          <p class="category">Rishiko aplikantin</p>
        </md-card-header>

        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Emer</label>
                <md-input v-model="profile.first_name" disabled></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Mbiemer</label>
                <md-input v-model="profile.last_name" disabled></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Profesioni</label>
                <md-input v-model="profile.profession" disabled></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Pershkrim i shkurter</label>
                <md-input v-model="profile.summary" disabled></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Vendlindja</label>
                <md-input v-model="profile.country" disabled></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Adresa</label>
                <md-input v-model="profile.address" disabled></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Faqja e internetit</label>
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
                <label>Gjinia</label>
                <md-input v-model="profile.sex" disabled></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Datelindja</label>
                <md-input v-model="profile.birthday" disabled></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Numri i telefonit</label>
                <md-input v-model="profile.phone" disabled></md-input>
              </md-field>
            </div>
            <!-- <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>Komento aplikimin</label>
              <md-textarea v-model="comment_from_administrator" placeholder="Bashkangjisni nje koment qe shpjegon vendimin."></md-textarea>
            </md-field>
          </div>

            <div class="md-layout-item md-size-100 text-right"></div>-->
          </div>
        </md-card-content>
      </md-card>
    </form>

    <form>
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">Arsimi i aplikantit</h4>
          <p class="category">Rishiko arsimin e aplikantit</p>
        </md-card-header>

        <md-card-content v-for="(education,index) in educations" :key="education.id">
          <h5>Arsimi {{index+1}}</h5>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Lloji i arsimit</label>
                <md-input v-model="education.education_type" disabled></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Tipi i diplomes</label>
                <md-input v-model="education.degree" disabled></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Dega</label>
                <md-input v-model="education.field_of_study" disabled></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Emri i shkolles</label>
                <md-input v-model="education.school" disabled></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Pershkrimi i arsimit</label>
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
          <h4 class="title">Pervoja e punes e aplikantit</h4>
          <p class="category">Rishiko pervojen e punes te aplikantit</p>
        </md-card-header>

        <md-card-content v-for="(experience,index) in experiences" :key="experience.id">
          <h5>Pervoja e punes {{index+1}}</h5>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Titulli</label>
                <md-input v-model="experience.title" disabled></md-input>
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
          <h4 class="title">Kualifikimet e aplikantit</h4>
          <p class="category">Rishikoni kualifikimet e aplikantit</p>
        </md-card-header>

        <md-card-content v-for="(skill,index) in skills" :key="skill.id">
          <h5>Kualifikimi {{index+1}}</h5>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Emri i kualifikimit</label>
                <md-input v-model="skill.name" disabled></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Leshuesi i kualifikimit</label>
                <md-input v-model="skill.releaser" disabled></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Pershkrim i kualifikimit</label>
                <md-textarea v-model="skill.description" disabled></md-textarea>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Data e fillimit</label>
                <md-input v-model="skill.from_date" disabled></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Data e mbarimit</label>
                <md-input v-model="skill.to_date" disabled></md-input>
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
          <h4 class="title">Shkruaj koment per aplikimin</h4>
          <p class="category">Rishiko aplikantin</p>
        </md-card-header>

        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <md-field maxlength="5">
                <label>Komento aplikimin</label>
                <md-textarea
                  v-model="comment_from_administrator"
                  placeholder="Bashkangjisni nje koment qe shpjegon vendimin."
                ></md-textarea>
              </md-field>
            </div>

            <div class="md-layout-item md-size-100 text-right"></div>
          </div>
        </md-card-content>
      </md-card>
    </form>

    <div class="md-layout-item md-size-100 text-center">
      <md-button
        class="md-raised md-danger text-left"
        style="margin-right: 10px;"
        @click="rejectApplicant(comment_from_administrator)"
      >Refuzo aplikantin</md-button>
      <md-button
        class="md-raised md-warning text-right"
        style="margin-right: 10px;"
        @click="rebuttApplicant(comment_from_administrator)"
      >Dergo mbrapa per rishikim</md-button>
      <md-button
        class="md-raised md-success text-right"
        @click="acceptApplicant(comment_from_administrator)"
      >Prano aplikantin</md-button>
    </div>
    <br>
    <br>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  FETCH_PROFILE,
  REJECT_APPLICANT,
  REBUTT_APPLICANT,
  ACCEPT_APPLICATION,
  REBUTT_PAYMENT,
  ACCEPT_PAYMENT,
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
    };
  },
  methods: {

    rejectApplicant(comment_from_administrator) {
      this.$store
        .dispatch(REJECT_APPLICANT, {
          id: this.$route.params,
          comment_from_administrator: comment_from_administrator
        })
        .then(() => this.$router.push({ name: "Dashboard" }));
    },
    rebuttApplicant(comment_from_administrator) {
      // this.paymentStatus is 'blank' initially,
      // so we don't rebut unsent payments
      if (this.paymentStatus != "blank") {
        this.$store.dispatch(REBUTT_PAYMENT, {
          id: this.$route.params,
          comment_from_administrator: comment_from_administrator
        });
      }

      this.$store
        .dispatch(REBUTT_APPLICANT, {
          id: this.$route.params,
          comment_from_administrator: comment_from_administrator
        })
        .then(() => this.$router.push({ name: "Dashboard" }));
    },
    acceptApplicant(comment_from_administrator) {
      this.$store.dispatch(ACCEPT_PAYMENT, {
        id: this.$route.params,
        comment_from_administrator: comment_from_administrator
      });
      this.$store
        .dispatch(ACCEPT_APPLICANT, {
          id: this.$route.params,
          comment_from_administrator: comment_from_administrator
        })
        .then(() => this.$router.push({ name: "Dashboard" }));
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_PROFILE, this.$route.params);
  },
  computed: {
    ...mapGetters([
      "profile",
      "educations",
      "experiences",
      "skills",
      "paymentStatus"
    ])
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

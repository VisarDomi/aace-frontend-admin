<template>
  <div>
    <div class="content">
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
          <form
            novalidate
            class="md-layout md-alignment-top-center"
            @submit.prevent="validateCommunication"
            enctype="multipart/form-data"
          >
            <md-card class="md-layout-item md-size-70 md-small-size-100">
              <md-card-header style="background-color:#9c27b0;">
                <div class="md-title" style="text-align:center; color:white;">Communication</div>
              </md-card-header>

              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('title')">
                      <label for="title">Title</label>
                      <md-input name="title" id="title" v-model="form.title" :disabled="sending"/>
                      <span
                        class="md-error"
                        v-if="!$v.form.title.required"
                      >The title name is required</span>
                      <span class="md-error" v-else-if="!$v.form.title.minlength">Invalid title name</span>
                    </md-field>
                  </div>
                </div>

                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('description')">
                      <label for="description">Description</label>
                      <md-input
                        name="description"
                        id="description"
                        v-model="form.description"
                        :disabled="sending"
                      />
                      <span
                        class="md-error"
                        v-if="!$v.form.description.required"
                      >The description name is required</span>
                      <span
                        class="md-error"
                        v-else-if="!$v.form.description.minlength"
                      >Invalid description name</span>
                    </md-field>
                  </div>
                </div>

                <md-field :class="getValidationClass('text')">
                  <label for="text">Text</label>
                  <md-textarea
                    type="text"
                    name="text"
                    id="text"
                    v-model="form.text"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.text.required">Some text is required</span>
                  <span class="md-error" v-else-if="!$v.form.text.text">Invalid text</span>
                </md-field>

                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-30">
                    <md-field>
                      <!-- <md-input v-model="files" type="file" multiple @change="handleCommUpload()" style="margin-bottom:50px;"/> -->
                      <input
                        type="file"
                        multiple
                        ref="commfile"
                        @change="handleCommUpload($event.target.name, $event.target.files);"
                        style="margin-bottom:50px;"
                      >
                    </md-field>
                  </div>
                </div>

                <div class="md-layout">
                  <div class="md-layout-item md-small-size-100">
                    <h3>Recipient groups: &nbsp;</h3>
                    <md-checkbox
                      v-model="recipientGroups"
                      :value="group.id"
                      v-for="group in groups"
                      :key="group.id"
                      style="text-transform: capitalize;"
                    >{{group.name}}</md-checkbox>
                  </div>
                </div>
              </md-card-content>

              <md-progress-bar md-mode="indeterminate" v-if="sending"/>

              <md-card-actions style="justify-content:center;">
                <md-button type="submit" class="md-primary" :disabled="sending">Create communication</md-button>
              </md-card-actions>
            </md-card>

            <md-snackbar
              :md-active.sync="communicationSaved"
            >The communication was saved with success!</md-snackbar>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_GROUPS, MAKE_COMM } from "@/store/actions.type";

export default {
  mixins: [validationMixin],
  data: () => ({
    recipientGroups: [],
    formData: null,
    hasFile: false,
    form: {
      title: null,
      text: null,
      description: null
    },
    communicationSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(3)
      },
      text: {
        required
      },
      description: {
        required
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.title = null;
      this.form.text = null;
      this.form.description = null;
    },
    handleCommUpload(fieldName, fileList) {
      // handle file changes
      let formData = new FormData();
      if (!fileList.length) return;
      let files = this.$refs.commfile.files;
      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
        formData.append(files[i].name, files[i]);
      }
      this.formData = formData;
    },
    communicationSent() {
      this.sending = true;
      this.$store.dispatch(MAKE_COMM, {
        name: this.form.title,
        description: this.form.description,
        body: this.form.text,
        groups: this.recipientGroups,
        files: this.formData
      });
      this.clearForm();
      this.communicationSaved = true;
      this.sending = false;
    },
    validateCommunication() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.communicationSent();
      }
    }
  },
  name: "Communication",
  computed: {
    ...mapGetters(["groups"])
  },
  created() {
    this.$store.dispatch(FETCH_GROUPS, { slug: "all" });
  }
};
</script>

<style scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>

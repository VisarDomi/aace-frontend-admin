<template>
  <div>
    <div class="content">
      <div class="md-layout">
        <div class="md-layout-item md-size-100 ">
          <form novalidate class="md-layout md-alignment-top-center" @submit.prevent="validateCommunication">
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
                      <md-input name="description" id="description" v-model="form.description" :disabled="sending"/>
                      <span
                        class="md-error"
                        v-if="!$v.form.description.required"
                      >The description name is required</span>
                      <span class="md-error" v-else-if="!$v.form.description.minlength">Invalid description name</span>
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

              
                <md-input type="file" multiple @change="handleCommUpload()" style="margin-bottom:50px;"/>
                </md-field>
 </div>
                </div>

                <div class="md-layout ">
                  <div class="md-layout-item md-small-size-100">
                      <h3>Recipient groups: &nbsp;</h3>
                    <md-checkbox v-model="recipientGroups" value="1">Anetaret</md-checkbox>
                    <md-checkbox value="1">Bordi</md-checkbox>
                    <md-checkbox value="1">Kryesia</md-checkbox>
                    <md-checkbox value="1">Presidenti</md-checkbox>

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
import {
  required,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

import { mapGetters } from "vuex";
import store from "@/store";
import {} from "@/store/actions.type";

export default {
  mixins: [validationMixin],
  data: () => ({
    recipientGroups: [],
    files: null,
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
    },
    handleCommUpload(){
      //todo  
    },
    communicationSent() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
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
    ...mapGetters([])
  },
  created() {}
};
</script>

<style scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.file-upload{display:block;text-align:center;font-family: Helvetica, Arial, sans-serif;font-size: 12px;}
.file-upload .file-select{display:block;border: 2px solid #dce4ec;color: #34495e;cursor:pointer;height:40px;line-height:40px;text-align:left;background:#FFFFFF;overflow:hidden;position:relative;}
.file-upload .file-select .file-select-button{background:#dce4ec;padding:0 10px;display:inline-block;height:40px;line-height:40px;}
.file-upload .file-select .file-select-name{line-height:40px;display:inline-block;padding:0 10px;}
.file-upload .file-select:hover{border-color:#34495e;transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;}
.file-upload .file-select:hover .file-select-button{background:#34495e;color:#FFFFFF;transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;}
.file-upload.active .file-select{border-color:#3fa46a;transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;}
.file-upload.active .file-select .file-select-button{background:#3fa46a;color:#FFFFFF;transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;}
.file-upload .file-select input[type=file]{z-index:100;cursor:pointer;position:absolute;height:100%;width:100%;top:0;left:0;opacity:0;filter:alpha(opacity=0);}
.file-upload .file-select.file-select-disabled{opacity:0.65;}
.file-upload .file-select.file-select-disabled:hover{cursor:default;display:block;border: 2px solid #dce4ec;color: #34495e;cursor:pointer;height:40px;line-height:40px;margin-top:5px;text-align:left;background:#FFFFFF;overflow:hidden;position:relative;}
.file-upload .file-select.file-select-disabled:hover .file-select-button{background:#dce4ec;color:#666666;padding:0 10px;display:inline-block;height:40px;line-height:40px;}
.file-upload .file-select.file-select-disabled:hover .file-select-name{line-height:40px;display:inline-block;padding:0 10px;}
</style>

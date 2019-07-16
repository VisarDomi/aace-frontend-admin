<template>
  <div>
    <div class="content">
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
          <form
            novalidate
            class="md-layout md-alignment-top-center"
            @submit.prevent="validateEvent"
            enctype="multipart/form-data"
          >
            <md-card class="md-layout-item md-size-70 md-small-size-100">
              <md-card-header style="background-color:#9c27b0;">
                <div class="md-title" style="text-align:center; color:white;">Event</div>
              </md-card-header>

              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('title')">
                      <label for="title">Titull</label>
                      <md-input name="title" id="title" v-model="form.title" :disabled="sending"/>
                      <span
                        class="md-error"
                        v-if="!$v.form.title.required"
                      >Titulli eshte i nevojshem</span>
                      <span
                        class="md-error"
                        v-else-if="!$v.form.title.minlength"
                      >Minimumi tre karaktere per titullin</span>
                    </md-field>
                  </div>
                </div>

                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('description')">
                      <label for="description">Pershkrim</label>
                      <md-input
                        name="description"
                        id="description"
                        v-model="form.description"
                        :disabled="sending"
                      />
                      <span
                        class="md-error"
                        v-if="!$v.form.description.required"
                      >Pershkrimi eshte i nevojshem</span>
                      <span
                        class="md-error"
                        v-else-if="!$v.form.description.minlength"
                      >Minimumi tre karaktere per pershkrimin</span>
                    </md-field>
                  </div>
                </div>

                <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>

                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-30">
                    <md-field>
                          <input type="file" name="file" id="file" multiple ref="eventfile" class="custom-file-upload" @change="handleEventUpload($event.target.name, $event.target.files);"
             style="margin-bottom:50px;"/>
                    </md-field>
                  </div>
                </div>













                <div class="md-layout">
                  <div class="md-layout-item md-small-size-100">
                    <h4>Grupet qe do marrin kete event: &nbsp;</h4>
                    <md-checkbox 
                    v-model="recipientGroups"
                    value="all"
                    >
                      Te gjithe
                    </md-checkbox>
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
                <md-button type="submit" class="md-primary" :disabled="sending">Krijo eventin</md-button>
              </md-card-actions>
            </md-card>

            <md-snackbar
              :md-active.sync="eventSaved"
              :md-duration="10000"
              class="success-event"
            >Eventi u krijua me sukses!</md-snackbar>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_GROUPS, MAKE_EVENT } from "@/store/actions.type";

import axios from "axios";

export default {
  mixins: [validationMixin],
  data: () => ({
    recipientGroups: [],
    formData: null,
    hasFile: false,
    form: {
      title: null,
      description: null
    },
                    editor: ClassicEditor,
                editorData: '<p>Rich-text editor content.</p>',
                editorConfig: {
                    // The configuration of the rich-text editor.
                },
    eventSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(3)
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
      this.form.description = null;
      this.recipientGroups = [];
    },
    handleEventUpload(fieldName, fileList) {
      // handle file changes
      let formData = new FormData();
      if (!fileList.length) return;
      let files = this.$refs.eventfile.files;
      for (let file of files) {
      // for (let i = 0; i < files.length; i++) {
        console.log(file);
        formData.append('file', file);
      }
      console.log(formData.entries())
      this.formData = formData;
    },
    async eventSent() {
      this.sending = true;
      if(this.recipientGroups=="all"){
        this.recipientGroups=[]
        console.log("sending to all groups..: ", this.recipientGroups);
        console.log("this gropus is: ", this.groups)
        for(var group of this.groups){
          this.recipientGroups.push(group.id);
        }
        console.log("loaded recipient groups with all: ", this.recipientGroups);
      }else{
        console.log("usually groups look like this: ", this.recipientGroups);
      }


      await this.$store.dispatch(MAKE_EVENT, {
        name: this.form.title,
        description: this.form.description,
        body: this.editorData,
        groups: this.recipientGroups,
        files: this.formData
      }).then(()=>{
        this.$router.push({ name: "Events" });
      });
      // console.log("sending from bare axios")
      //     axios
      // .post(
      //   "https://aace.ml/api/communication/37/media",
      //   this.formData
      // )
      // .then(res => {
      //   if (res.status == 200) {
      //     console.log("files updated sucessfully.");
      //     // this.$router.push({
      //     //   name: "Success"
      //     // });
      //   }
      // })
      // .catch(err => console.log(err));





      this.clearForm();
      this.eventSaved = true;
      this.sending = false;
    },
    validateEvent() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.eventSent();
      }
    }
  },
  name: "CreateEvent",
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

.success-event {
  background-color: green !important;
  height: 50%;
  font-size: 17px;
}


</style>

<style>
.ck-editor__editable {
    min-height: 500px;
}
</style>


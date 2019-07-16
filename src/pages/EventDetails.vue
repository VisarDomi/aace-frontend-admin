<template>
  <div style="margin:20px;">
    <div class="content">
      <br />
      <br />
      <md-card>
        <md-card-header data-background-color="orange">
          <h4 class="title">Eventi nr. {{event.id}}</h4>
          <p class="category">{{event.timestamp | yearFormat}}</p>
        </md-card-header>
        <md-card-content>
          <h2>{{event.name}}</h2>
          <hr />
          <br />
          <h4>{{event.description}}</h4>
          <hr />
          <br />
          <h4>{{event.time_start | yearFormat}}</h4>
          <hr />
          <br />
          <span v-html="event.body"></span>
        </md-card-content>
        <md-card-actions>
          <md-button
            class="item-block"
            v-for="document in eventDocuments"
            :key="document.id"
            @click="downloadDoc(document.id, document.filename)"
          >
            Shkarko
            {{ document.filename }}
            <i
              :class=" 'fa fa-file-' + iconType(document.filename) + '-o'"
            ></i>
          </md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

import FileSaver from "file-saver";
import store from "@/store";
import { FETCH_EVENT_DOCS, FETCH_EVENT } from "@/store/actions.type";
import { getToken } from "@/common/jwt.service";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  name: "EventDetails",
  data() {
    return {
      word_extensions: ["doc", "docx"],
      excel_extensions: ["xls", "xlsx"],
      image_extensions: ["jpg", "png"],
      pdf_extensions: ["pdf"],
      editor: ClassicEditor,
      // This editor will be read–only when created.
      editorDisabled: true,
      editorData: "<p>Rich-text editor content.</p>"
    };
  },
  computed: {
    ...mapGetters(["event", "eventDocuments"])
  },
  methods: {
    getExtension(document_filename) {
      let extension = document_filename.split(".").pop();
      return extension.toLowerCase();
    },
    iconType(document_filename) {
      let extension = this.getExtension(document_filename);
      let iconType = "zip";
      if (this.word_extensions.includes(extension)) {
        iconType = "word";
      } else if (this.excel_extensions.includes(extension)) {
        iconType = "excel";
      } else if (this.image_extensions.includes(extension)) {
        iconType = "image";
      } else if (this.pdf_extensions.includes(extension)) {
        iconType = "pdf";
      }
      return iconType;
    },
    downloadDoc(docID, docName) {
      axios
        .get("https://aace.ml/api/media/media_event/" + docID, {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
            // 'Accept': 'application/pdf',
            "Secure-Api-Key": "asdfasdfetyeq"
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
  mounted() {
    this.$store.dispatch(FETCH_EVENT, this.$route.params).then(data => {
      this.editorData = this.event.body;
    });
    this.$store.dispatch(FETCH_EVENT_DOCS, this.$route.params);
  }
};
</script>


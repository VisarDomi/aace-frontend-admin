<template>
  <div style="margin:20px;">
    <div class="content">
      <br />
      <br />
      <md-card>
        <md-card-header data-background-color="orange">
          <h4 class="title">Komunikimi nr. {{comm.id}}</h4>
          <p class="category">{{comm.timestamp | yearFormat}}</p>
        </md-card-header>
        <md-card-content>
          <h2>{{comm.name}}</h2>
          <hr />
          <br />
          <br />
          <h4>{{comm.description}}</h4>
          <hr />
          <br />
          <br />
          <span v-html="comm.body"></span>
        </md-card-content>

        <md-card-actions>
          <md-button
            class="item-block"
            v-for="document in communicationDocuments"
            :key="document.id"
            @click="downloadDoc(document.id, document.filename)"
          >
            Shkarko
            {{ document.filename }}

          </md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import { getToken } from "@/common/jwt.service";
import store from "@/store";
import { FETCH_COMMUNICATION_DOCS, FETCH_COMM } from "@/store/actions.type";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  name: "CommunicationDetails",
  data() {
    return {
      editor: ClassicEditor,
      // This editor will be read–only when created.
      editorDisabled: true,
      editorData: "<p>Rich-text editor content.</p>"
    };
  },
  computed: {
    ...mapGetters(["comm", "communicationDocuments"])
  },
  methods: {
    downloadDoc(docID, docName) {
      axios
        .get("https://aace.ml/api/communication/media_communication/" + docID, {
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
    this.$store.dispatch(FETCH_COMM, this.$route.params).then(data => {
      this.editorData = this.comm.body;
    });
    this.$store.dispatch(FETCH_COMMUNICATION_DOCS, this.$route.params);
  }
};
</script>


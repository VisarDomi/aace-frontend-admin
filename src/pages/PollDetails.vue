<template>
  <div style="margin:20px;">
    <div class="content">
      <br />
      <br />
      <md-card>
        <md-card-header data-background-color="orange">
          <h4 class="title">Polli nr. {{poll.id}}</h4>
          <p class="category">{{poll.timestamp | yearFormat}}</p>
        </md-card-header>
        <md-card-content>
          <h2>{{poll.name}}</h2>
          <hr />
          <br />
          <h4>{{poll.description}}</h4>
          <hr />
          <br />
          <span v-html="poll.body"></span>
        </md-card-content>
        <md-card-actions>
          <md-button
            class="item-block"
            v-for="document in pollDocuments"
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





<GChart
    type="ColumnChart"
    :data="chartData"
    :options="chartOptions"
  />


    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import axios from "axios";
import { mapGetters } from "vuex";
import FileSaver from "file-saver";
import store from "@/store";
import { FETCH_POLL_DOCS, FETCH_POLL } from "@/store/actions.type";
import { getToken } from "@/common/jwt.service";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  name: "PollDetails",
  components: {
    GChart
  },
  data() {
    return {

      chartData: [

            ],
      chartOptions: {
        height: 700,
        chart: {
          height: 600,
          title: 'Poll Results',
          subtitle: 'Results for the poll',
        }
      },
   


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
    ...mapGetters(["poll", "pollDocuments"])
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
        .get("https://aace.ml/api/media/media_poll/" + docID, {
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
    this.$store.dispatch(FETCH_POLL, this.$route.params).then(data => {
      

            var labels= ['Options']
        var results =['Results']


      var series = []
      for(var desc of this.poll.options){
        labels.push(desc.body);
        results.push(desc.votes);
      }
      this.chartData.push(labels);
      this.chartData.push(['Rezultati',4,10,3])

    });
    this.$store.dispatch(FETCH_POLL_DOCS, this.$route.params);
  }
};
</script>


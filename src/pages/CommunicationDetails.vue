<template>
<div style="margin:20px;">
    <div class="content">

    <br><br>
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Komunikimi nr. {{comm.id}}</h4>
            <p class="category">{{comm.timestamp | yearFormat}}</p>
          </md-card-header>
          <md-card-content>
            <h2>{{comm.name}}</h2> <hr>
            <br><br>
            <h4>{{comm.description}}</h4> <hr>
            <br><br>
            <span v-html="comm.body"></span>
          </md-card-content>
        </md-card>
    </div>
    

  </div>
</template>

<script>
import { mapGetters } from "vuex";

import store from "@/store";
import { FETCH_COMM } from "@/store/actions.type";

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
    name: "CommunicationDetails",
     data() {
            return {
                editor: ClassicEditor,
                // This editor will be read–only when created.
                editorDisabled: true,
                editorData: '<p>Rich-text editor content.</p>',
            };
        },
  computed: {
    ...mapGetters(["comm"])
  },
    mounted() {
    this.$store.dispatch(FETCH_COMM, this.$route.params).then((data)=>{
      this.editorData = this.comm.body;
    });
  },
};
</script>


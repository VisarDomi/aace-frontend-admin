<template>
<div style="margin:20px;">
    <div class="content">

    <br><br>
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Eventi nr. {{event.id}}</h4>
            <p class="category">{{event.timestamp | yearFormat}}</p>
          </md-card-header>
          <md-card-content>
            <h2>{{event.name}}</h2> <hr>
            <br><br>
            <h4>{{event.description}}</h4> <hr>
            <br><br>
            <span v-html="event.body"></span>
          </md-card-content>
        </md-card>
    </div>
    

  </div>
</template>

<script>
import { mapGetters } from "vuex";

import store from "@/store";
import { FETCH_EVENT } from "@/store/actions.type";

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
    name: "EventDetails",
     data() {
            return {
                editor: ClassicEditor,
                // This editor will be read–only when created.
                editorDisabled: true,
                editorData: '<p>Rich-text editor content.</p>',
            };
        },
  computed: {
    ...mapGetters(["event"])
  },
    mounted() {
    this.$store.dispatch(FETCH_EVENT, this.$route.params).then((data)=>{
      this.editorData = this.event.body;
    });
  },
};
</script>


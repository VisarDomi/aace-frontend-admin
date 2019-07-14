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
            <h2>{{comm.name}}</h2>
            <br><br>
            <h4>{{comm.description}}</h4>
            <br><br>
            <p>{{comm.body}}</p>
          </md-card-content>
        </md-card>
    </div>
    

  </div>
</template>

<script>
import { mapGetters } from "vuex";

import store from "@/store";
import { FETCH_COMM } from "@/store/actions.type";

export default {
    name: "CommunicationDetails",
  computed: {
    ...mapGetters(["comm"])
  },
    mounted() {
    this.$store.dispatch(FETCH_COMM, this.$route.params);
  },
};
</script>


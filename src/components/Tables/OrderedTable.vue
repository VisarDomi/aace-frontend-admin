<template>
  <div>
    <div class="row text-center" >
      <md-button class="md-raised md-info text-right" @click="get_applying" style="margin-right:5px;">Applying</md-button>
      <md-button class="md-raised md-warning text-right" @click="get_rebutted" style="margin-right:5px;">Rebutted</md-button>
      <md-button class="md-raised md-success text-right" @click="get_accepted" style="margin-right:5px;">Accepted</md-button>
      <md-button class="md-raised md-danger text-right" @click="get_rejected">Rejected</md-button>
    </div>
    <br>
    <md-table v-model="members" :table-header-color="tableHeaderColor">
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        @click="open_user_profile(item)"
        :class="{ 'table-success': item.register_status == 'accepted',
          'table-info' : item.register_status =='applying',
          'table-info2' : item.register_status =='reapplying',
          'table-danger' : item.register_status =='rejected',
          'table-warning' : item.register_status =='rebutted' }"
      >
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.first_name }}</md-table-cell>
        <md-table-cell md-label="Surname">{{ item.last_name }}</md-table-cell>
        <md-table-cell md-label="Phone">{{ item.phone }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Status">{{ item.register_status }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_MEMBERS } from "@/store/actions.type";

export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  methods: {
    get_applying: function(){
      this.$store.dispatch(FETCH_MEMBERS, { users: "applying" });
    },
    get_rebutted: function(){
      this.$store.dispatch(FETCH_MEMBERS, { users: "rebutted" });
    },
    get_accepted: function(){
      this.$store.dispatch(FETCH_MEMBERS, { users: "accepted" });
    },
    get_rejected: function(){
      this.$store.dispatch(FETCH_MEMBERS, { users: "rejected" });
    },
    open_user_profile: function(item) {
      this.$router.push({
        name: "User Profile",
        params: {
          id: item.id
        }
      });
    }
  },
  computed: {
    ...mapGetters(["members"])
  },
  mounted() {
    this.$store.dispatch(FETCH_MEMBERS, { users: "all" });
  }
};
</script>

<style scoped>
.table-info {
  background-color: #b8ecf3;
}
.table-info2 {
  background-color: #91a8da;
}

.table-success {
  background-color: #cde9ce;
}

.table-danger {
  background-color: #fccac7;
}

.table-warning {
  background-color: #fff9c8;
}

</style>

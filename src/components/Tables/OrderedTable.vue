<template>
  <div>
    <div class="row text-center">
      <md-button
        class="md-raised md-info text-right"
        @click="get_applying"
        style="margin-right:5px;"
      >Applying</md-button>
      <md-button
        class="md-raised md-info2 text-right"
        @click="get_reapplying"
        style="margin-right:5px;"
      >Reapplying</md-button>
      <md-button
        class="md-raised md-warning text-right"
        @click="get_rebutted"
        style="margin-right:5px;"
      >Rebutted Application</md-button>
      <md-button
        class="md-raised md-success text-right"
        @click="get_accepted_application"
        style="margin-right:5px;"
      >Accepted Application</md-button>
      <md-button
        class="md-raised md-warning text-right"
        @click="get_rebutted_payment"
        style="margin-right:5px;"
      >Rebutted Payment</md-button>
      <md-button
        class="md-raised md-success text-right"
        @click="get_accepted_payment"
        style="margin-right:5px;"
      >Accepted Payment</md-button>
      <md-button
        class="md-raised md-success text-right"
        @click="get_accepted"
        style="margin-right:5px;"
      >Accepted</md-button>
      <md-button class="md-raised md-danger text-right" @click="get_rejected">Rejected</md-button>
      <md-button class="md-raised md-info text-right" @click="get_blank">Blank</md-button>
    </div>
    <br>
    <md-table v-model="members" :table-header-color="tableHeaderColor">
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        @click="open_user_profile(item)"
        :class="{
          'table-success': item.application_status == 'accepted',
          'table-success2': item.application_status == 'accepted_application',
          'table-info3' : item.application_status =='blank',
          'table-info' : item.application_status =='applying',
          'table-info2' : item.application_status =='reapplying',
          'table-danger' : item.application_status =='rejected',
          'table-warning' : item.application_status =='rebutted',
          'table-warning2' : item.payment_status =='rebutted_payment',
          'table-success3' : item.payment_status =='accepted_payment',
          }"
      >
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.first_name }}</md-table-cell>
        <md-table-cell md-label="Surname">{{ item.last_name }}</md-table-cell>
        <md-table-cell md-label="Phone">{{ item.phone }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="ApplicationStatus">{{ item.application_status }}</md-table-cell>
        <md-table-cell md-label="PaymentStatus">{{ item.payment_status }}</md-table-cell>
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
    get_applying: function() {
      this.$store.dispatch(FETCH_MEMBERS, { users: "applying" });
    },
    get_reapplying: function() {
      this.$store.dispatch(FETCH_MEMBERS, { users: "reapplying" });
    },
    get_rebutted: function() {
      this.$store.dispatch(FETCH_MEMBERS, { users: "rebutted" });
    },
    get_accepted_application: function() {
      this.$store.dispatch(FETCH_MEMBERS, { users: "accepted_application" });
    },
    get_rebutted_payment: function() {
      this.$store.dispatch(FETCH_MEMBERS, { users: "rebutted_payment" });
    },
    get_accepted_payment: function() {
      this.$store.dispatch(FETCH_MEMBERS, { users: "accepted_payment" });
    },
    get_accepted: function() {
      this.$store.dispatch(FETCH_MEMBERS, { users: "accepted" });
    },
    get_rejected: function() {
      this.$store.dispatch(FETCH_MEMBERS, { users: "rejected" });
    },
    get_blank: function() {
      this.$store.dispatch(FETCH_MEMBERS, { users: "blank" });
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
  background-color: #90ceeb;
}
.table-info3 {
  background-color: #acbfc9;
}

.table-success {
  background-color: #6ca06e;
}

.table-success2 {
  background-color: #99b89a;
}
.table-success3 {
  background-color: #bee9c1;
}

.table-danger {
  background-color: #fccac7;
}

.table-warning {
  background-color: #fff9c8;
}
.table-warning2 {
  background-color: #c7c29b;
}
</style>

<template>
  <div>
    <div class="row text-center">
      <md-button
        class="md-raised md-info text-right"
        @click="get_applying_and_reapplying"
        style="margin-right:5px;"
      >Duke aplikuar</md-button>
      <md-button
        class="md-raised md-warning text-right"
        @click="get_rebutted"
        style="margin-right:5px;"
      >Te kthyer mbrapa</md-button>
      <md-button
        class="md-raised md-success text-right"
        @click="get_accepted"
        style="margin-right:5px;"
      >Te pranuar</md-button>
      <md-button class="md-raised md-danger text-right" @click="get_rejected">Te refuzuar</md-button>
    </div>
    <br>
    <!-- <md-table v-model="members" :table-header-color="tableHeaderColor"> -->


<md-table v-model="searched" md-sort="first_name" md-sort-order="asc"  md-fixed-header :table-header-color="tableHeaderColor">
      <md-table-toolbar>
        <!-- <div class="md-toolbar-section-start">
          <h1 class="md-title">Users</h1>
        </div> -->

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Kerko mbiemer..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <!-- <md-table-empty-state
        md-label="No users found"
        :md-description="`Nuk ka asnje perdorues '${this.search}'.`">

      </md-table-empty-state> -->








      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        @click="open_user_profile(item)"
        :class="{
          'table-success': item.application_status == 'accepted',
          'table-info' : item.application_status =='applying',
          'table-info2' : item.application_status =='reapplying',
          'table-danger' : item.application_status =='rejected',
          'table-warning' : item.application_status =='rebutted',
          }"
      >
        <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Emer" md-sort-by="first_name">{{ item.first_name }}</md-table-cell>
        <md-table-cell md-label="Mbiemer" md-sort-by="last_name">{{ item.last_name }}</md-table-cell>
        <md-table-cell md-label="Pagesa" md-sort-by="payment_status">{{ item.payment_status }}</md-table-cell>
        <md-table-cell md-label="Statusi i aplikimit" md-sort-by="application_status">{{ item.application_status }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <!-- <md-table-cell md-label="Statusi i pageses">{{ item.payment_status }}</md-table-cell> -->
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_MEMBERS } from "@/store/actions.type";




const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.last_name).includes(toLower(term)))
    }

    return items
  }





export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
  },
  data: function () {
      return {
      search: null,
      searched: [],
      }
  },
  methods: {
    searchOnTable () {
      console.log("search is: ", this.search)
        this.searched = searchByName(this.members, this.search)
      },

    get_applying_and_reapplying() {
      this.$store.dispatch(FETCH_MEMBERS, { users: "applying_and_reapplying" }).then(response =>{
      console.log(this.members)
      this.searched = this.members 
      console.log(this.searched)
      console.log("search is: ", this.search)
    });
    },
    get_rebutted() {
      this.$store.dispatch(FETCH_MEMBERS, { users: "rebutted" }).then(response =>{
      console.log(this.members)
      this.searched = this.members 
      console.log(this.searched)
      console.log("search is: ", this.search)
    });
    },
    get_accepted() {
      this.$store.dispatch(FETCH_MEMBERS, { users: "accepted" }).then(response =>{
      console.log(this.members)
      this.searched = this.members 
      console.log(this.searched)
      console.log("search is: ", this.search)
    });
    },
    get_rejected() {
      this.$store.dispatch(FETCH_MEMBERS, { users: "rejected" }).then(response =>{
      console.log(this.members)
      this.searched = this.members 
      console.log(this.searched)
      console.log("search is: ", this.search)
    });
    },
    open_user_profile(item) {
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
    this.$store.dispatch(FETCH_MEMBERS, { users: "accepted" }).then(response =>{
      console.log(this.members)
      this.members.forEach(function(member){
        if(member.first_name == null || member.last_name == null){
          console.log("we got a null name or surname")
          member.first_name = "admin"
          member.last_name = "admin"
        }
      });
      this.searched = this.members 
      console.log(this.searched)
      console.log("search is: ", this.search)
    });
    
  }
};
</script>

<style scoped>

.md-table-head-label {
    padding-left: 18px !important;
}

.md-table-sortable-icon{
  position: initial !important;
}


.table-info {
  background-color: #b8ecf3;
}
.table-info2 {
  background-color: #b8ecf3;
}
/* .table-info2 {
  background-color: #90ceeb;
} */

.table-success {
  background-color: #dff0d8;
}

.table-danger {
  background-color: #fccac7;
}

.table-warning {
  background-color: #fff9c8;
}
</style>

<style>
.md-table-head-label {
    padding-left: 18px !important;
}

/* .md-table-sortable-icon{
  position: initial !important;
} */
</style>




<template>
<div class="content">

    <div class="md-layout">
      <div class="md-layout-item">
        <md-button class="md-success" @click="addEvent()">Krijo event</md-button>
      </div>
    </div>


<md-table v-model="searched" md-sort="name" md-sort-order="asc"   :table-header-color="tableHeaderColor">
      <md-table-toolbar>
        <!-- <div class="md-toolbar-section-start">
          <h1 class="md-title">Users</h1>
        </div> -->

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Kerko event..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <!-- <md-table-empty-state
        md-label="No users found"
        :md-description="`Nuk ka asnje perdorues '${this.search}'.`">

      </md-table-empty-state> -->








      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        @click="openEvent(item)"
        
      >
        <md-table-cell md-label="ID"  style="text-align:left;">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Titull" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Pershkrim" md-sort-by="description">{{ item.description }}</md-table-cell>
        <md-table-cell md-label="Data" md-sort-by="timestamp">{{ item.timestamp | yearFormat }}</md-table-cell>
        <md-table-cell md-label="Veprime">
          <md-button class="md-danger md-sm" @click.stop="deleteEvent(item)" >Fshi</md-button>
        </md-table-cell>
        <!-- <md-table-cell md-label="Statusi i pageses">{{ item.payment_status }}</md-table-cell> -->
      </md-table-row>
    </md-table>
</div>



</template>

<script>

import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_EVENTS,DELETE_EVENT } from "@/store/actions.type";

import axios from "axios";
var deletingItem = false;
const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
        console.log("searching ", items, " with term: ", term);
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }

    return items
  }

export default {
  data: function () {
      return {
      search: null,
      searched: [],
      }
  },
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
  },
  methods: {
    addEvent() {
      this.$router.push({ name: "CreateEvent" });
    },
        searchOnTable () {
      console.log("search is: ", this.search)
        this.searched = searchByName(this.events, this.search)
      },
      deleteEvent(item){
        console.log("deleting item: ", this.deletingItem);
        this.$store.dispatch(DELETE_EVENT, item.id).then(response=>{
              this.$store.dispatch(FETCH_EVENTS, { slug: "all" }).then(response =>{
            this.events.forEach(function(event){
              if(event.name == null || event.description == null){
                console.log("we got a null title or desc")
              }
            });
            this.searched = this.event 
        });

        });
      },
    openEvent(item) {
      this.$router.push({
        name: "EventDetails",
        params: {
          id: item.id
        }
      });
    }
  },
  name: "events-table",
  computed: {
    ...mapGetters(["events"])
  },
//   created() {
//     this.$store.dispatch(FETCH_COMMS, { slug: "all" });
//   },
    mounted() {
    this.$store.dispatch(FETCH_EVENTS, { slug: "all" }).then(response =>{
      this.events.forEach(function(event){
        if(event.name == null || event.description == null){
          console.log("we got a null title or desc")
        }
      });
      this.searched = this.events
      console.log(this.searched)
      console.log("search is: ", this.search)
    });
    
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

.success-comm {
  background-color: green !important;
  height: 50%;
  font-size: 17px;
}


.md-table-head.md-numeric {
    text-align: left;
}
</style>

<template>
  <div>
     <div v-if="isLoading" class="article-preview">Loading articles...</div>
     <div v-else>
        <md-table v-model="groupMembers" @md-selected="onSelect">
          <md-table-row
            slot="md-table-row"
            slot-scope="{ item }"
            md-selectable="multiple"
            md-auto-select
          >
            <md-table-cell>{{ item.first_name }} {{item.last_name}}</md-table-cell>
            <md-table-cell>{{ item.email }}</md-table-cell>
            <md-table-cell>{{ item.phone }}</md-table-cell>
            <!-- <md-table-cell>

            </md-table-cell>-->
          </md-table-row>
        </md-table>
     </div>


  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_GROUPS, SELECT_GROUP_MEMBERS } from "@/store/actions.type";
export default {
  name: "nav-tabs-table",
  props: ["tableGroupId"],
  data() {
    return {
    };
  },
  created: function() {
  },
  methods: {
    onSelect: function(items) {
      this.$store.dispatch(SELECT_GROUP_MEMBERS,items)
    }
  },
  computed: {
    ...mapGetters(["groupMembers","isLoading"])
  }
};
</script>

<style scoped>

</style>

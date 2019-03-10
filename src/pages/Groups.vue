<template>
  <div>
    <div class="content">
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
          <div v-if="isLoading" class="article-preview">Loading articles...</div>
          <div v-else>
            <nav-tabs-card>
              <template slot="content">
                <span class="md-nav-tabs-title">Groups:</span>
                <md-tabs md-sync-route class="md-primary" md-alignment="left">
                  <md-tab v-for="group in groups" :md-label="group.name" :key="group.id"  @click="retrieveGroupMembers(group.id)">
                    <nav-tabs-table :tableGroupId="group.id"></nav-tabs-table>
                  </md-tab>
                </md-tabs>
              </template>
            </nav-tabs-card>
          </div>

        </div>
      </div>


      <div class="container" style="text-align:left; " v-if="selectedGroupMembers.length!=0">
        <div class="md-layout">
          <div class="md-layout-item" style="margin-top: auto;
    margin-bottom: auto;" >
            <h4>Add selected members to group:</h4>
          </div>
          <div class="md-layout-item md-layout">
            <md-field>
              <md-button class="md-primary md-layout-item" v-for="group in groups" :key="group.id" @click="displaceMember(group.id)">{{group.name}}</md-button>
            </md-field>
          </div>
        </div>
          <!-- <md-field>
            <label for="group">Group</label>
            <md-select v-model="selectedGroup" name="group" id="group" @md-selected="displaceMember">
              <md-option :value="group.id" v-for="group in groups" :key="group.id">{{group.name}}</md-option>

            </md-select>
          </md-field> -->

          
      </div>




    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_GROUPS, FETCH_GROUP_MEMBERS,DISPLACE_MEMBER_IN_GROUP } from "@/store/actions.type";

export default {
  name: "Groups",
  data() {
    return {
      selectedGroup: null,
      oldId: null,
    };
  },
  computed: {
    ...mapGetters(["groups","selectedGroupMembers","isLoading"])
  },
  created() {
    this.$store.dispatch(FETCH_GROUPS, { slug: "all" });
  },
  methods: {
    retrieveGroupMembers: function(id){
      this.oldId = id;
      this.$store.dispatch(FETCH_GROUP_MEMBERS, {slug : id})
    },
    displaceMember: function(newGroupId){
      if(newGroupId!=this.oldId){
              this.$store.dispatch(DISPLACE_MEMBER_IN_GROUP, {oldId : this.oldId, newId: newGroupId})
      this.$store.dispatch(FETCH_GROUP_MEMBERS, {slug : newGroupId})
      }
    }
  }
};
</script>

<style scoped>
.md-field{
  width: auto;
  margin-right: auto;
  margin-left: 20px;
}
</style>

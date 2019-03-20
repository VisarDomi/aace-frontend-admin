<template>
  <div>
    <div class="content">
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
          <div v-if="isLoading" class="article-preview">Loading articles...</div>
          <div v-else>
            <nav-tabs-card>
              <template slot="content">
                <span class="md-nav-tabs-title">Grupet:</span>
                <md-tabs
                  md-sync-route
                  class="md-primary"
                  md-alignment="centered"
                  md-active-tab="my"
                >
                  <md-tab
                    v-for="group in groups"
                    :md-label="group.name"
                    :key="group.id"
                    @click="retrieveGroupMembers(group.id, group.name)"
                  >
                    <h4 id="groupTitle">{{currentGroupName}}</h4>
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
          <div class="md-layout-item" style="margin-top: auto; margin-bottom: auto;">
            <h4>Shto anetaret e zgjedhur ne grupin:</h4>
          </div>
          <div class="md-layout-item md-layout">
            <md-field>
              <md-button
                class="md-primary md-layout-item"
                v-for="group in groups"
                :key="group.id"
                @click="displaceMember(group.id, group.name)"
              >{{group.name}}</md-button>
            </md-field>
          </div>
        </div>
        <!-- <md-field>
            <label for="group">Group</label>
            <md-select v-model="selectedGroup" name="group" id="group" @md-selected="displaceMember">
              <md-option :value="group.id" v-for="group in groups" :key="group.id">{{group.name}}</md-option>

            </md-select>
        </md-field>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import {
  FETCH_GROUPS,
  FETCH_GROUP_MEMBERS,
  DISPLACE_MEMBER_IN_GROUP
} from "@/store/actions.type";

export default {
  name: "Groups",
  data() {
    return {
      selectedGroup: null,
      oldId: null,
      currentGroupName: ""
    };
  },
  computed: {
    ...mapGetters(["groups", "selectedGroupMembers", "isLoading"])
  },
  created() {
    this.$store.dispatch(FETCH_GROUPS, { slug: "all" });
    this.$store.dispatch(FETCH_GROUP_MEMBERS, { slug: "1" }).then(() => {
      this.currentGroupName = "anetaret";
    });
    this.oldId = 1;
  },
  methods: {
    retrieveGroupMembers: function(id, gName) {
      this.oldId = id;
      this.$store.dispatch(FETCH_GROUP_MEMBERS, { slug: id });
      this.currentGroupName = gName;
    },
    displaceMember: function(newGroupId, newGroupName) {
      if (newGroupId != this.oldId) {
        this.$store
          .dispatch(DISPLACE_MEMBER_IN_GROUP, {
            oldId: this.oldId,
            newId: newGroupId
          })
          .then(() => {
            this.$store.dispatch(FETCH_GROUP_MEMBERS, { slug: newGroupId });
            this.oldId = newGroupId;
            this.currentGroupName = newGroupName;
          });
      }
    }
  }
};
</script>

<style scoped>
.md-field {
  width: auto;
  margin-right: auto;
  margin-left: 20px;
}

#groupTitle {
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
}
</style>

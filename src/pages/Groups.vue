<template>
  <div>
    <div class="content">
      <div class="md-layout">
        <h3>Create a group</h3>
        <ul>
          <li v-for="group in groups" :key="group.id">{{group.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_GROUPS } from "@/store/actions.type";

export default {
  name: "Groups",
  computed: {
    ...mapGetters(["groups"])
  },
  mounted() {
    this.$store.dispatch(FETCH_GROUPS, { slug: "all" });
  }
};
</script>

<style scoped>
</style>

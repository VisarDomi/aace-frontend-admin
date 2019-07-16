<template>
  <div class="content" style="margin:20px;">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100 lg-size-50">
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Anketime</h4>
            <p class="category">Anketimet e derguara</p>
          </md-card-header>
          <md-card-content>
            <polls-table table-header-color="orange"></polls-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { PollsTable } from "@/components";

export default {
  components: {
    PollsTable
  },
  computed: {
    ...mapGetters(["isLoading"])
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
</style>

<template>
    <div class="content" style="margin:20px;">
<div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100 lg-size-50">
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Komunikime</h4>
            <p class="category">Komunikimet e derguara</p>
          </md-card-header>
          <md-card-content>
            <communications-table table-header-color="orange"></communications-table>
          </md-card-content>
        </md-card>
      </div>
</div>
    </div>
  
</template>

<script>
import { mapGetters } from "vuex";
import { CommunicationsTable } from "@/components";

export default {
  components: {
    CommunicationsTable
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

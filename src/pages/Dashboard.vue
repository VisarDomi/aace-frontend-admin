<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100 lg-size-50">
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Applicants</h4>
            <p class="category">New applications for January, 2019</p>
          </md-card-header>
          <md-card-content>
            <ordered-table table-header-color="orange"></ordered-table>
          </md-card-content>
        </md-card>
      </div>
      <!-- <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
        <chart-card
          :chart-data="emailsSubscriptionChart.data"
          :chart-options="emailsSubscriptionChart.options"
          :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
          :chart-type="'Bar'"
          data-background-color="red">
          <template slot="content">
            <h4 class="title">Application rates</h4>
              <p class="category">
                Last Month Performance
              </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated 10 days ago
            </div>
          </template>
        </chart-card>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-100">
            <stats-card data-background-color="green" class="md-size-40 md-xsmall-size-100 md-layout-item" style="margin-left: 20px; margin-right: 20px;">
              <template slot="header">
                <md-icon >store</md-icon>
              </template>

              <template slot="content">
                <p class="category">Revenue</p>
                <h3 class="title">$34,245</h3>
              </template>

              <template slot="footer">
                <div class="stats">
                    <md-icon>date_range</md-icon>
                    Last 24 Hours
                </div>
              </template>
            </stats-card>
            <stats-card data-background-color="orange" class="md-size-40 md-xsmall-size-100 md-layout-item" style="margin-left: 20px;">
              <template slot="header">
                <md-icon >content_copy</md-icon>
              </template>

              <template slot="content">
                <p class="category">Used Space</p>
                <h3 class="title">49/50
                    <small>GB</small>
                </h3>
              </template>

              <template slot="footer">
                <div class="stats">
                  <md-icon class="text-danger">warning</md-icon>
                  <a href="#pablo">Get More Space...</a>
                </div>
              </template>
            </stats-card>
        </div>        
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { OrderedTable } from "@/components";

export default {
  components: {
    OrderedTable
  },
  computed: {
    ...mapGetters(["isLoading"])
  }
};
</script>

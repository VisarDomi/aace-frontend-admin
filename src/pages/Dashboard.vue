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
import {
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable
} from "@/components";

export default {
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable
  },
  data() {
    return {
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]]
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De"
          ],
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      }
    };
  }
};
</script>

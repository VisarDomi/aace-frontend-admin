<template>
  <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>

    <side-bar>
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Aplikimet</p>
      </sidebar-link>
      <!-- <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>User Applications</p>
      </sidebar-link>-->
      <sidebar-link to="/groups">
        <md-icon>group</md-icon>
        <p>Grupet</p>
      </sidebar-link>
      <sidebar-link to="/communications">
        <md-icon>comment</md-icon>
        <p>Komunikime zyrtare</p>
      </sidebar-link>


      <sidebar-link to="/events">
        <md-icon>date_range</md-icon>
        <p>Evente</p>
      </sidebar-link>


      <sidebar-link to="/polls">
        <md-icon>compare_arrows</md-icon>
        <p>Anketa</p>
      </sidebar-link>

      <sidebar-link @click="logout" to="/login">
        <md-icon>logout</md-icon>
        <p>Dil</p>
      </sidebar-link>
      <!-- <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>
      <sidebar-link to="/upgrade" class="active-pro">
        <md-icon>unarchive</md-icon>
        <p>Upgrade to PRO</p>
      </sidebar-link>-->
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content></dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

import {
  LOGOUT
} from "@/store/actions.type";
import store from "@/store";

export default {
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: "Home" });
      });
    }
  },
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  }
};
</script>

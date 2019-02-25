// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import axios from 'axios';
// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

// configure router
const router = new VueRouter({
  mode: "history",
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

router.beforeEach((to, from, next) => {
  console.log("to " + to.fullPath)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log("route " + to.fullPath + " requires admin privileges")
    if (localStorage.getItem("admin_token") == null) {
      console.log("no access, token null, sending you to login");
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      console.log("go");
      console.log("you may access the page")
      next();
    }
  } else{
    next();
  }
});

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

Vue.prototype.$Chartist = Chartist;

axios.defaults.headers.common = {
  "Secure-Api-Key": "asdfasdfetyeq",
  "Content-type": "application/json"
};

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
});


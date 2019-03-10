// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import store from "./store";
import "./registerServiceWorker";
import JwtService from "@/common/jwt.service";
// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

import ApiService from "./common/api.service";
import DateFilter from "./common/date.filter";
import ErrorFilter from "./common/error.filter";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

Vue.config.productionTip = false;
ApiService.init();
// configure router
const router = new VueRouter({
  mode: "history",
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

router.beforeEach((to, from, next) => {
  ApiService.setHeader();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (JwtService.getToken() == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});


Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

Vue.prototype.$Chartist = Chartist;

Vue.filter("date", DateFilter);
Vue.filter("error", ErrorFilter);


/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  data: {
    Chartist: Chartist
  }
});

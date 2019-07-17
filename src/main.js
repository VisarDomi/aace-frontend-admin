import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import store from "./store";
import routes from "./routes";
import "./registerServiceWorker";
import JwtService from "@/common/jwt.service";
import VueExpandableImage from "vue-expandable-image";
import CKEditor from "@ckeditor/ckeditor5-vue";
import VueGoogleCharts from "vue-google-charts";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";
import ApiService from "./common/api.service";
import { yearFormat, hourFormat } from "./common/date.filter";
import ErrorFilter from "./common/error.filter";
import MaterialDashboard from "./material-dashboard";
import Chartist from "chartist";

// Plugins
Vue.use(VueGoogleCharts);
Vue.use(CKEditor);
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(VueExpandableImage);
Vue.use(CKEditor);
Vue.use(Notifications);

Vue.config.productionTip = false;
ApiService.init();

// configure router
const router = new VueRouter({
  mode: "history",
  routes,
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

Vue.prototype.$Chartist = Chartist;

Vue.filter("yearFormat", yearFormat);
Vue.filter("hourFormat", hourFormat);
Vue.filter("error", ErrorFilter);

// dinamically change title and other metadata
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);
  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);
  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    el => el.parentNode.removeChild(el)
  );
  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();
  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement("meta");
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");
      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));
  next();
});

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

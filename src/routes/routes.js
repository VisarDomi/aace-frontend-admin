import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import AdminLogin from "@/pages/AdminLogin.vue";
import Groups from "@/pages/Groups.vue";
const routes = [
  {
    path: "/",
    component: DashboardLayout,
    // redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user/:id",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "groups",
        name: "Groups",
        component: Groups
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      }
    ],
    meta: { 
      requiresAuth: true,
      is_admin : true
    }
  },
  {
    path: "/login",
    name: "AdminLogin",
    component: AdminLogin
  }
];


export default routes;

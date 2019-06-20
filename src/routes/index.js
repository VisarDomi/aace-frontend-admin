import DashboardLayout from "@/pages/Layout/DashboardLayout";

import Dashboard from "@/pages/Dashboard";
import UserProfile from "@/pages/UserProfile";
import TableList from "@/pages/TableList";
import Icons from "@/pages/Icons";
import Maps from "@/pages/Maps";
import Notifications from "@/pages/Notifications";
import AdminLogin from "@/pages/AdminLogin";
import Groups from "@/pages/Groups";
import NotFound from "@/pages/NotFound";
import Communication from "@/pages/Communication";

const routes = [
  {
    path: "",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          title: "Dashboard",
          metaTags: [
            {
              name: "description",
              content: "The dashboard page of AACE admin."
            },
            {
              property: "og:description",
              content: "The dashboard page of AACE admin."
            }
          ]
        }
      },
      {
        path: "/user/:id",
        name: "User Profile",
        component: UserProfile,
        meta: {
          title: "User Profile",
          metaTags: [
            {
              name: "description",
              content: "The user profile page of AACE admin."
            },
            {
              property: "og:description",
              content: "The user profile page of AACE admin."
            }
          ]
        }
      },
      {
        path: "/groups",
        name: "Groups",
        component: Groups,
        meta: {
          title: "Groups",
          metaTags: [
            {
              name: "description",
              content: "The groups page of AACE admin."
            },
            {
              property: "og:description",
              content: "The groups page of AACE admin."
            }
          ]
        }
      },
      {
        path: "/communication",
        name: "Communication",
        component: Communication,
        meta: {
          title: "Communication",
          metaTags: [
            {
              name: "description",
              content: "The communication page of AACE admin."
            },
            {
              property: "og:description",
              content: "The communication page of AACE admin."
            }
          ]
        }
      },
      {
        path: "/table",
        name: "Table List",
        component: TableList,
        meta: {
          title: "Table List",
          metaTags: [
            {
              name: "description",
              content: "The table list page of AACE admin."
            },
            {
              property: "og:description",
              content: "The table list page of AACE admin."
            }
          ]
        }
      },
      {
        path: "/icons",
        name: "Icons",
        component: Icons,
        meta: {
          title: "Icons",
          metaTags: [
            {
              name: "description",
              content: "The icons page of AACE admin."
            },
            {
              property: "og:description",
              content: "The icons page of AACE admin."
            }
          ]
        }
      },
      {
        path: "/maps",
        name: "Maps",
        component: Maps,
        meta: {
          hideFooter: true,
          title: "Maps",
          metaTags: [
            {
              name: "description",
              content: "The maps page of AACE admin."
            },
            {
              property: "og:description",
              content: "The maps page of AACE admin."
            }
          ]
        }
      },
      {
        path: "/notifications",
        name: "Notifications",
        component: Notifications,
        meta: {
          title: "Notifications",
          metaTags: [
            {
              name: "description",
              content: "The notifications page of AACE admin."
            },
            {
              property: "og:description",
              content: "The notifications page of AACE admin."
            }
          ]
        }
      }
    ],
    meta: {
      requiresAuth: true,
      is_admin: true,
      title: "Home",
      metaTags: [
        {
          name: "description",
          content: "The hoem page of AACE admin."
        },
        {
          property: "og:description",
          content: "The hoem page of AACE admin."
        }
      ]
    }
  },
  {
    path: "/login",
    name: "AdminLogin",
    component: AdminLogin,
    meta: {
      title: "Login",
      metaTags: [
        {
          name: "description",
          content: "The login page of AACE admin."
        },
        {
          property: "og:description",
          content: "The login page of AACE admin."
        }
      ]
    }
  },
  {
    path: "*",
    name: "Not Found",
    component: NotFound,
    meta: {
      title: "Not Found",
      metaTags: [
        {
          name: "description",
          content: "The not found page of AACE admin."
        },
        {
          property: "og:description",
          content: "The not found page of AACE admin."
        }
      ]
    }
  }
];

export default routes;
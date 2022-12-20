import VueRouter from "vue-router";
import RedirectPage from "../components/RedirectPage.vue";

export const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/LoginPage.vue"),
    },
    {
      path: "/r.html",
      name: "redirector",
      component: RedirectPage,
    },
    {
      path: "/comunicacoes/frontpage",
      name: "frontPage",
      component: () => import("../components/comunicacao/FrontPage.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import("../views/AboutView.vue"),
    },
  ],
});


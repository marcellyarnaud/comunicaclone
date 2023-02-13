import VueRouter from "vue-router";
import RedirectPage from "../pages/RedirectPage.vue";

export const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/LoginPage.vue"),
    },
    {
      path: "/r.html",
      name: "redirector",
      component: RedirectPage,
    },
    {
      path: "/comunicacoes/frontpage",
      name: "frontPage",
      component: () => import("../pages/comunicacao/FrontPage.vue"),
    },
    {
      // Edita comunicação
      path: "/comunicacoes/edit",
      name: "editComunicacao",
      component: () => import("../pages/comunicacao/EditComunicacao.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/comunicacoes/analise",
      name: "analideDeImpacto",
      component: () => import("../pages/comunicacao/AnaliseImpacto.vue")
    }
  ],
});


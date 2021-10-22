import Vue from "vue";
import VueRouter from "vue-router";

import VueMeta from "vue-meta";
// import store from '@/state/store'

Vue.use(VueRouter);
Vue.use(VueMeta, {
  // The component option name that vue-meta looks for meta info on.
  keyName: "page",
});

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/pages/dashboard/index"),
  },
  {
    path: "/especialidades",
    name: "especialidades",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "../views/pages/especialidades/especialidades.vue"
      ),
    meta: { requiresAuth: false },
  },

  {
    path: "/servicios",
    name: "servicios",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "../views/pages/servicios/servicios.vue"
      ),
    meta: { requiresAuth: false },
  },
  {
    path: "/sucursales",
    name: "sucursales",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "../views/pages/sucursales/sucursales.vue"
      ),
    meta: { requiresAuth: false },
  },
  {
    path: "/secretarias",
    name: "secretarias",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "../views/pages/secretarias/secretarias.vue"
      ),
    meta: { requiresAuth: false },
  },
  {
    path: "/previsiones",
    name: "previsiones",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "../views/pages/previsiones/previsiones.vue"
      ),
    meta: { requiresAuth: false },
  },
  {
    path: "/pacientes",
    name: "pacientes",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "../views/pages/pacientes/pacientes.vue"
      ),
    meta: { requiresAuth: false },
  },
  {
    path: "/profesionales",
    name: "profesionales",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "../views/pages/profesionales/profesionales.vue"
      ),
    meta: { requiresAuth: false },
  },
  {
    path: "/bloqueo-hora",
    name: "bloqueo hora",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "../views/pages/bloqueo_horas/bloqueo.vue"
      ),
    meta: { requiresAuth: false },
  },
  {
    path: "/reservas",
    name: "reservas",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "../views/pages/reservas/reservas.vue"
      ),
    meta: { requiresAuth: false },
  },
];

const router = new VueRouter({
  routes,
  // Use the HTML5 history API (i.e. normal-looking routes)
  // instead of routes with hashes (e.g. example.com/#/about).
  // This may require some server configuration in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  //A Logged-in user can't go to login page again
  if (to.name === "login" && localStorage.getItem("token")) {
    //   let rol = atob(localStorage.getItem('cm9s'));

    router.push({
      name: "home",
    });

    //the route requires authentication
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("token")) {
      //user not logged in, send them to login page
      router.push({
        name: "login",
        query: {
          to: to.name,
        },
      });
    } else {
      if (!hasAccess(to.name)) {
        //   let rol = atob(localStorage.getItem('cm9s'));

        router.push({
          name: "home",
        });
      }
    }
  }

  return next();
});

function hasAccess(name) {
  // const rol = atob(localStorage.getItem('cm9s'));

  switch (name) {
    case "home":
      return true;

    case "especialidades":
      return true;

    case "servicios":
      return true;

    case "sucursales":
      return true;

    case "secretarias":
      return true;

    case "prevision":
      return true;

    case "bloqueo hora":
      return true;

      case "reservas":
      return true;

    default:
      return false;
  }
}

export default router;

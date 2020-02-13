import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Membership from "../views/Membership.vue";
import Card from "../views/Card.vue";
import { Store } from "vuex";
import store from "../store";
import auth from "./middleware/auth";
import middlewarePipeline from "./kernel/middlewarePipeline";
import customer from "./middleware/customer";
import guest from "./middleware/guest";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    /*
    meta: {
      middleware: [guest]
    },
    */
    component: Login
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
    /*
    meta: {
      //auth: true,
      middleware: [auth, customer]
    }
    */
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/membership",
    name: "membership",
    component: Membership,
    /*
    meta: {
      middleware: [auth]
    },
    */
    children: [
      {
        path: "/membership/card",
        name: "membership-card",
        component: Card
        /*
        meta: {
          middleware: [auth, customer]
        }
        */
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // 1. Classic middleare
  /*
  //console.log("Middleware");
  if (!store.getters.auth.loggedIn && to.meta.auth) {
    next({
      name: "login"
    });
  }
  next();
  */

  // 2. Middleware pipeline
  /*
  if (!to.meta.middleware) {
    return next();
  }
  */

  //console.log("middleware");

  /*
  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    router,
    store
  };

  //console.log(context);

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middlewarePipeline, 1)
  });

    next();
  */

  // 3. Middleware inside page components
  // console.log(to)
  let middleware = to.matched
    .map(matched => {
      //console.log(matched);
      return matched.components.default.middleware;
    })
    .filter(middleware => {
      return middleware !== undefined;
    })
    .flat();

  //console.log(middleware);

  if (!middleware.length) {
    return next();
  }

  const context = {
    to,
    from,
    next,
    router,
    store
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middlewarePipeline, 1)
  });

  next();
});

export default router;

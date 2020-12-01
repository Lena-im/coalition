import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Game from "./views/Game.vue";
import Questionnaire from "./views/Questionnaire.vue";
import Conclude from "@/views/Conclude";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/round/:name",
      name: "round",
      component: Game,
      props: true
    },
    {
      path: "/questionnaire",
      name: "questionnaire",
      component: Questionnaire,
      props: true
    },
    {
      path: "/conclude",
      name: "conclude",
      component: Conclude,
      props: true
    }
  ]
});

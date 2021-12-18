import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

import mainPage from "@/views/mainPage.vue";
import notFound from "@/views/notFound.vue";
import queueSign from "@/views/queueSign.vue";
import typesEditor from "@/views/typesEditor.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: mainPage,
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: notFound,
  },
  {
    path: "/queueSign",
    name: "queueSign",
    component: queueSign,
  },
  {
    path: "/typesEditor",
    name: "typesEditor",
    component: typesEditor,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

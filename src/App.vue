<template>
  <header-nav />
  <transition name="fade">
    <invite-modal v-if="store.state.needModal" />
  </transition>
  <router-view></router-view>
</template>

<script lang="ts">
import { key } from "@/store";
import headerNav from "./components/headerNav.vue";
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import inviteModal from "@/components/inviteModal.vue";
import queueHandler from "./classes/queueHandler";
import modal from "vue-js-modal";
export default defineComponent({
  components: {
    headerNav,
    inviteModal,
    modal,
  },
  setup() {
    const store = useStore(key);

    onMounted(() => {
      store.commit("GET_QUEUE_MEMBERS"); //забираем данные из localstorage
      store.commit("GET_TICKET_TYPES");
      const qh = new queueHandler();
      qh.queueInit();
    });

    return { store };
  },
});
</script>

<style lang="scss">
#app {
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.shadow {
  -webkit-box-shadow: 5px 8px 30px -6px rgba(0, 0, 0, 0.28);
  -moz-box-shadow: 5px 8px 30px -6px rgba(0, 0, 0, 0.28);
  box-shadow: 5px 8px 30px -6px rgba(0, 0, 0, 0.28);
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.button-pushable {
  transform: translateY(4px);
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  //background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

.button-edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

.button-front {
  display: block;
  position: relative;
  padding: 12px 27px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: white;
  background-color: #f57c00;
  will-change: transform;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

@media (min-width: 768px) {
  .button-front {
    font-size: 1.25rem;
    padding: 12px 42px;
  }
}

.button-pushable:hover {
  filter: brightness(110%);
}

.button-pushable:disabled .button-front {
  background-color: #cccc;
}

.button-pushable:hover .button-front {
  transform: translateY(-6px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.button-pushable:active .button-front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.button-pushable:hover .button-shadow {
  transform: translateY(4px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.button-pushable:active .button-shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.button-pushable:focus:not(:focus-visible) {
  outline: none;
}

.select {
  padding: 10px 10px;
  margin: 5px 10px;
  font-size: 1.25em;
}

#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: "Open Sans", sans-serif;
}

.container {
  position: relative;
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
  min-height: calc(100vh - 150px);
}
</style>

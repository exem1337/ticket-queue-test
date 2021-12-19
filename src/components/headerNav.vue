<template>
  <nav class="shadow">
    <ul class="big-screen">
      <router-link style="text-decoration: none" to="/"
        ><li>Очередь</li>
      </router-link>
      <router-link style="text-decoration: none" to="/queueSign"
        ><li>Запись</li>
      </router-link>
      <router-link style="text-decoration: none" to="/typesEditor"
        ><li>Админ</li>
      </router-link>
    </ul>
    <i class="material-icons burger" @click="toggleBurger">sort</i>
    <ul class="small-screen" v-if="burger">
      <router-link style="text-decoration: none" to="/"
        ><li>Очередь</li>
      </router-link>
      <router-link style="text-decoration: none" to="/queueSign"
        ><li>Запись</li>
      </router-link>
      <router-link style="text-decoration: none" to="/typesEditor"
        ><li>Админ</li>
      </router-link>
      <i class="material-icons close" @click="toggleBurger">close</i>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
export default defineComponent({
  setup() {
    const store = useStore(key);
    let burger: Ref<boolean> = ref(false);

    const toggleBurger = () => {
      burger.value === true ? (burger.value = false) : (burger.value = true);
    };

    return { store, burger, toggleBurger };
  },
});
</script>


<style lang="scss" scoped>
@keyframes toggleBurger {
  to {
    transform: translateX(0%);
  }
}

.small-screen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: #ff9800;
  flex-direction: column;
  font-size: 2.5em;
  transform: translateX(-100%);
  animation: toggleBurger 0.3s ease-in-out;
  animation-fill-mode: forwards;
  li {
    padding: 35px 15px;
  }

  .close {
    position: absolute;
    top: 25px;
    right: 25px;
    cursor: pointer;
    font-size: 1em;
  }
}

nav {
  width: 100%;
  height: 50px;
  background-color: #ff9800;
  position: relative;

  .burger {
    display: none;
    color: #fff;
    position: absolute;
    top: 7px;
    left: 15px;
    font-size: 2em;
    cursor: pointer;
  }
}
ul {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
li {
  list-style: none;
  margin: 5px 15px;
  padding: 5px 15px;
  text-transform: uppercase;
  font-weight: 500;
  border-radius: 25px;
  width: fit-content;
  display: flex;
  align-items: center;
  font-size: 1.25em;
  background-color: #f57c00;
  transition: 0.3s ease all;
  font-weight: 500;
  cursor: pointer;
  color: #fff;
  box-sizing: border-box;
  max-height: 40px;
}
.router-link-active > li {
  background-color: #fff !important;
  color: #000;
  border: 5px solid #f57c00;
}
@media screen and (max-width: 410px) {
  nav .burger {
    display: block;
  }
  .big-screen {
    display: none;
  }
}
</style>
<template>
  <div class="container">
    <!-- Страница с очередью -->
    <div class="queue">
      <queue-member-item
        v-for="(member, index) in store.state.queueMembers"
        v-show="store.state.queueMembers.slice(0, 10).includes(member)"
        :key="member.id"
        :member="member"
        :queueIndex="index"
        :class="{ active: index === 0 }"
      />
    </div>
    <p v-if="!store.state.queueMembers.length" style="margin-top: 100px">
      Очередь пуста... Какая редкость в нашей жизни
    </p>
    <div class="bottom-inner">
      <div v-if="store.state.queueMembers.length > 10" class="more">
        и еще {{ store.state.queueMembers.length - 10 }} человек...
      </div>
      <button class="button-pushable queue-clear" @click="clearQueue">
        <span class="button-shadow"></span>
        <span class="button-edge"></span>
        <span class="button-front text"> Очистить очередь </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import queueMemberItem from "../components/queueMemberItem.vue";
export default defineComponent({
  components: { queueMemberItem },
  setup() {
    const store = useStore(key);

    const clearQueue = () => {
      store.commit("CLEAR_QUEUE");
    };

    return {
      store,
      clearQueue,
    };
  },
});
</script>

<style lang="scss" scoped>
.bottom-inner {
  display: flex;
  justify-content: space-around;
  align-items: center;

  height: 100px;
}

.queue {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.active {
  background-color: lighten(rgb(0, 128, 0), 50%);
}

p {
  font-size: 2em;
}

.more {
  display: block;
  height: fit-content;
  //width: 50%;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@media screen and (max-width: 738px) {
  .queue-member {
    min-width: 90%;
    width: 100%;
  }
  .bottom-inner {
    flex-direction: column;
  }
}
</style>
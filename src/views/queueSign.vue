<template>
  <!-- Запись в очередь -->
  <div class="container">
    <label for="typeSelect" style="margin-top: 100px">Выбор типа талона</label>
    <form @submit.prevent="signToQueue" class="shadow">
      <div class="sign-inner">
        <select
          name="types"
          class="select"
          id="typeSelect"
          v-model="selectedType"
        >
          <option
            :value="type"
            v-for="type in store.state.typesArray"
            :key="type.key"
          >
            {{ type.typeName }}
          </option>
        </select>
        <button type="submit" class="button-pushable queue" role="button">
          <span class="button-shadow"></span>
          <span class="button-edge"></span>
          <span class="button-front text"> Записаться </span>
        </button>
      </div>
    </form>
    <p>Сейчас в очереди {{ lengthCheck }} человек</p>
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import ticketType from "../classes/ticketType";
import { computed, defineComponent, Ref, ref } from "vue";
import { useStore } from "vuex";
import queueHandler from "@/classes/queueHandler";
import IqueueMember from "@/classes/IqueueMember";
import queueMember from "@/classes/queueMember";
export default defineComponent({
  setup() {
    const store = useStore(key);
    const selectedType = ref<ticketType>({ typeName: "", key: -1 });
    const ticketName: Ref<string> = ref("");

    const signToQueue = () => {
      if (selectedType.value.key !== -1) {
        const qh = new queueHandler();

        const newMember: queueMember = {
          id: +Date.now(),
          key: qh.getRandomString(3).toUpperCase(),
          deployTime: qh.getNewMemberDeployTime(),
          memberTicket: {
            typeName: selectedType.value.typeName,
            key: selectedType.value.key,
          } as ticketType,
        };

        qh.addToQueue(newMember as IqueueMember);
        ticketName.value = "";
      } else alert("Выберите тип талона");
    };

    const lengthCheck = computed(() => {
      return store.state.queueMembers.length;
    });

    const nameKeydown = (e: KeyboardEvent) => {
      if (/^\W$/.test(e.key)) {
        e.preventDefault();
      }
    };

    return {
      store,
      signToQueue,
      selectedType,
      lengthCheck,
      ticketName,
      nameKeydown,
    };
  },
});
</script>

<style lang="scss" scoped>
.sign-inner {
  display: flex;
}

.container {
  margin-top: 100px;
}

form {
  margin: 0 auto;

  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: fit-content;
  height: fit-content;
  border-radius: 5px;
  padding: 25px;
  background-color: #eee;
}

@media screen and (max-width: 400px) {
  .sign-inner {
    flex-direction: column;
  }

  .select {
    max-width: 250px;
  }

  form {
    padding: 15px 5px;
  }

  .queue {
    margin: 0 auto;
    max-width: 250px;
  }
}
</style>
<template>
  <div class="container">
    <!-- Админ страница -->
    <div class="speed-editor shadow">
      <p>Выбор скорости очереди</p>
      <div class="speed-items">
        <div
          class="speed-item"
          title="30 секнуд на первого, 5 минут на всех остальных"
          @click="changeSpeed(300000)"
          :class="{ active: store.state.queueSpeed === 300000 }"
        >
          Обычная
        </div>
        <div
          class="speed-item"
          title="15 секнуд на первого, 2.5 минут на всех остальных"
          @click="changeSpeed(150000)"
          :class="{ active: store.state.queueSpeed === 150000 }"
        >
          Быстрая
        </div>
        <div
          class="speed-item"
          title="меньше секнуды на первого, 7.5 секунд на всех остальных"
          @click="changeSpeed(7500)"
          :class="{ active: store.state.queueSpeed === 7500 }"
        >
          Скорость света
        </div>
      </div>
    </div>
    <form class="editor-form" @submit.prevent="createType">
      <input
        :maxlength="20"
        type="text"
        placeholder="Название типа талона..."
        class="select"
        v-model="newTicketType"
      />
      <button
        type="submit"
        class="button-pushable queue"
        :disabled="newTypeInputNotEmpty"
        role="button"
      >
        <span class="button-shadow"></span>
        <span class="button-edge"></span>
        <span class="button-front text"> Создать тип талона </span>
      </button>
    </form>
    <div class="types-wrapper">
      <ul v-if="store.state.typesArray.length">
        <li v-for="type in store.state.typesArray" :key="type.key">
          <type-item
            :type="type"
            @deleteType="deleteType(type)"
            @click="editingType = type"
          />
        </li>
      </ul>
      <p v-else>Типов талонов нет. Добавьте их, для работы с очередью</p>
    </div>
  </div>
  <div class="edit-wrapper" v-if="editingType !== null">
    <edit-type-modal :type="editingType" @closeModal="closeModal" />
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { ref, computed, defineComponent, Ref } from "vue";
import { useStore } from "vuex";
import ticketType from "../classes/ticketType";
import typeItem from "../components/typeItem.vue";
import editTypeModal from "@/components/editTypeModal.vue";
export default defineComponent({
  components: { typeItem, editTypeModal },
  setup() {
    const store = useStore(key);
    const newTicketType: Ref<string> = ref("");
    let editingType: Ref<ticketType | null> = ref(null);

    const changeSpeed = function (speed: number) {
      //приходится чистить очередь из-за модалок
      store.state.queueSpeed = speed;
      store.commit("CLEAR_QUEUE");
    };

    const closeModal = () => {
      editingType.value = null;
    };

    const updateTypesLocalStorage = () => {
      localStorage.setItem(
        "ticketTypes",
        JSON.stringify(store.state.typesArray)
      );
    };

    const createType = () => {
      store.commit("CREATE_TICKET_TYPE", {
        typeName: newTicketType.value.trim(),
        key: +Date.now(),
      } as ticketType);
      updateTypesLocalStorage();
      newTicketType.value = "";
    };

    const newTypeInputNotEmpty = computed(() => {
      return !newTicketType.value.length;
    });

    const deleteType = (type: ticketType) => {
      store.commit("DELETE_TYPE", type.key);
      updateTypesLocalStorage();
    };

    return {
      newTicketType,
      editingType,
      createType,
      newTypeInputNotEmpty,
      deleteType,
      store,
      closeModal,
      changeSpeed,
    };
  },
});
</script>

<style lang="scss" scoped>
.speed-editor {
  border-radius: 5px;
  width: fit-content;
  margin: 25px auto;
  height: fit-content;
  padding: 25px;
  background-color: #eee;

  .speed-items {
    text-align: center;
    margin-top: 10px;
    display: flex;
    border-radius: 5px;
    border: 2px solid #ccc;
    .speed-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 10px 15px;
      background-color: #ccc;
      border: 1px solid rgb(168, 168, 168);
      transition: 0.3s ease;
      &:hover {
        background-color: #ff9800;
        color: #fff;
      }
    }
    .active {
      background-color: #f57c00 !important;
      color: #fff;
    }
  }
}

.forms-wrapper {
  display: flex;
  justify-content: space-around;

  .editor-form {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.edit-wrapper {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 2;
  backdrop-filter: blur(5px);
}

.types-wrapper {
  ul {
    padding: 20px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    li {
      width: 32%;
      margin: 5px;
      list-style: none;
    }
  }
}

@media screen and (max-width: 789px) {
  .types-wrapper ul li {
    width: 48%;
  }
}

@media screen and (max-width: 539px) {
  .types-wrapper ul li {
    width: 100%;
  }
  .select {
    max-width: 250px;
  }
}

@media screen and (max-width: 365px) {
  .speed-items {
    flex-direction: column;
  }
}
</style>
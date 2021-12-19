<template>
  <!-- Элемент очереди -->
  <div class="queue-member shadow">
    <p style="font-size: 2em; margin-bottom: 5px">{{ member.key }}</p>
    <p>Тип талона: {{ member.memberTicket.typeName }}</p>
    <p>ID талона: {{ member.id }}</p>
    <p class="queueNumber">Номер в очереди: {{ queueIndex + 1 }}</p>
    <p>Время выхода из очереди: {{ date }}</p>
    <i class="material-icons cardIcon">supervisor_account</i>
  </div>
</template>

<script lang="ts">
import IqueueMember from "@/classes/IqueueMember";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    member: { type: Object as () => IqueueMember, required: true },
    queueIndex: { type: Number, required: true },
  },
  setup(props) {
    const date = new Date(new Date(props.member.deployTime.toLocaleString("en-US", {timeZone: "Asia/Yekaterinburg"}))) //сбивалось визуальное отображение часового пояса, пришлось указать явно
    return { date }
  }
});
</script>

<style lang="scss" scoped>
.queue-member {
  position: relative;
  max-width: 47%;
  height: fit-content;
  padding: 50px;
  margin: 10px;
  background-color: lighten(#ff9800, 20%);
  border-radius: 5px;
  color: #fff !important;
  color: black;
  cursor: pointer;
  overflow: hidden;
  transition: 0.3s ease;

  &:hover {
    transform: scale(103%);
  }

  .cardIcon {
    position: absolute;
    bottom: -35px;
    right: -10px;
    font-size: 10em;
    opacity: 25%;
  }

  .queueNumber {
    position: absolute;
    bottom: 5px;
    left: 5px;
  }
}
</style>

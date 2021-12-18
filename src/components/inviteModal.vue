<template>
   <div class="modal-overlay">
    <div class="modal">
      <h6>Приглашение в очередь!</h6>
      <p>Приглашается номер {{ memberKey }}</p>
    </div>
    <div class="loading"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { key } from "@/store";
import { useStore } from "vuex";
import IqueueMember from '@/classes/IqueueMember'
export default defineComponent({
  setup() {
    const store = useStore(key);
    const firstEl: IqueueMember[] = store.state.queueMembers as IqueueMember[];
    const memberKey = firstEl[0].key
    return { memberKey };
  },
});
</script>

<style lang="scss" scoped>
@media screen and (max-width: 350px) {
  .modal-wrapper {
    max-width: 200px;
  }
}

.modal-wrapper {
  text-align: left;
  min-width: 200px;
  padding: 25px;
  position: absolute;
  bottom: 25px;
  left: 25px;
  margin: 0 auto;
  border-radius: 25px;
  //transform: translateX(-700px);
  box-sizing: border-box;
  border: 5px solid orange;
  //animation: modalPopUp 7s;

  .loading {
    border-radius: 15px;
    height: 5px;
    width: 0%;
    background-color: orange;
    animation: modalLoading 5s;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: fit-content;
  width: fit-content;
  margin-top: 10%;
  padding: 60px 60px;
  border-radius: 20px;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: orange;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}

</style>
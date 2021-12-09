<template>
<!-- Модалка приглашения  -->
<div class="modal-wrapper shadow">
    <p>Приглашается следующий талон: {{ store.state.queueMembers[0].key }}</p> <br>
    <div class="loading"></div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { key } from '@/store'
import { useStore } from 'vuex'
export default defineComponent({
    setup() {
        const store = useStore(key)
        return { store }
    },
})
</script>

<style lang="scss" scoped>
@keyframes modalLoading {
    from {width: 100%;}
    to {width: 0%;}
}
@keyframes modalPopUp {
    0% {transform: translateX(-700px);}
    20% {transform: translateX(0px);}
    80% {transform: translateX(0px);}
    100% {transform: translateX(-700px);}
}

@media screen and (max-width: 350px) {
    .modal-wrapper {
        max-width: 200px;
    }
}

.modal-wrapper{
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

    .loading{
        border-radius: 15px;
        height: 5px;
        width: 0%;
        background-color: orange;
        animation: modalLoading 5s;
    }
}


</style>
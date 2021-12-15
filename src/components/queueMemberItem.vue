<template>
    <!-- Элемент очереди -->
    <div class="queue-member shadow">
        <p style="font-size: 2em; margin-bottom: 5px;">{{ member.key }}</p>
        <p>Тип талона: {{ member.memberTicket.typeName }}</p>
        <p>ID талона: {{member.id}}</p>
        <p class="queueNumber">Номер в очереди: {{queueIndex + 1}}</p>
        <i class="material-icons cardIcon">supervisor_account</i>
    </div>
</template>

<script lang="ts">
import queueMember from '@/classes/queueMember'
import { defineComponent, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
export default defineComponent({
    props: {
        member: Object as () => queueMember,
        queueIndex: { type: Number, required: true }
    },
    setup(props) {
        const store = useStore(key)
        let timeModifier: number = store.state.queueSpeed;

        const indexchanged = () => {
            if(props.queueIndex === 0) {
                store.state.modalTimeouts.push(setTimeout(() => {
                    store.state.needModal = true //показываем модалку
                    setTimeout(() => {
                        store.state.needModal = false
                        store.commit('REMOVE_FROM_QUEUE') //удаляем из очереди
                    }, 5000);
                }, timeModifier))
            }
        }

        watch(props, indexchanged)

        onMounted(() => {
            if(props.queueIndex === 0){ //первому в очереди дается в 10 раз меньше времени
                store.state.modalTimeouts.push(setTimeout(() => {
                    store.state.needModal = true //вызываем модальное окно с приглашением
                    setTimeout(() => {
                        store.state.needModal = false //убираем модалку и удаляем элемент из очереди
                        store.commit('REMOVE_FROM_QUEUE')
                    }, 5000);
                }, timeModifier/10))
            }
        })
    },
})
</script>

<style lang="scss" scoped>
.queue-member {
    position: relative;
    min-width: 47%;
    height: fit-content;
    padding: 50px;
    margin: 10px;
    background-color: lighten(#ff9800, 20%);
    border-radius: 5px;
    color: #fff !important;
    color: black;
    cursor: pointer;
    overflow: hidden;
    transition: .3s ease;

    &:hover {
        transform: scale(103%);
    }

    .cardIcon{
        position: absolute;
        bottom: -35px;
        right: -10px;
        font-size: 10em;
        opacity: 25%;
    }

    .queueNumber{
        position: absolute;
        bottom: 5px;
        left: 5px;
    }
}
</style>

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
import { defineComponent, onMounted } from 'vue'
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

        onMounted(() => {
            if(props.queueIndex === 0){ //первому в очереди дается в 10 раз меньше времени
                let today = new Date();
                today.setUTCSeconds(today.getSeconds() + 5)
                today.setMilliseconds(today.getMilliseconds() + timeModifier/10)

                store.state.lastQueueMemberDeployTime = today //так как этот элемент первый, устанавливаем его время удаления в стор без сравнения

                store.state.modalTimeouts.push(setTimeout(() => {
                    if(store.state.modalTimeouts) { //был баг с изменением сокорости очереди, пришлось проверку добавить
                        store.state.needModal = true //вызываем модальное окно с приглашением

                        setTimeout(() => {
                            store.state.needModal = false //убираем модалку и удаляем элемент из очереди
                            store.commit('REMOVE_FROM_QUEUE')
                        }, 5000);
                    }


                }, timeModifier/10))
            }
            else {
                let lastDeployed = store.state.lastQueueMemberDeployTime
                let nowTime = new Date()

                let diff = Math.abs((lastDeployed.valueOf() - nowTime.valueOf())/1000) //узнаем сколько времени осталось до деплоя последнего в очереди
                nowTime.setSeconds(nowTime.getSeconds() + diff + timeModifier/1000 + 5) //прибавляем с учетом модалки на 5 сек
                store.state.lastQueueMemberDeployTime = nowTime //устанавливаем в стор время предпологаемого удаления из очереди

                store.state.modalTimeouts.push(setTimeout(() => {
                    if(store.state.modalTimeouts) { //был баг с изменением сокорости очереди, пришлось проверку добавить
                        store.state.needModal = true //показываем модалку

                        setTimeout(() => {
                            store.state.needModal = false
                            store.commit('REMOVE_FROM_QUEUE') //удаляем из очереди
                        }, 5000);
                    }
                }, 1000*diff + timeModifier))
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

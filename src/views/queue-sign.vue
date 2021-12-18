<template>
    <!-- Запись в очередь -->
    <div class="container">
        <label for="typeSelect" style="margin-top: 100px;">Выбор типа талона</label>
        <form @submit.prevent="signToQueue" class="shadow">
            <input :maxlength="3" @keydown="nameKeydown($event)" type="text" class="select" placeholder="Название талона" v-model="ticketName">
            <div class="sign-inner">
                <select name="types" class="select" id="typeSelect" v-model="selectedType">
                    <option :value="type" v-for="type in store.state.typesArray" :key="type.key">
                        {{type.typeName}}
                    </option>
                </select>

                <button type="submit" class="button-pushable queue" :disabled="newTicketNotEmpty" role="button">
                    <span class="button-shadow"></span>
                    <span class="button-edge"></span>
                    <span class="button-front text">
                        Записаться
                    </span>
                </button>
            </div>

        </form>
        <p>Сейчас в очереди {{lengthCheck}} человек</p>
    </div>
</template>

<script lang="ts">
import { key } from '@/store'
import ticketType from '../classes/ticketType'
import { computed, defineComponent, Ref, ref } from 'vue'
import { useStore } from 'vuex'
import queueMember from '@/classes/queueMember'
import queueHandler from '@/classes/queueHandler'
export default defineComponent({
setup() {
    const store = useStore(key)
    const selectedType = ref<ticketType>({ typeName: '', key: -1 })
    const ticketName :Ref<string> = ref('')

    interface IqueueMember {
        memberTicket :ticketType, id :number, key :string, deployTime :Date
    }

    const searchInQueue = function(name :string) :Boolean {
        const s :IqueueMember[] = store.state.queueMembers as IqueueMember[]
        let result :boolean = false;
        s.forEach(function(item : IqueueMember) {
            if(item.key === name) { result = true }
        })
        return result
    }

    const signToQueue = () => {
        if(selectedType.value.key !== -1 && !searchInQueue(ticketName.value.toUpperCase())) {
            const qh = new queueHandler()
            qh.addToQueue({
                id: +Date.now(),
                key: ticketName.value.toUpperCase(),
                deployTime: qh.getNewMemberDeployTime(),
                memberTicket: {
                    typeName: selectedType.value.typeName,
                    key: selectedType.value.key
                } as ticketType

            } as IqueueMember)
            ticketName.value = ''
        }
        else alert('Выберите тип талона / такой номер уже есть в очереди')
    }

    const lengthCheck = computed(() => {
        return store.state.queueMembers.length
    })

    const newTicketNotEmpty = computed(() => {
        return ticketName.value != '' ? false : true
    })

    const nameKeydown = (e :KeyboardEvent) => {
      if (/^\W$/.test(e.key)) {
        e.preventDefault();
      }
    }

    return {
        store,
        signToQueue,
        selectedType,
        lengthCheck,
        ticketName,
        newTicketNotEmpty,
        nameKeydown
    }
}
})
</script>

<style lang="scss" scoped>
.sign-inner{
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

    .queue{
        margin: 0 auto;
        max-width: 250px;
    }
}
</style>
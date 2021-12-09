<template>
    <form class="editor-form shadow" @submit.prevent="editType">
        <p>Редактор типа: {{type.key}}</p>
        <input type="text" placeholder="Название типа талона..." class="select" v-model="editTicketType">
        <button type="submit" class="button-pushable queue" :disabled="editTypeInputNotEmpty" role="button">
            <span class="button-shadow"></span>
            <span class="button-edge"></span>
            <span class="button-front text">
                Редактировать тип
            </span>
        </button>
        <i class="material-icons" @click.stop="$emit('closeModal')">close</i>
    </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from 'vue'
import { key } from '@/store'
import { useStore } from 'vuex'
import ticketType from '@/classes/ticketType'
export default defineComponent({
    props: {
        type: {
            type: Object as () => ticketType,
            required: true
        }
    },
    setup(props, { emit }) {
        const store = useStore(key)

        const editTicketType :Ref<string> = ref(props.type.typeName)

        const editTypeInputNotEmpty = computed(() => {
            return editTicketType.value.length !== 0 ? false : true
        })

        const updateTypesLocalStorage = () => {
            localStorage.setItem('ticketTypes', JSON.stringify(store.state.typesArray))
        }

        const editType = () => {
            store.commit('EDIT_TYPES', { key: props.type.key, typeName: editTicketType.value } as ticketType)
            updateTypesLocalStorage()
            emit('closeModal')
        }

        return {
            editTypeInputNotEmpty,
            store,
            editType,
            editTicketType
        }
    }
})
</script>

<style lang="scss" scoped>

.editor-form{
    position: relative;
    width: fit-content;
    height: fit-content;
    margin: 5px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background-color: #eee;

    i{
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
    }
}

@media screen and (max-width: 541px) {
    .editor-form{
        max-width: 60% !important;
    }
}
</style>


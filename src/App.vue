<template>
  <header-nav />
  <main-page v-show="store.state.currentPage === 1" />
  <queue-sign v-if="store.state.currentPage === 2" />
  <types-editor v-if="store.state.currentPage === 3" />
  <invite-modal v-if="store.state.needModal" />
</template>

<script lang="ts">
import { key } from '@/store'
import MainPage from './views/main-page.vue'
import headerNav from './components/header-nav.vue'
import typesEditor from './views/typesEditor.vue'
import queueSign from './views/queue-sign.vue'
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import inviteModal from '@/components/inviteModal.vue';
import ticketType from './classes/ticketType'
import queueMember from './classes/queueMember'
export default defineComponent({
  components : { MainPage, headerNav, typesEditor, queueSign, inviteModal },
  setup() {
    const store = useStore(key)

    const updateTypesLocalStorage = () => {
        localStorage.setItem('ticketTypes', JSON.stringify(store.state.typesArray))
    }

    const generateMock = () => {
      if(localStorage.getItem('ticketTypes') == null || localStorage.getItem('ticketTypes') == '[]') { //если нет типов талонов
        const ticketTypesMock :ticketType[] =
        [
          {
            key: 1, typeName: 'Оплата госпошлины'
          },
          {
            key: 2, typeName: 'Замена паспорта'
          },
          {
            key: 3, typeName: 'Открытие ИП'
          },
          {
            key: 4, typeName: 'Расторжение договора'
          },
          {
            key: 5, typeName: 'Прочие вопросы'
          },
        ]
        ticketTypesMock.forEach(el => {
          store.commit('CREATE_TICKET_TYPE', el)
        })
        updateTypesLocalStorage()
      }
      if(localStorage.getItem('queueMembers') == null || localStorage.getItem('queueMembers') == '[]') { //если нет очереди
        const queueMembersMock :queueMember[] = [
          {
            memberTicket: { key: 1, typeName: 'Оплата госпошлины' } as ticketType,
            id: 1,
            key: 'A0F'
          },
          {
            memberTicket: { key: 2, typeName: 'Замена паспорта' } as ticketType,
            id: 2,
            key: 'FAD'
          },
          {
            memberTicket: { key: 3, typeName: 'Открытие ИП' } as ticketType,
            id: 3,
            key: 'TY3'
          },
          {
            memberTicket: { key: 4, typeName: 'Расторжение договора' } as ticketType,
            id: 4,
            key: 'HNY'
          },
          {
            memberTicket: { key: 5, typeName: 'Прочие вопросы' } as ticketType,
            id: 5,
            key: '6OP'
          }
        ]
        store.commit('UPDATE_MEMBERS', queueMembersMock)
        localStorage.setItem('queueMembers', JSON.stringify(store.state.queueMembers))
      }
    }

    onMounted(() => {
      if(localStorage.getItem('ticketTypes') == null || localStorage.getItem('ticketTypes') == '[]' || localStorage.getItem('queueMembers') == null || localStorage.getItem('queueMembers') == '[]') {
        generateMock()
      }
      store.commit('GET_QUEUE_MEMBERS') //забираем данные из localstorage
      store.commit('GET_TICKET_TYPES')
    })



    return { store }
  }
})
</script>

<style lang="scss">
#app {
  position: relative;
}

.shadow {
  -webkit-box-shadow: 5px 8px 30px -6px rgba(0,0,0,0.28);
  -moz-box-shadow: 5px 8px 30px -6px rgba(0,0,0,0.28);
  box-shadow: 5px 8px 30px -6px rgba(0,0,0,0.28);
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.button-pushable {
  transform: translateY(4px);
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  //background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition:
    transform
    600ms
    cubic-bezier(.3, .7, .4, 1);
}

.button-edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

.button-front {
  display: block;
  position: relative;
  padding: 12px 27px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: white;
  background-color: #f57c00;
  will-change: transform;
  transform: translateY(-4px);
  transition:
    transform
    600ms
    cubic-bezier(.3, .7, .4, 1);
}

@media (min-width: 768px) {
  .button-front {
    font-size: 1.25rem;
    padding: 12px 42px;
  }
}

.button-pushable:hover {
  filter: brightness(110%);
}

.button-pushable:disabled .button-front {
  background-color: #cccc;
}

.button-pushable:hover .button-front {
  transform: translateY(-6px);
  transition:
    transform
    250ms
    cubic-bezier(.3, .7, .4, 1.5);
}

.button-pushable:active .button-front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.button-pushable:hover .button-shadow {
  transform: translateY(4px);
  transition:
    transform
    250ms
    cubic-bezier(.3, .7, .4, 1.5);
}

.button-pushable:active .button-shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.button-pushable:focus:not(:focus-visible) {
  outline: none;
}

.select{
  padding: 10px 10px;
  margin: 5px 10px;
  font-size: 1.25em;

}

#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Open Sans', sans-serif;
}

.container {
  position: relative;
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
  min-height: calc(100vh - 150px);
}
</style>

import queueMember from "@/classes/queueMember";
import ticketType from "@/classes/ticketType";
import { InjectionKey } from "@vue/runtime-core";
import { createStore, MutationTree, Store } from "vuex";

export type State = {
  typesArray: ticketType[]; //типы талонов
  queueMembers: queueMember[]; //массив очереди
  needModal: boolean; //показ модалки если true
  queueSpeed: number; //скорость очереди
  modalTimeouts: number[]; //при необходимости очистки очереди, так же очищать setTimeout всех модалок
};

const state: State = {
  typesArray: [],
  queueMembers: [],
  needModal: false,
  queueSpeed: 300000,
  modalTimeouts: [],
};

export enum MutationTypes {
  CREATETICKETTYPE = "CREATE_TICKET_TYPE",
  UPDATEMEMBERSARRAY = "UPDATE_MEMBERS",
  EDITTYPESARRAY = "EDIT_TYPES",
  DELETETICKETTYPE = "DELETE_TYPE",
  GETTICKETTYPESFROMSTORAGE = "GET_TICKET_TYPES",
  SIGNTOQUEUE = "SIGN_TO_QUEUE",
  REMOVEFROMQUEUE = "REMOVE_FROM_QUEUE",
  GETQUEUEMEMBERS = "GET_QUEUE_MEMBERS",
  CLEARQUEUE = "CLEAR_QUEUE",
  TOGGLEMODAL = "TOGGLE_MODAL"
}

export type Mutations<S = State> = {
  [MutationTypes.CREATETICKETTYPE](state: S, payload: ticketType): void;
  [MutationTypes.UPDATEMEMBERSARRAY](state: S, payload: queueMember[]): void;
  [MutationTypes.EDITTYPESARRAY](state: S, payload: ticketType): void;
  [MutationTypes.DELETETICKETTYPE](state: S, payload: number): void;
  [MutationTypes.GETTICKETTYPESFROMSTORAGE](state: S): void;
  [MutationTypes.SIGNTOQUEUE](state: S, payload: queueMember): void;
  [MutationTypes.REMOVEFROMQUEUE](state: S): void;
  [MutationTypes.GETQUEUEMEMBERS](state: S): void;
  [MutationTypes.CLEARQUEUE](state: S): void;
  [MutationTypes.TOGGLEMODAL](state: S): void;
};

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.TOGGLEMODAL](state: State) {
    state.needModal = !state.needModal
  },
  [MutationTypes.CREATETICKETTYPE](state: State, payload: ticketType) {
    state.typesArray.push(payload);
  },
  [MutationTypes.UPDATEMEMBERSARRAY](state: State, payload: queueMember[]) {
    state.queueMembers = payload;
  },
  [MutationTypes.EDITTYPESARRAY](state: State, payload: ticketType) {
    state.typesArray.forEach(function (item: ticketType) {
      if (item.key === payload.key) {
        item.typeName = payload.typeName;
      }
    });
  },
  [MutationTypes.DELETETICKETTYPE](state: State, payload: number) {
    state.typesArray = state.typesArray.filter((type) => type.key != payload);
  },
  [MutationTypes.GETTICKETTYPESFROMSTORAGE](state: State) {
    state.typesArray = Object.assign(
      JSON.parse(localStorage.getItem("ticketTypes") || "[]")
    );
  },
  [MutationTypes.GETQUEUEMEMBERS](state: State) {
    state.queueMembers = Object.assign(
      JSON.parse(localStorage.getItem("queueMembers") || "[]")
    );
  },
  [MutationTypes.SIGNTOQUEUE](state: State, payload: queueMember) {
    state.queueMembers.push(payload);
  },
  [MutationTypes.CLEARQUEUE](state: State) {
    state.queueMembers = [];
    localStorage.removeItem("queueMembers");
    state.modalTimeouts.forEach((el) => {
      clearTimeout(el);
    });
    state.modalTimeouts = [];
  },
  [MutationTypes.REMOVEFROMQUEUE](state: State) {
    state.queueMembers.shift();
    localStorage.setItem(
      "queueMembers",
      JSON.stringify(store.state.queueMembers)
    );
  },
};

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state,
  mutations,
});

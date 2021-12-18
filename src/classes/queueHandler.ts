import queueMember from "./queueMember";
import ticketType from "./ticketType";
import { store } from "@/store";
import axios from "axios";
import IqueueMember from "./IqueueMember";

export default class queueHandler {
  // класс работает на World Time Api, чтобы приложение не зависило от системного времени и не ломалось при его изменении
  // так же есть версия, работающая и на системном времени
  private url = "http://worldtimeapi.org/api/timezone/Asia/Yekaterinburg";

   getRandomString(length: number): string {
    var randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  private deleteOutDated = (): void => {
    const storeQueue = store.state.queueMembers as IqueueMember[];
    const Today: Date = this.getCurrentDateFromApi();
    const filterByExpiration: IqueueMember[] = storeQueue.filter((items) => {
      return new Date(items.deployTime).getTime() > Today.getTime();
    });
    store.commit("UPDATE_MEMBERS", filterByExpiration as queueMember[]);
    this.updateMembersLocalStorage();
  };

  private updateMembersLocalStorage = (): void => {
    localStorage.setItem(
      "queueMembers",
      JSON.stringify(store.state.queueMembers)
    );
  };

  private getDateDiff = (dateToMatch: Date): number => {
    //узнать разницу во времени между переданным значением и текущим временем
    const nowTime = this.getCurrentDateFromApi();
    const diff = Math.abs(new Date(dateToMatch).getTime() - nowTime.getTime());
    return diff;
  };

  private getCurrentDateFromApi = (): Date => {
    let date: Date = new Date();
    axios
      .get(this.url)
      .then((response) => (date = response.data.datetime as Date));
    return date;
  };

  getNewMemberDeployTime = (): Date => {
    const currentQueue: queueMember[] = store.state.queueMembers;
    const newDate: Date = this.getCurrentDateFromApi();
    if (currentQueue.length === 0) {
      newDate.setMilliseconds(store.state.queueSpeed / 10);
      return newDate;
    }
    const lastQueueMember: IqueueMember = currentQueue.slice(
      -1
    )[0] as IqueueMember;
    newDate.setMilliseconds(
      this.getDateDiff(lastQueueMember.deployTime) + store.state.queueSpeed
    );
    return newDate;
  };

  addToQueue = (newMember: IqueueMember) => {
    store.commit("SIGN_TO_QUEUE", newMember);
    this.setTimeDeployment(this.getDateDiff(newMember.deployTime));
    this.updateMembersLocalStorage();
  };

  queueInit = () => {
    if (
      localStorage.getItem("ticketTypes") == null ||
      localStorage.getItem("ticketTypes") == "[]" ||
      localStorage.getItem("queueMembers") == null ||
      localStorage.getItem("queueMembers") == "[]"
    ) {
      this.generateMock();
    }
    this.deleteOutDated();
    const currentQueue = store.state.queueMembers as IqueueMember[];
    currentQueue.forEach((el) => {
      this.setTimeDeployment(this.getDateDiff(new Date(el.deployTime)));
    });
  };

  private setTimeDeployment = function (timeoutValue: number): void {
    store.state.modalTimeouts.push(
      setTimeout(() => {
        store.commit("TOGGLE_MODAL"); //вызываем модальное окно с приглашением
        setTimeout(() => {
          store.commit("TOGGLE_MODAL"); //убираем модалку и удаляем элемент из очереди
          store.commit("REMOVE_FROM_QUEUE");
        }, 5000);
      }, timeoutValue)
    );
  };

  private updateTypesLocalStorage = () => {
    localStorage.setItem("ticketTypes", JSON.stringify(store.state.typesArray));
  };

  private generateMock = () => {
    if (
      localStorage.getItem("ticketTypes") == null ||
      localStorage.getItem("ticketTypes") == "[]"
    ) {
      //если нет типов талонов
      const ticketTypesMock: ticketType[] = [
        {
          key: 1,
          typeName: "Оплата госпошлины",
        },
        {
          key: 2,
          typeName: "Замена паспорта",
        },
        {
          key: 3,
          typeName: "Открытие ИП",
        },
        {
          key: 4,
          typeName: "Расторжение договора",
        },
        {
          key: 5,
          typeName: "Прочие вопросы",
        },
      ];
      ticketTypesMock.forEach((el) => {
        store.commit("CREATE_TICKET_TYPE", el);
      });
      this.updateTypesLocalStorage();
    }
    if (
      localStorage.getItem("queueMembers") == null ||
      localStorage.getItem("queueMembers") == "[]"
    ) {
      //если нет очереди
      const time = this.getCurrentDateFromApi();
      const dates: Date[] = [
        new Date(time.setMilliseconds(30000)),
        new Date(time.setMilliseconds(300000)),
        new Date(time.setMilliseconds(300000)),
        new Date(time.setMilliseconds(300000)),
        new Date(time.setMilliseconds(300000)),
      ];
      const queueMembersMock: queueMember[] = [
        {
          memberTicket: {
            key: 1,
            typeName: "Оплата госпошлины",
          } as ticketType,
          id: 1,
          key: "A0F",
          deployTime: dates[0],
        },
        {
          memberTicket: { key: 2, typeName: "Замена паспорта" } as ticketType,
          id: 2,
          key: "FAD",
          deployTime: dates[1],
        },
        {
          memberTicket: { key: 3, typeName: "Открытие ИП" } as ticketType,
          id: 3,
          key: "TY3",
          deployTime: dates[2],
        },
        {
          memberTicket: {
            key: 4,
            typeName: "Расторжение договора",
          } as ticketType,
          id: 4,
          key: "HNY",
          deployTime: dates[3],
        },
        {
          memberTicket: { key: 5, typeName: "Прочие вопросы" } as ticketType,
          id: 5,
          key: "6OP",
          deployTime: dates[4],
        },
      ];
      store.commit("UPDATE_MEMBERS", queueMembersMock);
      localStorage.setItem(
        "queueMembers",
        JSON.stringify(store.state.queueMembers)
      );
    }
  };
}

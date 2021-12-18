import { key } from '@/store'
import { useStore } from "vuex";
import queueMember from './queueMember';
import ticketType from './ticketType';
import { store } from '@/store'
import axios from 'axios';
interface IqueueMember {
    memberTicket :ticketType, id :number, key :string, deployTime :Date
}

export default class queueHandler {
    private url = "http://worldtimeapi.org/api/timezone/Asia/Yekaterinburg"

    private deleteOutDated = () :void => {
        const storeQueue = store.state.queueMembers as IqueueMember[]
        const Today :Date = new Date(Date.now())
        const filterByExpiration :IqueueMember[] = storeQueue.filter((items) => {
            return new Date(items.deployTime).getTime() > Today.getTime();
        })
        store.commit('UPDATE_MEMBERS', filterByExpiration as queueMember[])
    }

    private getDateDiff = function(dateToMatch :Date) :number { //узнать разницу во времени между переданным значением и текущим временем
        const nowTime = new Date(Date.now())
        const diff = Math.abs((dateToMatch.getTime() - nowTime.getTime()))
        return diff
    }

    getNewMemberDeployTime = () :Date => {
        // axios.get(this.url)
        //     .then(response => console.log("response", response.data.datetime))


        const currentQueue :queueMember[] = store.state.queueMembers

        const newDate :Date = new Date(Date.now())
        if(currentQueue.length === 0) {
            newDate.setMilliseconds(store.state.queueSpeed / 10)
            return newDate
        }
        const lastQueueMember :IqueueMember = currentQueue.slice(-1)[0] as IqueueMember
        newDate.setMilliseconds(this.getDateDiff(lastQueueMember.deployTime) + store.state.queueSpeed)
        return newDate
    }

    addToQueue = (newMember :IqueueMember) => {
        store.commit('SIGN_TO_QUEUE', newMember)
        this.setTimeDeployment(this.getDateDiff(newMember.deployTime))
        localStorage.setItem('queueMembers', JSON.stringify(store.state.queueMembers))
    }



    queueInit = () => {
        this.deleteOutDated()
        const currentQueue = store.state.queueMembers as IqueueMember[]
        currentQueue.forEach(el => {
            this.setTimeDeployment(this.getDateDiff(new Date(el.deployTime)));
        })
    }

    private setTimeDeployment = function(timeoutValue :number) :void {
        store.state.modalTimeouts.push(setTimeout(() => {
            store.state.needModal = true //вызываем модальное окно с приглашением
            setTimeout(() => {
                store.state.needModal = false //убираем модалку и удаляем элемент из очереди
                store.commit('REMOVE_FROM_QUEUE')
            }, 5000);
        }, timeoutValue));

    }



}
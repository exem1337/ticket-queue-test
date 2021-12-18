import ticketType from "./ticketType";

export default interface IqueueMember {
  memberTicket: ticketType;
  x: number;
  key: string;
  deployTime: Date;
}

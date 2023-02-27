export interface IEvent<T = any> {
  dataTimeOccurred: Date;
  eventData: T;
}

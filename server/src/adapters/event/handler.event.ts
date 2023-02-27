import { IEvent } from './event';

export interface IEventHandler<T extends IEvent = IEvent> {
  handle(event: T): void;
}

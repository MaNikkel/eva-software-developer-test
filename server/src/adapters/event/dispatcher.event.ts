import { IEvent } from './event';

export interface IEventDispatcher {
  notify(event: IEvent): void;
}

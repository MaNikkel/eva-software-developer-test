import { IEvent } from './event';
import { IEventHandler } from './handler.event';

export interface IEventDispatcher {
  notify(event: IEvent): void;
  register(eventName: string, eventHandler: IEventHandler): void;
  unregisterAll(): void;
}

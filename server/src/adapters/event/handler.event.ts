import { IEvent } from './event';

export abstract class IEventHandler<T extends IEvent = IEvent> {
  private _eventName: string;

  constructor(eventName: string) {
    this._eventName = eventName;
  }

  get eventName(): string {
    return this._eventName;
  }

  abstract handle(event: T): void;
}

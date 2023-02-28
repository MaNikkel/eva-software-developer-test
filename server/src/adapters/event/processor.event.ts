import { IEventHandler } from './handler.event';

export abstract class IEventProcessor {
  protected _handlers: IEventHandler[] = [];

  get handlers() {
    return this._handlers;
  }

  setHandlers(handlers: IEventHandler[]): void {
    this._handlers = handlers;
  }

  abstract process(): void;
}

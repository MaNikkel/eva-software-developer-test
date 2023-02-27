import { IEventDispatcher } from '../../dispatcher.event';
import { IEventHandler } from '../../handler.event';
import { IEvent } from '../../event';

export class InMemoryEventDispatcher implements IEventDispatcher {
  private eventHandlers: { [key: string]: IEventHandler[] } = {};

  get getEventHandlers(): { [key: string]: IEventHandler[] } {
    return this.eventHandlers;
  }

  notify(event: IEvent): void {
    const eventName = event.constructor.name;

    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((handler) => {
        handler.handle(event);
      });
    }
  }

  register(eventName: string, eventHandler: IEventHandler): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: IEventHandler): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);

      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}

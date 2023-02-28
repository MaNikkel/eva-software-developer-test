import { IEventDispatcher } from '../../dispatcher.event';
import { IEventHandler } from '../../handler.event';
import { IEvent } from '../../event';
import { queue } from './queue';

export class InMemoryEventDispatcher implements IEventDispatcher {
  private eventHandlers: { [key: string]: IEventHandler[] } = {};

  get getEventHandlers(): { [key: string]: IEventHandler[] } {
    return this.eventHandlers;
  }

  notify(event: IEvent): void {
    queue.push(event);
  }
}

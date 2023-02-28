import { IEventProcessor } from '../../processor.event';
import { queue } from './queue';

export class InMemoryEventProcessor extends IEventProcessor {
  constructor() {
    super();
  }

  process(): void {
    while (queue.length > 0) {
      const event = queue.pop();

      const handler = this._handlers.find(
        (h) => h.eventName === event.constructor.name,
      );

      if (handler) {
        handler.handle(event);
      }
    }
  }
}

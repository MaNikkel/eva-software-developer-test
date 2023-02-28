import { IEventDispatcher } from '../../dispatcher.event';
import { IEvent } from '../../event';
import { IEventHandler } from '../../handler.event';
import { Queue, Worker } from 'bullmq';

export class BullEventDispatcher implements IEventDispatcher {
  private queue: Queue;

  constructor() {
    this.queue = new Queue('dispatcher', {
      connection: {
        host: process.env.REDIS_HOST ?? '',
        port: Number(process.env.REDIS_PORT) ?? 6379,
        password: process.env.REDIS_PASSWORD ?? '',
      },
    });
  }

  notify(event: IEvent): void {
    const eventName = event.constructor.name;
    this.queue.add(eventName, event);
  }
}

import { Queue } from 'bullmq';
import { IEventDispatcher } from '../../dispatcher.event';
import { IEvent } from '../../event';

export class BullEventDispatcher implements IEventDispatcher {
  private queue: Queue;

  constructor() {
    this.queue = new Queue('queue', {
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

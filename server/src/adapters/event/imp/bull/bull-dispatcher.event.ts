import { IEventDispatcher } from '../../dispatcher.event';
import { IEvent } from '../../event';
import { IEventHandler } from '../../handler.event';
import { Queue, Worker } from 'bullmq';

export class BullEventDispatcher implements IEventDispatcher {
  private eventHandlers: { [key: string]: IEventHandler[] } = {};
  private allHandlers: IEventHandler[] = [];

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

  get getEventHandlers(): { [key: string]: IEventHandler[] } {
    return this.eventHandlers;
  }

  notify(event: IEvent): void {
    const eventName = event.constructor.name;

    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((handler) => {
        this.queue.add(handler.constructor.name, event);
      });
    }
  }

  register(eventName: string, eventHandler: IEventHandler): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.allHandlers.push(eventHandler);

    this.eventHandlers[eventName].push(eventHandler);
  }

  unregisterAll(): void {
    this.eventHandlers = {};

    this.queue.close();
  }

  process() {
    new Worker(
      'dispatcher',
      async (job) => {
        const handler = this.allHandlers.find(
          (h) => h.constructor.name === job.name,
        );

        if (handler) {
          handler.handle(job.data);
        }
      },
      {
        connection: {
          host: process.env.REDIS_HOST ?? '',
          port: Number(process.env.REDIS_PORT) ?? 6379,
          password: process.env.REDIS_PASSWORD ?? '',
        },
      },
    );
  }
}

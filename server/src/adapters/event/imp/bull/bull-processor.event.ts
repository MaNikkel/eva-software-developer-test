import { Worker } from 'bullmq';
import { IEventProcessor } from '../../processor.event';

export class BullEventProcessor extends IEventProcessor {
  process() {
    new Worker(
      'queue',
      async (job) => {
        const handler = this._handlers.find((h) => h.eventName === job.name);

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

import { IEventHandler } from 'src/adapters/event/handler.event';
import { IEventProcessor } from 'src/adapters/event/processor.event';
import { Journey } from './journey.valueobject';

interface JourneyActionsData {
  processor: IEventProcessor;
  journeySlug: string;
  handlers: IEventHandler[];
}

export class JourneyActions {
  private _processor: IEventProcessor;
  private _journeySlug: string;

  constructor({ handlers, journeySlug, processor }: JourneyActionsData) {
    this._journeySlug = journeySlug;
    this._processor = processor;

    this._processor.setHandlers(handlers);
  }

  get journeySlug() {
    return this._journeySlug;
  }

  get processor() {
    return this._processor;
  }
}

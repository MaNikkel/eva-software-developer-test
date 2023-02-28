import { IEventHandler } from 'src/adapters/event/handler.event';
import { IEventProcessor } from 'src/adapters/event/processor.event';
import { Journey } from './journey.valueobject';

interface JourneyActionsData {
  processor: IEventProcessor;
  journey: Journey;
  handlers: IEventHandler[];
}

export class JourneyActions {
  private _processor: IEventProcessor;
  private _journey: Journey;

  constructor({ handlers, journey, processor }: JourneyActionsData) {
    this._journey = journey;
    this._processor = processor;

    this._processor.setHandlers(handlers);

    // console.log(this._processor.handlers);
  }

  get journey() {
    return this._journey;
  }

  get processor() {
    return this._processor;
  }
}

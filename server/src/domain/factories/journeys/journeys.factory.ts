import { IEventDispatcher } from 'src/adapters/event/dispatcher.event';
import { IEventProcessor } from 'src/adapters/event/processor.event';
import { AdmissionJourneyFactory } from './admission-journey/admission-journey.factory';

interface JourneysFactoryProps {
  dispatcher: IEventDispatcher;
  processor: IEventProcessor;
}

export class JourneysFactory {
  private _dispatcher: IEventDispatcher;
  private _processor: IEventProcessor;

  // JOURNEYS
  private _processors: { [key: string]: IEventProcessor };

  constructor({ dispatcher, processor }: JourneysFactoryProps) {
    this._dispatcher = dispatcher;
    this._processor = processor;
  }

  create() {
    const admissionJourney = new AdmissionJourneyFactory({
      dispatcher: this._dispatcher,
      processor: this._processor,
    });

    this._processors[admissionJourney.constructor.name] =
      admissionJourney.journeyActions.processor;
  }

  get processors() {
    return this._processors;
  }
}

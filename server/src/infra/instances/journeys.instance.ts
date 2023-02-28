import { JourneysFactory } from '../../domain/factories/journeys/journeys.factory';
import { eventDispatcher } from './event-dispatcher.instance';
import { eventProcessor } from './event-processor.instance';

const journeys = new JourneysFactory({
  dispatcher: eventDispatcher,
  processor: eventProcessor,
});

journeys.create();

export { journeys };

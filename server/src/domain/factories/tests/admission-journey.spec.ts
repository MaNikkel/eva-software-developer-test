import { InMemoryEventProcessor } from '../../../adapters/event/imp/in-memory/in-memory-processor.event';
import { IEventDispatcher } from '../../../adapters/event/dispatcher.event';
import { InMemoryEventDispatcher } from '../../../adapters/event/imp/in-memory/in-memory-dispatcher.event';
import { IEventProcessor } from '../../../adapters/event/processor.event';
import { Journey } from '../../../domain/value-objects/journey.valueobject';
import { AdmissionJourneyFactory } from '../journeys/admission-journey/admission-journey.factory';

describe('Admission Journey', () => {
  let eventDispatcher: IEventDispatcher;
  let eventProcessor: IEventProcessor;

  let journey: Journey;

  beforeAll(() => {
    eventDispatcher = new InMemoryEventDispatcher();
    eventProcessor = new InMemoryEventProcessor();

    // eventProcessor.process();
  });

  it('should create the journey', () => {
    journey = new AdmissionJourneyFactory({
      dispatcher: eventDispatcher,
      processor: eventProcessor,
    }).create({ name: 'Dummy', registrationNumber: '123' });

    expect(journey).toBeDefined();
  });

  it('should start the admission journey', async () => {
    const logSpy = jest.spyOn(console, 'log');

    const admissionJourney = new AdmissionJourneyFactory({
      dispatcher: eventDispatcher,
      processor: eventProcessor,
    });

    journey = admissionJourney.create({
      name: 'Dummy',
      registrationNumber: '123',
    });

    journey.start();

    admissionJourney.journeyActions.processor.process();

    expect(journey).toBeDefined();

    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith({
      name: 'Dummy',
      registrationNumber: '123',
    });
    expect(logSpy).toHaveBeenCalledWith('documents');
    expect(logSpy).toHaveBeenCalledWith('finish journey');
  });
});

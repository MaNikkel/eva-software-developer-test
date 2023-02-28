import { InMemoryEventProcessor } from '../../../adapters/event/imp/in-memory/in-memory-processor.event';
import { IEventDispatcher } from '../../../adapters/event/dispatcher.event';
import { InMemoryEventDispatcher } from '../../../adapters/event/imp/in-memory/in-memory-dispatcher.event';
import { IEventProcessor } from '../../../adapters/event/processor.event';
import { JourneyActions } from '../../../domain/value-objects/journey-actions.valueobject';
import { AdmissionJourneyFactory } from '../admission-journey/admission-journey.factory';

describe('Admission Journey', () => {
  let eventDispatcher: IEventDispatcher;
  let eventProcessor: IEventProcessor;

  let journeyActions: JourneyActions;

  beforeAll(() => {
    eventDispatcher = new InMemoryEventDispatcher();
    eventProcessor = new InMemoryEventProcessor();

    // eventProcessor.process();
  });

  it('should create the journey', () => {
    journeyActions = new AdmissionJourneyFactory({
      dispatcher: eventDispatcher,
      processor: eventProcessor,
      data: { name: 'Dummy', registrationNumber: '123' },
    }).create();

    expect(journeyActions).toBeDefined();
  });

  it('should start the admission journey', async () => {
    const logSpy = jest.spyOn(console, 'log');

    journeyActions = new AdmissionJourneyFactory({
      dispatcher: eventDispatcher,
      processor: eventProcessor,
      data: { name: 'Dummy', registrationNumber: '123' },
    }).create();

    journeyActions.journey.start();

    journeyActions.processor.process();

    expect(journeyActions).toBeDefined();
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith({
      name: 'Dummy',
      registrationNumber: '123',
    });
    expect(logSpy).toHaveBeenCalledWith('documents');
    expect(logSpy).toHaveBeenCalledWith('finish journey');
  });
});

import { IEventDispatcher } from '../../../adapters/event/dispatcher.event';
import { IEventProcessor } from '../../../adapters/event/processor.event';
import { EmployeeData } from '../../../domain/entities/employee.entity';
import { AdmissionJourneyFactory } from './admission-journey/admission-journey.factory';

interface JourneysFactoryProps {
  dispatcher: IEventDispatcher;
  processor: IEventProcessor;
}

export class JourneysFactory {
  private _dispatcher: IEventDispatcher;
  private _processor: IEventProcessor;

  private _processors: { [key: string]: IEventProcessor } = {};

  // JOURNEYS FACTORIES

  private _admissionJourneyFactory: AdmissionJourneyFactory;

  constructor({ dispatcher, processor }: JourneysFactoryProps) {
    this._dispatcher = dispatcher;
    this._processor = processor;
  }

  create() {
    this._admissionJourneyFactory = new AdmissionJourneyFactory({
      dispatcher: this._dispatcher,
      processor: this._processor,
    });

    this._processors[this._admissionJourneyFactory.constructor.name] =
      this._admissionJourneyFactory.journeyActions.processor;
  }

  createJourney(slug: string, data: EmployeeData) {
    switch (slug) {
      case 'admission-journey':
        return this._admissionJourneyFactory.create(data);
    }
  }

  get processors() {
    return this._processors;
  }
}

import { IEventDispatcher } from 'src/adapters/event/dispatcher.event';
import { IEvent } from 'src/adapters/event/event';
import { EmployeeData } from '../../entities/employee.entity';
import { Journey } from '../../entities/journey.entity';
import { SendWelcomeEmailHandler } from './events/handlers/send-welcome-email.event';
import { AdmissionJourneyStartedEvent } from './events/admission-journey-started.event';
import { SendDocumentsRequestHandler } from './events/handlers/send-documents-request.handler';

interface AdmissionJourneyFactoryProps {
  dispatcher: IEventDispatcher;
  data: EmployeeData;
}

export class AdmissionJourneyFactory {
  private _dispatcher: IEventDispatcher;
  private _startJourneyEvent: IEvent;

  constructor({ dispatcher, data }: AdmissionJourneyFactoryProps) {
    this._dispatcher = dispatcher;

    this._startJourneyEvent = new AdmissionJourneyStartedEvent(data);
  }

  create(id?: string): Journey {
    const journey = new Journey({
      name: 'admission-journey',
      id: id,
      dispatcher: this._dispatcher,
      startEvent: this._startJourneyEvent,
    });

    journey.addActionOnEvent(
      new SendWelcomeEmailHandler(this._dispatcher),
      this._startJourneyEvent.constructor.name,
    );

    journey.addActionOnEvent(
      new SendDocumentsRequestHandler(this._dispatcher),
      'AdmissionJourneyWelcomeEmailSendEvent',
    );

    return journey;
  }
}

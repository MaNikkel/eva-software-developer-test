import { IEventDispatcher } from 'src/adapters/event/dispatcher.event';
import { IEvent } from 'src/adapters/event/event';
import { EmployeeData } from '../../entities/employee.entity';
import { Journey } from '../../entities/journey.entity';
import { SendWelcomeEmailHandler } from './events/handlers/send-welcome-email.handler';
import { AdmissionJourneyStartedEvent } from './events/admission-journey-started.event';
import { SendDocumentsRequestHandler } from './events/handlers/send-documents-request.handler';
import { AdmissionJourneyWelcomeEmailSendEvent } from './events/admission-journey-welcome-email-send.event';
import { FinishAdmissionJourneyHandler } from './events/handlers/finish-admission-journey.handler';
import { AdmissionJourneyFinishedEvent } from './events/admission-journey-finished.event';

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
      AdmissionJourneyWelcomeEmailSendEvent.name,
    );

    journey.addActionOnEvent(
      new FinishAdmissionJourneyHandler(this._dispatcher),
      AdmissionJourneyFinishedEvent.name,
    );

    return journey;
  }
}

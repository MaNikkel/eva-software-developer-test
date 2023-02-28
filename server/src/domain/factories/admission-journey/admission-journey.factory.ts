import { IEventDispatcher } from '../../../adapters/event/dispatcher.event';
import { IEvent } from '../../../adapters/event/event';
import { EmployeeData } from '../../entities/employee.entity';
import { Journey } from '../../value-objects/journey.valueobject';
import { SendWelcomeEmailHandler } from './events/handlers/send-welcome-email.handler';
import { AdmissionJourneyStartedEvent } from './events/admission-journey-started.event';
import { SendDocumentsRequestHandler } from './events/handlers/send-documents-request.handler';
import { AdmissionJourneyWelcomeEmailSendEvent } from './events/admission-journey-welcome-email-send.event';
import { FinishAdmissionJourneyHandler } from './events/handlers/finish-admission-journey.handler';
import { AdmissionJourneyFinishedEvent } from './events/admission-journey-finished.event';
import { JourneyActions } from '../../value-objects/journey-actions.valueobject';
import { IEventProcessor } from '../../../adapters/event/processor.event';

interface AdmissionJourneyFactoryProps {
  dispatcher: IEventDispatcher;
  processor: IEventProcessor;
  data: EmployeeData;
}

export class AdmissionJourneyFactory {
  private _dispatcher: IEventDispatcher;
  private _processor: IEventProcessor;
  private _startJourneyEvent: IEvent;

  constructor({ dispatcher, data, processor }: AdmissionJourneyFactoryProps) {
    this._dispatcher = dispatcher;
    this._processor = processor;

    this._startJourneyEvent = new AdmissionJourneyStartedEvent(data);
  }

  create(): JourneyActions {
    const journey = new Journey({
      slug: 'admission-journey',
      name: 'Jornada da Admissão',
      dispatcher: this._dispatcher,
      startEvent: this._startJourneyEvent,
    });

    const journeyActions = new JourneyActions({
      handlers: [
        new SendWelcomeEmailHandler(
          this._startJourneyEvent.constructor.name,
          this._dispatcher,
        ),
        new SendDocumentsRequestHandler(
          AdmissionJourneyWelcomeEmailSendEvent.name,
          this._dispatcher,
        ),
        new FinishAdmissionJourneyHandler(
          AdmissionJourneyFinishedEvent.name,
          this._dispatcher,
        ),
      ],
      journey,
      processor: this._processor,
    });

    // journey.addActionOnEvent(
    //   new SendWelcomeEmailHandler(this._dispatcher),
    //   this._startJourneyEvent.constructor.name,
    // );

    // journey.addActionOnEvent(
    //   new SendDocumentsRequestHandler(this._dispatcher),
    //   AdmissionJourneyWelcomeEmailSendEvent.name,
    // );

    // journey.addActionOnEvent(
    //   new FinishAdmissionJourneyHandler(this._dispatcher),
    //   AdmissionJourneyFinishedEvent.name,
    // );

    return journeyActions;
  }
}

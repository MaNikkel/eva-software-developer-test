import { IEventDispatcher } from '../../../../../adapters/event/dispatcher.event';
import { IEventHandler } from '../../../../../adapters/event/handler.event';
import { AdmissionJourneyFinishedEvent } from '../admission-journey-finished.event';
import { AdmissionJourneyStartedEvent } from '../admission-journey-started.event';

export class SendDocumentsRequestHandler extends IEventHandler<AdmissionJourneyStartedEvent> {
  constructor(eventName: string, private dispatcher: IEventDispatcher) {
    super(eventName);
  }

  handle(event: AdmissionJourneyStartedEvent): void {
    console.log('documents');

    this.dispatcher.notify(new AdmissionJourneyFinishedEvent(event.eventData));
  }
}

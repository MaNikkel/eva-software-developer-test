import { IEventDispatcher } from '../../../../../adapters/event/dispatcher.event';
import { IEventHandler } from '../../../../../adapters/event/handler.event';
import { AdmissionJourneyStartedEvent } from '../admission-journey-started.event';
import { AdmissionJourneyWelcomeEmailSendEvent } from '../admission-journey-welcome-email-send.event';

export class SendWelcomeEmailHandler extends IEventHandler<AdmissionJourneyStartedEvent> {
  constructor(eventName: string, private dispatcher: IEventDispatcher) {
    super(eventName);
  }

  async handle(event: AdmissionJourneyStartedEvent): Promise<void> {
    console.log(event.eventData);

    this.dispatcher.notify(
      new AdmissionJourneyWelcomeEmailSendEvent(event.eventData),
    );
  }
}

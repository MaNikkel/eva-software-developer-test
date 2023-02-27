import { IEventDispatcher } from 'src/adapters/event/dispatcher.event';
import { IEventHandler } from 'src/adapters/event/handler.event';
import { AdmissionJourneyStartedEvent } from '../admission-journey-started.event';
import { AdmissionJourneyWelcomeEmailSendEvent } from '../admission-journey-welcome-email-send.event';

export class SendWelcomeEmailHandler
  implements IEventHandler<AdmissionJourneyStartedEvent>
{
  constructor(private dispatcher: IEventDispatcher) {}

  async handle(event: AdmissionJourneyStartedEvent): Promise<void> {
    console.log(event.eventData);

    this.dispatcher.notify(
      new AdmissionJourneyWelcomeEmailSendEvent(event.eventData),
    );
  }
}

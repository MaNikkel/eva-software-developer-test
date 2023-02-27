import { IEventDispatcher } from 'src/adapters/event/dispatcher.event';
import { IEventHandler } from 'src/adapters/event/handler.event';
import { AdmissionJourneyStartedEvent } from '../admission-journey-started.event';

export class SendDocumentsRequestHandler
  implements IEventHandler<AdmissionJourneyStartedEvent>
{
  constructor(private dispatcher: IEventDispatcher) {}

  handle(event: AdmissionJourneyStartedEvent): void {
    console.log('documents');
  }
}

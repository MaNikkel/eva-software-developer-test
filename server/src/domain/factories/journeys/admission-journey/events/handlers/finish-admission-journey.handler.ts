import { IEventDispatcher } from '../../../../../../adapters/event/dispatcher.event';
import { IEventHandler } from '../../../../../../adapters/event/handler.event';
import { AdmissionJourneyStartedEvent } from '../admission-journey-started.event';

export class FinishAdmissionJourneyHandler extends IEventHandler<AdmissionJourneyStartedEvent> {
  constructor(eventName: string, private dispatcher: IEventDispatcher) {
    super(eventName);
  }

  handle(event: AdmissionJourneyStartedEvent): void {
    console.log('finish journey');
  }
}

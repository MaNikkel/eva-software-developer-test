import { EmployeeData } from '../../../entities/employee.entity';
import { IEvent } from '../../../../adapters/event/event';

export class AdmissionJourneyWelcomeEmailSendEvent implements IEvent {
  dataTimeOccurred: Date;
  eventData: EmployeeData;

  constructor(data: EmployeeData) {
    this.eventData = data;
    this.dataTimeOccurred = new Date();
  }
}
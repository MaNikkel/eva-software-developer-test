import { randomUUID } from 'crypto';
import { Journey } from '../value-objects/journey.valueobject';

export interface EmployeeData {
  id?: string;
  startDate?: Date;
  name: string;
  registrationNumber: string;
}

export class Employee {
  private _id;
  private _name: string;
  private _registrationNumber: string;
  private _journey?: Journey;
  private _startDate?: Date;

  constructor({ name, registrationNumber, id, startDate }: EmployeeData) {
    this._id = id ?? randomUUID();
    this._name = name;
    this._registrationNumber = registrationNumber;
    this._startDate = startDate;
  }

  get name(): string {
    return this._name;
  }

  get registrationNumber(): string {
    return this._registrationNumber;
  }

  get id(): string {
    return this._id;
  }

  get journey(): Journey | undefined {
    return this._journey;
  }

  get startDate() {
    return this._startDate;
  }

  public defineStartDate(date: Date) {
    this._startDate = date;
  }

  public linkJourney(journey: Journey): void {
    this._journey = journey;
  }
}

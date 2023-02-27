import { randomUUID } from 'crypto';
import { Journey } from './journey.entity';

interface EmployeeProps {
  id?: string;
  name: string;
  registrationNumber: string;
}

export class Employee {
  private _id;
  private _name: string;
  private _registrationNumber: string;
  private _journey?: Journey;

  constructor({ name, registrationNumber, id }: EmployeeProps) {
    this._id = randomUUID() ?? id;
    this._name = name;
    this._registrationNumber = registrationNumber;
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

  public linkJourney(journey: Journey): void {
    this._journey = journey;
  }
}

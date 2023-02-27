import { randomUUID } from 'crypto';

interface EmployeeProps {
  id?: string;
  name: string;
  registrationNumber: string;
}

export class Employee {
  private _id;
  private _name: string;
  private _registrationNumber: string;

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
}

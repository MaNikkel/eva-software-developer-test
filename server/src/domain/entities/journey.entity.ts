import { randomUUID } from 'crypto';

interface JourneyProps {
  id?: string;
  name: string;
}

export class Journey {
  private _name: string;
  private _id: string;

  constructor({ name, id }: JourneyProps) {
    this._id = randomUUID() ?? id;
    this._name = name;
  }

  get name() {
    return this._name;
  }
}

import { randomUUID } from 'crypto';
import { IEvent } from '../../adapters/event/event';
import { IEventDispatcher } from '../../adapters/event/dispatcher.event';
import { IEventHandler } from '../../adapters/event/handler.event';

interface JourneyProps {
  slug: string;
  name: string;

  dispatcher: IEventDispatcher;
  startEvent: IEvent;
}

export class Journey {
  private _slug: string;
  private _name: string;
  private _dispatcher: IEventDispatcher;
  private _startEvent: IEvent;

  constructor({ slug, startEvent, dispatcher, name }: JourneyProps) {
    this._slug = slug;
    this._name = name;
    this._dispatcher = dispatcher;
    this._startEvent = startEvent;
  }

  get slug() {
    return this._slug;
  }

  get name() {
    return this._name;
  }

  start() {
    this._dispatcher.notify(this._startEvent);
  }
}

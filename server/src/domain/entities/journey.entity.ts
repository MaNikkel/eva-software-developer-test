import { randomUUID } from 'crypto';
import { IEvent } from '../../adapters/event/event';
import { IEventDispatcher } from '../../adapters/event/dispatcher.event';
import { IEventHandler } from '../../adapters/event/handler.event';

interface JourneyProps {
  id?: string;
  name: string;
  dispatcher: IEventDispatcher;
  startEvent: IEvent;
}

export class Journey {
  private _name: string;
  private _id: string;
  private _dispatcher: IEventDispatcher;
  private _startEvent: IEvent;

  constructor({ name, id, startEvent, dispatcher }: JourneyProps) {
    this._id = randomUUID() ?? id;
    this._name = name;
    this._dispatcher = dispatcher;
    this._startEvent = startEvent;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  addActionOnEvent(action: IEventHandler, eventName: string) {
    this._dispatcher.register(eventName, action);
  }

  start() {
    this._dispatcher.notify(this._startEvent);
  }

  clearActions() {
    this._dispatcher.unregisterAll();
  }
}

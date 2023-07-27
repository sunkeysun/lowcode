/**
 * drop
 */

import { EngineEvent } from './EngineEvent';

export class DropEvent extends EngineEvent{
  static eventName = 'engine:drop'
}

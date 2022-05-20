import { Item } from '../models';

import { DefaultRule, DefaultRuleOptions } from './default-rule';

export interface ScheduleDelta {
  min: number;
  max: number;
  delta: number;
}

export interface ScheduleRuleOptions extends Omit<DefaultRuleOptions, 'qualityPreDelta' | 'qualityPostDelta'> {
  deltas: ScheduleDelta[];
}

export class ScheduleRule extends DefaultRule {
  protected deltas: ScheduleDelta[];
  protected expiresAfter: number;

  constructor(options?: ScheduleRuleOptions) {
    super(options);

    this.deltas = options.deltas;
  }

  protected qualityUpdate(item: Item) {
    const schedule = this.findSchedule(item.sellIn);

    if (schedule?.length) item.quality += schedule[0].delta;
  }

  protected findSchedule(sellIn: number) {
    return this.deltas.filter((schedule) => sellIn >= schedule.min && sellIn <= schedule.max);
  }
}

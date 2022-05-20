import { StringDictionary } from '@medunham/common';

import { DefaultRule, ScheduleRule } from './rules';
import { Item, AGED_CHEESE, BACKSTAGE_PASS, CONJURED_ITEM, LEGENDARY_MACE } from './models';

export class GildedRose {
  private defaultRule: DefaultRule;
  private productRules: StringDictionary<DefaultRule>;

  constructor(public items: Item[] = []) {
    this.items = items;

    this.defaultRule = new DefaultRule({ qualityPreDelta: -1, qualityPostDelta: -2 });

    this.productRules = {};
    this.productRules[AGED_CHEESE] = new DefaultRule({ qualityPreDelta: 1, qualityPostDelta: 2 });
    this.productRules[CONJURED_ITEM] = new DefaultRule({ qualityPreDelta: -2, qualityPostDelta: -4 });

    this.productRules[LEGENDARY_MACE] = new DefaultRule({
      sellInDelta: 0,
      qualityPostDelta: 0,
      qualityPreDelta: 0,
      qualityMax: 80,
    });

    this.productRules[BACKSTAGE_PASS] = new ScheduleRule({
      deltas: [
        { min: 10, max: Number.MAX_SAFE_INTEGER, delta: 1 },
        { min: 5, max: 9, delta: 2 },
        { min: 0, max: 4, delta: 3 },
        { min: Number.MIN_SAFE_INTEGER, max: -1, delta: Number.MAX_SAFE_INTEGER * -1 },
      ],
    });
  }

  updateQuality() {
    this.items.forEach((item) => (this.productRules[item.name] || this.defaultRule).update(item));
  }
}

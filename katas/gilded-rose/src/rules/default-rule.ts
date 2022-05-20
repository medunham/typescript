import { OptionHelper } from '@medunham/common';

import { Item } from '../models';

export interface DefaultRuleOptions {
  sellInDelta?: number;
  qualityMin?: number;
  qualityMax?: number;
  qualityPreDelta?: number;
  qualityPostDelta?: number;
}

export class DefaultRule {
  protected sellInDelta: number;
  protected qualityMin: number;
  protected qualityMax: number;
  protected qualityPreDelta: number;
  protected qualityPostDelta: number;

  constructor(options?: DefaultRuleOptions) {
    this.sellInDelta = OptionHelper.NumberOption(options?.sellInDelta, -1);
    this.qualityMin = OptionHelper.NumberOption(options?.qualityMin, 0);
    this.qualityMax = OptionHelper.NumberOption(options?.qualityMax, 50);
    this.qualityPreDelta = OptionHelper.NumberOption(options?.qualityPreDelta, -1);
    this.qualityPostDelta = OptionHelper.NumberOption(options?.qualityPostDelta, -2);
  }

  public update(item: Item): Item {
    this.sellInUpdate(item);

    this.qualityUpdate(item);
    this.qualityLimit(item);

    return item;
  }

  protected sellInUpdate(item: Item) {
    item.sellIn += this.sellInDelta;
  }

  protected qualityUpdate(item: Item) {
    item.quality += item.sellIn < 0 ? this.qualityPostDelta : this.qualityPreDelta;
  }

  protected qualityLimit(item: Item) {
    if (item.quality < this.qualityMin) item.quality = this.qualityMin;
    if (item.quality > this.qualityMax) item.quality = this.qualityMax;
  }
}

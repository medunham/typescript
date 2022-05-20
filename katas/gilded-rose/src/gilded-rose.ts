import { Item, AGED_CHEESE, BACKSTAGE_PASS, CONJURED_ITEM, LEGENDARY_MACE } from './models';

export class GildedRose {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != AGED_CHEESE && this.items[i].name != BACKSTAGE_PASS) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != LEGENDARY_MACE) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == BACKSTAGE_PASS) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }

      if (this.items[i].name == CONJURED_ITEM && this.items[i].quality > 0) {
        this.items[i].quality = this.items[i].quality - 1;
      }

      if (this.items[i].name != LEGENDARY_MACE) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != AGED_CHEESE) {
          if (this.items[i].name != BACKSTAGE_PASS) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != LEGENDARY_MACE) {
                this.items[i].quality = this.items[i].quality - 1;
                if (this.items[i].name == CONJURED_ITEM && this.items[i].quality > 0) {
                  this.items[i].quality = this.items[i].quality - 1;
                }
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

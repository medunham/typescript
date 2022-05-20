import { GildedRose } from './gilded-rose';
import { Item, AGED_CHEESE, BACKSTAGE_PASS, CONJURED_ITEM, LEGENDARY_MACE } from './models';

// const pass = new Item('Backstage passes to a TAFKAL80ETC concert', 1, 1);
// const mace = new Item('Sulfuras, Hand of Ragnaros', 5, 5);
// const other = new Item('Other', 20, 20);

describe('Gilded Rose', () => {
  let items: Item[];

  beforeEach(() => {
    items = [new Item('example', 10, 10)];
  });

  describe('when constructing', () => {
    it('defaults the items property', () => {
      const job = new GildedRose();
      expect(job.items).toEqual([]);
    });

    it('sets the items property', () => {
      const job = new GildedRose(items);
      expect(job.items).toEqual(items);
    });
  });

  describe('when updating', () => {
    let job: GildedRose;
    let item: Item;

    beforeEach(() => {
      job = new GildedRose();
    });

    describe('a backstage pass', () => {
      describe('with more than 10 days until the sellIn date', () => {
        beforeEach(() => {
          item = new Item(BACKSTAGE_PASS, 11, 10);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('decreases the sellIn by 1', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn - 1);
        });

        it('increases the quality by 1', () => {
          expect(job.items[0].quality).toEqual(item.quality + 1);
        });
      });

      describe('with between 5 and 10 days until the sellIn date', () => {
        beforeEach(() => {
          item = new Item(BACKSTAGE_PASS, 9, 10);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('decreases the sellIn by 1', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn - 1);
        });

        it('increases the quality by 2', () => {
          expect(job.items[0].quality).toEqual(item.quality + 2);
        });
      });

      describe('with between 1 and 5 days left until the sellIn date', () => {
        beforeEach(() => {
          item = new Item(BACKSTAGE_PASS, 4, 10);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('decreases the sellIn by 1', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn - 1);
        });

        it('increases the quality by 3', () => {
          expect(job.items[0].quality).toEqual(item.quality + 3);
        });
      });

      describe('is past the sellIn date', () => {
        beforeEach(() => {
          item = new Item(BACKSTAGE_PASS, 0, 10);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('decreases the sellIn by 1', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn - 1);
        });

        it('sets the quality to zero', () => {
          expect(job.items[0].quality).toEqual(0);
        });
      });

      describe('and the quality is 50', () => {
        beforeEach(() => {
          item = new Item(BACKSTAGE_PASS, 4, 50);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('decreases the sellIn by 1', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn - 1);
        });

        it('does not increase the quality any futher', () => {
          expect(job.items[0].quality).toEqual(50);
        });
      });
    });

    describe('aged brie', () => {
      describe('and the sellIn date is in the future', () => {
        beforeEach(() => {
          item = new Item(AGED_CHEESE, 4, 20);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('decreases the sellIn by 1', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn - 1);
        });

        it('increases the quality by 1', () => {
          expect(job.items[0].quality).toEqual(item.quality + 1);
        });
      });

      describe('and the sellIn date has passed', () => {
        beforeEach(() => {
          item = new Item(AGED_CHEESE, 0, 20);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('decreases the sellIn by 1', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn - 1);
        });

        it('increases the quality by 2', () => {
          expect(job.items[0].quality).toEqual(item.quality + 2);
        });
      });

      describe('and the quality is 50', () => {
        beforeEach(() => {
          item = new Item(AGED_CHEESE, 10, 50);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('decreases the sellIn by 1', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn - 1);
        });

        it('does not increase the quality any futher', () => {
          expect(job.items[0].quality).toEqual(50);
        });
      });
    });

    describe('sulfuras, hand of ragnaros', () => {
      describe('and the sellIn date is in the future', () => {
        beforeEach(() => {
          item = new Item(LEGENDARY_MACE, 4, 80);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('sellIn does not change', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn);
        });

        it('quality does not change', () => {
          expect(job.items[0].quality).toEqual(item.quality);
        });
      });

      describe('and the sellIn date has passed', () => {
        beforeEach(() => {
          item = new Item(LEGENDARY_MACE, -1, 80);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('sellIn does not change', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn);
        });

        it('quality does not change', () => {
          expect(job.items[0].quality).toEqual(item.quality);
        });
      });
    });

    describe('conjured items', () => {
      describe('and the sellIn date is in the future', () => {
        beforeEach(() => {
          item = new Item(CONJURED_ITEM, 4, 20);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('decreases the sellIn by 1', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn - 1);
        });

        it('decreases the quality by 2', () => {
          expect(job.items[0].quality).toEqual(item.quality - 2);
        });
      });

      describe('and the sellIn date has passed', () => {
        beforeEach(() => {
          item = new Item(CONJURED_ITEM, -1, 20);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('decreases the sellIn by 1', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn - 1);
        });

        it('decreases the quality by 4', () => {
          expect(job.items[0].quality).toEqual(item.quality - 4);
        });
      });

      describe('and the quality is 0', () => {
        beforeEach(() => {
          item = new Item('other', 4, 0);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('decreases the sellIn by 1', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn - 1);
        });

        it('quality does not change', () => {
          expect(job.items[0].quality).toEqual(item.quality);
        });
      });
    });

    describe('other items', () => {
      describe('and the sellIn date is in the future', () => {
        beforeEach(() => {
          item = new Item('other', 4, 20);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('decreases the sellIn by 1', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn - 1);
        });

        it('decreases the quality by 1', () => {
          expect(job.items[0].quality).toEqual(item.quality - 1);
        });
      });

      describe('and the sellIn date has passed', () => {
        beforeEach(() => {
          item = new Item('other', -1, 20);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('decreases the sellIn by 1', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn - 1);
        });

        it('decreases the quality by 2', () => {
          expect(job.items[0].quality).toEqual(item.quality - 2);
        });
      });

      describe('and the quality is 0', () => {
        beforeEach(() => {
          item = new Item('other', 4, 0);
          job = new GildedRose([{ ...item }]);
          job.updateQuality();
        });

        it('decreases the sellIn by 1', () => {
          expect(job.items[0].sellIn).toEqual(item.sellIn - 1);
        });

        it('quality does not change', () => {
          expect(job.items[0].quality).toEqual(item.quality);
        });
      });
    });
  });
});

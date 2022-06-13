import { OptionHelper } from './option-helper';

describe('option helper', () => {
  describe('when', () => {
    describe('reading boolean options', () => {
      describe('and the value is defined', () => {
        it('returns the boolean value', () => {
          expect(OptionHelper.BooleanOption(true, true)).toEqual(true);
          expect(OptionHelper.BooleanOption(false, true)).toEqual(false);
        });
      });

      describe('and the value is not a boolean', () => {
        it('returns the default value', () => {
          expect(OptionHelper.BooleanOption('true', false)).toEqual(false);
          expect(OptionHelper.BooleanOption(undefined, true)).toEqual(true);
        });
      });
    });

    describe('reading number options', () => {
      describe('and the value is a number', () => {
        it('returns the value', () => {
          expect(OptionHelper.NumberOption(10, 0)).toEqual(10);
          expect(OptionHelper.NumberOption(1.1, 0)).toEqual(1.1);
        });
      });

      describe('and the value is a not a number', () => {
        it('returns the default value', () => {
          expect(OptionHelper.NumberOption('10', 0)).toEqual(0);
          expect(OptionHelper.NumberOption(undefined, NaN)).toEqual(NaN);
        });
      });
    });
  });
});

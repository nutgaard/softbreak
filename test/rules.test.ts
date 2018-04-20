import * as Rules from './../src/rules';

describe('Rules', () => {
  describe('splitLongWords', () => {
    it('should respect wordpadding with small words', () => {
      expect(Rules.splitLongWords(3)('mitt')).toEqual([]);
    });

    it('should respect wordpadding', () => {
      expect(Rules.splitLongWords(2)('mitt')).toEqual([2]);
    });

    it('should respect wordpadding with long words', () => {
      expect(Rules.splitLongWords(2)('mittermitt')).toEqual([2, 3, 4, 5, 6, 7, 8]);
    });
  });

  describe('fixedRules', () => {
    it('should return start', () => {
      expect(Rules.startOfText('hello')).toEqual([0]);
    });

    it('should return end', () => {
      expect(Rules.endOfText('hello')).toEqual([5]);
    });

    it('should return middle', () => {
      expect(Rules.middleOfText('hello')).toEqual([2]);
      expect(Rules.middleOfText('hellos')).toEqual([3]);
    });
  });
});

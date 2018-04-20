import * as Utils from './../src/internal-utils';
import { Rule } from '../src/softbreak';

describe('InternalUtils', () => {
  const startRule: Rule = (text: string) => [0];
  const endRule: Rule = (text: string) => [text.length];
  const midRule: Rule = (text: string) => [text.length >> 1];

  describe('indexesOf', () => {
    it('should return empty array for no matches', () => {
      expect(Utils.indexesOf('abba', '\\s')).toEqual([]);
    });

    it('should return all indices otherwise', () => {
      expect(Utils.indexesOf('abba', 'a')).toEqual([0, 3]);
    });
  });

  describe('flatten', () => {
    it('should flatten to arrays', () => {
      expect(Utils.flatten([0, 1], [2, 3])).toEqual([0, 1, 2, 3]);
    });
  });

  describe('removeDuplicates', () => {
    it('should add element if list is empty', () => {
      expect(Utils.removeDuplicates([], 2)).toEqual([2]);
    });

    it('should add element if previous element not equal to current', () => {
      expect(Utils.removeDuplicates([1], 2)).toEqual([1, 2]);
    });

    it('should skip element if previous element equal to current', () => {
      expect(Utils.removeDuplicates([1, 2], 2)).toEqual([1, 2]);
    });
  });

  describe('findWordInsertIndices', () => {
    it('should return empty array when there are no wordRules', () => {
      const numbers = Utils.findWordInsertIndices([], 'a text here');
      expect(numbers.length).toBe(0);
    });

    it('should return merged indices', () => {
      const numbers = Utils.findWordInsertIndices([startRule, startRule, endRule], 'text here');

      expect(numbers).toEqual([0, 0, 4, 5, 5, 9]);
    });
  });

  describe('findInsertIndices', () => {
    it('should get wordIndices sort an remove duplicates', () => {
      const numbers = Utils.findInsertIndices(
        [endRule, startRule, startRule],
        [],
        'text here-and-there-ish'
      );

      expect(numbers).toEqual([0, 4, 5, 23]);
    });

    it('should get merge all rules', () => {
      const numbers = Utils.findInsertIndices(
        [endRule, startRule, startRule],
        [midRule],
        'text here-and-there-ish'
      );

      expect(numbers).toEqual([0, 4, 5, 11, 23]);
    });
  });

  describe('insertCharAt', () => {
    it('should do nothing if out-of-bound', () => {
      expect(Utils.insertCharAt('A', -1, 'My Text')).toBe('My Text');
      expect(Utils.insertCharAt('A', 8, 'My Text')).toBe('My Text');
      expect(Utils.insertCharAt('A', 100, 'My Text')).toBe('My Text');
    });

    it('should do insert char', () => {
      expect(Utils.insertCharAt('A', 0, 'My Text')).toBe('AMy Text');
      expect(Utils.insertCharAt('A', 7, 'My Text')).toBe('My TextA');
      expect(Utils.insertCharAt('A', 2, 'My Text')).toBe('MyA Text');
    });
  });

  describe('insertChars', () => {
    it('should do nothing if empty', () => {
      expect(Utils.insertChars('A', [], 'My Text')).toBe('My Text');
    });

    it('should do insert at start', () => {
      expect(Utils.insertChars('A', [0, 1], 'My Text')).toBe('AMAy Text');
    });

    it('should do insert at end', () => {
      expect(Utils.insertChars('A', [6, 7, 8], 'My Text')).toBe('My TexAtA');
    });
  });
});

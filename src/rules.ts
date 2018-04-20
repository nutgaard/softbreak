import { Rule } from './softbreak';

export function splitLongWords(wordPadding: number): Rule {
  return (text: string) => {
    if (text.length < 2 * wordPadding) {
      return [];
    }

    return new Array(text.length + 1 - 2 * wordPadding).fill(0).map((_, i) => i + wordPadding);
  };
}

export function startOfText(text: string): number[] {
  return [0];
}

export function endOfText(text: string): number[] {
  return [text.length];
}

export function middleOfText(text: string): number[] {
  return [text.length >> 1];
}

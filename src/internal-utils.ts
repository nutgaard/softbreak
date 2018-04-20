import { Config, Rule } from './softbreak';

export function indexesOf(text: string, regexpPattern: string): number[] {
  const indexes = [];
  const regex = new RegExp(regexpPattern, 'g');

  while (true) {
    const result = regex.exec(text);
    if (result) {
      indexes.push(result.index);
    } else {
      break;
    }
  }

  return indexes;
}

export function flatten<T>(acc: T[], value: T[]): T[] {
  return [...acc, ...value];
}

export function numericSort(a: number, b: number): number {
  return a - b;
}

export function removeDuplicates<T>(acc: T[], value: T): T[] {
  const previousValue: T | undefined = acc[acc.length - 1];
  if (previousValue === value) {
    return acc;
  } else {
    return [...acc, value];
  }
}

export function findWordInsertIndices(wordRules: Rule[], text: string): number[] {
  let wordInsertIndices: number[] = [];

  if (wordRules.length > 0) {
    const words: string[] = text.split(/\s/);
    const spaceIndices = indexesOf(text, '\\s');
    const wordStart: number[] = [0, ...spaceIndices.map(i => i + 1)];

    wordInsertIndices = words
      .map((word, wordIndex) => {
        return wordRules!
          .map(wordrule => wordrule(word))
          .reduce(flatten, [])
          .map(insertIndex => insertIndex + wordStart[wordIndex]);
      })
      .reduce(flatten, []);
  }

  return wordInsertIndices;
}

export function findInsertIndices(wordRules: Rule[], rules: Rule[], text: string): number[] {
  const wordInsertIndices: number[] = findWordInsertIndices(wordRules, text);
  const insertIndices: number[] = rules.map(rule => rule(text)).reduce(flatten, []);

  return [...wordInsertIndices, ...insertIndices].sort(numericSort).reduce(removeDuplicates, []);
}

export function insertCharAt(char: string, index: number, text: string): string {
  if (index < 0 || index > text.length) {
    return text;
  }
  return text.slice(0, index) + char + text.slice(index);
}

export function insertChars(char: string, indices: number[], text: string): string {
  let offset: number = 0;
  let newText = text;
  for (const index of indices) {
    newText = insertCharAt(char, index + offset, newText);
    offset++;
  }

  return newText;
}

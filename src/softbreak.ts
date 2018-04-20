import { findInsertIndices, insertChars } from './internal-utils';
import * as Rules from './rules';

export type Rule = (input: string) => number[];

export interface Config {
  wordRules?: Rule[];
  rules?: Rule[];
  insertCharacter: string;
}

const DEFAULT_CONFIG: Config = {
  wordRules: [Rules.splitLongWords(3)],
  rules: [],
  insertCharacter: '\u00ad'
};

function internal_softbreak(config: Config, text: string): string {
  const allInsertIndices: number[] = findInsertIndices(
    config.wordRules || [],
    config.rules || [],
    text
  );

  return insertChars(config.insertCharacter, allInsertIndices, text);
}

function softbreak(configOrString: Config | Rule[] | string, optionalText?: string): string {
  if (typeof configOrString === 'string') {
    return internal_softbreak(DEFAULT_CONFIG, configOrString);
  } else if (configOrString instanceof Array && optionalText) {
    return internal_softbreak(
      Object.assign({}, DEFAULT_CONFIG, { wordRules: configOrString }),
      optionalText
    );
  } else if (configOrString instanceof Object && optionalText) {
    return internal_softbreak(configOrString as Config, optionalText);
  } else {
    throw new Error(`Not supported use...`);
  }
}

export default softbreak;
export { Rules };

import { Config, Rule } from '../src/softbreak';
import softbreak from './../src/softbreak';

describe('InternalUtils', () => {
  const startRule: Rule = (text: string) => [0];
  const endRule: Rule = (text: string) => [text.length];
  const midRule: Rule = (text: string) => [text.length >> 1];
  const config: Config = {
    insertCharacter: 'A',
    wordRules: [endRule, startRule],
    rules: [midRule]
  };

  it('should support config object', () => {
    expect(softbreak(config, 'alongwordhere')).toBe('AalongwAordhereA');
  });

  it('should support array of rules', () => {
    expect(softbreak([endRule, startRule], 'alongwordhere')).toBe('\u00adalongwordhere\u00ad');
  });

  it('should have sensible defaults', () => {
    expect(softbreak('alongwordhere')).toBe(
      'alo\u00adn\u00adg\u00adw\u00ado\u00adr\u00add\u00adh\u00adere'
    );
  });

  it('should throw if arguments are wrong', () => {
    expect(() => {
      softbreak(4 as any);
    }).toThrow();
  });
});

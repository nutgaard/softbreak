# Softbreak

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Travis](https://img.shields.io/travis/nutgaard/softbreak.svg)](https://travis-ci.org/nutgaard/softbreak)
[![codecov](https://codecov.io/gh/nutgaard/softbreak/branch/master/graph/badge.svg)](https://codecov.io/gh/nutgaard/softbreak)
[![dependencies Status](https://david-dm.org/nutgaard/softbreak/status.svg)](https://david-dm.org/nutgaard/softbreak)

### Installation

### Result
Long words will get a &shy;-character (default config) inserted into it to signal where the word-break can be.
E.g The word 'strengths' would be converted into 'str­e­n­g­ths', which visually looks the same but actually is 4 characters longer.
```
npm install softbreak --save-dev
```

### Usage 

```javascript
const config: Config = {
    insertCharacter: 'A',
    wordRules: [endRule, startRule],
    rules: [midRule]
  };

softbreak(config, 'alongwordhere');
softbreak([endRule, startRule], 'alongwordhere');
softbreak('alongwordhere');
```

`rules` and `wordRules` implement the same `Rule` which takes a single string, and returns a set of indicies where characters should be inserted.

`rules` receive the whole text, where-as `wordRules` receives a single word at the time. Indices from `wordRules` are automatically adjusted by the words original position. So all rules are interchangable between the two.


#### Types
Full documentation of types can be seen [here](https://www.utgaard.xyz/softbreak/),
or [here](https://github.com/nutgaard/softbreak/blob/master/src/softbreak.ts) if you prefer reading typescript code.


### Tips

* Take a look at the original [readme](https://github.com/alexjoverm/typescript-library-starter/blob/master/README.md);


## Credits

Made using the awesome [typescript library starter](https://github.com/alexjoverm/typescript-library-starter) 


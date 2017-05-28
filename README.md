# wildcard-utils

Work with wildcard values by matching, searching, and filtering values that 
match a given wildcard pattern.

### Installation

```
yarn add wildcard-utils
```

**or**

```
npm install --save wildcard-utils
```


### Simple Example

A simple example using simple string matching against a given wildcard pattern.

```js

import { Wildcard } from 'wildcard-utils'

const system_wildcard = new Wildcard()
  .case(false)
  .pattern('system*')

const isSystemType = type => system_wildcard.match(type)

isSystemType('SYSTEM_OFFLINE')
// true

isSystemType('NETWORK_OFFLINE')
// false

```

### More Examples

```js

import { Wildcard, hasWildcard } from './wildcard-utils'

const examplePatternRegexp = Wildcard.toPattern('ONE*THREE*')
// ^(?=ONE.*?THREE.*?$)

const WC = new Wildcard()

// Setup our Pattern with case insensitive matching also check if the given
// value is a match.
console.log(
  WC.case(false)
    .pattern('ch*')
    .match('CHECK'),
  WC.match({
    'ONE': 'two',
    'CH*': 3
  })
)
// true true

/*
  Check an array, string, or object and return matching values/keys
*/
console.log(
  WC.filter([
    'SYSTEM_CHECK',
    'CHECK_SYSTEM',
    'CHECK_AUTO'
  ])
)
// [ 'CHECK_SYSTEM', 'CHECK_AUTO' ]


/*
  Filter an object using the saved pattern and return a new object with the
  matching keys
*/
console.log(
  WC.filter({
    'CHECK_SYSTEM': {
      value: 'check'
    },
    'TEST_SYSTEM': {
      value: 'test'
    }
  })  
)
// { CHECK_SYSTEM: { value: 'check' } }


/*
  Search the pattern for matching values.  A reversed filter.
*/
console.log(
  WC.pattern({
    'CH*': 'check',
    '*SYSTEM': 'system',
    '*TEST*': 'test'
  }).search('CHECK_SYSTEM')  
)
// { 'CH*': 'check', '*SYSTEM': 'system' }

/*
  Check if a given string, object, or array has a wildcard
*/
console.log(
  WC.hasWildcard(['ONE', 'TWO', 'MY*WILDCARD']),
  WC.hasWildcard({
    foo: 'bar',
    '*az': 'qux'
  }),
  WC.hasWildcard('SY*')
)
// true true true

/*
  Change the pattern at any time
*/
console.log(
  WC.pattern('ONE*THREE*')
    .match('ONE_TWO_THREE_FOUR')
)
// true

```
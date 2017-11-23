# wildcard-utils

Small, Flow-Covered, Zero-Dependency package to work with wildcard (\*) values
by matching, searching, and filtering values that match a given wildcard
pattern.

Values can be `string`, `Array<string>`, `Set<string>`, `{ [key: string]: any
}`. Support for `Map` is also planned in the future.

Reverse filtering is also available to search the above types as patterns
instead of as matches
([see examples](https://github.com/Dash-OS/wildcard-utils/tree/master/examples)).

### BROWSER COMPATIBLE!

---

## Installation

```
yarn add wildcard-utils
```

**or**

```
npm install --save wildcard-utils
```

---

## Flow Coverage

Proudly built with 100% Flow Coverage and exported .flow.js files so your flow
projects will benefit!

We strongly recommend you look over the
[types](https://github.com/Dash-OS/wildcard-utils/tree/master/src/types.js) in
the source. This will give you an idea of how the various pieces of the package
work.

---

## Examples

> This package provides extreme flexibility for searching values for wildcard
> matches. While the example below is simple, you are encouraged to take a look
> at the
> [examples folders](https://github.com/Dash-OS/wildcard-utils/tree/master/examples)
> for examples of the more advanced functionality that is available.

### Simple String Example

A simple example using simple string matching against a given wildcard pattern.

```js
import { Wildcard } from 'wildcard-utils';

const system_wildcard = new Wildcard().case(false).pattern('system*');

const isSystemType = type => system_wildcard.match(type);

isSystemType('SYSTEM_OFFLINE');
// true

isSystemType('NETWORK_OFFLINE');
// false
```

### More Examples

More examples can be seen and tested by checking out the
[examples folders](https://github.com/Dash-OS/wildcard-utils/tree/master/examples)

---

## Exports

There are two ways you can use this package. If you simply wish to use the
simplistic pattern generator that is used to build the `RegExp` values, you can
import from `wildcard-utils/to-pattern`. For the full-featured version, import
the `Wildcard` class directly.

### Common Flow Types

```js
export type Wildcard$ToPatternTypes =
  | string
  | Array<string>
  | Set<string>
  | { [key: string]: * };

export type Wildcard$Config = {
  logic: 'and' | 'or',
  flags: $CharSet<'gimsuy'>,
};
```

### RegExp Generator

```js
declare function toWildcardPattern(
  patterns: Wildcard$ToPatternTypes,
  config?: $Shape<Wildcard$Config>,
): RegExp;
```

```js
import toWildcardPattern from 'wildcard-utils/to-pattern';

const pattern = toWildcardPattern(['ONE*TWO*THREE', 'FOUR*FIVE*SIX'], {
  logic: 'or',
  flags: 'i',
});
```

### Wildcard Class

```js
import Wildcard from 'wildcard-utils';
const WC = new Wildcard();
```

#### `.pattern()`

```js
(pattern: Wildcard$ToPatternTypes, force?: boolean) => Wildcard;
```

#### `.match()`

```js
(data: Wildcard$ToPatternTypes, pattern?: RegExp | Wildcard$ToPatternTypes) =>
  boolean;
```

#### `.filter()`

```js
(data: Wildcard$ToPatternTypes, nomatch: mixed = undefined) =>
  $Matched_DATA_Subset | nomatch;
```

#### `.search()`

> This is a reverse filter where the pattern is searched instead of the `data`

```js
(data: Wildcard$ToPatternTypes, nomatch: mixed = undefined) =>
  $Matched_PATTERN_Subset | nomatch;
```

#### `.has()`

Checks if a Wildcard is present in the given pattern value. If no argument is
provided, it checks the last provided value to `.pattern()`.

```js
(pattern?: Wildcard$ToPatternTypes) => boolean;
```

#### `.logic()`

```js
(logic: 'and' | 'or', compile?: boolean) => Wildcard;
```

#### `.case()`

```js
(match: boolean, compile?: boolean) => Wildcard;
```

#### `.reset()`

```js
() => Wildcard;
```

---

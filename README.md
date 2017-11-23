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

## Flow Coverage

Proudly built with 100% Flow Coverage and exported .flow.js files so your flow
projects will benefit!

We strongly recommend you look over the
[types](https://github.com/Dash-OS/wildcard-utils/tree/master/src/types.js) in
the source. This will give you an idea of how the various pieces of the package
work.

## Examples

### Simple Example

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

## Exports

There are two ways you can use this package. If you simply wish to use the
simplistic pattern generator that is used to build the `RegExp` values, you can
import from `wildcard-utils/to-pattern`. For the full-featured version, import
the `Wildcard` class directly.

/* @flow */
import toWildcardPattern from 'wildcard-utils/to-pattern';
import type { Wildcard$ToPatternTypes, Wildcard$Config } from './types';

import { isObjLiteral, hasWildcard } from './utils';

class Wildcard {
  config: Wildcard$Config;
  _pattern: RegExp;
  _raw: Wildcard$ToPatternTypes;
  static toPattern = toWildcardPattern;

  constructor(pattern?: Wildcard$ToPatternTypes) {
    this.config = {
      logic: 'and',
      flags: '',
    };
    if (pattern) this.pattern(pattern);
  }

  re = (pattern: Wildcard$ToPatternTypes) => this.pattern(pattern);

  pattern(pattern: Wildcard$ToPatternTypes, force?: boolean) {
    if (this._raw !== pattern || force) {
      this._raw = pattern;
      this._pattern = toWildcardPattern(pattern, this.config);
    }
    return this;
  }

  search(pattern: Wildcard$ToPatternTypes, nomatch: mixed = undefined) {
    return this.filterReversed(pattern, nomatch);
  }

  match(
    data: Wildcard$ToPatternTypes,
    pattern?: RegExp | Wildcard$ToPatternTypes = this._pattern,
  ) {
    if (!(pattern instanceof RegExp)) {
      pattern = toWildcardPattern(pattern, this.config);
    }
    if (typeof data === 'string') {
      return pattern.test(data);
    } else if (Array.isArray(data) || data instanceof Set) {
      return [...data].some(el => this.match(el, pattern));
    } else if (isObjLiteral(data)) {
      return this.match(Object.keys(data), pattern);
    }
    return false;
  }

  filter<D: Wildcard$ToPatternTypes>(data: D, nomatch: mixed = undefined) {
    if (typeof data === 'string') {
      if (this.match(data)) {
        return data;
      }
    } else if (Array.isArray(data)) {
      return data.filter(el => this.match(el));
    } else if (isObjLiteral(data)) {
      return Object.keys(data).reduce((p, c) => {
        if (this.match(c)) {
          // TODO: Flow Failure
          // $FlowIgnore
          p[c] = data[c];
        }
        return p;
      }, {});
    } else {
      return nomatch;
    }
  }

  filterReversed(data: Wildcard$ToPatternTypes, nomatch: mixed = undefined) {
    if (Array.isArray(this._raw)) {
      return this._raw.filter(x => this.match(data, x));
    } else if (isObjLiteral(this._raw)) {
      return Object.keys(this._raw).reduce((p, c) => {
        if (this.match(data, c)) {
          // TODO: Flow Failure
          // $FlowIgnore
          p[c] = this._raw[c];
        }
        return p;
      }, {});
    }
    return nomatch;
  }

  has(pattern?: Wildcard$ToPatternTypes = this._raw) {
    return hasWildcard(pattern);
  }

  logic(logic: 'and' | 'or', compile?: boolean) {
    this.config.logic = logic;
    if (compile) {
      this.pattern(this._raw, true);
    }
    return this;
  }

  case(match: boolean, compile?: boolean) {
    if (match && this.config.flags.includes('i')) {
      this.config.flags = this.config.flags.replace('i', '');
    } else if (!match && !this.config.flags.includes('i')) {
      this.config.flags += 'i';
    }
    if (compile) {
      this.pattern(this._raw, true);
    }
    return this;
  }

  reset() {
    this.config = { logic: 'and', flags: '' };
    // Flow Hack
    delete this._pattern;
    delete this._raw;
    return this;
  }
}

export { Wildcard, hasWildcard };

export default Wildcard;

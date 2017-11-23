/* @flow */
import type {
  Wildcard$ToPatternTypes,
  Wildcard$Config,
} from 'wildcard-utils/lib/types';

import { isObjLiteral } from 'wildcard-utils/lib/utils';

const defaultConfig: Wildcard$Config = {
  logic: 'and',
  flags: '',
};

function toWildcardPattern(
  _patterns: Wildcard$ToPatternTypes,
  _config?: $Shape<Wildcard$Config>,
): RegExp {
  let patterns: Array<string>;
  const config = {
    ...defaultConfig,
    ...(_config || {}),
  };
  if (typeof _patterns === 'string') {
    patterns = [_patterns];
  } else if (Array.isArray(_patterns) || _patterns instanceof Set) {
    patterns = [..._patterns];
  } else if (isObjLiteral(_patterns)) {
    patterns = Object.keys(_patterns);
  } else {
    throw new Error('Unknown Patterns Type');
  }

  let compiledRE = '';
  patterns.forEach(pattern => {
    if (compiledRE !== '' && config.logic === 'or') {
      compiledRE += '|';
    }
    const re = [];

    if (pattern.startsWith('!')) {
      re.push('(?!^');
      pattern = pattern.substr(1);
    } else {
      re.push('(?=^');
    }

    re.push(pattern.replace(/(?:(?!\.)\*(?!\?))/g, '.*?'), '$)');
    compiledRE += re.join('');
  });

  return new RegExp(compiledRE, config.flags);
}

export default toWildcardPattern;

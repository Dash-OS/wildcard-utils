/* @flow */
import type { Wildcard$ToPatternTypes } from './types';

export function isObjLiteral(o: mixed): boolean %checks {
  return (
    o !== null &&
    typeof o === 'object' &&
    !Array.isArray(o) &&
    typeof o !== 'function'
  );
}

export function hasWildcard(pattern: Wildcard$ToPatternTypes): boolean {
  if (typeof pattern === 'string') {
    return pattern.includes('*');
  } else if (Array.isArray(pattern)) {
    return pattern.some(hasWildcard);
  } else if (isObjLiteral(pattern)) {
    return Object.keys(pattern).some(hasWildcard);
  }
  return false;
}

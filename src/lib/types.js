/* @flow */

export type Wildcard$RegExpFlags = $CharSet<'gimsuy'>;

export type Wildcard$ToPatternTypes = mixed;

export type Wildcard$Config = {
  logic: 'and' | 'or',
  flags: Wildcard$RegExpFlags,
};

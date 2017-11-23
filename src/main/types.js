/* @flow */

export type Wildcard$RegExpFlags = $CharSet<'gimsuy'>;

export type Wildcard$ToPatternTypes =
  | string
  | Array<string>
  | Set<string>
  | { [key: string]: * };

export type Wildcard$Config = {
  logic: 'and' | 'or',
  flags: Wildcard$RegExpFlags,
};

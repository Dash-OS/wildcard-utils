/* @flow */

export type Wildcard$ToPatternTypes =
  | string
  | Array<string>
  | Set<string>
  | { [key: string]: * };

export type Wildcard$Config = {
  logic: 'and' | 'or',
  flags: string,
};

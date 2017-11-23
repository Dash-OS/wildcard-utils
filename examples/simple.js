/* @flow */
import Wildcard from 'wildcard-utils';
import toWildcardPattern from 'wildcard-utils/to-pattern';

import { log } from '../utils/log';

log('-------------------------------------');

const WC = new Wildcard();

function patternMatchExample() {
  log('Example:  Pattern Match Example');
  log('Matching: system* (nocase)');
  const wc = new Wildcard().case(false).pattern('system*');

  log('SYSTEM_ONLINE: ', wc.match('SYSTEM_OFFLINE'));

  log('ONLINE_SYSTEM: ', wc.match('ONLINE_SYSTEM'));

  log('NETWORK_OFFLINE: ', wc.match('NETWORK_OFFLINE'));
}

function toPatternExample() {
  const pattern = ['ONE*THREE*', 'FOUR*FIVE*'];
  log('Example:   To Pattern Example');
  log('Matching: ', pattern);
  log(toWildcardPattern(pattern));
  log('Or Logic:');
  log(toWildcardPattern(pattern, { logic: 'or' }));
}

function quickCheckExample() {
  log('Example:   Quick Checks');
  log('Matching: ', 'CHECK against ch* (nocase)');
  log(
    WC.case(false)
      .pattern('ch*')
      .match('CHECK'),
  );
  // true
  log(
    WC.match({
      ONE: 'two',
      'CH*': 3,
    }),
  );
  // true
}

function filterExample() {
  // uses the pattern established in quickCheckExample
  log('Example:   Filter Value');
  log('Matching: ', 'ch* (nocase)');

  const values = [
    ['SYSTEM_CHECK', 'CHECK_SYSTEM', 'CHECK_AUTO'],
    // [ 'CHECK_SYSTEM', 'CHECK_AUTO' ]
    {
      CHECK_SYSTEM: {
        value: 'woo!',
      },
      TEST_SYSTEM: {
        value: 'test',
      },
    },
    // { CHECK_SYSTEM: { value: 'woo!' } }
  ];

  values.forEach(value => {
    log('Filter Value: ', value);
    log('Result: ', WC.filter(value));
  });
}

function reverseFilterExample() {
  log('Example:   Reverse Filter (Search)');
  log('Searching for: ', 'CHECK_SYSTEM matches (nocase)');
  log('Check Object: ', {
    'CH*': 'check',
    '*SYSTEM': 'system',
    '*TEST*': 'test',
  });
  log(
    WC.pattern({
      'CH*': 'check',
      '*SYSTEM': 'system',
      '*TEST*': 'test',
    }).search('CHECK_SYSTEM'),
  );
}

function changePatternExample() {
  log('Example:   Changing Pattern');
  log('Matching: ', 'ONE*THREE* (case sensitive) against ONE_TWO_THREE_FOUR');
  log(
    WC.pattern('ONE*THREE*')
      .case(true)
      .match('ONE_TWO_THREE_FOUR'),
  );
}

function wildcardChecks() {
  log('Example: Has Wildcard Checks');
  const values = [
    ['ONE', 'TWO', 'MY*WILDCARD'],
    {
      foo: 'bar',
      '*az': 'qux',
    },
    'SY*',
  ];
  values.forEach(value => {
    log('Has Wildcard? ', value);
    log(WC.has(value));
  });
}

function patternLogic() {
  log('Example:   OR Logic (case sensitive)');
  WC.case(true);
  const values = [
    [
      'ONE_TWO_THREE',
      'FOUR_FIVE_SIX_SEVEN',
      'ONE_TWO_THREE_FOUR_FIVE_SIX_SEVEN',
      'one_two_three_four_five_six_seven',
    ],
    {
      ONE_TWO_THREE: true,
      FIVE_SIX_SEVEN: true,
      ONE_TWO_THREE_FOUR_FIVE_SIX_SEVEN: true,
      one_two_three_four_five_six_seven: true,
    },
  ];
  values.forEach(value => {
    log('OR Match: ', value);
    log(
      'Result: ',
      WC.logic('or')
        .pattern(['ONE*THREE*', '*SIX*SEVEN'])
        .filter(value),
    );
  });
}

patternMatchExample();

log('-------------------------------------');

toPatternExample();

log('-------------------------------------');

quickCheckExample();

log('-------------------------------------');

filterExample();

log('-------------------------------------');

reverseFilterExample();

log('-------------------------------------');

changePatternExample();

log('-------------------------------------');

wildcardChecks();

log('-------------------------------------');

patternLogic();

log('-------------------------------------');

/*

+4.0645    1224084498.153499    -------------------------------------

+1.5041    1224084499.657619    Example:  Pattern Match Example
+0.1243    1224084499.781929    Matching: system* (nocase)
+0.4658    1224084500.247733    SYSTEM_ONLINE:  true
+0.0567    1224084500.304466    ONLINE_SYSTEM:  false
+0.0516    1224084500.356085    NETWORK_OFFLINE:  false
+0.0212    1224084500.377313    -------------------------------------

+0.0862    1224084500.463533    Example:   To Pattern Example
+0.0290    1224084500.492513    Matching:  [ 'ONE*THREE*', 'FOUR*FIVE*' ]
+1.3795    1224084501.872053    /(?=^ONE.*?THREE.*?$)(?=^FOUR.*?FIVE.*?$)/
+0.0789    1224084501.950965    Or Logic:
+0.0745    1224084502.025451    /(?=^ONE.*?THREE.*?$)|(?=^FOUR.*?FIVE.*?$)/

+0.0475    1224084502.07297     -------------------------------------

+0.0903    1224084502.163257    Example:   Quick Checks
+0.0286    1224084502.191868    Matching:  CHECK against ch* (nocase)
+0.0747    1224084502.266532    true
+0.1818    1224084502.448351    true

+0.0526    1224084502.50096     -------------------------------------

+0.0946    1224084502.595538    Example:   Filter Value
+0.0387    1224084502.63427     Matching:  ch* (nocase)
+0.0690    1224084502.703225    Filter Value:
  [ 'SYSTEM_CHECK', 'CHECK_SYSTEM', 'CHECK_AUTO' ]
+0.2025    1224084502.905739    Result:
  [ 'CHECK_SYSTEM', 'CHECK_AUTO' ]
+0.0880    1224084502.993765    Filter Value:
  {
    CHECK_SYSTEM: { value: 'woo!' },
    TEST_SYSTEM: { value: 'test' }
  }
+0.3811    1224084503.374883    Result:
  {
    CHECK_SYSTEM: { value: 'woo!' }
  }

+0.0684    1224084503.443293    -------------------------------------

+0.0715    1224084503.514774    Example:   Reverse Filter (Search)
+0.0313    1224084503.546069    Searching for:  CHECK_SYSTEM matches (nocase)
+0.0254    1224084503.571445    Check Object:
  { 'CH*': 'check', '*SYSTEM': 'system', '*TEST*': 'test' }
+0.3884    1224084503.959813    Result:
  { 'CH*': 'check', '*SYSTEM': 'system' }

+0.0559    1224084504.015705    -------------------------------------

+0.0544    1224084504.07007     Example:   Changing Pattern
+0.0309    1224084504.100953    Matching:  ONE*THREE* (case sensitive) against ONE_TWO_THREE_FOUR
+0.0549    1224084504.155826    true

+0.0298    1224084504.185582    -------------------------------------

+0.0624    1224084504.247961    Example: Has Wildcard Checks
+0.0633    1224084504.311234    Has Wildcard?  [ 'ONE', 'TWO', 'MY*WILDCARD' ]
+0.1251    1224084504.436356    true
+0.0411    1224084504.477466    Has Wildcard?  { foo: 'bar', '*az': 'qux' }
+0.2699    1224084504.747362    true
+0.0435    1224084504.790906    Has Wildcard?  SY*
+0.0250    1224084504.815925    true

+0.0232    1224084504.839097    -------------------------------------

+0.0783    1224084504.917432    Example:   OR Logic (case sensitive)
+0.0791    1224084504.996542    OR Match:
  [
    'ONE_TWO_THREE',
    'FOUR_FIVE_SIX_SEVEN',
    'ONE_TWO_THREE_FOUR_FIVE_SIX_SEVEN',
    'one_two_three_four_five_six_seven'
  ]
+0.1577    1224084505.154196 Result:
  [
    'ONE_TWO_THREE',
    'FOUR_FIVE_SIX_SEVEN',
    'ONE_TWO_THREE_FOUR_FIVE_SIX_SEVEN'
  ]
+0.0571    1224084505.211304    OR Match:
  {
    ONE_TWO_THREE: true,
    FIVE_SIX_SEVEN: true,
    ONE_TWO_THREE_FOUR_FIVE_SIX_SEVEN: true,
    one_two_three_four_five_six_seven: true
  }
+0.0924    1224084505.303655 Result:
  {
    ONE_TWO_THREE: true,
    FIVE_SIX_SEVEN: true,
    ONE_TWO_THREE_FOUR_FIVE_SIX_SEVEN: true
  }
+0.0475    1224084505.351197    -------------------------------------
*/

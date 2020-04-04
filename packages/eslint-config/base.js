const { getGlobals } = require('eslint-plugin-mdx');

const {
  allowModules,
  camelCaseRule,
  isWebpackAvailable,
  magicNumbers,
  webpackSpecVars,
} = require('./_util');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'standard',
    'plugin:prettier/recommended',
    'prettier/standard',
    'prettier/unicorn',
  ],
  settings: {
    node: {
      allowModules,
      tryExtensions: [
        '.ts',
        '.tsx',
        '.vue',
        '.mjs',
        '.js',
        '.jsx',
        '.json',
        '.node',
        '.mdx',
      ],
    },
  },
  globals: isWebpackAvailable ? getGlobals(webpackSpecVars) : undefined,
  rules: {
    camelcase: camelCaseRule,
    'import/order': [
      2,
      {
        'newlines-between': 'always',
      },
    ],
    'no-empty': [
      2,
      {
        allowEmptyCatch: true,
      },
    ],
    'no-empty-function': 2,
    'no-magic-numbers': [
      2,
      {
        enforceConst: true,
        ignore: magicNumbers,
        ignoreArrayIndexes: true,
      },
    ],
    'node/no-unsupported-features/es-syntax': 0,
    'node/no-unsupported-features/node-builtins': 0,
    'node/no-unpublished-import': 0,
    'node/no-unpublished-require': 0,
    'prefer-const': 2,
    'unicorn/catch-error-name': [
      2,
      {
        name: 'error',
        caughtErrorsIgnorePattern: '^e(rr)?$',
      },
    ],
    'unicorn/consistent-function-scoping': 0,
    'unicorn/filename-case': [
      2,
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
        // ignore UPPER_CASE markdown filenames
        ignore: [/^[A-Z](([\dA-Z]+_)*[\dA-Z]+)?\.mdx?$/],
      },
    ],
    'unicorn/prevent-abbreviations': 0,
    'unicorn/regex-shorthand': [
      2,
      {
        sortCharacterClasses: false,
      },
    ],
    'import/default': 0,
    'import/named': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'no-empty-function': 0,
    'no-unused-vars': 0,
    'no-useless-constructor': 0,
    'node/no-missing-import': 0,
    'node/shebang': 0,
    'promise/always-return': 0,
    'promise/catch-or-return': 0,
    '@typescript-eslint/no-var-require': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/member-ordering': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-type-alias': 0,
    '@typescript-eslint/no-unnecessary-condition': 0,
    '@typescript-eslint/unbound-method': 0,
    '@typescript-eslint/restrict-plus-operands': 0,
    '@typescript-eslint/array-type': 0,
    '@typescript-eslint/no-magic-numbers': 0,
    'react/display-name': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/no-unescaped-entities': 0,
    'jsx-indent': 0,
  },
};

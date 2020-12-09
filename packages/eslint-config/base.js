module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    // Specific rules
    '@typescript-eslint/adjacent-overload-signatures': 2,
    '@typescript-eslint/consistent-type-definitions': [2, 'interface'],
    '@typescript-eslint/no-extraneous-class': 2,
    '@typescript-eslint/no-for-in-array': 2,
    '@typescript-eslint/no-parameter-properties': 0,
    '@typescript-eslint/no-require-imports': 2,
    '@typescript-eslint/no-this-alias': [
      2,
      {
        allowDestructuring: true,
        allowedNames: ['self'],
      },
    ],
    '@typescript-eslint/no-useless-constructor': 2,
    '@typescript-eslint/prefer-for-of': 2,
    '@typescript-eslint/prefer-function-type': 2,
    '@typescript-eslint/triple-slash-reference': [
      2,
      {
        lib: 'never',
        path: 'always',
        types: 'prefer-import',
      },
    ],
    '@typescript-eslint/unified-signatures': 2,
    // Ignored rules
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
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-types': 1,
    '@typescript-eslint/ban-ts-comment': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    'import/order': 'off',
  },
};

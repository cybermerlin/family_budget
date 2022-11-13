// npm i -D eslint-config-airbnb eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
//           eslint-plugin-optimize-regex eslint-plugin-prettier prettier eslint-plugin-import eslint-config-prettier
//           eslint-plugin-dollar-sign eslint-plugin-jquery eslint eslint-plugin-jsonc eslint-plugin-jsx-a11y
//           eslint-plugin-no-secrets eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-security
//           eslint-plugin-html eslint-plugin-jasmine

//NOSONAR
/* eslint-disable */
module.exports = {
  root: true,

  env: {
    browser: true,
    commonjs: false,
    es6: true,
    // jquery: true
  },

  extends: [
    'prettier',
    'plugin:security/recommended',
    'plugin:jsonc/base',

    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',

    'react-app',
    'react-app/jest',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],

  parser: '@typescript-eslint/parser',

  plugins: [
    'optimize-regex',
    'prettier',
    '@typescript-eslint',
    // 'dollar-sign', 'jquery',
    'security',
    'no-secrets',
    'html',
    'react',
    'react-hooks',
    'jest',
  ],

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    //#region rules, which need to hard up (warn -> error | 1 -> 2) later ------
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T'],
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        custom: {
          regex: '^E[A-Z]',
          match: true,
        },
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      {
        selector: 'enumMember',
        format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'snake_case', 'PascalCase'],
      },
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['UPPER_CASE'],
      },
      {
        selector: 'property',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'property',
        modifiers: ['private'],
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'require',
      },
      {
        selector: 'property',
        modifiers: ['protected'],
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'property',
        modifiers: ['readonly'],
        format: ['UPPER_CASE'],
      },
      {
        selector: 'property',
        modifiers: ['readonly', 'private'],
        format: ['UPPER_CASE'],
        leadingUnderscore: 'require',
      },
    ],
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    'brace-style': [
      'off',
      'stroustrup',
      {
        allowSingleLine: true,
      },
    ],
    'import/no-mutable-exports': 'warn',
    'import/prefer-default-export': 'warn',
    //TODO: turn on this rule after resolve another rules
    'require-jsdoc': [
      'off',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: false,
          FunctionExpression: false,
        },
      },
    ],
    'max-lines-per-function': [
      'warn',
      {
        max: 80,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'default-case': 'off',
    'consistent-return': 'warn',
    'no-shadow': 'warn',
    'max-nested-callbacks': 'off',
    'max-depth': ['warn', 3],
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreTrailingComments: true,
      },
    ],
    'id-length': [
      'warn',
      {
        min: 2,
        exceptions: ['_', 'e', 'v', 'i', '$'],
      },
    ],
    'no-param-reassign': 'warn',
    'guard-for-in': 'warn',
    'no-use-before-define': 'warn',
    'default-param-last': 'warn',
    'no-eval': 'warn',
    'optimize-regex/optimize-regex': 'warn',
    'no-unused-expressions': 'off',
    'no-nested-ternary': 'warn',
    'newline-after-var': 'warn',
    'newline-before-return': 'warn',
    'array-callback-return': 'warn',
    'no-continue': 'warn',
    'require-await': 'warn',
    'no-eq-null': 'warn',
    'no-undefined': 'off',
    'max-params': ['warn', 3],
    'no-restricted-globals': 'warn',
    'no-await-in-loop': 'warn',
    'max-lines': [1, 500],
    'no-return-await': 'warn',
    // 'vue/custom-event-name-casing': 'warn',
    'padding-line-between-statements': [
      1,
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      { blankLine: 'always', prev: ['break', 'default', 'debugger', 'continue'], next: '*' },
      { blankLine: 'any', prev: ['case'], next: ['case'] },
    ],
    'operator-linebreak': [
      'warn',
      'before',
      {
        overrides: {
          '=': 'ignore',
          '+=': 'ignore',
          '-=': 'ignore',
          '?=': 'ignore',
          '*=': 'ignore',
          '/=': 'ignore',
        },
      },
    ],
    indent: [
      'off',
      4,
      {
        SwitchCase: 1,
        offsetTernaryExpressions: true,
        MemberExpression: 'off',
        FunctionDeclaration: { body: 1, parameters: 4 },
      },
    ],
    // turned off because have some conflicts with another rules
    'prettier/prettier': [
      0,
      {
        usePrettierrc: true,
      },
    ],
    /*'vue/no-v-model-argument': 'warn',
    'vue/no-deprecated-dollar-listeners-api': 'warn',
    'vue/component-tags-order': [1, {
        'order': ['script', 'template', 'style', 'docs']
    }],
    'vue/attributes-order': ['warn', {
        'order': [
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_ATTR',
            'OTHER_DIRECTIVES',
            'RENDER_MODIFIERS',
            'CONTENT',
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'EVENTS'
        ],
        'alphabetical': false
    }],
    'vue/max-attributes-per-line': ['warn', {
        'singleline': 3,
        'multiline': {
            'max': 1,
            'allowFirstLine': true
        }
    }],*/
    'no-confusing-arrow': ['error', { allowParens: false }],
    //#endregion

    //#region ------------- react
    'react/react-in-jsx-scope': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    //#endregion

    'no-secrets/no-secrets': 'error',
    // 'no-secrets/no-secrets': ['error', {'tolerance': 3.2}],
    //                                    {'ignoreContent':'^ABCD'} // {'ignoreIdentifiers':['BASE64_CHARS']}
    //                              { 'additionalRegexes': { 'Basic Auth': 'Authorization: Basic [A-Za-z0-9+/=]*' }},
    'no-script-url': 'off',
    'no-multi-assign': 'off',
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['#region', '#endregion']
        },
      },
    ],
    'no-case-declarations': 'off',
    'global-require': 'off', // deprecated
    'one-var': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'array-bracket-spacing': ['error', 'never'],
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'block-scoped-var': 'error',
    'block-spacing': ['error', 'always'],
    'capitalized-comments': [
      'error',
      'always',
      {
        ignoreInlineComments: true,
        ignoreConsecutiveComments: true,
        ignorePattern: '^(#| )(region|endregion).*',
      },
    ],
    'class-methods-use-this': 'off',
    curly: ['error', 'all'],
    'dot-notation': 'error',
    'eol-last': ['error', 'always'],
    eqeqeq: 'warn',
    'func-names': 'off',
    'grouped-accessor-pairs': 'error',
    'import/extensions': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-unresolved': 'off',
    'init-declarations': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      },
    ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'max-classes-per-file': ['error', 3],
    'multiline-comment-style': 'off',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
    'no-array-constructor': 'error',
    'no-bitwise': 'off',
    'no-constructor-return': 'error',
    'no-console': [1, { allow: ['warn', 'error'] }],
    'no-debugger': 'off',
    'no-dupe-class-members': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['generatorFunctions', 'constructors', 'methods', 'arrowFunctions'] },
    ],
    'no-empty-function': ['error', { allow: ['generatorFunctions', 'constructors', 'methods', 'arrowFunctions'] }],
    'no-extend-native': 'error',
    'no-fallthrough': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'off',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': [1, { max: 2 }],
    'no-new': 'warn',
    'no-plusplus': 'off',
    'no-return-assign': 'off',
    'no-self-assign': 'error',
    'no-sequences': 'error',
    'no-tabs': 'error',
    'no-template-curly-in-string': 'off',
    'no-throw-literal': 'off',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'off',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-useless-concat': 'error',
    'no-useless-constructor': 'warn',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': 'off',
    'no-warning-comments': ['warn', { terms: ['fixme'] }],
    'no-whitespace-before-property': 'error',
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'object-shorthand': ['off', 'consistent-as-needed'], // does not work yet. bitch
    'prefer-const': 'off',
    'prefer-destructuring': [
      'warn',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: true,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'prefer-numeric-literals': 'error',
    'prefer-promise-reject-errors': 'warn',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    radix: 'off',
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
    'vars-on-top': 'error',
    yoda: 'error',
    'no-restricted-imports': [
      'error',
      {
        // Disabling using of useLayoutEffect from react
        name: 'react',
        importNames: ['useLayoutEffect'],
        message: '`useLayoutEffect` causes a warning in SSR. Use `useIsomorphicLayoutEffect`',
      },
    ],
    'no-restricted-syntax': [
      'error',
      // Ensure import from '*use-isomorphic-layout-effect' is `useLayoutEffect` to leverage `eslint-plugin-react-hooks`
      {
        selector:
          'ImportDeclaration[source.value=/use-isomorphic-layout-effect/] > ImportDefaultSpecifier[local.name!="useLayoutEffect"]',
        message:
          'Must use `useLayoutEffect` as the name of the import from `*use-isomorphic-layout-effect` to leverage `eslint-plugin-react-hooks`',
      },
    ],
  },

  overrides: [
    // {
    //   files: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
    //   parserOptions: {
    //     project: './src/tsconfig.spec.json',
    //   },
    //   // Правила для линтера
    //   extends: ['plugin:jasmine/recommended'],
    //   // Плагин для запуска правил
    //   plugins: ['jasmine'],
    //   env: { jasmine: true },
    //   // Отключим правило 'no-unused-vars'
    //   rules: {
    //     '@typescript-eslint/no-unused-vars': 'off',
    //   },
    // },
    // {
    //   files: ['*.component.html'],
    //   extends: ['plugin:@angular-eslint/template/recommended']
    // },
    {
      files: ['*.tsx'],
      rules: {
        'max-lines-per-function': 0,
        'import/named': 0,
        'import/order': 0,
        'import/no-cycle': 0,
        'import/order': 0,
        'import/no-self-import': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-relative-packages': 0,
        'import/no-named-as-default': 0,
        'import/no-named-as-default-member': 0,
      },
    },
    {
      // files: ['*.jsx', '*.vue'],
      files: ['*.html', '*.jsx', '*.mustache', '*.jsp', '*.tag'],
      rules: {
        'max-len': 0,
        'max-lines-per-function': [
          'error',
          {
            max: 300,
            skipBlankLines: true,
            skipComments: true,
          },
        ],
        'max-statements': 'off',
        'id-length': [
          'error',
          {
            min: 1,
            exceptions: ['_'],
          },
        ],
      },
    },
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
    {
      files: ['**/tests/**/*.{j,t}s?(x)', 'src/**/*.test.*', 'src/**/*.spec.*'],
      env: {
        jest: true,
      },
    },
  ],

  globals: {
    it: true,
    expect: true,
    test: true,
    describe: true,
    beforeEach: true,
    beforeAll: true,
    // ----for react
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  settings: {
    'html/html-extensions': ['.html'], // consider .html and .we files as HTML
    // 'html/xml-extensions': ['.html'],  // consider .html files as XML
    // 'html/indent': '0',   // code should start at the beginning of the line (no initial indentation).
    'html/indent': '+2', // indentation is the <script> indentation plus two spaces.
    // 'html/indent': 'tab', // indentation is one tab at the beginning of the line.
    'html/report-bad-indent': 'error',

    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx' /*, '.vue'*/],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        path: './tsconfig.json',
      },
    },
  },
};

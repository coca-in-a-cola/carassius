import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        'server-dist/*',
        'coverage/*',
        '**/*.d.ts',
        'src/public/',
        'src/types/',
        'test/',
        './eslint.config.mjs',
        '**/copyStaticAssets.ts',
        '**/jest.config.js',
    ],
}, ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    // "plugin:rxjs/recommended",
    // "plugin:deprecation/recommended",
), {
    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2019,
        sourceType: 'module',

        parserOptions: {
            project: './tsconfig.json',
        },
    },

    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        '@typescript-eslint/no-empty-function': 1,
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/prefer-as-const': 'off',

        '@typescript-eslint/no-inferrable-types': ['warn', {
            ignoreParameters: true,
        }],

        '@typescript-eslint/no-unused-vars': 'warn',
        'prefer-const': 'warn',
        'no-trailing-spaces': 'warn',
        'object-curly-spacing': ['warn', 'always'],
        'object-shorthand': 'error',
        'spaced-comment': 1,
        'guard-for-in': 'off',
        'prefer-object-spread': 'error',
        eqeqeq: ['warn', 'always'],
        '@typescript-eslint/no-shadow': 'warn',

        'no-shadow': ['off', {
            builtinGlobals: true,
        }],

        'no-throw-literal': 'error',
        'semi-style': ['error', 'last'],

        'semi-spacing': ['error', {
            before: false,
            after: true,
        }],

        'space-infix-ops': 'error',
        'no-whitespace-before-property': 'error',
        curly: 'error',
        'brace-style': 1,
        'nonblock-statement-body-position': ['error', 'below'],
        'template-curly-spacing': ['error', 'never'],

        'key-spacing': ['error', {
            mode: 'strict',
        }],

        'no-else-return': 'warn',

        'max-len': ['warn', {
            code: 140,
        }],

        'func-call-spacing': ['warn', 'never'],
        'eol-last': ['warn', 'always'],
        'array-bracket-spacing': ['error', 'never'],

        'space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always',
        }],

        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': ['error', {
          'allowTernary': true,
          'allowShortCircuit': true
        }]

        /* "rxjs/no-implicit-any-catch": ["error", {
            allowExplicitAny: false,
        }],

        "rxjs/no-nested-subscribe": ["off"],*/
    },
}];

// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const jsdoc = require('eslint-plugin-jsdoc');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    plugins: {
      jsdoc
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      indent: [
        'warn',
        2,
        {
          SwitchCase: 1
        }
      ],
      "quotes": ["warn", "single"],
      "semi": ["warn", "always"],
      "@typescript-eslint/no-explicit-any": "warn",
      "@angular-eslint/prefer-inject": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn", { 
          vars: "all",
          args: "none",
          argsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: false,
          allowDirectConstAssertionInArrowFunctions: true
        }
      ],
      '@typescript-eslint/typedef': [
        'warn',
        {
          variableDeclaration: false,
          variableDeclarationIgnoreFunction: true,
          propertyDeclaration: true,
          memberVariableDeclaration: true,
          parameter: true,
          arrowParameter: false,
          objectDestructuring: true,
          arrayDestructuring: true
        }
      ],
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ArrowFunctionExpression: false,
            FunctionExpression: false
          },
          exemptEmptyConstructors: true
        }
      ],
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',
      'jsdoc/require-description': 'warn',
      'no-console': ['warn', { allow: ['error'] }]
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  },
]);

module.exports = {
  root: true, 
  extends: ['@react-native'], 
  parser: '@typescript-eslint/parser', // Use TypeScript parser for ESLint
  plugins: ['@typescript-eslint'], // TypeScript specific linting rules
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Apply these rules only to TypeScript files
      rules: {
        // TypeScript: prevent variable/function shadowing
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off', // disable base no-shadow rule (replaced by TS version)
        'no-undef': 'off', // TypeScript handles undefined checks

        // React Native specific rules
        'react-native/no-unused-styles': 'error', // error if there are unused styles in StyleSheet
        'react-native/split-platform-components': 'error', // enforce platform-specific files like .ios.tsx / .android.tsx
        'react-native/no-inline-styles': 'off', // disable inline styles rule - allowing inline styles
        'react-native/no-color-literals': 'off', // warn if colors are hardcoded in styles

        // General JS rules
        'prefer-const': 'error', // enforce using const over let if variable never reassigned
        'no-var': 'error', // disallow var (prefer let/const)
        'object-shorthand': 'error', // enforce object literal shorthand syntax
        'prefer-template': 'error', // enforce template literals instead of string concatenation

        // TypeScript specific rules
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_', // ignore unused function args starting with _
            varsIgnorePattern: '^_', // ignore unused variables starting with _
            caughtErrorsIgnorePattern: '^_', // ignore unused catch error variables starting with _
          },
        ],
        eqeqeq:'off',
        '@typescript-eslint/no-explicit-any': 'warn', // warn when using 'any' type
        '@typescript-eslint/explicit-function-return-type': 'off', // don't enforce return type on functions
        '@typescript-eslint/explicit-module-boundary-types': 'off', // don't enforce export function return types
        '@typescript-eslint/no-empty-function': 'off', // allow empty functions

        // React rules
        'react-hooks/rules-of-hooks': 'error', // enforce rules of hooks (must call hooks at top level)
        'react-hooks/exhaustive-deps': 'off', // warn if hook dependencies array is missing items
      },
    },
  ],
  env: {
    'react-native/react-native': true, // enables global variables for React Native
    'jest/globals': true, // enables global variables for Jest (test files)
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // resolve imports for these file types
      },
    },
  },
};

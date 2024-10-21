import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{ts}'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-var-reqiures': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '[iI]gnored' }],
      // 'prettier/prettier': [
      //   'error',
      //   {
      //     endOfLine: 'auto',
      //   },
      // ],
      'comma-dangle': ['error', 'only-multiline'],
      'react/prop-types': 'off',
      'react/display-name': 'off',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

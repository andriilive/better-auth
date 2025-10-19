import {FlatCompat} from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    ignorePatterns: [
      '*.css',
      '*.svg',
      '*.json',
      'node_modules/',
      'build/',
      'dist/',
      'out/',
      '.next/',
      '.vercel/',
      '.husky/',
      'prisma/',
      'public/',
      'next-env.d.ts',
      '/*.config.*',
    ],
    rules: {
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'no-unused-vars': 'off',
      'no-console': ['warn', {allow: ['warn', 'error']}],
      'comma-dangle': ['warn', 'always-multiline'],
      'comma-spacing': ['warn', {'before': false, 'after': true}],
      'object-curly-spacing': ['warn', 'always'],
      'object-curly-newline': ['warn', {'multiline': true, 'consistent': true}],
      'array-bracket-newline': ['warn', {'minItems': 3, 'multiline': true}],
      'array-element-newline': ['warn', {'minItems': 3, 'multiline': true}],
      'array-bracket-spacing': ['warn', 'never', {'objectsInArrays': false}],
      'object-property-newline': ['warn', {'allowAllPropertiesOnSameLine': true}],
      'quotes': ['warn', 'double', {'avoidEscape': true, 'allowTemplateLiterals': true}],
      'jsx-quotes': ['warn', 'prefer-single'],
      'prefer-const': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@next/next/no-img-element': 'warn'
    }
  }),
]

export default eslintConfig

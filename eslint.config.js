import globals from 'globals'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import stylisticJs from '@stylistic/eslint-plugin-js'
import parserTs from '@typescript-eslint/parser'

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parser: parserTs,
        }
    },
    {
        files: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.ts', 'src/**/*.tsx', 'build/**/*.js'],
        ignores: [
            'dist/**/*'
        ],
        plugins: {
            '@stylistic/js': stylisticJs,
            '@stylistic/ts': stylisticTs
        },
        rules: {
            '@stylistic/js/indent': ['error', 4],
            '@stylistic/js/quotes': ['error', 'single'],
            '@stylistic/js/no-extra-semi': 'error',
            '@stylistic/js/semi': ['error', 'never'],
        }
    },
]

export const LANGUAGE_CODES = ['EN', 'UA', 'ES'] as const

export type LanguageCode = typeof LANGUAGE_CODES[number]

import {UA} from './UA'
import {EN} from './EN'
import {ES} from './ES'

export type I18nKey = keyof typeof EN

export const LANG_DATA: Record<LanguageCode, Record<I18nKey, string>> = {
    EN: EN,
    UA: UA,
    ES: ES
}

export * from './components'

import {createContext} from 'preact'
import {I18nKey, LanguageCode} from '../index'

export type I18nContext = {
    langCode: LanguageCode,
    translate: (code: I18nKey) => string
}

export const LanguageContext = createContext<I18nContext>({
    langCode: 'EN',
    translate: (code) => code
})

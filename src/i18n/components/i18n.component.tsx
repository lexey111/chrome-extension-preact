import {h} from 'preact'
import {FC, useContext, useMemo} from 'preact/compat'
import {LanguageContext} from './language.context'
import {I18nKey} from '../index'

type I18nProps = {
    code: I18nKey
    className?: string
}

export const I18n: FC<I18nProps> = ({code, className}) => {
    const {langCode, translate} = useContext(LanguageContext)

    if (!code || !langCode) {
        return <span>...</span>
    }

    const text = useMemo(() => translate(code), [code, langCode])

    return <span className={className || ''}>
        {text}
    </span>
}


import {h} from 'preact'
import {LANGUAGE_CODES} from '../index'
import {useLanguage} from '../hooks'

export const LanguageSelector = () => {
    const {activeLanguage, setLanguage} = useLanguage()

    return <span className={'language-selector'}>
        <ul>
            {LANGUAGE_CODES.map(code => <li key={code}>
                <a
                    href="#" onClick={() => setLanguage(code)}
                    className={code === activeLanguage ? 'active' : ''}>{code}</a>
            </li>)}
        </ul>
    </span>
}


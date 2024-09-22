import {h} from 'preact'
import {I18n, LanguageSelector} from '../../../i18n'

export const Header = () => {
    return <div className={'app-header'}>
        <h1>
            <I18n code={'title'}/>
        </h1>
        <h2>
            <I18n code={'settings'}/>
            <span className={'language-selector'}><LanguageSelector/></span>
        </h2>
    </div>
}


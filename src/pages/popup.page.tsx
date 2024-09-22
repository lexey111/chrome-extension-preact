import {h} from 'preact'
import {I18n, LanguageAwareWrapper, LanguageSelector} from '../i18n'
import {GoSettings} from './components/popup'
import {OnOff} from './components/shared'
import {useOnOff} from './hooks'
import {useEffect, useLayoutEffect} from 'preact/compat'

export const PopupPage = () => {
    const {on} = useOnOff()

    useLayoutEffect(() => {
        // to prevent on-show animations
        setTimeout(() => {
            document.body.classList.remove('no-transition')
        }, 200)
    }, [])

    useEffect(() => {
        if (!on) {
            document.body.classList.add('disabled')
        } else {
            document.body.classList.remove('disabled')
        }
    }, [on])

    return <LanguageAwareWrapper>
        <h1>
            <I18n code={'title'}/>
            <span className={'language-selector'}><LanguageSelector/></span>
        </h1>

        <OnOff/>

        <div className={'alert-info'}><I18n code={'content_hint'}/></div>

        <GoSettings/>

    </LanguageAwareWrapper>
}


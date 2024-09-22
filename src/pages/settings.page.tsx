import {h} from 'preact'
import {Footer, Header} from './components/settings'
import {I18n, LanguageAwareWrapper} from '../i18n'
import {useEffect, useLayoutEffect} from 'preact/compat'
import {settingsPageStorageKey} from '../consts/storage-keys.consts'
import {OnOff} from './components/shared'
import {useOnOff} from './hooks'

const storeTabId = async () => {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true})
    await chrome.storage.sync.set({[settingsPageStorageKey]: tabs[0].id})
    return tabs[0].id
}

export const SettingsPage = () => {
    useEffect(() => {
        // register/unregister tab in storage
        void storeTabId()
    }, [])

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
        <Header/>
        <OnOff/>

        <div className={'alert-info'}><I18n code={'content_hint'}/></div>

        <h2><I18n code={'technologies'}/></h2>
        <ul>
            <li><a href="https://preactjs.com/" target={'_blank'}>Preact</a></li>
            <li><a href="https://www.typescriptlang.org/" target={'_blank'}>Typescript</a></li>
            <li><a href="https://lexey111.github.io/insane-nano-preact/" target={'_blank'}>Insane builder</a></li>
        </ul>

        <Footer/>
    </LanguageAwareWrapper>
}

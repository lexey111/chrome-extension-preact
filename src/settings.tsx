import {h, render} from 'preact'
import 'preact/devtools'
import {SettingsPage} from './pages/settings.page'

console.log('[settings] Settings loaded')

const appContainer = document.getElementById('root') as HTMLElement

const Settings = <SettingsPage/>
render(Settings, appContainer)

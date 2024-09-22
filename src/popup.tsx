import {h, render} from 'preact'
import 'preact/devtools'
import {PopupPage} from './pages/popup.page'

console.log('[popup] Popup loaded')

const popupContainer = document.getElementById('popup') as HTMLElement

const Popup = <PopupPage/>
render(Popup, popupContainer)

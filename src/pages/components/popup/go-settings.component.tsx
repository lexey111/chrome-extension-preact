import {h} from 'preact'
import {useCallback} from 'preact/compat'
import {I18n} from '../../../i18n'
import {settingsPageStorageKey} from '../../../consts/storage-keys.consts'

const getStoredTabId = async () => {
    const currentMayBeSettings = await chrome.storage.sync.get([settingsPageStorageKey])
    return isNaN(Number(currentMayBeSettings[settingsPageStorageKey])) ? -1 : Number(currentMayBeSettings[settingsPageStorageKey])
}

export const GoSettings = () => {
    const goSettings = useCallback(async (e: Event) => {
        e.preventDefault()
        e.stopPropagation()

        const tabs = await chrome.tabs.query({})
        const existingTabId = await getStoredTabId()
        const existingTab = existingTabId ? tabs.find(tab => tab.id === existingTabId) : undefined

        if (existingTab && existingTab.id) {
            await chrome.tabs.update(existingTab.id, {active: true})
        } else {
            chrome.tabs.create({'url': 'settings.html'}, (tab) => {
                chrome.tabs.update(tab.id!, {active: true})
            })
        }
        window.close()
        return false
    }, [])


    return <a href='#' onClick={goSettings}>
        <I18n code={'open_settings_page'}/>
    </a>
}


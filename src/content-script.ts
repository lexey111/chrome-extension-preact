import {onOffStorageKey} from './consts/storage-keys.consts'

import {processPage} from './content/content-process'

console.log('[process] ProcessSettings loaded')

export type ProcessSettings = {
    isEnabled: boolean
}

const settings: ProcessSettings = {
    isEnabled: false,
}

async function init() {
    const getOnOffState = async () => {
        const storedState = await chrome.storage.sync.get([onOffStorageKey])
        settings.isEnabled = storedState[onOffStorageKey] !== 'off'
    }

    const updateState = async () => {
        await getOnOffState()
        // get other settings if any...

        await processPage(settings)
    }

    const handleStateChanges = (changes: {
        [p: string]: chrome.storage.StorageChange
    }, areaName: chrome.storage.AreaName) => {
        let needProcess = false
        if (areaName === 'sync' && (changes?.[onOffStorageKey]?.newValue)) {
            needProcess = true
        }

        // other change detection if any...

        if (needProcess) {
            void updateState()
        }
    }
    chrome.storage.onChanged.addListener(handleStateChanges)

    void updateState()
}

void init()

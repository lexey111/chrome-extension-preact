import {onOffStorageKey} from './consts/storage-keys.consts'

let isOn = false

async function init() {
    const getOnOffState = async () => {
        const storedState = await chrome.storage.sync.get([onOffStorageKey])
        isOn = storedState[onOffStorageKey] !== 'off'
    }

    const updateState = async () => {
        await getOnOffState()

        if (!isOn) {
            await chrome.action.setBadgeText({
                text: ''
            })
        } else {
            await chrome.action.setBadgeText({
                text: 'L'
            })
        }
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

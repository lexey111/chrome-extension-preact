import {useCallback, useEffect, useState} from 'preact/compat'
import {onOffStorageKey} from '../../consts/storage-keys.consts'

export const getOnOffState = async (): Promise<boolean> => {
    const storedState = await chrome.storage.sync.get([onOffStorageKey])
    return storedState[onOffStorageKey] !== 'off'
}

export const useOnOff = () => {
    const [on, setOn] = useState<boolean | null>(null)

    useEffect(() => {
        const processCurrentState = async () => {
            const actual = await getOnOffState()
            setOn(actual)
        }

        const handleStateChanges = (changes: {
            [p: string]: chrome.storage.StorageChange
        }, areaName: chrome.storage.AreaName) => {
            if (areaName === 'sync' && changes?.[onOffStorageKey]?.newValue) {
                void processCurrentState()
            }
        }

        chrome.storage.onChanged.addListener(handleStateChanges)
        void processCurrentState()

        return () => {
            chrome.storage.onChanged.removeListener(handleStateChanges)
        }
    }, [setOn])

    const toggleOnOffState = useCallback(async () => {
        const actual = await getOnOffState()
        await chrome.storage.sync.set({[onOffStorageKey]: actual ? 'off' : 'on'})
    }, [])

    return {
        on,
        toggleOnOffState
    }
}
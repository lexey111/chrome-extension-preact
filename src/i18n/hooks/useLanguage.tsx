import {useCallback, useEffect, useState} from 'preact/compat'
import {languageStorageKey} from '../../consts/storage-keys.consts'
import {LANGUAGE_CODES, LanguageCode} from '../index'

export const getLanguageState = async (): Promise<LanguageCode> => {
    const storedLanguage = await chrome.storage.sync.get([languageStorageKey])
    let actual: LanguageCode = 'EN'
    if (LANGUAGE_CODES.includes(storedLanguage[languageStorageKey])) {
        actual = storedLanguage[languageStorageKey]
    }
    return actual
}

export const useLanguage = () => {
    const [activeLanguage, setActiveLanguage] = useState<LanguageCode | null>(null)

    useEffect(() => {
        const processCurrentState = async () => {
            const actual = await getLanguageState()
            setActiveLanguage(actual)
        }

        const handleStateChanges = (changes: {
            [p: string]: chrome.storage.StorageChange
        }, areaName: chrome.storage.AreaName) => {
            if (areaName === 'sync' && changes?.[languageStorageKey]?.newValue) {
                void processCurrentState()
            }
        }

        chrome.storage.onChanged.addListener(handleStateChanges)
        void processCurrentState()

        return () => {
            chrome.storage.onChanged.removeListener(handleStateChanges)
        }
    }, [setActiveLanguage])

    const setLanguage = useCallback(async (lang: LanguageCode) => {
        void chrome.storage.sync.set({[languageStorageKey]: lang})
        setActiveLanguage(lang)
    }, [setActiveLanguage])

    return {
        activeLanguage,
        setLanguage
    }
}
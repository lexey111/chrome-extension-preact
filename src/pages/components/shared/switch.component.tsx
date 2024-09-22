import {FC, useCallback} from 'preact/compat'
import {ComponentChildren, h} from 'preact'
import {I18n, I18nKey} from '../../../i18n'

export type SwitchProps = {
    on?: boolean | null
    onChange?: (state?: boolean) => void
    titleKey?: I18nKey
    title?: any
    disabled?: boolean
    children?: ComponentChildren
}

export const Switch: FC<SwitchProps> = (
    {
        on,
        disabled,
        onChange,
        title,
        titleKey,
        children
    }) => {
    if (typeof on !== 'boolean') {
        return <div className="switch-container">
            <label className="switch">
                <span className="slider round"></span>
            </label>
            ...
        </div>
    }

    const handleChange = useCallback((e: Event) => {
        e.preventDefault()
        onChange?.((e.target as HTMLInputElement)?.checked)
        return false
    }, [onChange])

    const handleToggle = useCallback(() => {
        onChange?.(!on)
    }, [onChange, on])

    return <div className={'switch-container' + (disabled ? ' disabled' : '')}>
        <label className="switch">
            <input type="checkbox" checked={on} onChange={handleChange} disabled={disabled}/>
            <span className="slider round"></span>
        </label>
        <div onClick={handleToggle} className={'switch-label'}>
            {titleKey && <I18n code={titleKey}/>}
            {title}
            {children}
        </div>
    </div>
}
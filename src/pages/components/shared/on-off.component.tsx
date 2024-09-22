import {FC} from 'preact/compat'
import {h} from 'preact'
import {useOnOff} from '../../hooks'
import {Switch} from './switch.component'

export const OnOff: FC = () => {
    const {on, toggleOnOffState} = useOnOff()

    return <Switch
        on={on}
        onChange={toggleOnOffState}
        titleKey={'enable_processing'}>
    </Switch>
}
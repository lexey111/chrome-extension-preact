import {h} from 'preact'

export const Footer = () => {
    return <div className={'footer'}>
        &copy; {new Date().getFullYear()},&nbsp;<a href="https://github.com/lexey111" target={'_blank'}>Oleksii Koshkin</a>
    </div>
}


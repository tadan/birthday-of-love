import { useLang } from '../i18n/LangContext'

export function LanguageSwitcher() {
    const { lang, setLang } = useLang()

    const targetLang = lang === 'en' ? 'it' : 'en'
    const label = lang === 'en' ? 'IT' : 'EN'
    const flag = lang === 'en' ? '\u{1F1EE}\u{1F1F9}' : '\u{1F1EC}\u{1F1E7}'

    return (
        <button
            onClick={() => setLang(targetLang)}
            style={{
                position: 'fixed',
                top: '1.5rem',
                right: '1.5rem',
                zIndex: 50,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                padding: '0.5rem 0.75rem',
                cursor: 'pointer',
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                fontSize: '14px',
                color: '#0d0d0d',
                backdropFilter: 'blur(4px)',
            }}
        >
            <span style={{ fontSize: '20px' }}>{flag}</span>
            {label}
        </button>
    )
}

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Lang = 'en' | 'it'

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
    lang: 'en',
    setLang: () => {},
})

export function useLang() {
    return useContext(LangContext)
}

function getLangFromHash(): Lang {
    return window.location.hash === '#/it' ? 'it' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(getLangFromHash)

    useEffect(() => {
        const onHashChange = () => setLangState(getLangFromHash())
        window.addEventListener('hashchange', onHashChange)
        return () => window.removeEventListener('hashchange', onHashChange)
    }, [])

    const setLang = (l: Lang) => {
        if (l === 'it') {
            window.location.hash = '#/it'
        } else {
            history.pushState(null, '', window.location.pathname)
        }
        setLangState(l)
    }

    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    )
}

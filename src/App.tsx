import { Hero } from './components/Hero'
import { SaveTheDate } from './components/SaveTheDate'
import { Location } from './components/Location'
import { Presents } from './components/Presents'
import { TravelSuggestions } from './components/TravelSuggestions'
import { Footer } from './components/Footer'
import { PhotoDecoration } from './components/PhotoDecoration'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { useLang } from './i18n/LangContext'

export default function App() {
    const { lang } = useLang()

    return (
        <div className='min-h-screen'>
            <LanguageSwitcher />
            <Hero />

            <div className='relative -mt-32 md:-mt-40'>
                <SaveTheDate />

                <div className='absolute top-0 left-0 right-0 -mt-32 md:-mt-40 z-20 flex justify-center px-4'>
                    <div className='w-[240px] md:w-[400px]'>
                        <PhotoDecoration />
                    </div>
                </div>
            </div>

            <Location />
            <Presents />
            {lang === 'en' && <TravelSuggestions />}
            <Footer />
        </div>
    )
}

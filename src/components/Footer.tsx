import imgFlowerDisco from 'figma:asset/d21d4748e2c1c1b39d896cb6702f42ec05bce613.png'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'

export function Footer() {
    const { lang } = useLang()

    return (
        <section
            className='py-8 md:py-8 px-4 relative overflow-hidden'
            style={{ backgroundColor: lang === 'it' ? '#f2ebd5' : '#232703' }}
        >
            <div className='max-w-[574px] mx-auto text-center relative z-10'>
                <h2
                    className='font-bold mb-8 md:mb-2'
                    style={{
                        color: lang === 'it' ? '#d8400f' : '#f2ebd5',
                        fontFamily: 'Gyst, Georgia, serif',
                        lineHeight: '1',
                        fontSize: 'clamp(30px, 2.5vw, 72px)',
                    }}
                >
                    {t[lang].footerText}
                </h2>

                {/* Flower and disco decoration */}
                <div className='mt-0 md:mt-0 flex justify-center'>
                    <img
                        alt=''
                        className='w-[250px] md:w-[400px] h-auto'
                        src={imgFlowerDisco}
                    />
                </div>
            </div>
        </section>
    )
}

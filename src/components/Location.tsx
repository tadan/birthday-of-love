import { motion } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'
import moodboardPdf from '../assets/moodboard-birthday-of-love.pdf'

const bucchianicoImage =
    'https://www.abruzzoturismo.it/sites/default/files/immagini/Borghi/Bucchianico%20_%20tramonto%20orizz_%20foto%20di%20Matteo%20Ciommi.jpg'
const locationImage =
    'https://agriturismolarustica.com/wp-content/uploads/2025/06/hero4.webp'

export function Location() {
    const { lang } = useLang()

    return (
        <section className='bg-[#fcdeea] py-16 md:py-24 px-4'>
            <div className='mx-auto' style={{ maxWidth: '1000px' }}>
                {/* The Day / La Giornata */}
                <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-start'>
                    <div>
                        <h2
                            style={{ fontFamily: 'Gyst, Georgia, serif' }}
                            className='font-bold text-[#d8400f] text-4xl md:text-[72px] mb-6 md:mb-8'
                        >
                            {t[lang].theDayTitle}
                        </h2>

                        <div
                            style={{
                                fontFamily: 'Times New Roman, Times, serif',
                            }}
                            className='text-[#0d0d0d] space-y-6 md:space-y-8'
                        >
                            <p className='text-[20px]'>
                                <strong>{t[lang].ceremony}</strong>
                                <br />
                                {t[lang].ceremonyDesc}
                            </p>
                            <p className='text-[20px]'>
                                <strong>{t[lang].reception}</strong>
                                <br />
                                {t[lang].receptionDesc}
                            </p>
                        </div>
                    </div>

                    <motion.div
                        className='relative overflow-hidden'
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <img
                            alt='Bucchianico town view at sunset'
                            className='w-full h-auto'
                            src={bucchianicoImage}
                        />
                        <span
                            style={{
                                fontFamily: 'Times New Roman, Times, serif',
                                marginTop: '0.5rem',
                                display: 'block',
                            }}
                        >
                            Bucchianico
                        </span>
                    </motion.div>
                </div>

                {/* Getting There - English only */}
                {lang === 'en' && (
                    <div className='grid md:grid-cols-2 mt-12 gap-8 md:gap-12 items-start'>
                        <div>
                            <h3
                                style={{ fontFamily: 'Gyst, Georgia, serif' }}
                                className='font-bold text-[#d8400f] text-4xl md:text-[48px] mb-6 md:mb-8'
                            >
                                {t[lang].gettingThereTitle}
                            </h3>

                            <div
                                style={{
                                    fontFamily: 'Times New Roman, Times, serif',
                                }}
                                className='text-[#0d0d0d] space-y-6 md:space-y-8'
                            >
                                <p className='text-[20px]'>
                                    <strong>{t[lang].drivingLabel}</strong> —{' '}
                                    {t[lang].drivingDesc}
                                </p>
                                <p className='text-[20px]'>
                                    <strong>{t[lang].shuttleLabel}</strong> —{' '}
                                    {t[lang].shuttleDesc}
                                </p>
                            </div>
                        </div>

                        <motion.div
                            className='relative overflow-hidden'
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                        >
                            <img
                                alt='Agriturismo La Rustica venue'
                                className='w-full h-auto'
                                src={locationImage}
                            />
                            <span
                                style={{
                                    fontFamily: 'Times New Roman, Times, serif',
                                    marginTop: '0.5rem',
                                    display: 'block',
                                }}
                            >
                                Agriturismo La Rustica - Pianella
                            </span>
                        </motion.div>
                    </div>
                )}

                {/* Two info cards */}
                <div className='mt-12 md:mt-16 grid md:grid-cols-2 gap-6'>
                    {/* Families note - English only */}
                    {lang === 'en' && (
                        <div
                            style={{
                                backgroundColor: 'rgba(252, 245, 215, 1)',
                                border: '6px solid rgba(204, 192, 67, 1)',
                                padding: '2rem',
                                margin: '0.5rem',
                                fontFamily: 'Times New Roman, Times, serif',
                                fontSize: '18px',
                                textAlign: 'center',
                                color: '#0d0d0d',
                            }}
                        >
                            {t[lang].familiesNote}
                        </div>
                    )}

                    {/* Moodboard link */}
                    <div
                        style={{
                            backgroundColor: 'rgba(252, 245, 215, 1)',
                            border: '6px solid rgba(204, 192, 67, 1)',
                            padding: '2rem',
                            margin: '0.5rem',
                            fontFamily: 'Times New Roman, Times, serif',
                            fontSize: '18px',
                            textAlign: 'center',
                            color: '#0d0d0d',
                            gridColumn: lang === 'it' ? '1 / -1' : undefined,
                        }}
                    >
                        <p>{t[lang].moodboardNote}</p>
                        <a
                            href={moodboardPdf}
                            target='_blank'
                            rel='noopener noreferrer'
                            style={{
                                display: 'inline-block',
                                marginTop: '0.75rem',
                                fontWeight: 'bold',
                                textDecoration: 'underline',
                                color: '#0d0d0d',
                            }}
                        >
                            {t[lang].viewMoodboard}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

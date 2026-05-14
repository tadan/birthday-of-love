import { motion } from 'framer-motion'
import imgEaf26Ddd2D3C455F936BF59A6A0D83441 from 'figma:asset/fbc77f4658200efd2d384f5c483254426dd6d7ad.png'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'

export function Hero() {
    const { lang } = useLang()

    return (
        <section className='relative min-h-[100vh] flex flex-col items-center justify-center px-4 py-12 md:py-20 pb-48 md:pb-96'>
            {/* Background Image */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className='absolute inset-0 pointer-events-none'
                aria-hidden='true'
            >
                <img
                    alt=''
                    className='absolute max-w-none object-cover size-full'
                    src={imgEaf26Ddd2D3C455F936BF59A6A0D83441}
                />
                <div className='absolute bg-[rgba(24,41,92,0.2)] inset-0' />
            </motion.div>

            {/* Content */}
            <div className='relative z-10 flex flex-col items-center max-w-4xl'>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="font-['ABC_Favorit_Condensed_Unlicensed_Trial:Bold',sans-serif] text-[#f2ebd5] text-xl md:text-[32px] mb-8 md:mb-12 whitespace-nowrap"
                >
                    {t[lang].heroDate}
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ fontFamily: 'Gyst, Georgia, serif' }}
                    className='font-bold text-[#fdc840] text-center text-6xl md:text-[120px] lg:text-[180px] leading-[0.9]'
                >
                    Birthday of Love
                </motion.h1>
            </div>
        </section>
    )
}

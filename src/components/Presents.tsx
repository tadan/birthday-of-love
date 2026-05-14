import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'
import presentImg from '../assets/present.png'

function CopyableField({ label, value }: { label: string; value: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <p
            onClick={handleCopy}
            style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'opacity 0.2s',
            }}
            title={`Click to copy ${label}`}
        >
            <strong>{label}:</strong> {value}
            <span
                style={{
                    fontSize: '14px',
                    opacity: copied ? 1 : 0.5,
                    transition: 'opacity 0.2s',
                }}
            >
                {copied ? '✓' : '⧉'}
            </span>
            {copied && (
                <span
                    style={{
                        fontSize: '14px',
                        color: '#d8400f',
                        fontWeight: 'bold',
                    }}
                >
                    Copied!
                </span>
            )}
        </p>
    )
}

export function Presents() {
    const { lang } = useLang()

    return (
        <section className='bg-[#f2ebd5] py-16 md:py-24 px-4'>
            <div className='mx-auto' style={{ maxWidth: '1000px' }}>
                <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-start'>
                    <div>
                        <h2
                            style={{ fontFamily: 'Gyst, Georgia, serif' }}
                            className='font-bold text-[#d8400f] text-4xl md:text-[72px] mb-6 md:mb-8'
                        >
                            {t[lang].presentsTitle}
                        </h2>

                        <div
                            style={{
                                fontFamily: 'Times New Roman, Times, serif',
                            }}
                            className='text-[#0d0d0d] space-y-6 md:space-y-8'
                        >
                            {t[lang].presentsIntro && (
                                <p className='text-[20px]'>
                                    {t[lang].presentsIntro}
                                </p>
                            )}
                            <p className='text-[20px]'>
                                {t[lang].presentsNoGifts}{' '}
                                <strong>{t[lang].presentsNoGiftsBold}</strong>
                            </p>
                            <p className='text-[20px]'>
                                {t[lang].presentsTreasure}
                            </p>
                            <p className='text-[20px]'>
                                {t[lang].presentsContribute}
                            </p>

                            <div
                                className='text-[20px] space-y-2'
                                style={{ marginTop: '1.5rem' }}
                            >
                                <CopyableField
                                    label='IBAN'
                                    value='LT73 3250 0545 3151 3851'
                                />
                                <CopyableField
                                    label={t[lang].presentsBeneficiary}
                                    value='D Tatasciore & B Hauksdottir'
                                />
                                <CopyableField label='BIC' value='REVOLT21' />
                            </div>
                        </div>
                    </div>

                    <motion.div
                        className='relative'
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <img
                            alt='Us together'
                            className='w-full h-auto'
                            src={presentImg}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RSVPForm } from './RSVPForm'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'

interface RSVPModalProps {
    isOpen: boolean
    onClose: () => void
}

interface SubmissionResult {
    success: boolean
    isAttending: boolean
}

export function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
    const [
        submissionResult,
        setSubmissionResult,
    ] = useState<SubmissionResult | null>(null)

    const handleSubmit = (result: SubmissionResult) => {
        setSubmissionResult(result)
    }

    const handleClose = () => {
        onClose()
        setTimeout(() => setSubmissionResult(null), 300)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        position: 'fixed',
                        inset: '0',
                        zIndex: 50,
                        backgroundColor: '#f2ebd5',
                        overflowY: 'auto',
                    }}
                >
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.1,
                        }}
                        style={{
                            position: 'relative',
                            minHeight: submissionResult ? 'auto' : '100vh',
                            height: submissionResult ? '100vh' : 'auto',
                            padding: '2rem',
                            display: submissionResult ? 'flex' : 'block',
                            alignItems: submissionResult
                                ? 'center'
                                : 'flex-start',
                            justifyContent: submissionResult
                                ? 'center'
                                : 'flex-start',
                        }}
                    >
                        <AnimatePresence mode='wait'>
                            {!submissionResult && (
                                <motion.div
                                    key='form'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        width: '100%',
                                        maxWidth: '40rem',
                                        margin: '0 auto',
                                    }}
                                >
                                    <RSVPForm
                                        onSubmit={handleSubmit}
                                        onClose={handleClose}
                                    />
                                </motion.div>
                            )}
                            {submissionResult && (
                                <motion.div
                                    key='success'
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    style={{ width: '100%', maxWidth: '48rem' }}
                                >
                                    <SuccessMessage
                                        isAttending={
                                            submissionResult.isAttending
                                        }
                                        onClose={handleClose}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

function SuccessMessage({
    isAttending,
    onClose,
}: {
    isAttending: boolean
    onClose: () => void
}) {
    const { lang } = useLang()

    return (
        <div
            style={{
                maxWidth: '42rem',
                margin: '0 auto',
                textAlign: 'center',
                position: 'relative',
            }}
        >
            {isAttending && (
                <>
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 0, scale: 0 }}
                            animate={{
                                opacity: [0, 1, 0],
                                y: [-20, -150],
                                scale: [0, 1, 0.8],
                                x: [0, (Math.random() - 0.5) * 100],
                            }}
                            transition={{
                                duration: 2,
                                delay: i * 0.1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{
                                position: 'absolute',
                                left: `${20 + Math.random() * 60}%`,
                                top: '50%',
                                fontSize: '2rem',
                                pointerEvents: 'none',
                            }}
                        >
                            {['\u{1F389}', '✨', '\u{1F49B}', '\u{1F31F}'][i % 4]}
                        </motion.div>
                    ))}
                </>
            )}

            <motion.h2
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2,
                }}
                style={{
                    fontFamily: 'Gyst, Georgia, serif',
                    fontWeight: 'bold',
                    color: '#d8400f',
                    fontSize: '2.25rem',
                    marginBottom: '1.5rem',
                }}
            >
                {isAttending
                    ? t[lang].rsvpSuccessAttending
                    : t[lang].rsvpSuccessNotAttending}
            </motion.h2>

            <div
                style={{
                    fontFamily: 'Times New Roman, Times, serif',
                    color: '#0d0d0d',
                    fontSize: '1.125rem',
                    marginBottom: '2rem',
                }}
            >
                {isAttending ? (
                    <>
                        <p
                            style={{
                                marginBottom: '1rem',
                                fontSize: '1.25rem',
                            }}
                        >
                            {t[lang].rsvpSuccessAttendingBody.split('\n')[0]}
                            <br />
                            {t[lang].rsvpSuccessAttendingBody.split('\n')[1]}{' '}
                            <a
                                href='mailto:wedding@daniele.is'
                                style={{
                                    color: '#d8400f',
                                    textDecoration: 'underline',
                                    fontSize: '1.25rem',
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.textDecoration =
                                        'none')
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.textDecoration =
                                        'underline')
                                }
                            >
                                wedding@daniele.is
                            </a>
                            <br />
                            <br />
                            {t[lang].rsvpSuccessWhatsApp}
                        </p>
                    </>
                ) : (
                    <>
                        <p
                            style={{
                                marginBottom: '1rem',
                                fontSize: '1.25rem',
                            }}
                        >
                            {t[lang].rsvpSuccessNotAttendingBody}
                        </p>
                        <p
                            style={{
                                marginBottom: '1rem',
                                fontSize: '1.25rem',
                            }}
                        >
                            {t[lang].rsvpSuccessContact}{' '}
                            <a
                                href='mailto:wedding@daniele.is'
                                style={{
                                    color: '#d8400f',
                                    textDecoration: 'underline',
                                    fontSize: '1.25rem',
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.textDecoration =
                                        'none')
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.textDecoration =
                                        'underline')
                                }
                            >
                                wedding@daniele.is
                            </a>
                        </p>
                    </>
                )}
            </div>

            <button
                onClick={onClose}
                style={{
                    fontFamily: 'Gyst, Georgia, serif',
                    cursor: 'pointer',
                    padding: '0.75rem 2rem',
                    backgroundColor: '#d8400f',
                    color: '#f2ebd5',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    border: 'none',
                    transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#b83510')
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#d8400f')
                }
            >
                {t[lang].rsvpClose}
            </button>
        </div>
    )
}

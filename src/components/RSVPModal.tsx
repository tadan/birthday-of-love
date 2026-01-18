import { useState } from 'react'
import { RSVPForm } from './RSVPForm'
import { X } from 'lucide-react'

interface RSVPModalProps {
    isOpen: boolean
    onClose: () => void
}

interface SubmissionResult {
    success: boolean
    isAttending: boolean
}

export function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
    const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null)
    const [isClosing, setIsClosing] = useState(false)

    const handleSubmit = (result: SubmissionResult) => {
        setSubmissionResult(result)
    }

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            onClose()
            setSubmissionResult(null)
            setIsClosing(false)
        }, 250)
    }

    if (!isOpen && !isClosing) return null

    return (
        <div
            style={{
                position: 'fixed',
                inset: '0',
                zIndex: 50,
                backgroundColor: '#f2ebd5',
                overflowY: 'auto',
                opacity: isClosing ? 0 : 1,
                transition: 'opacity 250ms'
            }}
        >
            <div
                style={{
                    position: 'relative',
                    minHeight: submissionResult ? 'auto' : '100vh',
                    height: submissionResult ? '100vh' : 'auto',
                    padding: '2rem',
                    display: submissionResult ? 'flex' : 'block',
                    alignItems: submissionResult ? 'center' : 'flex-start',
                    justifyContent: submissionResult ? 'center' : 'flex-start'
                }}
            >
                {!submissionResult && (
                    <div style={{ opacity: 1, transition: 'opacity 250ms', width: '100%', maxWidth: '48rem', margin: '0 auto' }}>
                        <RSVPForm onSubmit={handleSubmit} onClose={handleClose} />
                    </div>
                )}
                {submissionResult && (
                    <div style={{ opacity: 1, transition: 'opacity 250ms', width: '100%', maxWidth: '48rem' }}>
                        <SuccessMessage isAttending={submissionResult.isAttending} onClose={handleClose} />
                    </div>
                )}
            </div>
        </div>
    )
}

function SuccessMessage({ isAttending, onClose }: { isAttending: boolean; onClose: () => void }) {
    return (
        <div
            style={{
                maxWidth: '42rem',
                margin: '0 auto',
                textAlign: 'center'
            }}
        >
            <h2
                style={{
                    fontFamily: 'Gyst, Georgia, serif',
                    fontWeight: 'bold',
                    color: '#d8400f',
                    fontSize: '2.25rem',
                    marginBottom: '1.5rem'
                }}
            >
                {isAttending ? "We can't wait to see you!" : "We're sorry not to celebrate with you."}
            </h2>

            <div
                style={{
                    fontFamily: 'Times New Roman, Times, serif',
                    color: '#0d0d0d',
                    fontSize: '1.125rem',
                    marginBottom: '2rem'
                }}
            >
                {isAttending ? (
                    <>
                        <p style={{ marginBottom: '1rem' }}>Keep an eye out for an invite in the snail mail!</p>
                        <p style={{ marginBottom: '1rem' }}>
                            If you have any questions don't hesitate to contact us on our mobiles or email{' '}
                            <a
                                href='mailto:wedding@daniele.is'
                                style={{
                                    color: '#d8400f',
                                    textDecoration: 'underline'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'none'}
                                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'underline'}
                            >
                                wedding@daniele.is
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <p style={{ marginBottom: '1rem' }}>If you change your mind please let us know. We hope to see you in 2026.</p>
                        <p style={{ marginBottom: '1rem' }}>
                            If you have any questions don't hesitate to contact us on our mobiles or email{' '}
                            <a
                                href='mailto:wedding@daniele.is'
                                style={{
                                    color: '#d8400f',
                                    textDecoration: 'underline'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'none'}
                                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'underline'}
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
                    transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b83510'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d8400f'}
            >
                Close
            </button>
        </div>
    )
}

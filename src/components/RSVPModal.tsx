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
        <div className={`fixed inset-0 z-50 bg-[#f2ebd5] overflow-y-auto transition-opacity duration-250 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
            <div className='min-h-screen p-8'>
                <div className={`transition-opacity duration-250 ${submissionResult ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <RSVPForm onSubmit={handleSubmit} />
                </div>
                {submissionResult && (
                    <div className={`absolute inset-0 transition-opacity duration-250 flex items-center justify-center p-8 ${submissionResult ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className='min-h-screen flex items-center justify-center'>
                            <SuccessMessage isAttending={submissionResult.isAttending} onClose={handleClose} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function SuccessMessage({ isAttending, onClose }: { isAttending: boolean; onClose: () => void }) {
    return (
        <div className='max-w-2xl mx-auto text-center space-y-6'>
            <h2 style={{ fontFamily: 'Gyst, Georgia, serif' }} className='font-bold text-[#d8400f] text-4xl'>
                {isAttending ? "We can't wait to see you!" : "We're sorry not to celebrate with you."}
            </h2>

            <div style={{ fontFamily: 'Times New Roman, Times, serif' }} className='text-[#0d0d0d] text-lg space-y-4'>
                {isAttending ? (
                    <>
                        <p>Keep an eye out for an invite in the snail mail!</p>
                        <p>
                            If you have any questions don't hesitate to contact us on our mobiles or email{' '}
                            <a href='mailto:wedding@daniele.is' className='text-[#d8400f] underline hover:no-underline'>
                                wedding@daniele.is
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <p>If you change your mind please let us know. We hope to see you in 2026.</p>
                        <p>
                            If you have any questions don't hesitate to contact us on our mobiles or email{' '}
                            <a href='mailto:wedding@daniele.is' className='text-[#d8400f] underline hover:no-underline'>
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
                }}
                className='mt-8 px-8 py-3 bg-[#d8400f] text-[#f2ebd5] font-bold text-[20px] hover:bg-[#b83510] transition-colors'
            >
                Close
            </button>
        </div>
    )
}

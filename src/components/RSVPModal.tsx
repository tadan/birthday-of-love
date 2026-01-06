import { useState } from 'react'
import { RSVPForm } from './RSVPForm'
import { X } from 'lucide-react'
import imgEaf26Ddd2D3C455F936BF59A6A0D83441 from 'figma:asset/fbc77f4658200efd2d384f5c483254426dd6d7ad.png'

interface RSVPModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmissionComplete: () => void
}

interface SubmissionResult {
    success: boolean
    isAttending: boolean
}

export function RSVPModal({
    isOpen,
    onClose,
    onSubmissionComplete,
}: RSVPModalProps) {
    const [
        submissionResult,
        setSubmissionResult,
    ] = useState<SubmissionResult | null>(null)

    const handleSubmit = (result: SubmissionResult) => {
        setSubmissionResult(result)
        onSubmissionComplete()
    }

    const handleClose = () => {
        onClose()
        setTimeout(() => setSubmissionResult(null), 300)
    }

    if (!isOpen) {
        return null
    }

    return (
        <div className='fixed inset-0 z-[9999] bg-[#f2ebd5] overflow-y-auto'>
            {/* Close Button */}
            <button
                onClick={handleClose}
                className='fixed top-4 right-4 md:top-6 md:right-6 z-[10000] p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg hover:scale-110'
                style={{ cursor: 'pointer' }}
                aria-label='Close'
            >
                <X className='w-5 h-5 md:w-6 md:h-6 text-[#0d0d0d]' />
            </button>

            {/* Modal Content */}
            <div className='relative min-h-screen flex items-start justify-center py-8 md:py-12 px-4 md:px-6'>
                <div className='max-w-[600px] w-full mt-8 md:mt-12'>
                    {submissionResult ? (
                        <SuccessMessage
                            isAttending={submissionResult.isAttending}
                        />
                    ) : (
                        <RSVPForm onSubmit={handleSubmit} />
                    )}
                </div>
            </div>
        </div>
    )
}

function SuccessMessage({ isAttending }: { isAttending: boolean }) {
    return (
        <div className='text-center space-y-6 md:space-y-8'>
            <h2
                style={{ fontFamily: 'Gyst, Georgia, serif' }}
                className='font-bold text-[#d8400f] text-3xl md:text-4xl lg:text-5xl leading-tight'
            >
                {isAttending
                    ? "We can't wait to see you!"
                    : "We're sorry not to celebrate with you."}
            </h2>

            <div
                style={{ fontFamily: 'Times New Roman, Times, serif' }}
                className='text-[#0d0d0d] text-base md:text-lg lg:text-xl space-y-4 max-w-2xl mx-auto'
            >
                {isAttending ? (
                    <>
                        <p>Keep an eye out for an invite in the snail mail!</p>
                        <p>
                            If you have any questions don't hesitate to contact
                            us on our mobiles or email{' '}
                            <a
                                href='mailto:wedding@daniele.is'
                                className='text-[#d8400f] underline hover:no-underline transition-all'
                            >
                                wedding@daniele.is
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <p>
                            If you change your mind please let us know. We hope
                            to see you in 2026.
                        </p>
                        <p>
                            If you have any questions don't hesitate to contact
                            us on our mobiles or email{' '}
                            <a
                                href='mailto:wedding@daniele.is'
                                className='text-[#d8400f] underline hover:no-underline transition-all'
                            >
                                wedding@daniele.is
                            </a>
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

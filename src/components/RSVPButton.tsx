import { useState } from 'react'
import { RSVPModal } from './RSVPModal'

export function RSVPButton() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        fontFamily: 'Gyst, Georgia, serif',
                        cursor: 'pointer',
                        transition: 'all var(--duration-base) var(--ease-out-quart)',
                        animation: 'rsvp-pulse 2.5s var(--ease-in-out-quart) infinite',
                    }}
                    className='mt-8 px-8 py-3 bg-[#d8400f] text-[#f2ebd5] font-bold text-[20px] hover:scale-105 hover:shadow-lg active:scale-95 hover:bg-[#b83510]'
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.transform = 'scale(0.95)'
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)'
                    }}
                >
                    Click to RSVP
                </button>
            )}

            <RSVPModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />

            <style>{`
                @keyframes rsvp-pulse {
                    0%, 100% {
                        box-shadow: 0 0 0 0 rgba(216, 64, 15, 0.4);
                    }
                    50% {
                        box-shadow: 0 0 0 12px rgba(216, 64, 15, 0);
                    }
                }
            `}</style>
        </>
    )
}

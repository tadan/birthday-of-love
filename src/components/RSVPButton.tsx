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
                    }}
                    className='mt-8 px-8 py-3 bg-[#d8400f] text-[#f2ebd5] font-bold text-[20px] hover:bg-[#b83510] transition-colors'
                >
                    Click to RSVP
                </button>
            )}

            <RSVPModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    )
}

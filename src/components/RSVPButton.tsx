import { useState, useEffect } from 'react';
import { RSVPModal } from './RSVPModal';

const STORAGE_KEY = 'birthday-of-love-rsvp-submitted';

export function RSVPButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already submitted RSVP
    const submitted = localStorage.getItem(STORAGE_KEY) === 'true';
    setHasSubmitted(submitted);
  }, []);

  const handleSubmissionComplete = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setHasSubmitted(true);
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  // Don't render button if already submitted
  if (hasSubmitted) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleClick}
        style={{ fontFamily: 'Gyst, Georgia, serif', cursor: 'pointer' }}
        className='mt-8 px-8 py-3 bg-[#d8400f] text-[#f2ebd5] font-bold text-[20px] hover:bg-[#b83510] transition-colors'
      >
        Click to RSVP
      </button>

      <RSVPModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmissionComplete={handleSubmissionComplete}
      />
    </>
  );
}

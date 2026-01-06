import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { RSVPForm } from './RSVPForm';
import imgEaf26Ddd2D3C455F936BF59A6A0D83441 from 'figma:asset/fbc77f4658200efd2d384f5c483254426dd6d7ad.png';

interface RSVPDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmissionComplete: () => void;
}

interface SubmissionResult {
  success: boolean;
  isAttending: boolean;
}

export function RSVPDialog({ isOpen, onClose, onSubmissionComplete }: RSVPDialogProps) {
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  const handleSubmit = (result: SubmissionResult) => {
    setSubmissionResult(result);
    onSubmissionComplete();
  };

  const handleOpenChange = (open: boolean) => {
    console.log('Dialog onOpenChange:', open);
    if (!open) {
      onClose();
      // Reset submission result after closing animation
      setTimeout(() => setSubmissionResult(null), 300);
    }
  };

  console.log('RSVPDialog rendering, isOpen:', isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="!max-w-none !w-full !h-screen !max-h-screen !top-0 !left-0 !translate-x-0 !translate-y-0 overflow-y-auto bg-[#f2ebd5] p-0 gap-0 z-[9999] rounded-none border-none"
        onInteractOutside={(e) => {
          console.log('onInteractOutside called');
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          console.log('onEscapeKeyDown called');
        }}
      >
        <DialogTitle className="sr-only">RSVP to Birthday of Love</DialogTitle>
        <DialogDescription className="sr-only">
          {submissionResult
            ? "Your RSVP has been submitted successfully"
            : "Fill out this form to RSVP to our wedding celebration"}
        </DialogDescription>

        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] w-full">
          <img
            alt="Birthday of Love celebration"
            className="absolute inset-0 w-full h-full object-cover"
            src={imgEaf26Ddd2D3C455F936BF59A6A0D83441}
          />
          <div className="absolute inset-0 bg-[rgba(24,41,92,0.2)]" />

          {/* Hero Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="font-['ABC_Favorit_Condensed_Unlicensed_Trial:Bold',sans-serif] text-[#f2ebd5] text-xl md:text-[24px] mb-4">
              29 August 2026 — Abruzzo
            </p>
            <h1
              style={{ fontFamily: 'Gyst, Georgia, serif' }}
              className="font-bold text-[#fdc840] text-5xl md:text-[100px] leading-[0.9]"
            >
              Birthday of Love
            </h1>
          </div>
        </div>

        {/* Form or Success Message */}
        <div className="px-6 py-8 md:px-12 md:py-12 max-w-[600px] mx-auto w-full">
          {submissionResult ? (
            <SuccessMessage isAttending={submissionResult.isAttending} />
          ) : (
            <RSVPForm onSubmit={handleSubmit} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SuccessMessage({ isAttending }: { isAttending: boolean }) {
  return (
    <div className="text-center space-y-6">
      <h2
        style={{ fontFamily: 'Gyst, Georgia, serif' }}
        className="font-bold text-[#d8400f] text-4xl md:text-5xl"
      >
        {isAttending ? "We can't wait to see you!" : "We're sorry not to celebrate with you."}
      </h2>

      <div
        style={{ fontFamily: 'Times New Roman, Times, serif' }}
        className="text-[#0d0d0d] text-lg md:text-xl space-y-4"
      >
        {isAttending ? (
          <>
            <p>Keep an eye out for an invite in the snail mail!</p>
            <p>
              If you have any questions don't hesitate to contact us on our mobiles or email{' '}
              <a
                href="mailto:wedding@daniele.is"
                className="text-[#d8400f] underline hover:no-underline"
              >
                wedding@daniele.is
              </a>
            </p>
          </>
        ) : (
          <>
            <p>If you change your mind please let us know. We hope to see you in 2026.</p>
            <p>
              If you have any questions don't hesitate to contact us on our mobiles or email{' '}
              <a
                href="mailto:wedding@daniele.is"
                className="text-[#d8400f] underline hover:no-underline"
              >
                wedding@daniele.is
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

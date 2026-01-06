import { useForm } from 'react-hook-form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { useState } from 'react';

interface RSVPFormData {
  name: string;
  surname: string;
  isAttending: string;
  foodPreference?: string;
  address?: string;
  guests?: string;
  notes?: string;
}

interface RSVPFormProps {
  onSubmit: (result: { success: boolean; isAttending: boolean }) => void;
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgknvop';

export function RSVPForm({ onSubmit }: RSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RSVPFormData>({
    defaultValues: {
      isAttending: 'yes',
    },
  });

  const isAttending = attending === 'yes';

  const onFormSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Format email body
      const attendingText = attending === 'yes' ? 'Yes' : 'No';
      let emailBody = `Attending: ${attendingText}\n\nName: ${data.name}\nSurname: ${data.surname}`;

      if (attending === 'yes') {
        emailBody += `\n\nFood preference: ${data.foodPreference || 'Not specified'}`;
        emailBody += `\nAddress: ${data.address || 'Not provided'}`;
        emailBody += `\nGuests: ${data.guests || 'None specified'}`;
        emailBody += `\nAdditional notes: ${data.notes || 'None'}`;
      } else {
        emailBody += '\n\n(Sent regrets)';
      }

      // Submit to Formspree
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: `RSVP - ${data.name} ${data.surname} - ${attendingText === 'Yes' ? 'Attending' : 'Not Attending'}`,
          message: emailBody,
          name: data.name,
          surname: data.surname,
          attending: attendingText,
          ...(attending === 'yes' && {
            foodPreference: data.foodPreference,
            address: data.address,
            guests: data.guests,
            notes: data.notes,
          }),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit RSVP');
      }

      // Success!
      onSubmit({ success: true, isAttending: attending === 'yes' });
    } catch (err) {
      console.error('RSVP submission error:', err);
      setError('Unable to submit RSVP. Please email us directly at wedding@daniele.is');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <h2
        style={{ fontFamily: 'Gyst, Georgia, serif' }}
        className="text-[#d8400f] text-4xl font-bold mb-8"
      >
        You're invited!
      </h2>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          style={{ fontFamily: 'Times New Roman, Times, serif' }}
          className="block text-black text-lg mb-2"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          style={{ border: '1px solid lightgray' }}
          className="w-full bg-white h-12 text-base px-3 rounded"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Surname */}
      <div>
        <label
          htmlFor="surname"
          style={{ fontFamily: 'Times New Roman, Times, serif' }}
          className="block text-black text-lg mb-2"
        >
          Surname
        </label>
        <input
          id="surname"
          type="text"
          {...register('surname', { required: 'Surname is required' })}
          style={{ border: '1px solid lightgray' }}
          className="w-full bg-white h-12 text-base px-3 rounded"
          disabled={isSubmitting}
        />
        {errors.surname && (
          <p className="text-red-600 text-sm mt-1">{errors.surname.message}</p>
        )}
      </div>

      {/* Are you attending? */}
      <div>
        <label
          style={{ fontFamily: 'Times New Roman, Times, serif' }}
          className="block text-black text-lg mb-3"
        >
          Are you attending?
        </label>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="attending-yes"
              value="yes"
              checked={attending === 'yes'}
              onChange={(e) => setAttending(e.target.value as 'yes' | 'no')}
              className="w-5 h-5"
              disabled={isSubmitting}
            />
            <label
              htmlFor="attending-yes"
              style={{ fontFamily: 'Times New Roman, Times, serif', cursor: 'pointer' }}
              className="text-black text-base"
            >
              Yes, can't wait!
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="attending-no"
              value="no"
              checked={attending === 'no'}
              onChange={(e) => setAttending(e.target.value as 'yes' | 'no')}
              className="w-5 h-5"
              disabled={isSubmitting}
            />
            <label
              htmlFor="attending-no"
              style={{ fontFamily: 'Times New Roman, Times, serif', cursor: 'pointer' }}
              className="text-black text-base"
            >
              Sorry, can't make it.
            </label>
          </div>
        </div>
      </div>

      {/* Conditional fields - only show if attending */}
      {isAttending && (
        <>
          {/* Food preference */}
          <div>
            <label
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
              className="block text-black text-lg mb-3"
            >
              Food preference
            </label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="food-vegetarian"
                  value="vegetarian"
                  {...register('foodPreference', { required: isAttending ? 'Please select a food preference' : false })}
                  className="w-5 h-5"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="food-vegetarian"
                  style={{ fontFamily: 'Times New Roman, Times, serif', cursor: 'pointer' }}
                  className="text-black text-base"
                >
                  Vegetarian
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="food-pescatarian"
                  value="pescatarian"
                  {...register('foodPreference', { required: isAttending ? 'Please select a food preference' : false })}
                  className="w-5 h-5"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="food-pescatarian"
                  style={{ fontFamily: 'Times New Roman, Times, serif', cursor: 'pointer' }}
                  className="text-black text-base"
                >
                  Pescatarian
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="food-no-restriction"
                  value="no-restriction"
                  {...register('foodPreference', { required: isAttending ? 'Please select a food preference' : false })}
                  className="w-5 h-5"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="food-no-restriction"
                  style={{ fontFamily: 'Times New Roman, Times, serif', cursor: 'pointer' }}
                  className="text-black text-base"
                >
                  No dietary restriction
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="food-vegan"
                  value="vegan"
                  {...register('foodPreference', { required: isAttending ? 'Please select a food preference' : false })}
                  className="w-5 h-5"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="food-vegan"
                  style={{ fontFamily: 'Times New Roman, Times, serif', cursor: 'pointer' }}
                  className="text-black text-base"
                >
                  Vegan
                </label>
              </div>
            </div>
            {errors.foodPreference && (
              <p className="text-red-600 text-sm mt-1">{errors.foodPreference.message}</p>
            )}
          </div>

          {/* Your address */}
          <div>
            <label
              htmlFor="address"
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
              className="block text-black text-lg mb-2"
            >
              Your address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Your address"
              {...register('address', { required: 'Address is required' })}
              style={{ border: '1px solid lightgray' }}
              className="w-full bg-white h-12 text-base px-3 rounded"
              disabled={isSubmitting}
            />
            {errors.address && (
              <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Will you bring a guest? */}
          <div>
            <label
              htmlFor="guests"
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
              className="block text-black text-lg mb-1"
            >
              Will you bring a guest?
            </label>
            <p
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
              className="text-black text-sm mb-2"
            >
              Please let us know who will attend with you. You, your partner and children are very
              welcome.
            </p>
            <textarea
              id="guests"
              placeholder="Full names of those attending with you."
              {...register('guests', { required: 'Please list who will attend with you' })}
              style={{ border: '1px solid lightgray' }}
              className="w-full bg-white text-base p-3 rounded min-h-[100px]"
              disabled={isSubmitting}
            />
            {errors.guests && (
              <p className="text-red-600 text-sm mt-1">{errors.guests.message}</p>
            )}
          </div>

          {/* Anything else we should know? */}
          <div>
            <label
              htmlFor="notes"
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
              className="block text-black text-lg mb-2"
            >
              Anything else we should know?
            </label>
            <textarea
              id="notes"
              placeholder="Anything else you want to tell us..."
              {...register('notes')}
              style={{ border: '1px solid lightgray' }}
              className="w-full bg-white text-base p-3 rounded min-h-[100px]"
              disabled={isSubmitting}
            />
          </div>
        </>
      )}

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-50 rounded" style={{ border: '1px solid lightcoral' }}>
          <p className="text-red-800 text-sm" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{error}</p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{ fontFamily: 'Gyst, Georgia, serif', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
        className="w-full py-3 bg-[#d8400f] text-white font-bold text-xl hover:bg-[#b83510] transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

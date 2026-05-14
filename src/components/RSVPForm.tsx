import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'

interface RSVPFormData {
    name: string
    surname: string
    isAttending: string
    foodPreference?: string
    lactoseIntolerant?: boolean
    celiac?: boolean
    nutAllergy?: boolean
    otherAllergy?: string
    address?: string
    guests?: string
    shuttleService?: string
    notes?: string
}

interface RSVPFormProps {
    onSubmit: (result: { success: boolean; isAttending: boolean }) => void
    onClose: () => void
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgknvop'

export function RSVPForm({ onSubmit, onClose }: RSVPFormProps) {
    const { lang } = useLang()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [attending, setAttending] = useState<'yes' | 'no'>('yes')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RSVPFormData>({
        defaultValues: {
            isAttending: 'yes',
        },
    })

    const isAttending = attending === 'yes'

    const onFormSubmit = async (data: RSVPFormData) => {
        setIsSubmitting(true)
        setError(null)

        try {
            const attendingText = attending === 'yes' ? 'Yes' : 'No'
            let emailBody = `Attending: ${attendingText}\n\nName: ${data.name}\nSurname: ${data.surname}\nLanguage: ${lang}`

            if (attending === 'yes') {
                emailBody += `\n\nFood preference: ${
                    data.foodPreference || 'Not specified'
                }`

                const allergies = []
                if (data.lactoseIntolerant) allergies.push('Lactose intolerant')
                if (data.celiac) allergies.push('Celiac (gluten-free)')
                if (data.nutAllergy) allergies.push('Nut allergy')
                if (data.otherAllergy) allergies.push(data.otherAllergy)
                emailBody += `\nAllergies/Intolerances: ${
                    allergies.length > 0 ? allergies.join(', ') : 'None'
                }`

                emailBody += `\nAddress: ${data.address || 'Not provided'}`
                emailBody += `\nGuests: ${data.guests || 'None specified'}`
                emailBody += `\nShuttle service: ${
                    data.shuttleService || 'Not specified'
                }`
                emailBody += `\nAdditional notes: ${data.notes || 'None'}`
            } else {
                emailBody += '\n\n(Sent regrets)'
            }

            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: `RSVP - ${data.name} ${data.surname} - ${
                        attendingText === 'Yes' ? 'Attending' : 'Not Attending'
                    }`,
                    message: emailBody,
                    name: data.name,
                    surname: data.surname,
                    attending: attendingText,
                    ...(attending === 'yes' && {
                        foodPreference: data.foodPreference,
                        lactoseIntolerant: data.lactoseIntolerant,
                        celiac: data.celiac,
                        nutAllergy: data.nutAllergy,
                        otherAllergy: data.otherAllergy,
                        address: data.address,
                        guests: data.guests,
                        shuttleService: data.shuttleService,
                        notes: data.notes,
                    }),
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to submit RSVP')
            }

            onSubmit({ success: true, isAttending: attending === 'yes' })
        } catch (err) {
            console.error('RSVP submission error:', err)
            setError(t[lang].rsvpSubmitError)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='max-w-2xl mx-auto relative'>
            <button
                type='button'
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '-4rem',
                    right: '-1rem',
                    background: 'none',
                    border: 'none',
                    fontSize: '3rem',
                    cursor: 'pointer',
                    color: '#0d0d0d',
                    lineHeight: '1',
                    padding: '0.5rem',
                    zIndex: 10,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#d8400f')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#0d0d0d')}
                aria-label='Close form'
            >
                ×
            </button>

            <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-6'>
                <h2
                    style={{ fontFamily: 'Gyst, Georgia, serif' }}
                    className='text-[#d8400f] text-4xl font-bold mt-12 mb-8'
                >
                    {t[lang].rsvpFormTitle}
                </h2>

                {/* Name */}
                <div>
                    <label
                        htmlFor='name'
                        style={{
                            fontFamily: 'Times New Roman, Times, serif',
                            textAlign: 'left',
                            display: 'block',
                            fontSize: '1.5rem',
                        }}
                        className='block text-left'
                    >
                        {t[lang].rsvpNameLabel}
                    </label>
                    <input
                        id='name'
                        type='text'
                        placeholder={t[lang].rsvpNamePlaceholder}
                        {...register('name', { required: t[lang].rsvpNameRequired })}
                        style={{
                            backgroundColor: 'white',
                            paddingLeft: '1rem',
                            paddingTop: '.5rem',
                            paddingBottom: '.5rem',
                            fontSize: '1.2rem',
                        }}
                        className='w-full bg-white h-12 text-base px-3 rounded'
                        disabled={isSubmitting}
                    />
                    {errors.name && (
                        <p
                            style={{
                                color: 'red',
                                marginTop: '0.5rem',
                                fontSize: '0.95rem',
                                textAlign: 'left',
                            }}
                        >
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Surname */}
                <div>
                    <label
                        htmlFor='surname'
                        style={{
                            fontFamily: 'Times New Roman, Times, serif',
                            textAlign: 'left',
                            display: 'block',
                            fontSize: '1.5rem',
                        }}
                    >
                        {t[lang].rsvpSurnameLabel}
                    </label>
                    <input
                        id='surname'
                        type='text'
                        placeholder={t[lang].rsvpSurnamePlaceholder}
                        {...register('surname', {
                            required: t[lang].rsvpSurnameRequired,
                        })}
                        style={{
                            backgroundColor: 'white',
                            paddingLeft: '1rem',
                            paddingTop: '.5rem',
                            paddingBottom: '.5rem',
                            fontSize: '1.2rem',
                        }}
                        className='w-full px-3'
                        disabled={isSubmitting}
                    />
                    {errors.surname && (
                        <p
                            style={{
                                color: 'red',
                                marginTop: '0.5rem',
                                fontSize: '0.95rem',
                                textAlign: 'left',
                            }}
                        >
                            {errors.surname.message}
                        </p>
                    )}
                </div>

                {/* Are you attending? */}
                <div>
                    <label
                        style={{
                            fontFamily: 'Times New Roman, Times, serif',
                            textAlign: 'left',
                            display: 'block',
                            fontSize: '1.5rem',
                            marginBottom: '0.5rem',
                        }}
                        className='block text-left text-black text-lg mb-3'
                    >
                        {t[lang].rsvpAttendingLabel}
                    </label>
                    <div className='space-y-2'>
                        <div className='flex items-center'>
                            <input
                                type='radio'
                                id='attending-yes'
                                value='yes'
                                checked={attending === 'yes'}
                                onChange={(e) =>
                                    setAttending(e.target.value as 'yes' | 'no')
                                }
                                style={{ accentColor: '#0d0d0d' }}
                                disabled={isSubmitting}
                            />
                            <label
                                htmlFor='attending-yes'
                                style={{
                                    fontFamily: 'Times New Roman, Times, serif',
                                    cursor: 'pointer',
                                    marginLeft: '.5rem',
                                }}
                                className='text-black text-base'
                            >
                                {t[lang].rsvpAttendingYes}
                            </label>
                        </div>
                        <div className='flex items-center'>
                            <input
                                type='radio'
                                id='attending-no'
                                value='no'
                                checked={attending === 'no'}
                                onChange={(e) =>
                                    setAttending(e.target.value as 'yes' | 'no')
                                }
                                style={{ accentColor: '#0d0d0d' }}
                                disabled={isSubmitting}
                            />
                            <label
                                htmlFor='attending-no'
                                style={{
                                    fontFamily: 'Times New Roman, Times, serif',
                                    cursor: 'pointer',
                                    marginLeft: '.5rem',
                                }}
                                className='text-black text-base'
                            >
                                {t[lang].rsvpAttendingNo}
                            </label>
                        </div>
                    </div>
                </div>

                {/* Conditional fields - only show if attending */}
                {isAttending && (
                    <>
                        {/* Your address */}
                        <div>
                            <label
                                htmlFor='address'
                                style={{
                                    fontFamily: 'Times New Roman, Times, serif',
                                    textAlign: 'left',
                                    display: 'block',
                                    fontSize: '1.5rem',
                                    marginBottom: '0.5rem',
                                }}
                                className='block text-left text-black text-lg mb-2'
                            >
                                {t[lang].rsvpAddressLabel}
                            </label>
                            <input
                                id='address'
                                type='text'
                                placeholder={t[lang].rsvpAddressPlaceholder}
                                {...register('address', {
                                    required: t[lang].rsvpAddressRequired,
                                })}
                                style={{
                                    backgroundColor: 'white',
                                    paddingLeft: '1rem',
                                    paddingTop: '.5rem',
                                    paddingBottom: '.5rem',
                                    fontSize: '1.2rem',
                                }}
                                className='w-full h-12'
                                disabled={isSubmitting}
                            />
                            {errors.address && (
                                <p
                                    style={{
                                        color: 'red',
                                        marginTop: '0.5rem',
                                        fontSize: '0.95rem',
                                        textAlign: 'left',
                                    }}
                                >
                                    {errors.address.message}
                                </p>
                            )}
                        </div>

                        {/* Food preference */}
                        <div>
                            <label
                                style={{
                                    fontFamily: 'Times New Roman, Times, serif',
                                    textAlign: 'left',
                                    display: 'block',
                                    fontSize: '1.5rem',
                                    marginTop: '1.5rem',
                                    marginBottom: '.5rem',
                                }}
                                className='block text-left text-black text-lg mb-3'
                            >
                                {t[lang].rsvpFoodLabel}
                            </label>
                            <div className='space-y-2'>
                                <div className='flex items-center'>
                                    <input
                                        type='radio'
                                        id='food-vegetarian'
                                        value='vegetarian'
                                        {...register('foodPreference', {
                                            required: isAttending
                                                ? t[lang].rsvpFoodRequired
                                                : false,
                                        })}
                                        style={{ accentColor: '#0d0d0d' }}
                                        className='w-5 h-5'
                                        disabled={isSubmitting}
                                    />
                                    <label
                                        htmlFor='food-vegetarian'
                                        style={{
                                            fontFamily:
                                                'Times New Roman, Times, serif',
                                            marginLeft: '.5rem',
                                            cursor: 'pointer',
                                        }}
                                        className='text-black text-base'
                                    >
                                        {t[lang].rsvpFoodVegetarian}
                                    </label>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type='radio'
                                        id='food-pescatarian'
                                        value='pescatarian'
                                        {...register('foodPreference', {
                                            required: isAttending
                                                ? t[lang].rsvpFoodRequired
                                                : false,
                                        })}
                                        style={{ accentColor: '#0d0d0d' }}
                                        className='w-5 h-5'
                                        disabled={isSubmitting}
                                    />
                                    <label
                                        htmlFor='food-pescatarian'
                                        style={{
                                            fontFamily:
                                                'Times New Roman, Times, serif',
                                            cursor: 'pointer',
                                            marginLeft: '.5rem',
                                        }}
                                        className='text-black text-base'
                                    >
                                        {t[lang].rsvpFoodPescatarian}
                                    </label>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type='radio'
                                        id='food-no-restriction'
                                        value='no-restriction'
                                        {...register('foodPreference', {
                                            required: isAttending
                                                ? t[lang].rsvpFoodRequired
                                                : false,
                                        })}
                                        style={{ accentColor: '#0d0d0d' }}
                                        className='w-5 h-5'
                                        disabled={isSubmitting}
                                    />
                                    <label
                                        htmlFor='food-no-restriction'
                                        style={{
                                            fontFamily:
                                                'Times New Roman, Times, serif',
                                            cursor: 'pointer',
                                            marginLeft: '.5rem',
                                        }}
                                        className='text-black text-base'
                                    >
                                        {t[lang].rsvpFoodNoRestriction}
                                    </label>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type='radio'
                                        id='food-vegan'
                                        value='vegan'
                                        {...register('foodPreference', {
                                            required: isAttending
                                                ? t[lang].rsvpFoodRequired
                                                : false,
                                        })}
                                        style={{ accentColor: '#0d0d0d' }}
                                        className='w-5 h-5'
                                        disabled={isSubmitting}
                                    />
                                    <label
                                        htmlFor='food-vegan'
                                        style={{
                                            fontFamily:
                                                'Times New Roman, Times, serif',
                                            cursor: 'pointer',
                                            marginLeft: '.5rem',
                                        }}
                                        className='text-black text-base'
                                    >
                                        {t[lang].rsvpFoodVegan}
                                    </label>
                                </div>
                            </div>
                            {errors.foodPreference && (
                                <p
                                    style={{
                                        color: 'red',
                                        marginTop: '0.5rem',
                                        fontSize: '0.95rem',
                                        textAlign: 'left',
                                    }}
                                >
                                    {errors.foodPreference.message}
                                </p>
                            )}
                        </div>

                        {/* Allergies/intolerances */}
                        <div>
                            <label
                                style={{
                                    fontFamily: 'Times New Roman, Times, serif',
                                    textAlign: 'left',
                                    display: 'block',
                                    fontSize: '1.5rem',
                                    marginBottom: '0.5rem',
                                }}
                                className='block text-left text-black text-lg mb-3'
                            >
                                {t[lang].rsvpAllergiesLabel}
                            </label>
                            <div className='space-y-2'>
                                <div className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        id='lactose'
                                        {...register('lactoseIntolerant')}
                                        style={{ accentColor: '#0d0d0d' }}
                                        className='w-5 h-5'
                                        disabled={isSubmitting}
                                    />
                                    <label
                                        htmlFor='lactose'
                                        style={{
                                            fontFamily:
                                                'Times New Roman, Times, serif',
                                            marginLeft: '.5rem',
                                            cursor: 'pointer',
                                        }}
                                        className='text-black text-base'
                                    >
                                        {t[lang].rsvpAllergyLactose}
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        id='celiac'
                                        {...register('celiac')}
                                        style={{ accentColor: '#0d0d0d' }}
                                        className='w-5 h-5'
                                        disabled={isSubmitting}
                                    />
                                    <label
                                        htmlFor='celiac'
                                        style={{
                                            fontFamily:
                                                'Times New Roman, Times, serif',
                                            marginLeft: '.5rem',
                                            cursor: 'pointer',
                                        }}
                                        className='text-black text-base'
                                    >
                                        {t[lang].rsvpAllergyCeliac}
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        id='nutAllergy'
                                        {...register('nutAllergy')}
                                        style={{ accentColor: '#0d0d0d' }}
                                        className='w-5 h-5'
                                        disabled={isSubmitting}
                                    />
                                    <label
                                        htmlFor='nutAllergy'
                                        style={{
                                            fontFamily:
                                                'Times New Roman, Times, serif',
                                            marginLeft: '.5rem',
                                            cursor: 'pointer',
                                        }}
                                        className='text-black text-base'
                                    >
                                        {t[lang].rsvpAllergyNut}
                                    </label>
                                </div>
                                <div className='flex items-start gap-2'>
                                    <span
                                        style={{
                                            fontFamily:
                                                'Times New Roman, Times, serif',
                                            paddingTop: '0.375rem',
                                        }}
                                        className='text-black text-base'
                                    >
                                        {t[lang].rsvpAllergyOther}
                                    </span>
                                    <input
                                        id='otherAllergy'
                                        type='text'
                                        placeholder={t[lang].rsvpAllergyOtherPlaceholder}
                                        {...register('otherAllergy')}
                                        style={{
                                            backgroundColor: 'white',
                                            paddingLeft: '1rem',
                                            paddingTop: '.5rem',
                                            paddingBottom: '.5rem',
                                            marginLeft: '0.5rem',
                                            fontSize: '1.2rem',
                                            flex: 1,
                                        }}
                                        className='h-12 text-base px-3 rounded'
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Will you bring a guest? */}
                        <div>
                            <label
                                htmlFor='guests'
                                style={{
                                    fontFamily: 'Times New Roman, Times, serif',
                                    textAlign: 'left',
                                    display: 'block',
                                    fontSize: '1.5rem',
                                }}
                            >
                                {t[lang].rsvpGuestsLabel}
                            </label>
                            <p
                                style={{
                                    fontFamily: 'Times New Roman, Times, serif',
                                    fontSize: '1.2rem',
                                    textAlign: 'left',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                {t[lang].rsvpGuestsDesc}
                            </p>
                            <textarea
                                id='guests'
                                placeholder={t[lang].rsvpGuestsPlaceholder}
                                {...register('guests')}
                                style={{
                                    backgroundColor: 'white',
                                    paddingLeft: '1rem',
                                    paddingTop: '.5rem',
                                    paddingBottom: '.5rem',
                                    fontSize: '1.2rem',
                                }}
                                className='w-full bg-white text-base p-3 rounded min-h-[100px]'
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Shuttle service */}
                        <div>
                            <label
                                style={{
                                    fontFamily: 'Times New Roman, Times, serif',
                                    textAlign: 'left',
                                    display: 'block',
                                    fontSize: '1.5rem',
                                    marginBottom: '0.5rem',
                                }}
                                className='block text-left text-black text-lg mb-3'
                            >
                                {t[lang].rsvpShuttleLabel}
                            </label>
                            <p
                                style={{
                                    fontFamily: 'Times New Roman, Times, serif',
                                    fontSize: '1.2rem',
                                    textAlign: 'left',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                {t[lang].rsvpShuttleDesc}
                            </p>
                            <div className='space-y-2'>
                                <div className='flex items-center'>
                                    <input
                                        type='radio'
                                        id='shuttle-yes'
                                        value='yes'
                                        {...register('shuttleService', {
                                            required: isAttending
                                                ? t[lang].rsvpShuttleRequired
                                                : false,
                                        })}
                                        style={{ accentColor: '#0d0d0d' }}
                                        disabled={isSubmitting}
                                    />
                                    <label
                                        htmlFor='shuttle-yes'
                                        style={{
                                            fontFamily:
                                                'Times New Roman, Times, serif',
                                            cursor: 'pointer',
                                            marginLeft: '.5rem',
                                        }}
                                        className='text-black text-base'
                                    >
                                        {t[lang].rsvpShuttleYes}
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <input
                                        type='radio'
                                        id='shuttle-no'
                                        value='no'
                                        {...register('shuttleService', {
                                            required: isAttending
                                                ? t[lang].rsvpShuttleRequired
                                                : false,
                                        })}
                                        style={{ accentColor: '#0d0d0d' }}
                                        disabled={isSubmitting}
                                    />
                                    <label
                                        htmlFor='shuttle-no'
                                        style={{
                                            fontFamily:
                                                'Times New Roman, Times, serif',
                                            cursor: 'pointer',
                                            marginLeft: '.5rem',
                                        }}
                                        className='text-black text-base'
                                    >
                                        {t[lang].rsvpShuttleNo}
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <input
                                        type='radio'
                                        id='shuttle-undecided'
                                        value='undecided'
                                        {...register('shuttleService', {
                                            required: isAttending
                                                ? t[lang].rsvpShuttleRequired
                                                : false,
                                        })}
                                        style={{ accentColor: '#0d0d0d' }}
                                        disabled={isSubmitting}
                                    />
                                    <label
                                        htmlFor='shuttle-undecided'
                                        style={{
                                            fontFamily:
                                                'Times New Roman, Times, serif',
                                            cursor: 'pointer',
                                            marginLeft: '.5rem',
                                        }}
                                        className='text-black text-base'
                                    >
                                        {t[lang].rsvpShuttleUndecided}
                                    </label>
                                </div>
                            </div>
                            {errors.shuttleService && (
                                <p
                                    style={{
                                        color: 'red',
                                        marginTop: '0.5rem',
                                        fontSize: '0.95rem',
                                        textAlign: 'left',
                                    }}
                                >
                                    {errors.shuttleService.message}
                                </p>
                            )}
                        </div>

                        {/* Notes */}
                        <div>
                            <label
                                htmlFor='notes'
                                style={{
                                    fontFamily: 'Times New Roman, Times, serif',
                                    textAlign: 'left',
                                    display: 'block',
                                    fontSize: '1.5rem',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                {t[lang].rsvpNotesLabel}
                            </label>
                            <textarea
                                id='notes'
                                placeholder={t[lang].rsvpNotesPlaceholder}
                                {...register('notes')}
                                style={{
                                    backgroundColor: 'white',
                                    paddingLeft: '1rem',
                                    paddingTop: '.5rem',
                                    paddingBottom: '.5rem',
                                    fontSize: '1.2rem',
                                }}
                                className='w-full bg-white text-base p-3 rounded min-h-[100px]'
                                disabled={isSubmitting}
                            />
                        </div>
                    </>
                )}

                {/* Error message */}
                {error && (
                    <div
                        className='p-4 bg-red-50 rounded'
                        style={{ border: '1px solid lightcoral' }}
                    >
                        <p
                            className='text-red-800 text-sm'
                            style={{
                                fontFamily: 'Times New Roman, Times, serif',
                            }}
                        >
                            {error}
                        </p>
                    </div>
                )}

                {/* Submit button */}
                <button
                    type='submit'
                    disabled={isSubmitting}
                    style={{
                        fontFamily: 'Gyst, Georgia, serif',
                        color: 'white',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = '#b83510')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = '#d8400f')
                    }
                    className='w-full py-3 bg-[#d8400f] text-white font-bold text-xl hover:bg-[#b83510] transition-colors disabled:opacity-50'
                >
                    {isSubmitting ? t[lang].rsvpSubmitting : t[lang].rsvpSubmit}
                </button>

                {/* Submit later link */}
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: '1rem',
                    }}
                >
                    <button
                        type='button'
                        onClick={onClose}
                        style={{
                            fontFamily: 'Times New Roman, Times, serif',
                            color: '#0d0d0d',
                            fontSize: '1rem',
                            textDecoration: 'underline',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0',
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.textDecoration = 'none')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.textDecoration = 'underline')
                        }
                    >
                        {t[lang].rsvpSubmitLater}
                    </button>
                </div>
            </form>
        </div>
    )
}

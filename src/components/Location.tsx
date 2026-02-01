import { motion } from 'framer-motion'
const locationImage =
    'https://agriturismolarustica.com/wp-content/uploads/2025/06/hero4.webp'
const bucchianicoImage =
    'https://www.abruzzoturismo.it/sites/default/files/immagini/Borghi/Bucchianico%20_%20tramonto%20orizz_%20foto%20di%20Matteo%20Ciommi.jpg'

export function Location() {
    return (
        <section className='bg-[#fcdeea] py-16 md:py-24 px-4'>
            <div className='mx-auto' style={{ maxWidth: '1000px' }}>
                <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-start'>
                    {/* Text content */}
                    <div>
                        <h2
                            style={{ fontFamily: 'Gyst, Georgia, serif' }}
                            className='font-bold text-[#d8400f] text-4xl md:text-[72px] mb-6 md:mb-8'
                        >
                            The Day
                        </h2>

                        <div
                            style={{
                                fontFamily: 'Times New Roman, Times, serif',
                            }}
                            className='text-[#0d0d0d] space-y-6 md:space-y-8'
                        >
                            <p className='text-[20px]'>
                                <strong>
                                    Ceremony - Afternoon Bucchianico
                                </strong>{' '}
                                <br></br>
                                We'll begin with an intimate ceremony at
                                Daniele's family home in{' '}
                                <a
                                    href='https://maps.app.goo.gl/NHsEp71erczGx8cLA'
                                    target='_blank'
                                    style={{ textDecoration: 'underline' }}
                                >
                                    Bucchianico
                                </a>
                                , with refreshments.
                            </p>
                            <p className='text-[20px]'>
                                <strong>
                                    Reception - Evening Agriturismo La Rustica
                                </strong>
                                <br></br>
                                Following the ceremony, we'll make our way to{' '}
                                <a
                                    href='https://maps.app.goo.gl/tBe53TwUJuWvrNGK8'
                                    target='_blank'
                                    style={{ textDecoration: 'underline' }}
                                >
                                    La Rustica
                                </a>{' '}
                                (approximately 30 minutes drive) for dinner and
                                dancing into the evening.
                            </p>
                        </div>
                    </div>

                    {/* Location image */}
                    <motion.div
                        className='relative overflow-hidden'
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <img
                            alt='Bucchianico town view at sunset. Photo by Matteo Ciommi'
                            className='w-full h-auto'
                            src={bucchianicoImage}
                        />
                        <span
                            style={{
                                fontFamily: 'Times New Roman, Times, serif',
                                marginTop: '0.5rem',
                            }}
                        >
                            Bucchianico
                        </span>
                    </motion.div>
                </div>
                <div className='grid md:grid-cols-2 mt-12 gap-8 md:gap-12 items-start'>
                    {/* Text content */}
                    <div>
                        <h3
                            style={{ fontFamily: 'Gyst, Georgia, serif' }}
                            className='font-bold text-[#d8400f] text-4xl md:text-[48px] mb-6 md:mb-8'
                        >
                            Getting there
                        </h3>

                        <div
                            style={{
                                fontFamily: 'Times New Roman, Times, serif',
                            }}
                            className='text-[#0d0d0d] space-y-6 md:space-y-8'
                        >
                            <p className='text-[20px]'>
                                <strong>Driving</strong> — If you're planning to
                                drive, we recommend staying in area around
                                Bucchianico, Chieti or Pescara. You'll find more
                                details and our “Where to Stay” recommendations
                                with a map in the Travel Suggestions section
                                below.
                            </p>
                            <p className='text-[20px]'>
                                <strong>Shuttle Service</strong> — For those who
                                prefer not to drive on the day, we're arranging
                                a shuttle service from Pescara main train
                                station (Pescara Centrale). Please indicate your
                                interest when you RSVP. We encourage guests
                                using this service to book accommodation in
                                Pescara for at least one or two nights.
                            </p>
                        </div>
                    </div>

                    {/* Location image */}
                    <motion.div
                        className='relative overflow-hidden'
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <img
                            alt='Agriturismo La Rustica venue'
                            className='w-full h-auto'
                            src={locationImage}
                        />
                        <span
                            style={{
                                fontFamily: 'Times New Roman, Times, serif',
                                marginTop: '0.5rem',
                            }}
                        >
                            Agriturismo La Rustica - Pianella
                        </span>
                    </motion.div>
                </div>

                {/* Information box */}
                <div
                    className='mt-12 md:mt-16 p-8 md:p-12 text-center'
                    style={{
                        backgroundColor: 'rgba(228, 62, 57, 0.2)',
                    }}
                >
                    <div
                        style={{
                            fontFamily: 'Times New Roman, Times, serif',
                            padding: '2rem',
                        }}
                        className='text-[#0d0d0d] space-y-6 md:space-y-8'
                    >
                        <h2
                            className='text-3xl md:text-4xl font-bold'
                            style={{ marginBottom: '1rem' }}
                        >
                            By the way...
                        </h2>
                        <p className='text-[20px] md:text-[22px]'>
                            We understand that traveling between locations can
                            be challenging, especially with young children. The
                            ceremony is entirely optional—we'd be just as happy
                            to celebrate with you in the evening at La Rustica.
                        </p>
                        <p className='text-[20px] md:text-[22px]'>
                            La Rustica has simple rooms available for a few
                            nights. Rooms will be prioritized for families with
                            young children. Indicate your interest when you
                            RSVP.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

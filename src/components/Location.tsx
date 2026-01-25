import { motion } from 'framer-motion'
const locationImage =
    'https://agriturismolarustica.com/wp-content/uploads/2025/06/hero4.webp'

export function Location() {
    return (
        <section className='bg-[#fcdeea] py-16 md:py-24 px-4'>
            <div className='max-w-[900px] mx-auto'>
                <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-start'>
                    {/* Text content */}
                    <div>
                        <h2
                            style={{ fontFamily: 'Gyst, Georgia, serif' }}
                            className='font-bold text-[#d8400f] text-5xl md:text-[72px] mb-6 md:mb-8'
                        >
                            Location
                        </h2>

                        <div
                            style={{
                                fontFamily: 'Times New Roman, Times, serif',
                            }}
                            className='text-[#0d0d0d] space-y-6 md:space-y-8'
                        >
                            <p className='text-[20px]'>
                                We will celebrate at Agriturismo La Rustica in
                                Abruzzo. La Rustica combines the warmth of a
                                traditional farmhouse surronded by olive fields.
                            </p>
                        </div>

                        {/* Visit button */}
                        <a
                            href='https://maps.app.goo.gl/UpzEYe9tfL2qWTtYA'
                            target='_blank'
                            rel='noopener noreferrer'
                            style={{
                                fontFamily: 'Gyst, Georgia, serif',
                            }}
                            className='inline-block mt-8 px-8 py-3 bg-[#d8400f] text-[#f2ebd5] font-bold text-[20px]'
                        >
                            View on Google Maps
                        </a>
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
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

import { motion } from 'framer-motion'
import imgFlowerDisco from 'figma:asset/d21d4748e2c1c1b39d896cb6702f42ec05bce613.png'
import { downloadCalendarEvent } from '../utils/calendar'
import { RSVPButton } from './RSVPButton'

export function SaveTheDate() {
    return (
        <section className='bg-[#f2ebd5] pt-32 md:pt-56 pb-16 md:pb-24 px-4'>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className='max-w-[491px] mx-auto'
            >
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                        duration: 0.7,
                        delay: 0.2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ fontFamily: 'Gyst, Georgia, serif' }}
                    className='font-bold text-[#d8400f] text-center text-5xl md:text-[72px] mb-8 md:mb-12'
                >
                    You're invited!
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ fontFamily: 'Times New Roman, Times, serif' }}
                    className='text-[#0d0d0d] text-[22px] space-y-6 md:space-y-8 text-center md:text-left'
                >
                    <p>
                        Join us on Saturday, 29th of August as we turn 40 and
                        get married in the hills of Abruzzo. A day of
                        celebration with the people we love most.{' '}
                    </p>

                    <p>
                        Bring your family — kids are more than welcome. Expect
                        plenty of food, music, and dancing throughout the day
                        and into the evening.
                    </p>

                    {/* RSVP button */}
                    <div className='text-center' style={{ marginTop: '2rem' }}>
                        <RSVPButton />
                    </div>
                    <motion.span
                        animate={{
                            opacity: [1, 0.7, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        style={{
                            marginTop: '1rem',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Please RSVP by the 31th of May
                    </motion.span>
                </motion.div>
            </motion.div>
        </section>
    )
}

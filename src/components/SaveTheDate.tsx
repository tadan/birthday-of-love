import imgFlowerDisco from 'figma:asset/d21d4748e2c1c1b39d896cb6702f42ec05bce613.png'
import { downloadCalendarEvent } from '../utils/calendar'

export function SaveTheDate() {
    return (
        <section className='bg-[#f2ebd5] pt-48 md:pt-56 pb-16 md:pb-24 px-4'>
            <div className='max-w-[491px] mx-auto text-center'>
                <h2
                    style={{ fontFamily: 'Gyst, Georgia, serif' }}
                    className='font-bold text-[#d8400f] text-5xl md:text-[72px] mb-8 md:mb-12'
                >
                    Save the Date
                </h2>

                <div
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
                  {/* Calendar button */}
                  <button
                    onClick={downloadCalendarEvent}
                    style={{ fontFamily: 'Gyst, Georgia, serif' }}
                    className='inline-block mt-8 px-8 py-3 bg-[#d8400f] text-[#f2ebd5] font-bold text-[20px]'
                  >
                    Add to Your Calendar
                  </button>
                </div>
            </div>
        </section>
    )
}

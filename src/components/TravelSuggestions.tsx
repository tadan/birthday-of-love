import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

// Images for each tab - specific to Italian locations
const travelImages = {
    howToGetThere: {
        rome: 'https://wikitravel.org/upload/shared/4/44/Colosseum,_Rome.JPG',
        pescara:
            'https://italien.expert/wp-content/uploads/2024/09/Bahnhof-Pescara-Abruzzen-Italien-2.jpg',
    },
    whereToStay: {
        village:
            'https://viaggi.today/wp-content/uploads/elementor/thumbs/Pacentro-borghi-abruzzo-pfrhbckp8h4ejogg1ykn3wv76ypmdrdnkft8yewk8g.jpg',
        coastline:
            'https://abruzzo.cityrumors.it/wp-content/uploads/2017/10/img_0777.jpg',
    },
    whatToDo: {
        spaghettiChitarra:
            'https://static.cookist.it/wp-content/uploads/sites/21/2018/09/spaghetti-alla-chitarra.jpg',
        trabocchi:
            'https://www.majellando.it/_default_upload_bucket/image-thumb__1715__thumbnail-fullscreen-parallax_auto_ce334d53b086a8b6a73ca15df56e620b/vacanze%20sulla%20costa%20dei%20trabocchi%20in%20abruzzo.jpg',
    },
}

export function TravelSuggestions() {
    const [activeTab, setActiveTab] = useState('how-to-get-there')
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <section className='bg-[#232703] py-16 md:py-24 px-4'>
            <div className='max-w-[900px] mx-auto'>
                {/* Heading */}
                <div className='text-center mb-8 md:mb-12'>
                    <h2
                        style={{ fontFamily: 'Gyst, Georgia, serif' }}
                        className='font-bold text-[#f2ebd5] text-4xl md:text-[56px] mb-4'
                    >
                        Travel suggestions
                    </h2>
                    <p
                        style={{
                            fontFamily: 'Times New Roman, Times, serif',
                            width: '70%',
                        }}
                        className='text-[#f2ebd5] text-[18px] md:text-[20px] max-w-[600px] mx-auto'
                    >
                        Below are helpful suggestions for your travel plans.
                        Reach out if you are looking for something specific, we
                        are happy to help.
                    </p>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            backgroundColor: 'transparent',
                            marginBottom: '32px',
                            gap: '0',
                            height: 'auto',
                            padding: '0',
                            borderRadius: '0',
                        }}
                    >
                        <TabsTrigger
                            value='how-to-get-there'
                            style={{
                                fontFamily: 'Gyst, Georgia, serif',
                                cursor: 'pointer',
                                fontSize: isMobile ? '14px' : '20px',
                                backgroundColor: '#f2ebd5',
                                color: '#0d0d0d',
                                width: '33.333%',
                                padding: isMobile ? '12px 8px' : '16px 24px',
                                border: 'none',
                                borderRight: '2px solid #0d0d0d',
                                borderRadius: '0',
                                fontWeight: 'bold',
                                transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    '#fcdeea')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    '#f2ebd5')
                            }
                        >
                            How to get there
                        </TabsTrigger>
                        <TabsTrigger
                            value='where-to-stay'
                            style={{
                                fontFamily: 'Gyst, Georgia, serif',
                                cursor: 'pointer',
                                fontSize: isMobile ? '14px' : '20px',
                                backgroundColor: '#f2ebd5',
                                color: '#0d0d0d',
                                width: '33.333%',
                                padding: isMobile ? '12px 8px' : '16px 24px',
                                border: 'none',
                                borderRadius: '0',
                                fontWeight: 'bold',
                                transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    '#fcdeea')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    '#f2ebd5')
                            }
                        >
                            Where to Stay
                        </TabsTrigger>
                        <TabsTrigger
                            value='what-to-do'
                            style={{
                                fontFamily: 'Gyst, Georgia, serif',
                                cursor: 'pointer',
                                fontSize: isMobile ? '14px' : '20px',
                                backgroundColor: '#f2ebd5',
                                color: '#0d0d0d',
                                width: '33.333%',
                                padding: isMobile ? '12px 8px' : '16px 24px',
                                border: 'none',
                                borderLeft: '2px solid #0d0d0d',
                                borderRadius: '0',
                                fontWeight: 'bold',
                                transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    '#fcdeea')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    '#f2ebd5')
                            }
                        >
                            What to do
                        </TabsTrigger>
                    </TabsList>

                    {/* How to get there content */}
                    <TabsContent value='how-to-get-there'>
                        <div className='grid md:grid-cols-2 gap-8 md:gap-12'>
                            {/* Text content */}
                            <div
                                style={{
                                    fontFamily: 'Times New Roman, Times, serif',
                                }}
                                className='text-[#f2ebd5] space-y-6'
                            >
                                <div>
                                    <h3
                                        style={{
                                            fontFamily: 'Gyst, Georgia, serif',
                                            fontSize: '32px',
                                        }}
                                        className='font-bold text-[#f2ebd5] text-2xl md:text-3xl mb-4'
                                    >
                                        How to get to Abruzzo
                                    </h3>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[18px] md:text-[20px] mb-2'>
                                        Fly to Rome Airport
                                    </h4>
                                    <p className='text-[16px] md:text-[18px] mb-2'>
                                        Fiumicino is Rome's main airport and
                                        most international flights land there.
                                        The easiest option when arriving or
                                        leaving because traffic is common.
                                    </p>
                                    <p className='text-[16px] md:text-[18px] mb-2'>
                                        From Fiumicino:
                                    </p>
                                    <ul className='list-disc list-inside text-[16px] md:text-[18px] space-y-1 ml-4'>
                                        <li>
                                            Rent a car and drive to Abruzzo (2.5
                                            hours)
                                        </li>
                                        <li>
                                            Or take a train to Pescara or Chieti
                                            (3 hours)
                                        </li>
                                    </ul>
                                    <p className='text-[16px] md:text-[18px] mt-2'>
                                        Book trains at{' '}
                                        <a
                                            href='https://trenitalia.com'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='underline hover:text-[#fdc840]'
                                        >
                                            trenitalia.com
                                        </a>
                                    </p>
                                    <p className='text-[16px] md:text-[18px] mt-2'>
                                        Check bus connections at{' '}
                                        <a
                                            href='https://roadtoabruzzo.it/'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='underline hover:text-[#fdc840]'
                                        >
                                            roadtoabruzzo.it
                                        </a>
                                        <br></br>Rome to Abruzzo buses are
                                        between 2.5h and 3h.
                                    </p>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[18px] md:text-[20px] mb-2'>
                                        Fly to Abruzzo Airport (Pescara)
                                    </h4>
                                    <p className='text-[16px] md:text-[18px] mb-2'>
                                        Abruzzo airport is on the outskirts of
                                        Pescara. Smaller than Rome's. You can
                                        fly here if traveling by a low-cost
                                        airline. You can rent a car at the
                                        airport. Or if taking a taxi call a
                                        day/evening in Pescara, take a taxi to
                                        the venue the next day.
                                    </p>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[18px] md:text-[20px] mb-2'>
                                        Train from an Italian City
                                    </h4>
                                    <p className='text-[16px] md:text-[18px] mb-2'>
                                        You can fly to major Italian cities like
                                        Milan, Bologna, Florence or Naples. Then
                                        take a train to Pescara or Chieti (about
                                        3-4 hours) and rent a car to see more of
                                        Italy.
                                    </p>
                                    <p className='text-[16px] md:text-[18px] mb-2'>
                                        Direct trains run from:
                                    </p>
                                    <ul className='list-disc list-inside text-[16px] md:text-[18px] space-y-1 ml-4'>
                                        <li>Milan to Pescara (5-6 hours)</li>
                                        <li>Florence to Pescara (3-4 hours)</li>
                                    </ul>
                                    <p className='text-[16px] md:text-[18px] mt-2'>
                                        Book trains at{' '}
                                        <a
                                            href='https://trenitalia.com'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='underline hover:text-[#fdc840]'
                                        >
                                            trenitalia.com
                                        </a>
                                    </p>
                                </div>
                            </div>

                            {/* Images */}
                            <div className='space-y-4'>
                                <img
                                    src={travelImages.howToGetThere.rome}
                                    alt='Colosseum in Rome'
                                    className='w-full'
                                    style={{
                                        aspectRatio: '16/9',
                                        objectFit: 'cover',
                                        height: 'auto',
                                    }}
                                />
                                <img
                                    src={travelImages.howToGetThere.pescara}
                                    alt='City of Pescara'
                                    className='w-full'
                                    style={{
                                        aspectRatio: '16/9',
                                        objectFit: 'cover',
                                        height: 'auto',
                                    }}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {/* Where to stay content */}
                    <TabsContent value='where-to-stay'>
                        <div className='grid md:grid-cols-2 gap-8 md:gap-12'>
                            <div
                                style={{
                                    fontFamily: 'Times New Roman, Times, serif',
                                }}
                                className='text-[#f2ebd5] space-y-6'
                            >
                                <div>
                                    <h3
                                        style={{
                                            fontFamily: 'Gyst, Georgia, serif',
                                            fontSize: '32px',
                                        }}
                                        className='font-bold text-[#f2ebd5] text-2xl md:text-3xl mb-4'
                                    >
                                        Where to stay
                                    </h3>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[18px] md:text-[20px] mb-2'>
                                        At the Venue
                                    </h4>
                                    <p className='text-[16px] md:text-[18px] mb-2'>
                                        Agriturismo La Rustica has simple rooms
                                        available for one or two nights. Rooms
                                        will be prioritised for families with
                                        young children. Please indicate your
                                        interest when you RSVP.
                                    </p>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[18px] md:text-[20px] mb-2'>
                                        Nearby Towns
                                    </h4>
                                    <p className='text-[16px] md:text-[18px] mb-2'>
                                        There are many accommodation options in
                                        nearby towns:
                                    </p>
                                    <ul className='list-disc list-inside text-[16px] md:text-[18px] space-y-1 ml-4'>
                                        <li>
                                            Chieti (15 minutes) - Historic city
                                            with hotels and B&Bs
                                        </li>
                                        <li>
                                            Pescara (25 minutes) - Coastal city
                                            with many hotels
                                        </li>
                                        <li>
                                            Local agriturismos - Traditional
                                            farmhouses in the countryside
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[18px] md:text-[20px] mb-2'>
                                        Make it a Holiday
                                    </h4>
                                    <p className='text-[16px] md:text-[18px]'>
                                        Consider staying a few extra days to
                                        explore Abruzzo's mountains, beaches,
                                        and medieval villages. We're happy to
                                        share recommendations!
                                    </p>
                                </div>
                            </div>

                            <div className='space-y-4'>
                                <img
                                    src={travelImages.whereToStay.village}
                                    alt='Historical Center of a Small Village in Abruzzo'
                                    className='w-full'
                                    style={{
                                        aspectRatio: '16/9',
                                        objectFit: 'cover',
                                        height: 'auto',
                                    }}
                                />
                                <img
                                    src={travelImages.whereToStay.coastline}
                                    alt="Abruzzo's coastline"
                                    className='w-full'
                                    style={{
                                        aspectRatio: '16/9',
                                        objectFit: 'cover',
                                        height: 'auto',
                                    }}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {/* What to do content */}
                    <TabsContent value='what-to-do'>
                        <div className='grid md:grid-cols-2 gap-8 md:gap-12'>
                            <div
                                style={{
                                    fontFamily: 'Times New Roman, Times, serif',
                                }}
                                className='text-[#f2ebd5] space-y-6'
                            >
                                <div>
                                    <h3
                                        style={{
                                            fontFamily: 'Gyst, Georgia, serif',
                                            fontSize: '32px',
                                        }}
                                        className='font-bold text-[#f2ebd5] text-2xl md:text-3xl mb-4'
                                    >
                                        What to do in Abruzzo
                                    </h3>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[18px] md:text-[20px] mb-2'>
                                        Nature & Mountains
                                    </h4>
                                    <p className='text-[16px] md:text-[18px] mb-2'>
                                        Abruzzo is known for its stunning
                                        national parks and mountain landscapes:
                                    </p>
                                    <ul className='list-disc list-inside text-[16px] md:text-[18px] space-y-1 ml-4'>
                                        <li>
                                            Gran Sasso National Park - Hiking
                                            and breathtaking views
                                        </li>
                                        <li>
                                            Majella National Park - Wildlife and
                                            ancient hermitages
                                        </li>
                                        <li>
                                            Campo Imperatore - Known as "Little
                                            Tibet"
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[18px] md:text-[20px] mb-2'>
                                        Historic Towns
                                    </h4>
                                    <p className='text-[16px] md:text-[18px] mb-2'>
                                        Visit beautiful medieval villages:
                                    </p>
                                    <ul className='list-disc list-inside text-[16px] md:text-[18px] space-y-1 ml-4'>
                                        <li>
                                            Santo Stefano di Sessanio - Ancient
                                            stone village
                                        </li>
                                        <li>
                                            Sulmona - Baroque architecture and
                                            confetti candy
                                        </li>
                                        <li>
                                            Scanno - Picturesque mountain town
                                            with a heart-shaped lake
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[18px] md:text-[20px] mb-2'>
                                        Coast & Food
                                    </h4>
                                    <p className='text-[16px] md:text-[18px]'>
                                        Enjoy the Adriatic coast in Pescara,
                                        visit local wineries, and taste
                                        traditional dishes like arrosticini
                                        (lamb skewers) and pasta alla chitarra.
                                    </p>
                                </div>
                            </div>

                            <div className='space-y-4'>
                                <img
                                    src={
                                        travelImages.whatToDo.spaghettiChitarra
                                    }
                                    alt='spaghetti alla chitarra'
                                    className='w-full'
                                    style={{
                                        aspectRatio: '16/9',
                                        objectFit: 'cover',
                                        height: 'auto',
                                    }}
                                />
                                <img
                                    src={travelImages.whatToDo.trabocchi}
                                    alt='trabocchi on the adriatic sea'
                                    className='w-full'
                                    style={{
                                        aspectRatio: '16/9',
                                        objectFit: 'cover',
                                        height: 'auto',
                                    }}
                                />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

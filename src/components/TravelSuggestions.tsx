import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

// Images for each tab - specific to Italian locations
const travelImages = {
    howToGetThere: {
        rome: 'https://wikitravel.org/upload/shared/4/44/Colosseum,_Rome.JPG',
        pescara:
            'https://italien.expert/wp-content/uploads/2024/09/Bahnhof-Pescara-Abruzzen-Italien-2.jpg',
        bologna:
            'https://wherewouldyougo.com/wp-content/uploads/2016/12/Piazza-Maggiore-Bologna-Italy.jpg',
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
        vineyard:
            'https://www.masciarelli.it/wp-content/uploads/2019/03/sostenibilita-background-1024x649.jpg',
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
                        className='font-bold text-[#f2ebd5] text-5xl md:text-[72px] mb-4'
                    >
                        Travel suggestions
                    </h2>
                    <p
                        style={{
                            fontFamily: 'Times New Roman, Times, serif',
                            width: '70%',
                            marginTop: '1rem',
                        }}
                        className='text-[#f2ebd5] text-[20px] space-y-6 md:space-y-8 max-w-[600px] mx-auto'
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
                                    fontSize: '20px',
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
                                        How to get to Abruzzo{' '}
                                    </h3>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[20px] md:text-[22px] mb-2'>
                                        Fly to Rome Airport
                                    </h4>
                                    <p className='text-[20px] mb-2'>
                                        Most international flights arrive at
                                        Fiumicino. From there:
                                    </p>
                                    <ul
                                        className='text-[20px] md:text-[20px] space-y-1 ml-4'
                                        style={{
                                            listStyleType: 'disc',
                                            paddingLeft: '1.5rem',
                                        }}
                                    >
                                        <li style={{ display: 'list-item' }}>
                                            Rent a car and drive (2-2.5 hours)
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            Take a bus to Abruzzo (2.5-3.5
                                            hours) via{' '}
                                            <a
                                                href='https://roadtoabruzzo.it/'
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                style={{
                                                    textDecoration: 'underline',
                                                    color: '#f2ebd5',
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.color =
                                                        '#fdc840')
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.color =
                                                        '#f2ebd5')
                                                }
                                            >
                                                roadtoabruzzo.it
                                            </a>
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            Train to Chieti or Pescara (4+
                                            hours) via{' '}
                                            <a
                                                href='https://trenitalia.com'
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                style={{
                                                    textDecoration: 'underline',
                                                    color: '#f2ebd5',
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.color =
                                                        '#fdc840')
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.color =
                                                        '#f2ebd5')
                                                }
                                            >
                                                trenitalia.com
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[20px] md:text-[20px] mb-2'>
                                        Fly to Abruzzo Airport (Pescara)
                                    </h4>
                                    <p className='text-[20px] mb-2'>
                                        <a
                                            href='https://www.abruzzoairport.com/'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            style={{
                                                textDecoration: 'underline',
                                                color: '#f2ebd5',
                                            }}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.color =
                                                    '#fdc840')
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.color =
                                                    '#f2ebd5')
                                            }
                                        >
                                            Abruzzo airport
                                        </a>{' '}
                                        is small and serves only low-cost
                                        airlines. You can rent a car there or
                                        stay overnight in Pescara and take a
                                        taxi to the venue.
                                    </p>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[20px] md:text-[20px] mb-2'>
                                        Train from another Italian city
                                    </h4>
                                    <p className='text-[20px] mb-2'>
                                        Flying to Milan, Bologna, Florence, or
                                        Naples? Take a train to Pescara (3-5
                                        hours), then rent a car in Pescara
                                        Centrale. Book at{' '}
                                        <a
                                            href='https://trenitalia.com'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            style={{
                                                textDecoration: 'underline',
                                                color: '#f2ebd5',
                                            }}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.color =
                                                    '#fdc840')
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.color =
                                                    '#f2ebd5')
                                            }
                                        >
                                            trenitalia.com
                                        </a>
                                        .
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
                                <img
                                    src={travelImages.howToGetThere.bologna}
                                    alt='Piazza Maggiore in Bologna'
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
                                    fontSize: '20px',
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
                                    <h4 className='font-bold text-[20px] md:text-[20px] mb-2'>
                                        At the Venue
                                    </h4>
                                    <p className='text-[20px] mb-2'>
                                        La Rustica has simple rooms for one or
                                        two nights, prioritized for families
                                        with young children. Indicate interest
                                        when you RSVP.
                                    </p>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[20px] md:text-[20px] mb-2'>
                                        Nearby
                                    </h4>
                                    <ul
                                        className='text-[20px] md:text-[20px] space-y-1 ml-4 mb-2'
                                        style={{
                                            listStyleType: 'disc',
                                            paddingLeft: '1.5rem',
                                        }}
                                    >
                                        <li style={{ display: 'list-item' }}>
                                            Chieti (15 min) - Historic city with
                                            hotels and B&Bs
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            Pescara (25 min) - Coastal city with
                                            many options
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            Local agriturismos - Traditional
                                            countryside stays
                                        </li>
                                    </ul>
                                    <br />
                                    <p className='text-[20px] font-bold'>
                                        Check our map for accommodation
                                        recommendations.
                                    </p>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[20px] md:text-[20px] mb-2'>
                                        Make it a trip
                                    </h4>
                                    <p className='text-[20px]'>
                                        Stay a few extra days to explore
                                        Abruzzo's mountains, beaches, and
                                        medieval villages. We're happy to share
                                        recommendations!
                                    </p>
                                </div>
                            </div>

                            <div className='space-y-4'>
                                {/* Map link */}
                                <a
                                    href='https://maps.app.goo.gl/UCaYStEZki5CXXNx9'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        backgroundColor: '#f2ebd5',
                                        padding: '2rem',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                        border: '2px solid transparent',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            '#fcdeea'
                                        e.currentTarget.style.borderColor =
                                            '#d8400f'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            '#f2ebd5'
                                        e.currentTarget.style.borderColor =
                                            'transparent'
                                    }}
                                >
                                    <div
                                        style={{
                                            fontFamily: 'Gyst, Georgia, serif',
                                            fontWeight: 'bold',
                                            fontSize: '22px',
                                            color: '#d8400f',
                                            marginBottom: '0.5rem',
                                        }}
                                    >
                                        View Accommodation Map
                                    </div>
                                    <div
                                        style={{
                                            fontFamily:
                                                'Times New Roman, Times, serif',
                                            fontSize: '16px',
                                            color: '#0d0d0d',
                                        }}
                                    >
                                        See tips gathered on a map that we
                                        recommend
                                    </div>
                                </a>
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
                                    fontSize: '20px',
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
                                    <h4 className='font-bold text-[20px] md:text-[20px] mb-2'>
                                        Nature & Mountains
                                    </h4>
                                    <ul
                                        className='text-[20px] md:text-[20px] space-y-1 ml-4'
                                        style={{
                                            listStyleType: 'disc',
                                            paddingLeft: '1.5rem',
                                        }}
                                    >
                                        <li style={{ display: 'list-item' }}>
                                            Majella National Park - Endless
                                            hikes and wonderful nature
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            Gran Sasso National Park -
                                            Breathtaking mountain views
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            Campo Imperatore - Known as "Little
                                            Tibet"
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[20px] md:text-[20px] mb-2'>
                                        Bike the Coast
                                    </h4>
                                    <p className='text-[20px] mb-2'>
                                        Ride the Via Verde dei Trabocchi, a 42km
                                        coastal bike path along the Adriatic
                                        with stunning views of traditional
                                        fishing platforms.
                                    </p>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[20px] md:text-[20px] mb-2'>
                                        Historic Towns
                                    </h4>
                                    <ul
                                        className='text-[20px] md:text-[20px] space-y-1 ml-4'
                                        style={{
                                            listStyleType: 'disc',
                                            paddingLeft: '1.5rem',
                                        }}
                                    >
                                        <li style={{ display: 'list-item' }}>
                                            Pacentro - Medieval hilltop village
                                            with stone houses
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            Santo Stefano di Sessanio - Ancient
                                            stone village
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            Sulmona - Baroque architecture and
                                            confetti candy
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            Scanno - Mountain town with a
                                            heart-shaped lake
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[20px] md:text-[20px] mb-2'>
                                        Food & Wine
                                    </h4>
                                    <p className='text-[20px]'>
                                        Enjoy local wineries and traditional
                                        dishes like arrosticini (lamb skewers)
                                        and pasta alla chitarra.
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
                                <img
                                    src={travelImages.whatToDo.vineyard}
                                    alt='Vineyard in Abruzzo'
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

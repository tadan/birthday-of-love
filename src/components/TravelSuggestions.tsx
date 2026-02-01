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
        gransasso:
            'https://tourismmedia.italia.it/is/image/mitur/1600X1000_studiate_il_percorso_weekend_4-1?wid=1600&hei=1000&fit=constrain,1&fmt=webp',
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
            <div className='mx-auto' style={{ maxWidth: '1060px' }}>
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
                                        How to get to Abruzzo
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
                                        hours), then rent a car at Pescara
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
                                        In the Area
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
                                    <a
                                        href='https://maps.app.goo.gl/UCaYStEZki5CXXNx9'
                                        className='text-[20px]'
                                        style={{ textDecoration: 'underline' }}
                                    >
                                        Check our map for accommodation
                                        recommendations.
                                    </a>
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
                                        Make it a Trip
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
                                        See our recommended places on a map
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
                                        Mountains & Nature
                                    </h4>
                                    <ul
                                        className='text-[20px] md:text-[20px] space-y-1 ml-4'
                                        style={{
                                            listStyleType: 'disc',
                                            paddingLeft: '1.5rem',
                                        }}
                                    >
                                        <li style={{ display: 'list-item' }}>
                                            <a
                                                href='https://www.italia.it/en/italy/abruzzo-lazio-molise-national-park'
                                                target='_blank'
                                                style={{
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                Abruzzo, Lazio e Molise National
                                                Park
                                            </a>{' '}
                                            - Italy's oldest national park, home
                                            to wolves, bears & chamois
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            <a
                                                href='https://www.italia.it/en/abruzzo/l-aquila/majella-national-park'
                                                target='_blank'
                                                style={{
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                Majella National Park
                                            </a>{' '}
                                            - Endless hikes and wonderful
                                            nature, home to Italy's largest
                                            adventure park dedicated to little
                                            ones.
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            <a
                                                href='https://www.italia.it/en/abruzzo/gran-sasso'
                                                target='_blank'
                                                style={{
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                Gran Sasso d'Italia National
                                                Park
                                            </a>{' '}
                                            - The highest peak in the Apennines,
                                            popular for skiing, climbing &
                                            hiking.
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            <a
                                                href='https://www.italia.it/en/abruzzo/l-aquila/rocca-calascio'
                                                target='_blank'
                                                style={{
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                Rocca Calascio
                                            </a>{' '}
                                            - The highest castle in the
                                            Apennines and one of the highest
                                            fortifications in Italy.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[20px] md:text-[20px] mb-2'>
                                        Sea & Coast
                                    </h4>
                                    <ul
                                        className='text-[20px] md:text-[20px] space-y-1 ml-4'
                                        style={{
                                            listStyleType: 'disc',
                                            paddingLeft: '1.5rem',
                                        }}
                                    >
                                        <li style={{ display: 'list-item' }}>
                                            <a
                                                href='https://iheartabruzzo.com/via-verde-abruzzo-coastal-bike-path/'
                                                target='_blank'
                                                style={{
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                Via Verde
                                            </a>{' '}
                                            - 42km coastal bike path along the
                                            Adriatic with stunning views
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            <a
                                                href='https://www.italia.it/en/abruzzo/costa-dei-trabocchi'
                                                target='_blank'
                                                style={{
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                Costa dei Trabocchi
                                            </a>{' '}
                                            - Traditional fishing platforms on
                                            stilts along the coastline
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            <a
                                                href='https://www.italia.it/en/abruzzo/chieti/punta-aderci'
                                                target='_blank'
                                                style={{
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                Punta Aderci
                                            </a>{' '}
                                            - Nature reserve with pristine
                                            beaches and coastal trails
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            <a
                                                href='https://www.italia.it/en/abruzzo/things-to-do/teramano-coast-art-relax-nature'
                                                target='_blank'
                                                style={{
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                Teramano Coast
                                            </a>{' '}
                                            - Art, relaxation, and nature along
                                            the northern Adriatic coast
                                        </li>
                                    </ul>
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
                                            <a
                                                href='https://maps.app.goo.gl/fDywVBpPv2KAM2z76'
                                                target='_blank'
                                                style={{
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                Pacentro
                                            </a>{' '}
                                            - Medieval hilltop village with
                                            stone houses
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            <a
                                                href='https://www.italia.it/en/abruzzo/santo-stefano-di-sessanio'
                                                target='_blank'
                                                style={{
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                Santo Stefano di Sessanio
                                            </a>{' '}
                                            - Ancient stone village
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            <a
                                                href='https://maps.app.goo.gl/h15ajumysPqh6pP48'
                                                target='_blank'
                                                style={{
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                Sulmona
                                            </a>{' '}
                                            - Baroque architecture, famous for
                                            its red garlic and confetti candy
                                        </li>
                                        <li style={{ display: 'list-item' }}>
                                            <a
                                                href='https://www.italia.it/en/abruzzo/l-aquila/things-to-do/visita-scanno-in-automobile'
                                                target='_blank'
                                                style={{
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                Scanno
                                            </a>{' '}
                                            - Mountain town with a heart-shaped
                                            lake
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className='font-bold text-[20px] md:text-[20px] mb-2'>
                                        Food & Wine
                                    </h4>
                                    <p className='text-[20px]'>
                                        <a
                                            href='https://www.italia.it/en/abruzzo/things-to-do/flavours-of-the-sea-hills-and-vineyards-of-abruzzo#vineyards-caught-between-sea-and-sky'
                                            target='_blank'
                                            style={{
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            Enjoy Abruzzo hospitality
                                        </a>{' '}
                                        at local wineries and savor traditional
                                        dishes like{' '}
                                        <a
                                            href='https://www.italia.it/en/abruzzo/things-to-do/arrosticini'
                                            target='_blank'
                                            style={{
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            arrosticini
                                        </a>
                                        {'  '}
                                        and{' '}
                                        <a
                                            href='https://www.youtube.com/watch?v=GDUp5SBF7BM'
                                            target='_blank'
                                            style={{
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            pasta alla chitarra
                                        </a>
                                        .
                                    </p>
                                </div>
                            </div>

                            <div className='space-y-4'>
                                <img
                                    src={travelImages.whatToDo.gransasso}
                                    alt='gran sasso mountain'
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
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

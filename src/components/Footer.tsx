import imgFlowerDisco from 'figma:asset/d21d4748e2c1c1b39d896cb6702f42ec05bce613.png'

export function Footer() {
    return (
        <section className='bg-[#232703] py-8 md:py-8 px-4 relative overflow-hidden'>
            <div className='max-w-[574px] mx-auto text-center relative z-10'>
                <h2
                    style={{
                        fontFamily: 'Gyst, Georgia, serif',
                        lineHeight: '1',
                    }}
                    className='font-bold text-[#f2ebd5] text-2xl md:text-[72px] mb-8 md:mb-2'
                >
                    Can't wait to see you there!
                </h2>

                {/* Flower and disco decoration */}
                <div className='mt-0 md:mt-0 flex justify-center'>
                    <img
                        alt=''
                        className='w-[250px] md:w-[400px] h-auto'
                        src={imgFlowerDisco}
                    />
                </div>
            </div>
        </section>
    )
}

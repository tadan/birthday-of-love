import imgFlowerDisco from "figma:asset/d21d4748e2c1c1b39d896cb6702f42ec05bce613.png";

export function Footer() {
  return (
    <section className="bg-[#232703] py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="max-w-[574px] mx-auto text-center relative z-10">
        <h2 style={{ fontFamily: 'Gyst, Georgia, serif' }} className="font-bold text-[#f2ebd5] text-4xl md:text-[72px] mb-8 md:mb-12">
          More information to come
        </h2>
        
        <div style={{ fontFamily: 'Times New Roman, Times, serif' }} className="text-[#f2ebd5] text-[22px] space-y-4 md:space-y-6">
          <p>
            We will share more details soon, including how to travel to Abruzzo, where to stay, and what to do.
          </p>
          <p>
            For now, please save the date.
          </p>
        </div>

        {/* Flower and disco decoration */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <img 
            alt="" 
            className="w-[250px] md:w-[400px] h-auto" 
            src={imgFlowerDisco} 
          />
        </div>
      </div>
    </section>
  );
}
import { Hero } from "./components/Hero";
import { SaveTheDate } from "./components/SaveTheDate";
import { Location } from "./components/Location";
import { TravelSuggestions } from "./components/TravelSuggestions";
import { Footer } from "./components/Footer";
import { PhotoDecoration } from "./components/PhotoDecoration";

export default function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Save the Date section with negative margin to extend up to hero */}
      <div className="relative -mt-32 md:-mt-40">
        <SaveTheDate />
        
        {/* Photo positioned on top of the beige background */}
        <div className="absolute top-0 left-0 right-0 -mt-32 md:-mt-40 z-20 flex justify-center px-4">
          <div className="w-[240px] md:w-[400px]">
            <PhotoDecoration />
          </div>
        </div>
      </div>
      
      <Location />
      <TravelSuggestions />
      <Footer />
    </div>
  );
}
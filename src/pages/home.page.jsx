import Hero from "@/components/Hero";
import HotelListings from "@/components/HotelListings";
import HeroImg from '@/assets/hero/hero_1.jpg'

const HomePage = () => {
  return (
    <main>
      <div className="relative min-h-screen">
        <Hero />
        <img
          src={HeroImg}
          alt="Hotel Booking System Hero"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
      </div>
      <HotelListings />
    </main>
  )
}

export default HomePage
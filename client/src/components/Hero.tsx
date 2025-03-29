import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToTrending = () => {
    const trendingSection = document.getElementById('trending');
    if (trendingSection) {
      trendingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-neutral-100 overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2 z-10">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-blue-600">Discover Your <br />Personal Style</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md">
              Real-time fashion recommendations tailored to your unique taste and preferences.
            </p>
            <Button
              onClick={scrollToTrending}
              className="bg-accent text-white font-montserrat font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition-all"
            >
              Explore Now
            </Button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Fashion model in trendy outfit" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

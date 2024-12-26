import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef, useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Program } from "@/types/programs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  const [randomizedPrograms, setRandomizedPrograms] = useState<Program[]>([]);

  const { data: programs } = useQuery({
    queryKey: ["featured-programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .eq("is_active", true);

      if (error) {
        console.error("Error fetching programs:", error);
        return [];
      }

      return data as Program[];
    },
  });

  useEffect(() => {
    if (programs && programs.length > 0) {
      // Create programs with non-repeating randomized image selection
      const usedImages = new Set<string>();
      
      const programsWithRandomImages = programs.map(program => {
        const images = program.image_url.split(',').map(url => url.trim());
        const availableImages = images.filter(img => !usedImages.has(img));
        
        // If all images have been used, reset the used images set
        if (availableImages.length === 0) {
          usedImages.clear();
          availableImages.push(...images);
        }
        
        // Select a random image from available ones
        const randomIndex = Math.floor(Math.random() * availableImages.length);
        const selectedImage = availableImages[randomIndex];
        
        // Mark the image as used
        usedImages.add(selectedImage);
        
        return {
          ...program,
          randomImage: selectedImage
        };
      });
      
      setRandomizedPrograms(programsWithRandomImages);
    }
  }, [programs]);

  if (!randomizedPrograms || randomizedPrograms.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {randomizedPrograms.map((program) => (
              <CarouselItem key={program.id}>
                <Link to="/programs" className="block">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative rounded-xl overflow-hidden border-8 border-white shadow-2xl mx-4"
                  >
                    <div className="aspect-[21/9] w-full relative group">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                      <div className="absolute inset-0 p-2">
                        <img
                          src={program.randomImage}
                          alt={program.title}
                          className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
                          style={{ objectFit: 'cover' }}
                          onError={(e) => {
                            console.error("Error loading image:", program.randomImage);
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                            {program.title}
                          </h2>
                          <p className="text-lg sm:text-xl text-white/90 line-clamp-2 drop-shadow-lg">
                            {program.description}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-4" />
          <CarouselNext className="hidden sm:flex -right-4" />
        </Carousel>
      </div>
    </section>
  );
};
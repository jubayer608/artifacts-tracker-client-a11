import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    title: 'Rosetta Stone',
    subtitle: 'The key to ancient Egyptian hieroglyphs',
    description:
      'Discovered in 1799, this granodiorite stele unlocked the secrets of Egyptian writing.',
    image:
      'https://i.ibb.co/Kx0Gf5BW/sx-MYbco-R3ro7b2q3o-TZnp-P-970-80-jpg.webp',
  },
  {
    id: 2,
    title: 'Antikythera Mechanism',
    subtitle: 'Ancient Greek analog computer',
    description:
      'A clockwork device from 100 BC used to predict eclipses and planetary motions.',
    image:
      'https://i.ibb.co/TqHhkYts/Screen-Shot-2021-04-04-at-8-20-12-AM.png',
  },
  {
    id: 3,
    title: 'Terracotta Army',
    subtitle: 'Guardians of the First Emperor of China',
    description:
      'Thousands of life-sized clay soldiers buried with Emperor Qin Shi Huang.',
    image:
      'https://i.ibb.co/KpmV9nb8/1133-Sun03.jpg',
  },
];

const BannerSlider = () => {
  return (
    <section className="w-full max-w-7xl mx-auto mt-6 md:mt-10 rounded-lg overflow-hidden shadow-xl relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        effect="fade"
        className="relative"
      >
        {slides.map(({ id, title, subtitle, description, image }) => (
          <SwiperSlide key={id}>
            <div className="relative w-full h-[300px] sm:h-[380px] md:h-[500px] lg:h-[560px]">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-start px-4 sm:px-6 md:px-14 text-white max-w-xl">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 md:mb-3 font-serif drop-shadow-xl"
                >
                  {title}
                </motion.h2>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-base sm:text-lg md:text-2xl font-medium mb-2 font-display drop-shadow"
                >
                  {subtitle}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-sm sm:text-base font-light drop-shadow"
                >
                  {description}
                </motion.p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      
      <button className="custom-prev hidden md:block absolute top-1/2 left-4 transform -translate-y-1/2 z-50 bg-[#5d4634]/80 text-[#fdf6e3] text-xl px-3 py-2 rounded-full hover:bg-[#4b3727] transition">
        &larr;
      </button>
      <button className="custom-next hidden md:block absolute top-1/2 right-4 transform -translate-y-1/2 z-50 bg-[#5d4634]/80 text-[#fdf6e3] text-xl px-3 py-2 rounded-full hover:bg-[#4b3727] transition">
        &rarr;
      </button>
    </section>
  );
};

export default BannerSlider;

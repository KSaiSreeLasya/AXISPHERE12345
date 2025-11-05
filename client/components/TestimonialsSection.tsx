'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  avatar: string;
  logo: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alexandra Chen',
    title: 'CEO',
    company: 'Azure Resorts',
    quote: 'LuxuryStudio transformed our entire brand identity. The attention to detail and creative vision exceeded every expectation. Our bookings increased by 340% within the first quarter.',
    avatar: '/placeholder.svg',
    logo: '/placeholder.svg',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    title: 'Founder',
    company: 'NovaBank',
    quote: 'The team delivered a financial platform that our users actually love to use. The UX transformation was remarkable - we saw a 225% increase in user engagement immediately.',
    avatar: '/placeholder.svg',
    logo: '/placeholder.svg',
    rating: 5,
  },
  {
    id: '3',
    name: 'Sophie Martineau',
    title: 'Creative Director',
    company: 'Meridian Fashion',
    quote: 'Working with LuxuryStudio was like having a creative partner who understood our vision before we did. The global campaign they created elevated our brand to new heights.',
    avatar: '/placeholder.svg',
    logo: '/placeholder.svg',
    rating: 5,
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'CMO',
    company: 'LuxeGoods',
    quote: 'The ROI from their optimization campaign was incredible. 310% revenue growth in 6 months. Their data-driven approach combined with creative excellence is unmatched.',
    avatar: '/placeholder.svg',
    logo: '/placeholder.svg',
    rating: 5,
  },
  {
    id: '5',
    name: 'Isabella Torres',
    title: 'Brand Manager',
    company: 'Prestige Motors',
    quote: 'They didn\'t just create a website, they crafted an experience. The automotive launch exceeded all our targets with 2,400 pre-orders in the first month.',
    avatar: '/placeholder.svg',
    logo: '/placeholder.svg',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const currentTestimonial = testimonials[currentIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section ref={ref} className="py-24 bg-luxury-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-gold-400/10 to-gold-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-platinum-400/10 to-platinum-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Client{' '}
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Stories
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            Discover how we've helped ambitious brands achieve extraordinary results 
            through strategic design and innovative solutions.
          </motion.p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Video/Image Side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative group"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-luxury-800 border border-gold-500/20">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Company Logo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-6 flex justify-center"
                >
                  <img
                    src={currentTestimonial.logo}
                    alt={currentTestimonial.company}
                    className="h-12 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              </motion.div>

              {/* Quote Side */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                {/* Quote Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
                  className="text-gold-500"
                >
                  <Quote size={48} />
                </motion.div>

                {/* Rating */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex space-x-1"
                >
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <Star size={20} className="fill-gold-500 text-gold-500" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Quote Text */}
                <motion.blockquote
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-2xl md:text-3xl text-white leading-relaxed font-light"
                >
                  "{currentTestimonial.quote}"
                </motion.blockquote>

                {/* Author Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="flex items-center space-x-4"
                >
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gold-500/30"
                  />
                  <div>
                    <div className="text-white font-semibold text-lg">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-gold-400">
                      {currentTestimonial.title}, {currentTestimonial.company}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center mt-16 space-x-8"
          >
            {/* Previous Button */}
            <motion.button
              onClick={goToPrevious}
              className="p-3 rounded-full border border-white/20 text-white hover:border-gold-500 hover:text-gold-500 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Dots */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-gold-500'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                  {index === currentIndex && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute inset-0 w-3 h-3 rounded-full border-2 border-gold-500"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={goToNext}
              className="p-3 rounded-full border border-white/20 text-white hover:border-gold-500 hover:text-gold-500 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </motion.div>

          {/* Auto-play indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center mt-8"
          >
            <motion.div
              className={`w-20 h-1 bg-white/20 rounded-full overflow-hidden ${
                isAutoPlaying ? '' : 'opacity-50'
              }`}
            >
              {isAutoPlaying && (
                <motion.div
                  className="h-full bg-gold-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
                  key={currentIndex}
                />
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

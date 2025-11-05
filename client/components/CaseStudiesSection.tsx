'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  results: {
    metric: string;
    value: string;
  }[];
}

const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Platinum Luxury Resort',
    client: 'Azure Resorts',
    category: 'Branding',
    description: 'Complete brand transformation for a luxury resort chain, creating an elevated visual identity that increased bookings by 340%.',
    image: '/placeholder.svg',
    tags: ['Brand Identity', 'Visual Design', 'Luxury'],
    results: [
      { metric: 'Booking Increase', value: '340%' },
      { metric: 'Brand Recognition', value: '85%' },
    ],
  },
  {
    id: '2',
    title: 'Fintech Revolution',
    client: 'NovaBank',
    category: 'Web Design',
    description: 'Modern banking platform redesign that simplified complex financial processes and improved user engagement.',
    image: '/placeholder.svg',
    tags: ['UI/UX', 'Fintech', 'Mobile-First'],
    results: [
      { metric: 'User Engagement', value: '225%' },
      { metric: 'Task Completion', value: '67%' },
    ],
  },
  {
    id: '3',
    title: 'Global Fashion Campaign',
    client: 'Meridian Fashion',
    category: 'Marketing',
    description: 'International fashion campaign that elevated brand presence across 15 markets with stunning visual storytelling.',
    image: '/placeholder.svg',
    tags: ['Fashion', 'Global Campaign', 'Social Media'],
    results: [
      { metric: 'Reach Increase', value: '450%' },
      { metric: 'Engagement Rate', value: '12.8%' },
    ],
  },
  {
    id: '4',
    title: 'E-commerce Optimization',
    client: 'LuxeGoods',
    category: 'Performance',
    description: 'Data-driven optimization campaign that transformed conversion rates and revenue for premium e-commerce.',
    image: '/placeholder.svg',
    tags: ['E-commerce', 'Conversion', 'Analytics'],
    results: [
      { metric: 'Conversion Rate', value: '189%' },
      { metric: 'Revenue Growth', value: '310%' },
    ],
  },
  {
    id: '5',
    title: 'Luxury Automotive Launch',
    client: 'Prestige Motors',
    category: 'Branding',
    description: 'Premium automotive brand launch with comprehensive digital strategy and immersive web experience.',
    image: '/placeholder.svg',
    tags: ['Automotive', 'Luxury', 'Digital Strategy'],
    results: [
      { metric: 'Pre-orders', value: '2,400' },
      { metric: 'Brand Awareness', value: '78%' },
    ],
  },
  {
    id: '6',
    title: 'SaaS Platform Redesign',
    client: 'TechFlow',
    category: 'Web Design',
    description: 'Complete platform redesign for B2B SaaS company, improving user experience and reducing churn rate.',
    image: '/placeholder.svg',
    tags: ['SaaS', 'B2B', 'UX Research'],
    results: [
      { metric: 'Churn Reduction', value: '45%' },
      { metric: 'User Satisfaction', value: '94%' },
    ],
  },
];

const categories = ['All', 'Branding', 'Web Design', 'Marketing', 'Performance'];

export default function CaseStudiesSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredCases = activeCategory === 'All' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeCategory);

  return (
    <section id="work" ref={ref} className="py-24 bg-luxury-50/30">
      <div className="container mx-auto px-6">
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
            className="text-5xl md:text-6xl font-bold text-foreground mb-6"
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Work
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Discover how we've transformed ambitious brands into market leaders 
            through strategic design, innovative technology, and data-driven results.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCases.map((study, index) => (
              <CaseStudyCard
                key={study.id}
                study={study}
                index={index}
                isInView={isInView}
                isHovered={hoveredCase === study.id}
                onHover={() => setHoveredCase(study.id)}
                onLeave={() => setHoveredCase(null)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  isInView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function CaseStudyCard({ study, index, isInView, isHovered, onHover, onLeave }: CaseStudyCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-gold-500/30 transition-all duration-500 hover:shadow-luxury"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={study.image}
          alt={study.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          initial={{ scale: 1.1 }}
          animate={{ scale: isHovered ? 1.15 : 1 }}
          transition={{ duration: 0.7 }}
        />
        
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-luxury-900/80 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{
              scale: isHovered ? 1 : 0,
              rotate: isHovered ? 0 : -90
            }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}
            className="bg-gold-500 text-white p-4 rounded-full shadow-glow-gold"
          >
            <ExternalLink size={20} className="fill-current" />
          </motion.div>
        </motion.div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="bg-gold-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
          >
            {study.category}
          </motion.span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-gold-600 transition-colors duration-300">
                {study.title}
              </h3>
              <p className="text-sm text-muted-foreground">{study.client}</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-muted-foreground hover:text-gold-500 transition-colors duration-300"
            >
              <ExternalLink size={18} />
            </motion.div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {study.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {study.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.4 + index * 0.1 + tagIndex * 0.05 
                }}
                className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Results */}
          <div className="flex gap-4">
            {study.results.map((result, resultIndex) => (
              <motion.div
                key={result.metric}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + index * 0.1 + resultIndex * 0.1 
                }}
                className="text-center"
              >
                <div className="text-lg font-bold text-gold-600">{result.value}</div>
                <div className="text-xs text-muted-foreground">{result.metric}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroImageProps {
  src?: string;
  alt: string;
}

export function HeroImage({ src, alt }: HeroImageProps): React.JSX.Element {
  return (
    <motion.div
      className="relative w-full h-44 sm:h-56 md:h-72 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.15 }}
    >
      <Image
        src={src ?? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=400&fit=crop'}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 600px"
      />
      {/* Bottom gradient for smooth divider blend */}
      <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-black/30 to-transparent" />
    </motion.div>
  );
}

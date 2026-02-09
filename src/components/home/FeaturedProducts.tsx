'use client';

import ProductCard from '../catalogo/ProductCard';
import Link from 'next/link';
import type { FeaturedProduct } from './HomeClientComponents';
import { motion } from 'framer-motion';

import type { Variants } from 'framer-motion';

interface Props {
  products: FeaturedProduct[];
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};

export default function FeaturedProducts({ products }: Props) {
  return (
    <section className="relative bg-green-100 py-12 overflow-hidden group">
      <div className="max-w-[1400px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 text-center mb-8 group">
            Productos Destacados
            <span className="block h-1 w-28 bg-green-600 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </h2>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item} className="h-full">
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Link
            href="/catalogo/pagina-1"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-green-700 hover:shadow-xl transition transform hover:scale-105"
          >
            Ver todo el catálogo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

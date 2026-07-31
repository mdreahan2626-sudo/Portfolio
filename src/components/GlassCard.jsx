'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Custom premium cubic-bezier easing
      }}
      className={`glass-panel glass-panel-hover p-6 md:p-8 rounded-2xl relative overflow-hidden group ${className}`}
    >
      {/* Sleek top-border glare effect */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-50 group-hover:via-white/30 transition-all duration-500" />
      
      {/* Soft background radial highlight that tracks group hover */}
      <div className="absolute -inset-px bg-radial-[circle_800px_at_100%_200px,rgba(255,255,255,0.015),transparent] pointer-events-none group-hover:bg-radial-[circle_800px_at_100%_200px,rgba(255,255,255,0.03),transparent] transition-all duration-500" />
      
      {children}
    </motion.div>
  );
}

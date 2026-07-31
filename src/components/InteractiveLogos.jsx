'use client';

import React from 'react';
import { motion } from 'framer-motion';

// SVG Logos for MERN stack, FastAPI, and Python
const ReactLogo = () => (
  <svg className="w-10 h-10 text-cyan-400" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="10" ry="4.5" />
      <ellipse rx="10" ry="4.5" transform="rotate(60)" />
      <ellipse rx="10" ry="4.5" transform="rotate(120)" />
    </g>
  </svg>
);

const NodeLogo = () => (
  <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm6.75 14.25l-6.75 3.9-6.75-3.9V8.75l6.75-3.9 6.75 3.9v7.5z" />
    <path d="M12 7.75v8.5l5.25-3v-2.5L12 7.75z" opacity="0.8" />
  </svg>
);

const MongoLogo = () => (
  <svg className="w-10 h-10 text-green-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .5c-.3 0-.6.1-.9.2C9.5 1.5 5 6.5 5 11.5c0 4.1 3 8 7 12 4-4 7-7.9 7-12 0-5-4.5-10-6.1-10.8-.3-.1-.6-.2-.9-.2zm0 2.2c1.7.9 5.3 4.9 5.3 8.8 0 3.2-2.3 6.3-5.3 9.4-3-3.1-5.3-6.2-5.3-9.4 0-3.9 3.6-7.9 5.3-8.8zm-1 2.8v11.6c-.9-.6-1.5-1.5-1.5-2.6 0-1.7 1.3-3 1.5-5V5.5z" />
  </svg>
);

const ExpressLogo = () => (
  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-mono text-[10px] font-bold text-white border border-white/20 tracking-wider">
    EX
  </div>
);

const FastApiLogo = () => (
  <svg className="w-10 h-10 text-[#009688]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5h-2v-5H9v-2h4v7zm0-9h-2V6.5h2V8.5z" />
    <path d="M12.5 11l-3 4.5h2.5L11.5 19l4.5-6h-3.5l1.5-2z" fill="#00ffff" />
  </svg>
);

const PythonLogo = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.93 2.02c-2.48 0-4.66.19-5.18.52-.77.5-1.34 1.33-1.34 2.8v2.07h6.64v.93H5.41c-2 0-3.39 1.15-3.39 3.03v2.85c0 1.63.98 2.84 2.5 3.03.62.08 1.19.08 1.8.08h1.22v-1.63c0-2.02 1.66-3.7 3.69-3.7h5.18c1.37 0 2.45-1.09 2.45-2.45V6.76c0-2.48-2.07-4.74-5.13-4.74zm-2.8 1.58c.36 0 .65.3.65.65s-.3.65-.65.65-.65-.3-.65-.65.3-.65.65-.65z" fill="#3776AB" />
    <path d="M12.07 21.98c2.48 0 4.66-.19 5.18-.52.77-.5 1.34-1.33 1.34-2.8v-2.07H11.95v-.93h6.64c2 0 3.39-1.15 3.39-3.03v-2.85c0-1.63-.98-2.84-2.5-3.03-.62-.08-1.19-.08-1.8-.08h-1.22v1.63c0 2.02-1.66 3.7-3.69 3.7H9.09c-1.37 0-2.45 1.09-2.45 2.45v3.42c0 2.48 2.07 4.74 5.13 4.74zm2.8-1.58c-.36 0-.65-.3-.65-.65s.3-.65.65-.65c.36 0 .65.3.65.65s-.29.65-.65.65z" fill="#FFE873" />
  </svg>
);

const logoList = [
  { component: <ReactLogo />, name: 'React.js', color: 'rgba(34, 211, 238, 0.2)' },
  { component: <NodeLogo />, name: 'Node.js', color: 'rgba(34, 197, 94, 0.2)' },
  { component: <ExpressLogo />, name: 'Express.js', color: 'rgba(255, 255, 255, 0.1)' },
  { component: <MongoLogo />, name: 'MongoDB', color: 'rgba(74, 222, 128, 0.2)' },
  { component: <FastApiLogo />, name: 'FastAPI', color: 'rgba(0, 150, 136, 0.2)' },
  { component: <PythonLogo />, name: 'Python Data Stack', color: 'rgba(255, 232, 115, 0.2)' },
];

export default function InteractiveLogos() {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {logoList.map((logo, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md cursor-pointer select-none"
          // Floating idle animation
          animate={{
            y: [0, -6, 0],
          }}
          // Dynamic interaction (hover/touch)
          whileHover={{
            scale: 1.15,
            rotate: [0, -10, 12, -8, 5, 0],
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            boxShadow: `0 0 20px ${logo.color}`,
          }}
          whileTap={{
            scale: 0.95,
            rotate: 0,
            transition: { duration: 0.1 }
          }}
          // Combined transition: floats and keyframed rotation use ease/keyframes, scale uses spring
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: index * 0.3,
              ease: 'easeInOut',
            },
            rotate: {
              type: 'keyframes',
              duration: 0.5,
              ease: 'easeInOut',
            },
            type: 'spring',
            stiffness: 300,
            damping: 12,
          }}
        >
          <div className="mb-2 transition-transform duration-300">
            {logo.component}
          </div>
          <span className="text-[11px] font-medium text-zinc-400 font-sans tracking-wide">
            {logo.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

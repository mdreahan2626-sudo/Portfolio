'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Cpu, 
  Brain, 
  Sprout, 
  ShoppingCart, 
  DollarSign, 
  Terminal,
  ChevronRight,
  Layers,
  Code
} from 'lucide-react';
import GlassCard from './GlassCard';

// Inline SVG Logos for major technologies used across the 4 projects
const TechIcon = ({ name }) => {
  const normalized = name.toLowerCase().replace(/[\s\.\-\(\)]/g, '');

  switch (normalized) {
    case 'nextjs':
    case 'nextjs16':
    case 'nextjs15':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="90" cy="90" r="90" fill="black" />
          <path d="M149.508 157.52L69.142 54H54v72h13.5v-49.86l69.043 89.28c4.66-2.58 9.002-5.58 12.965-8.9z" fill="url(#nextjs-grad)" />
          <rect x="115" y="54" width="14" height="72" fill="url(#nextjs-grad)" />
          <defs>
            <linearGradient id="nextjs-grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'react':
    case 'react19':
    case 'reactjs':
      return (
        <svg className="w-4 h-4 shrink-0 text-cyan-400" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="2" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="10" ry="4.5" />
            <ellipse rx="10" ry="4.5" transform="rotate(60)" />
            <ellipse rx="10" ry="4.5" transform="rotate(120)" />
          </g>
        </svg>
      );
    case 'tailwindcss':
    case 'tailwindcssv4':
      return (
        <svg className="w-4 h-4 shrink-0 text-cyan-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 2.4-3.2 4.4-2.4 6 0 1.6 2.4.8 4.8-2.4 8 3.2 0 5.2-1.6 6-4.8-2.4 3.2-4.4 2.4-6 0-1.6-2.4-.8-4.8 2.4-8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 2.4-3.2 4.4-2.4 6 0 1.6 2.4.8 4.8-2.4 8 3.2 0 5.2-1.6 6-4.8-2.4 3.2-4.4 2.4-6 0-1.6-2.4-.8-4.8 2.4-8z" />
        </svg>
      );
    case 'vite':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 6l-14 24-14-24 4.5-1 9.5 7 9.5-7 4.5 1z" fill="url(#vite-grad)" />
          <path d="M16 10l-1.5 6.5h3L16 23l4.5-8h-3l2.5-5h-4z" fill="#ffeb3b" />
          <defs>
            <linearGradient id="vite-grad" x1="2" y1="5" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#4158D0" />
              <stop offset="0.5" stopColor="#C850C0" />
              <stop offset="1" stopColor="#FFCC70" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'postgresql':
    case 'postgres':
      return (
        <svg className="w-4 h-4 shrink-0 text-sky-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 3.42 1.72 6.44 4.34 8.24-.24-.72-.34-1.44-.34-2.14 0-3.32 2.7-6.02 6.02-6.02h.16c.42 0 .82.04 1.22.12.82-1.58 2.46-2.66 4.36-2.66h.74c.26 0 .48-.22.48-.48v-.12c0-3.88-3.16-7.04-7.04-7.04z" />
          <path d="M19.74 9.1h-.74c-1.34 0-2.48.88-2.88 2.1.84.44 1.54 1.12 2.02 1.94.94-.36 1.62-1.26 1.62-2.32v-.12c0-.88-.72-1.6-1.02-1.6z" opacity="0.7" />
        </svg>
      );
    case 'supabase':
      return (
        <svg className="w-4 h-4 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.36 11.12a.68.68 0 0 0-.6-.37h-7.06V2.36a.68.68 0 0 0-1.19-.45L2.64 12.88a.68.68 0 0 0 .6.37h7.06v8.39a.68.68 0 0 0 1.19.45l9.87-10.97a.68.68 0 0 0 0-.87v-.13z" />
        </svg>
      );
    case 'prisma':
    case 'prismaorm':
      return (
        <svg className="w-4 h-4 shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 22h20L12 2z" />
          <path d="M12 2v20" />
        </svg>
      );
    case 'docker':
    case 'dockercompose':
      return (
        <svg className="w-4 h-4 shrink-0 text-sky-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.983 11.078h2.119v-2.02h-2.119v2.02zm-2.717 0h2.119v-2.02h-2.119v2.02zm-2.718 0h2.119v-2.02H8.548v2.02zm-2.718 0h2.119v-2.02H5.83v2.02zm2.718-2.775h2.119v-2.02H8.548v2.02zm2.717 0h2.119v-2.02h-2.119v2.02zm-5.435 0h2.119v-2.02H5.83v2.02zm5.435-2.775h2.119v-2.02h-2.119v2.02zM23.99 12.65c-.07-.05-.98-.71-2.92-.71-1.39 0-2.6.43-3.32.96-.34-.14-.72-.23-1.12-.27v2.17c.56.05 1.07.24 1.48.54v.02c.02.01.04.02.06.03.88.58 1.49 1.63 1.49 2.82 0 1.93-1.57 3.5-3.5 3.5h-.12c-.11-.01-.22-.02-.33-.04v1.89h1.16c4.61 0 8.07-3.76 8.07-8.38 0-1.07-.33-2.06-.97-2.91zm-7.79 3.01v-2.02h-2.119v2.02h2.119zm-2.717 0v-2.02h-2.119v2.02h2.119zm-2.718 0v-2.02H8.548v2.02zm-2.718 0v-2.02H5.83v2.02zm-2.717 0v-2.02H3.112v2.02h2.119zm10.87 2.776v-2.02h-2.119v2.02h2.119zm-2.717 0v-2.02h-2.119v2.02h2.119zm-2.718 0v-2.02H8.548v2.02zm-2.718 0v-2.02H5.83v2.02zm-2.717 0v-2.02H3.112v2.02h2.119z" />
        </svg>
      );
    case 'nginx':
    case 'nginxloadbalancer':
    case 'nginxrouter':
      return (
        <svg className="w-4 h-4 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.01 2.01L2 12.01l10.01 10.01L22.02 12.01 12.01 2.01zm5.18 13.91l-1.39.77-3.8-5.32v4.55l-2.01.76v-7.9l1.39-.77 3.8 5.32V9.01l2.01-.76v7.67z" />
        </svg>
      );
    case 'node':
    case 'nodejs':
    case 'nodeexpressmicroservices':
    case 'nodejs&express(ts)':
    case 'node/expressmicroservices':
      return (
        <svg className="w-4 h-4 shrink-0 text-green-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm6.75 14.25l-6.75 3.9-6.75-3.9V8.75l6.75-3.9 6.75 3.9v7.5z" />
        </svg>
      );
    case 'fastapi':
      return (
        <svg className="w-4 h-4 shrink-0 text-[#009688]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5h-2v-5H9v-2h4v7zm0-9h-2V6.5h2V8.5z" />
          <path d="M12.5 11l-3 4.5h2.5L11.5 19l4.5-6h-3.5l1.5-2z" fill="#00ffff" />
        </svg>
      );
    case 'python':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.93 2.02c-2.48 0-4.66.19-5.18.52-.77.5-1.34 1.33-1.34 2.8v2.07h6.64v.93H5.41c-2 0-3.39 1.15-3.39 3.03v2.85c0 1.63.98 2.84 2.5 3.03.62.08 1.19.08 1.8.08h1.22v-1.63c0-2.02 1.66-3.7 3.69-3.7h5.18c1.37 0 2.45-1.09 2.45-2.45V6.76c0-2.48-2.07-4.74-5.13-4.74zm-2.8 1.58c.36 0 .65.3.65.65s-.3.65-.65.65-.65-.3-.65-.65.3-.65.65-.65z" fill="#3776AB" />
          <path d="M12.07 21.98c2.48 0 4.66-.19 5.18-.52.77-.5 1.34-1.33 1.34-2.8v-2.07H11.95v-.93h6.64c2 0 3.39-1.15 3.39-3.03v-2.85c0-1.63-.98-2.84-2.5-3.03-.62-.08-1.19-.08-1.8-.08h-1.22v1.63c0 2.02-1.66 3.7-3.69 3.7H9.09c-1.37 0-2.45 1.09-2.45 2.45v3.42c0 2.48 2.07 4.74 5.13 4.74zm2.8-1.58c-.36 0-.65-.3-.65-.65s.3-.65.65-.65c.36 0 .65.3.65.65s-.29.65-.65.65z" fill="#FFE873" />
        </svg>
      );
    case 'gemini':
    case 'geminiai':
    case 'gemini25flash':
    case 'gemini25flash(vision&llm)':
    case 'geminiai(2.5-flash)':
      return (
        <svg className="w-4 h-4 shrink-0 text-indigo-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 24c-.2 0-.4-.1-.5-.2C8.7 18.7 5.3 15.3.2 12.5c-.3-.2-.3-.6 0-.8 5.1-2.8 8.5-6.2 11.3-11.5.2-.3.6-.3.8 0 2.8 5.3 6.2 8.7 11.3 11.5.3.2.3.6 0 .8-5.1 2.8-8.5 6.2-11.3 11.5-.1.1-.3.2-.5.2z" fill="url(#gemini-icon-grad)" />
          <defs>
            <linearGradient id="gemini-icon-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#a78bfa" />
              <stop offset="0.5" stopColor="#06b6d4" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'langgraph(aigenticworkflows)':
    case 'langgraphinspiredstategraph':
    case 'langgraph':
    case 'langchain(rag)':
      return (
        <svg className="w-4 h-4 shrink-0 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="5" r="2.5" fill="currentColor" />
          <circle cx="5" cy="18" r="2.5" />
          <circle cx="19" cy="18" r="2.5" />
          <path d="M12 7.5V13m-2 2.5l-4 2m8-2l4 2M12 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      );
    case 'redis':
      return (
        <svg className="w-4 h-4 shrink-0 text-red-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-2.5L2 17zm0-5l10 5 10-5-10-2.5L2 12z" />
        </svg>
      );
    case 'inngest':
    case 'inngest(backgroundcronjobs)':
      return (
        <svg className="w-4 h-4 shrink-0 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM6 21a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v12a3 3 0 0 0 3 3z" />
          <path d="M15 6H9M15 18H9" />
        </svg>
      );
    case 'resend':
    case 'resendapi':
      return (
        <svg className="w-4 h-4 shrink-0 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case 'razorpay':
      return (
        <svg className="w-4 h-4 shrink-0 text-blue-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.98 12L12 22l-4-5 4-5H5.02L12 2l4 5h-7l3 4z" />
        </svg>
      );
    case 'socketioclient':
      return (
        <svg className="w-4 h-4 shrink-0 text-violet-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 14.5l-4-3.5h3v-4h2v4h3l-4 3.5z" />
        </svg>
      );
    case 'clerk/nextauth':
      return (
        <svg className="w-4 h-4 shrink-0 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="11" r="3" />
        </svg>
      );
    case 'spline(3dwebgl)':
      return (
        <svg className="w-4 h-4 shrink-0 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case 'webspeechapi':
      return (
        <svg className="w-4 h-4 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
        </svg>
      );
    case 'framermotion':
      return (
        <svg className="w-4 h-4 shrink-0 text-fuchsia-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h12v12H0V0zm12 12h12v12H12V12zM0 12h12v12H0V12z" />
        </svg>
      );
    case 'recharts':
      return (
        <svg className="w-4 h-4 shrink-0 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 'arcjet(ratelimiting)':
      return (
        <svg className="w-4 h-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'jspdf':
      return (
        <svg className="w-4 h-4 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      );
    case 'expressapigateway':
    case 'expressnodejsmicroservices':
    case 'node/expressmicroservices':
      return (
        <div className="w-4 h-4 shrink-0 rounded bg-white/10 flex items-center justify-center font-mono text-[6px] font-bold text-white border border-white/20">
          EX
        </div>
      );
    case 'supermemo2(sm2)':
      return (
        <svg className="w-4 h-4 shrink-0 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'decisiontreemodel':
    case 'offlinecustomdecisiontreeml':
      return (
        <svg className="w-4 h-4 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 3h-4v4h4V3zM7 17H3v4h4v-4zM21 17h-4v4h4v-4zM15 7v4H9v6H7v-6h6V7h2zM15 11v6h2v-6h-2z" />
        </svg>
      );
    case 'shadcnui':
      return (
        <svg className="w-4 h-4 shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4 4 20" />
        </svg>
      );
    case 'customedgeauthentication':
      return (
        <svg className="w-4 h-4 shrink-0 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    default:
      return <Code className="w-4 h-4 shrink-0 text-zinc-400" />;
  }
};

const projectsData = [
  {
    id: 'prept',
    title: 'Prept – AI Interview Coach',
    shortIntro: 'An AI-powered interview preparation and coaching platform delivering real-time mock interviews, ATS resume scoring, and live mentor booking.',
    problem: 'Traditional developer interview preparation is generic, lacks personalized feedback on coding/behavioral logic, and human coaching mock sessions are expensive.',
    solution: 'Combines RAG grounded domain coaching, instant Gemini AI mock evaluations, ATS resume parsing, and a peer mentor booking platform with Edge security.',
    github: 'https://github.com/mdreahan2626-sudo/Prept-Interview',
    live: 'https://prept-interview-iota.vercel.app',
    featuredIcon: <Cpu className="w-5 h-5 text-indigo-400 animate-pulse" />,
    accentColor: 'from-indigo-500/20 to-cyan-500/20',
    borderColor: 'group-hover:border-indigo-500/30',
    technologies: [
      'Next.js 16 (React 19)',
      'Tailwind CSS v4',
      'Shadcn UI',
      'Framer Motion',
      'Python FastAPI',
      'Google Gemini API',
      'PostgreSQL',
      'Supabase',
      'Prisma ORM',
      'Arcjet (Rate Limiting)',
      'Custom Edge Authentication',
      'Resend Email API',
      'Docker'
    ],
    highlights: [
      {
        title: 'AI Mock Interviews & RAG',
        desc: 'Interactive simulated interviews using Gemini AI, with instant scoring and grounded feedback based on system design, STAR behavioral framework, and coding guidelines.'
      },
      {
        title: 'ATS Analyzer & Optimizer',
        desc: 'Scans uploaded resumes against specific target job descriptions to identify skill gaps and automatically recommend optimized resume bullet points.'
      },
      {
        title: 'Edge Authentication & Security',
        desc: 'Custom lightweight JWT session verification running inside Next.js 16 Edge Middleware, secured with Arcjet WAF bot detection and rate-limiting.'
      }
    ]
  },
  {
    id: 'smartfarm',
    title: 'SmartFarm Console & AgroBot',
    shortIntro: 'A load-balanced agricultural platform designed to help farmers run scientific crop diagnosis, identify leaf diseases, and get voice-activated weather alerts in native languages.',
    problem: 'Farmers lose crop yields to poor seed compatibility, delayed plant leaf disease recognition, and high language/literacy barriers.',
    solution: 'An accessibility-first farming console with automated soil compatibility, computer-vision leaf pathology scanning, and real-time offline ML models.',
    github: 'https://github.com/mdreahan2626-sudo/AGRICULTURE-PROJECT',
    live: 'https://agriculture-project-amber.vercel.app/',
    featuredIcon: <Sprout className="w-5 h-5 text-emerald-400" />,
    accentColor: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'group-hover:border-emerald-500/30',
    technologies: [
      'Next.js 16 (React 19)',
      'Tailwind CSS v4',
      'Framer Motion',
      'Recharts',
      'PostgreSQL (Prisma)',
      'Docker',
      'Nginx Load Balancer',
      'Node/Express Microservices',
      'LangGraph (AI Workflows)',
      'Gemini 2.5 Flash',
      'Web Speech API',
      'Decision Tree Model'
    ],
    highlights: [
      {
        title: 'LangGraph AgroBot Assistant',
        desc: 'Supports dynamic tool calling (live Open-Meteo & offline ML models) and multilingual voice chat in English, Hindi, Bengali, Marathi, Tamil, and Telugu.'
      },
      {
        title: 'Leaf Pathology Vision Scan',
        desc: 'Analyses plant leaf photos to diagnose diseases, estimate severity, and returns organic/chemical remedy prescriptions in structured JSON format.'
      },
      {
        title: 'Regional Voice Integration',
        desc: 'Integrates SpeechRecognition & SpeechSynthesis in-browser so farmers can speak and hear replies natively without requiring typed interactions.'
      }
    ]
  },
  {
    id: 'lecturemind',
    title: 'LectureMind AI',
    shortIntro: 'An intelligent study workspace that automatically processes lecture recordings, PDF notes, and videos into structured study packages with Socratic voice diagnostics.',
    problem: 'Combats low retention rates from passive reading, automates the hours-long process of creating test reviews, and resolves document retrieval overload.',
    solution: 'Processes raw classroom audio or textbook pages into auto-generated flashcards, mind maps, and diagnostics, paired with a semantic doc chat helper.',
    github: 'https://github.com/mdreahan2626-sudo/LectureMind',
    live: 'https://frontend-7hfjr81zr-rehanebjkbkl.vercel.app/',
    featuredIcon: <Brain className="w-5 h-5 text-purple-400" />,
    accentColor: 'from-purple-500/20 to-violet-500/20',
    borderColor: 'group-hover:border-purple-500/30',
    technologies: [
      'React (v19)',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'Web Speech API',
      'Express API Gateway',
      'Node.js Microservices',
      'FastAPI',
      'PostgreSQL (Supabase)',
      'Prisma ORM',
      'LangGraph',
      'RAG (Gemini Embeddings)',
      'SuperMemo-2 (SM-2)',
      'Docker & Compose',
      'Inngest',
      'Resend API'
    ],
    highlights: [
      {
        title: 'StateGraph Intake Pipeline',
        desc: 'Leverages stateful LangGraph workflows to ingest files, generate summaries, and map concepts into interactive hierarchical structures.'
      },
      {
        title: 'Hybrid Token/Vector RAG',
        desc: 'Features a sliding-window chunker with Gemini Embeddings (text-embedding-004) and a token-hashing/TF-IDF vectorizer fallback.'
      },
      {
        title: 'Algorithmic Active Recall',
        desc: 'Integrates the SuperMemo-2 (SM-2) algorithm to calculate review intervals, repetitions, and ease factors for student flashcards.'
      }
    ]
  },
  {
    id: 'welth',
    title: 'Welth AI',
    shortIntro: 'A premium personal finance tracker and AI wealth manager featuring OCR receipt logging and localized budget auditing recommendations.',
    problem: 'Eliminates fragmented expense logs, tedious manual transaction entry, and lack of personalized, context-aware financial planning advisory.',
    solution: 'Centralizes ledger books, uses vision models to scan physical receipts, and incorporates an intelligent tax-saver coach.',
    github: 'https://github.com/mdreahan2626-sudo/Finance-Tracker',
    live: 'https://finance-tracker-blue-theta.vercel.app/',
    featuredIcon: <DollarSign className="w-5 h-5 text-cyan-400" />,
    accentColor: 'from-cyan-500/20 to-sky-500/20',
    borderColor: 'group-hover:border-cyan-500/30',
    technologies: [
      'Next.js 15',
      'React 19',
      'Tailwind CSS v4',
      'Spline (3D WebGL)',
      'Supabase (PostgreSQL)',
      'Prisma ORM',
      'Inngest',
      'Gemini AI (2.5-flash)',
      'LangChain (RAG)',
      'Arcjet (Rate Limiting)',
      'Clerk / NextAuth',
      'Resend',
      'Recharts',
      'jsPDF'
    ],
    highlights: [
      {
        title: 'AI Vision OCR Intake',
        desc: 'Processes scans of retail or utility receipts using Gemini 2.5-flash to extract vendors, tax parameters, and items in milliseconds.'
      },
      {
        title: 'RAG-Driven Financial Coach',
        desc: 'Runs deep ledger audits against legal rules and local tax guidelines to output customized budget alerts and savings recommendations.'
      },
      {
        title: 'Background Scheduler Grid',
        desc: 'Manages multi-account summaries, weekly asset reports, and payment reminders using Inngest event queues and Resend alerts.'
      }
    ]
  },
  {
    id: 'ecommerce',
    title: 'Multi-Tenant E-Commerce Platform',
    shortIntro: 'A microservices-based multi-merchant catalog platform supporting isolated admin dashboards, client storefronts, and cryptographically verified payment splits.',
    problem: 'SaaS merchants struggle with multi-tenant data separation and secure payment splitting while operating on a shared transactional database.',
    solution: 'A highly scalable PostgreSQL multi-tenant architecture with separate user interfaces, horizontal scaling, and webhook payment validation.',
    github: 'https://github.com/mdreahan2626-sudo/ECOMMERCE-WEBSITE',
    live: 'http://yourdomain.com',
    liveAdmin: 'http://admin.yourdomain.com',
    featuredIcon: <ShoppingCart className="w-5 h-5 text-rose-400" />,
    accentColor: 'from-rose-500/20 to-pink-500/20',
    borderColor: 'group-hover:border-rose-500/30',
    technologies: [
      'React 19',
      'Vite',
      'Socket.io Client',
      'Node.js & Express (TS)',
      'PostgreSQL (Prisma)',
      'Supabase',
      'Cloudinary',
      'Redis',
      'Resend',
      'Docker & Compose',
      'Nginx Router',
      'Razorpay'
    ],
    highlights: [
      {
        title: 'Razorpay Payment Signature Verification',
        desc: 'Converts transactions, initiates orders, and verifies checkout signatures on the server using HMAC-SHA256 encryption to prevent fraud.'
      },
      {
        title: 'Merchant Payout Splits',
        desc: 'Automatically parses shopping cart components by merchant tenant and distributes payouts accordingly while logging independent transactions.'
      },
      {
        title: 'Microservices & Redis Bus',
        desc: 'Divided into Auth, Product, Order, and Payment microservices, routing requests through Nginx, and syncing stats using a Redis WebSocket bus.'
      }
    ]
  }
];

export default function ProjectsSection() {
  const [selectedId, setSelectedId] = useState('prept');

  const selectedProject = projectsData.find(p => p.id === selectedId) || projectsData[0];

  return (
    <div className="w-full lg:w-[95%] xl:w-[90%] pointer-events-auto">
      <GlassCard className="p-6 md:p-8 rounded-2xl relative overflow-hidden group">
        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest bg-white/5 border border-white/10 text-zinc-400 uppercase">
          Portfolio
        </span>
        <h2 className="text-3xl font-bold mt-4 tracking-tight mb-8">
          Featured Projects
        </h2>

        {/* Outer Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Project List (12-col grid spans 5 on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-3 w-full">
            {projectsData.map((project) => {
              const isSelected = project.id === selectedId;
              return (
                <div key={project.id} className="relative">
                  <div
                    onClick={() => setSelectedId(project.id)}
                    className={`group p-4 rounded-xl cursor-pointer transition-all duration-300 border text-left ${
                      isSelected
                        ? `bg-gradient-to-r ${project.accentColor} border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.03)]`
                        : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-black/40 border border-white/10`}>
                          {project.featuredIcon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-xs md:text-sm text-white font-sans tracking-wide">
                            {project.title}
                          </h3>
                          <p className="text-[10px] text-zinc-400 mt-1 font-mono uppercase tracking-wider">
                            {project.technologies[0]} • {project.technologies[project.technologies.length - 1]}
                          </p>
                        </div>
                      </div>
                      
                      {/* Chevron indicator */}
                      <ChevronRight 
                        className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${
                          isSelected ? 'rotate-90 text-white' : 'group-hover:translate-x-0.5'
                        }`} 
                      />
                    </div>

                    <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed font-sans line-clamp-2">
                      {project.shortIntro}
                    </p>
                  </div>

                  {/* MOBILE ACCORDION VIEW: Details expand inline on mobile/tablet screens */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden lg:hidden w-full border-t border-white/5 bg-black/20 rounded-b-xl px-4 pb-4"
                      >
                        <MobileDetailView project={project} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Project Details (Spans 7, hidden on mobile in favor of accordion) */}
          <div className="hidden lg:flex lg:col-span-7 border-l border-white/10 pl-8 flex-col min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  {/* Title & Deployment Links */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          {selectedProject.featuredIcon}
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-white font-sans">
                          {selectedProject.title}
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-400 mt-2 font-sans italic leading-relaxed">
                        {selectedProject.shortIntro}
                      </p>
                    </div>
                  </div>

                  {/* Links Row */}
                  <div className="flex flex-wrap gap-2.5 mt-5">
                    <a 
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5" /> Repository
                    </a>
                    
                    {selectedProject.id === 'ecommerce' ? (
                      <>
                        <a 
                          href={selectedProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white text-black hover:bg-zinc-200 text-xs font-semibold font-sans transition-all cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Storefront
                        </a>
                        <a 
                          href={selectedProject.liveAdmin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
                        >
                          <Terminal className="w-3.5 h-3.5" /> Admin Panel
                        </a>
                      </>
                    ) : (
                      <a 
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white text-black hover:bg-zinc-200 text-xs font-semibold font-sans transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Site
                      </a>
                    )}
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-3.5 rounded-xl border border-rose-500/10 bg-rose-500/[0.02]">
                      <h4 className="flex items-center gap-1.5 text-rose-400 text-xs font-semibold uppercase tracking-wider font-mono">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> The Problem
                      </h4>
                      <p className="text-xs text-zinc-300 mt-2 leading-relaxed font-sans font-light">
                        {selectedProject.problem}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02]">
                      <h4 className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> The Solution
                      </h4>
                      <p className="text-xs text-zinc-300 mt-2 leading-relaxed font-sans font-light">
                        {selectedProject.solution}
                      </p>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider font-mono text-violet-400 mb-3 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" /> Technical Highlights
                    </h4>
                    <div className="space-y-2.5">
                      {selectedProject.highlights.map((highlight, index) => (
                        <div key={index} className="p-3 rounded-lg bg-white/[0.015] border border-white/5 flex gap-3">
                          <span className="text-[10px] font-mono font-bold text-zinc-500 mt-0.5 select-none">
                            0{index + 1}
                          </span>
                          <div>
                            <h5 className="text-xs font-semibold text-zinc-200 font-sans">
                              {highlight.title}
                            </h5>
                            <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed font-sans font-light">
                              {highlight.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies Grid */}
                  <div className="mt-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider font-mono text-cyan-400 mb-3">
                      Core Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all text-xs font-mono text-zinc-300"
                        >
                          <TechIcon name={tech} />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <a 
            href="https://github.com/mdreahan2626-sudo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            Explore all repositories on GitHub <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </GlassCard>
    </div>
  );
}

// Separate helper component for Accordion detail view on Mobile
function MobileDetailView({ project }) {
  return (
    <div className="pt-4 flex flex-col gap-4 text-left">
      {/* Links Row */}
      <div className="flex flex-wrap gap-2">
        <a 
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-zinc-300 hover:text-white transition-all"
        >
          <Github className="w-3.5 h-3.5" /> Repo
        </a>
        
        {project.id === 'ecommerce' ? (
          <>
            <a 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white text-black text-[10px] font-semibold transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Storefront
            </a>
            <a 
              href={project.liveAdmin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-zinc-300 hover:text-white transition-all"
            >
              <Terminal className="w-3.5 h-3.5" /> Admin
            </a>
          </>
        ) : (
          <a 
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white text-black text-[10px] font-semibold transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Live
          </a>
        )}
      </div>

      {/* Problem & Solution (Stacked) */}
      <div className="flex flex-col gap-3">
        <div className="p-3 rounded-lg border border-rose-500/10 bg-rose-500/[0.02]">
          <h4 className="flex items-center gap-1.5 text-rose-400 text-[10px] font-semibold uppercase tracking-wider font-mono">
            <AlertCircle className="w-3 h-3 shrink-0" /> The Problem
          </h4>
          <p className="text-xs text-zinc-300 mt-1 font-light leading-relaxed">
            {project.problem}
          </p>
        </div>

        <div className="p-3 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.02]">
          <h4 className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider font-mono">
            <CheckCircle2 className="w-3 h-3 shrink-0" /> The Solution
          </h4>
          <p className="text-xs text-zinc-300 mt-1 font-light leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="space-y-2">
        <h4 className="text-[10px] font-semibold uppercase tracking-wider font-mono text-violet-400 flex items-center gap-1.5">
          <Layers className="w-3 h-3" /> Highlights
        </h4>
        {project.highlights.map((highlight, index) => (
          <div key={index} className="p-2.5 rounded bg-white/[0.015] border border-white/5">
            <h5 className="text-[11px] font-semibold text-zinc-200">
              {highlight.title}
            </h5>
            <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed font-light">
              {highlight.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Technologies */}
      <div>
        <h4 className="text-[10px] font-semibold uppercase tracking-wider font-mono text-cyan-400 mb-2">
          Technologies
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/[0.02] border border-white/5 text-[10px] font-mono text-zinc-300"
            >
              <TechIcon name={tech} />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

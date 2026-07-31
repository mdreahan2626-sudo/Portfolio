'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowRight, Server, Database, Code, Cpu, Mail, ExternalLink, GraduationCap, User, FileText } from 'lucide-react';
import Lenis from 'lenis';

// Import components
import GlassCard from '@/components/GlassCard';
import ScrollProgress from '@/components/ScrollProgress';
import InteractiveLogos from '@/components/InteractiveLogos';
import ProjectsSection from '@/components/ProjectsSection';

// Dynamically import ThreeCanvas to bypass SSR errors
const ThreeCanvas = dynamic(() => import('@/components/ThreeCanvas'), { 
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a] z-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-t-purple-500 border-white/10 rounded-full animate-spin" />
        <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          Initializing 3D Workspace...
        </span>
      </div>
    </div>
  )
});

export default function Home() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential easing
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen text-[#f5f5f7]">
      {/* 3D Canvas Background */}
      <ThreeCanvas />

      {/* Right Progress Indicator */}
      <ScrollProgress />

      {/* Hero Header / Nav Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 p-4 md:p-6 flex justify-between items-center pointer-events-none">
        {/* Left Brand Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onClick={() => scrollToSection('about')}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md cursor-pointer pointer-events-auto hover:border-white/10 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-zinc-300 font-bold uppercase">
            MD REHAN
          </span>
        </motion.div>

        {/* Center Nav Pill (Desktop Only) */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-full border border-white/5 bg-black/40 backdrop-blur-md pointer-events-auto"
        >
          {['about', 'details', 'skills', 'projects', 'contact'].map((sec) => (
            <button
              key={sec}
              onClick={() => scrollToSection(sec)}
              className="px-3.5 py-1.5 rounded-full text-[10px] font-mono font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all uppercase tracking-wider cursor-pointer"
            >
              {sec}
            </button>
          ))}
        </motion.nav>

        {/* Right Controls */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 pointer-events-auto"
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="glow-button px-4 py-2 rounded-full border border-white/10 bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all duration-300 uppercase tracking-wider hidden sm:block cursor-pointer"
          >
            Connect
          </button>
          <div className="flex gap-3 px-3 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md">
            <a 
              href="https://github.com/mdreahan2626-sudo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors duration-300"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://www.linkedin.com/in/md-rehan-790742304/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors duration-300"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="/resume.pdf" 
              download="Md_Rehan_Resume.pdf"
              className="text-zinc-400 hover:text-white transition-colors duration-300 border-l border-white/10 pl-2 flex items-center"
              title="Download Resume"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
            </a>
          </div>
        </motion.div>
      </header>

      {/* Scrollable Content Wrapper */}
      <div className="relative z-10 pointer-events-none">
        
        {/* SECTION 1: HERO / INTRO (Right Column) - Stylish next to Desktop */}
        <section id="about" className="min-h-screen flex items-center justify-end px-6 md:px-24 max-w-7xl mx-auto py-20">
          <div className="w-full lg:w-[48%] pointer-events-auto">
            <GlassCard delay={0.2}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-white/5 border border-white/10 text-zinc-300 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Backend Architect
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mt-4 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                Md Rehan
              </h1>
              <p className="text-[11px] font-mono font-bold tracking-widest text-violet-400 uppercase mt-1">
                MERN Stack & FastAPI Specialist
              </p>
              
              <p className="text-zinc-300 text-sm md:text-base mt-4 leading-relaxed font-sans font-light border-l-2 border-white/10 pl-4">
                I am a backend developer who provides freelance services. I engineer performant server architectures, custom API networks, and intelligent backend databases.
              </p>
              
              <div className="flex items-center gap-2 mt-6 text-xs text-zinc-500 font-mono">
                <span className="text-violet-400 font-bold font-mono animate-bounce">↓</span> Scroll down for credentials & details
              </div>
            </GlassCard>
          </div>
        </section>

        {/* SECTION 2: PROFILE DETAILS (Left Column) - VIT Bhopal & Detailed Intro */}
        <section id="details" className="min-h-screen flex items-center justify-start px-6 md:px-24 max-w-7xl mx-auto py-20">
          <div className="w-full lg:w-[48%] pointer-events-auto">
            <GlassCard delay={0.1}>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest bg-white/5 border border-white/10 text-zinc-400 uppercase">
                Profile
              </span>
              <h2 className="text-3xl font-bold mt-4 tracking-tight">
                Academic & Profile
              </h2>
              
              <div className="mt-5 space-y-4 font-sans text-sm text-zinc-300">
                <div className="flex gap-3 items-start p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <GraduationCap className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white text-xs font-mono uppercase tracking-wider">Education</h4>
                    <p className="mt-1">B.Tech CSE Core</p>
                    <p className="text-xs text-zinc-400 mt-0.5">VIT Bhopal University</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <User className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white text-xs font-mono uppercase tracking-wider">Engineering Focus</h4>
                    <p className="mt-1">Designing microservices, building secure authentication protocols, query optimizations, and data handling libraries.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6 items-center flex-wrap">
                <button
                  onClick={() => scrollToSection('skills')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
                >
                  View Tech Stack <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-zinc-700 hidden sm:inline">|</span>
                <a
                  href="/resume.pdf"
                  download="Md_Rehan_Resume.pdf"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Download Resume <FileText className="w-3.5 h-3.5" />
                </a>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* SECTION 3: SKILLS (Right Column) */}
        <section id="skills" className="min-h-screen flex items-center justify-end px-6 md:px-24 max-w-7xl mx-auto py-20">
          <div className="w-full lg:w-[48%] pointer-events-auto">
            <GlassCard delay={0.1}>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest bg-white/5 border border-white/10 text-zinc-400 uppercase">
                Technical Stack
              </span>
              <h2 className="text-3xl font-bold mt-4 tracking-tight">
                Architectural Expertise
              </h2>
              
              <p className="text-zinc-300 text-xs mt-2 leading-relaxed">
                Developing scalable backend systems, database schemas, and intelligent data pipelines. Touch the logos below to interact.
              </p>

              {/* Categorized Skills Capsules */}
              <div className="mt-5 space-y-4 text-xs font-mono">
                {/* Languages & Frontend */}
                <div>
                  <h4 className="text-[10px] uppercase text-violet-400 font-bold tracking-wider mb-2">Languages & Frontend</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'C++', 'JavaScript', 'HTML5', 'CSS3', 'React.js', 'Tailwind CSS'].map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/5 text-zinc-300 text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Backend & Databases */}
                <div>
                  <h4 className="text-[10px] uppercase text-emerald-400 font-bold tracking-wider mb-2">Backend & Databases</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'MongoDB', 'Prisma'].map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/5 text-zinc-300 text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI/ML & Data */}
                <div>
                  <h4 className="text-[10px] uppercase text-cyan-400 font-bold tracking-wider mb-2">AI/ML & Data</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['LangChain', 'LangGraph', 'RAG', 'Scikit-learn', 'NumPy', 'Pandas', 'Matplotlib'].map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/5 text-zinc-300 text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* DevOps & Concepts */}
                <div>
                  <h4 className="text-[10px] uppercase text-yellow-400 font-bold tracking-wider mb-2">DevOps & System Concepts</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['Docker', 'Apache Kafka', 'Git & GitHub', 'System Design', 'JWT Auth', 'Microservices', 'API Design'].map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/5 text-zinc-300 text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* MERN + FastAPI Interactive logos */}
              <InteractiveLogos />
            </GlassCard>
          </div>
        </section>

        {/* SECTION 4: PROJECTS (Responsive Split Layout) */}
        <section id="projects" className="min-h-screen flex items-center justify-center px-6 md:px-24 max-w-7xl mx-auto py-20">
          <ProjectsSection />
        </section>

        {/* SECTION 5: CONTACT (Right Column) */}
        <section id="contact" className="min-h-screen flex items-center justify-end px-6 md:px-24 max-w-7xl mx-auto py-20">
          <div className="w-full lg:w-[48%] pointer-events-auto">
            <GlassCard delay={0.1}>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest bg-white/5 border border-white/10 text-zinc-400 uppercase">
                Contact
              </span>
              <h2 className="text-3xl font-bold mt-4 tracking-tight">
                Let's Build Together
              </h2>
              
              <p className="text-zinc-300 text-sm mt-3 leading-relaxed">
                Whether you need a bespoke API system, data intelligence dashboards, or complete web systems, I am ready to collaborate.
              </p>

              {/* Minimal Social Buttons */}
              <div className="space-y-3 mt-6">
                <a 
                  href="https://www.linkedin.com/in/md-rehan-790742304/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-cyan-400" />
                    <span className="text-xs font-mono">LinkedIn Profile</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-500" />
                </a>

                <a 
                  href="https://github.com/mdreahan2626-sudo" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-white" />
                    <span className="text-xs font-mono">GitHub Repositories</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-500" />
                </a>

                <div 
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-violet-400" />
                    <span className="text-xs font-mono">mdreahan2626@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center text-[10px] font-mono text-zinc-600">
                Designed & Developed // MD REHAN © {new Date().getFullYear()}
              </div>
            </GlassCard>
          </div>
        </section>

      </div>
    </main>
  );
}

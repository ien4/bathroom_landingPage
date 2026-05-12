import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "motion/react";
import { 
  ArrowRight, 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Droplets,
  Wind
} from "lucide-react";
import { PRODUCTS, COLLECTIONS, CATEGORIES, MATERIALS, TESTIMONIALS } from "./data";
import { cn } from "./lib/utils";
import gsap from "gsap";
import Lenis from "lenis";

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [percent, setPercent] = useState(0);
  const words = ["Water", "Stone", "Comfort", "Ritual"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(wordInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-12 noise-bg"
    >
      <div className="absolute top-12 left-12 font-serif text-2xl italic tracking-widest text-[#F4F0E8]">
        Bath Atelier
      </div>
      
      <div className="relative h-20 flex flex-col items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.h2
            key={words[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-4xl md:text-6xl font-serif italic text-gold"
          >
            {words[wordIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-24 right-12 text-6xl font-serif text-ivory/20">
        {percent.toString().padStart(3, "0")}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-soft">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          className="h-full bg-gradient-to-r from-bronze to-gold"
        />
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-10",
        isScrolled ? "py-4" : "py-8"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          <a href="#" className="text-2xl font-serif italic text-gold tracking-tight">
            Bath Atelier
          </a>
        </div>

        <nav className="hidden lg:flex items-center bg-surface-soft/80 backdrop-blur-xl border border-white/10 rounded-full px-8 py-2.5 space-x-8 glass">
          {["Collections", "Products", "Showroom", "Consult"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[11px] uppercase tracking-[0.2em] text-muted hover:text-gold transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex-1 flex justify-end items-center gap-4">
          <button className="hidden md:block px-6 py-2.5 bg-gold text-black rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-champagne transition-all shadow-lg shadow-gold/10">
            Book Consult
          </button>
          <button 
            className="lg:hidden p-2 text-ivory"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] bg-surface flex flex-col p-12"
          >
            <button 
              className="self-end p-2 text-ivory mb-12"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8">
              {["Collections", "Products", "Materials", "Showroom", "Consult"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-serif italic text-ivory border-b border-white/5 pb-4"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <button className="w-full py-5 bg-gold text-black rounded-full font-bold uppercase tracking-widest">
                Book Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const SectionTitle = ({ eyebrow, title, subtext, center = false }: { eyebrow?: string, title: string, subtext?: string, center?: boolean }) => {
  return (
    <div className={cn("mb-16", center ? "text-center" : "text-left")}>
      {eyebrow && (
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold text-[12px] font-medium tracking-[0.3em] uppercase mb-6 block"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-[42px] md:text-[64px] font-serif italic text-ivory leading-[1.1] overflow-hidden"
      >
        {title}
      </motion.h2>
      {subtext && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted max-w-xl mt-6 text-lg font-light leading-relaxed mx-auto md:mx-0"
        >
          {subtext}
        </motion.p>
      )}
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize Lenis for smooth scroll
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-[#050505] text-[#F4F0E8] overflow-x-hidden">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Navbar />

          {/* --- HERO SECTION --- */}
          <section className="relative min-h-screen flex items-center justify-center pt-24 px-10 overflow-hidden bg-[#050505]">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#151512 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            
            <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gold opacity-[0.03] blur-[150px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full">
              <div className="space-y-10">
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-gold text-[12px] font-medium tracking-[0.3em] uppercase">Sanitaryware Collection 2026</span>
                  </motion.div>
                </div>

                <div className="text-reveal">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[64px] md:text-[92px] leading-[0.85] font-serif italic text-white tracking-tighter"
                  >
                    Defining the <br/>
                    <span className="text-gold pr-4">Architecture</span> <br/>
                    of Water
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-muted text-lg max-w-[440px] font-light leading-relaxed"
                >
                  Discover premium sanitaryware collections crafted for modern homes, villas, and refined private spaces. Minimal design meets intelligent comfort.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex items-center space-x-6 pt-4"
                >
                  <button className="px-10 py-5 border border-gold text-gold rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-500">
                    Explore Concepts
                  </button>
                  <div className="flex flex-col border-l border-white/10 pl-6">
                    <span className="text-[24px] font-serif text-gold italic">500+</span>
                    <span className="text-[10px] uppercase tracking-wider text-subtle">Global Projects</span>
                  </div>
                </motion.div>
              </div>

              <div className="relative group hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 aspect-[4/5] bg-surface rounded-[40px] border border-white/5 overflow-hidden p-8 flex items-center justify-center"
                >
                   <div className="absolute inset-0 opacity-40 grayscale group-hover:scale-105 transition-transform duration-[3s]">
                     <img 
                       src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" 
                       alt="Porcelain Detail"
                       className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                   </div>

                  <div className="absolute top-8 right-8">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center space-x-2">
                       <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(216,192,138,0.5)]"></div>
                       <span className="text-[9px] uppercase tracking-widest text-ivory">Touchless Flush</span>
                    </div>
                  </div>

                  <div className="relative w-64 h-80 bg-white/5 rounded-[120px] border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-sm">
                     <div className="w-56 h-72 border-2 border-gold/10 rounded-[100px]" />
                     <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                        <span className="text-[10px] text-subtle font-medium uppercase tracking-tighter block opacity-60">Architectural Porcelain Finish</span>
                     </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* --- FEATURED PRODUCT SHOWCASE --- */}
          <section id="products" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
            <SectionTitle eyebrow="Signature Series" title="Signature Sanitaryware" subtext="Iconic pieces designed for comfort, precision, and lasting beauty." />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative rounded-[32px] overflow-hidden aspect-[4/5] lg:aspect-square"
              >
                <img 
                  src={PRODUCTS[0].image} 
                  alt="Luna X" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
              </motion.div>

              <div className="space-y-8">
                <h3 className="text-4xl md:text-5xl font-serif italic text-ivory">Luna X Smart Toilet</h3>
                <p className="text-muted text-lg">Intuitive technology meets architectural silence. A masterpiece of engineering that transforms daily routines into rituals of luxury.</p>
                
                <div className="grid grid-cols-2 gap-6">
                  {PRODUCTS[0].features?.map((feature, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 size={16} className="text-gold" />
                      <span className="text-sm text-muted">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-4 pt-6">
                  <button className="px-8 py-4 bg-gold text-black rounded-full font-bold uppercase tracking-widest hover:bg-champagne transition-all">View Details</button>
                  <button className="px-8 py-4 border border-white/10 text-ivory rounded-full font-bold uppercase tracking-widest hover:bg-white/5 transition-all">Request Quote</button>
                </div>
              </div>
            </div>
          </section>

          {/* --- CURATED COLLECTIONS (BENTO) --- */}
          <section id="collections" className="py-32 px-6 md:px-12 bg-surface-soft/50 noise-bg">
            <div className="max-w-7xl mx-auto">
              <SectionTitle eyebrow="Bespoke Experience" title="Curated Collections" subtext="Complete bathroom concepts for refined living spaces." center />
              
              <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-6 md:h-[900px]">
                {/* Main Large Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="md:col-span-8 md:row-span-2 relative rounded-[32px] overflow-hidden group"
                >
                  <img src={COLLECTIONS[0].image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" alt={COLLECTIONS[0].title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="flex gap-2 mb-4">
                      {COLLECTIONS[0].tags.map(tag => <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">{tag}</span>)}
                    </div>
                    <h3 className="text-4xl font-serif italic text-ivory mb-2">{COLLECTIONS[0].title}</h3>
                    <p className="text-muted max-w-sm">{COLLECTIONS[0].description}</p>
                    <button className="mt-6 flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                      Explore Collection <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>

                {/* Smaller Cards */}
                {COLLECTIONS.slice(1, 3).map((col, i) => (
                  <motion.div 
                    key={col.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i + 1) * 0.1 }}
                    className="md:col-span-4 relative rounded-[32px] overflow-hidden group"
                  >
                    <img src={col.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" alt={col.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <h3 className="text-2xl font-serif italic text-ivory">{col.title}</h3>
                      <button className="mt-4 flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-widest">
                        View <ChevronRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {/* Additional logic for other collections if grid was more complex */}
              </div>
            </div>
          </section>

          {/* --- CATEGORIES SECTION --- */}
          <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
            <SectionTitle eyebrow="Product Range" title="Explore by Category" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewPort={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video rounded-[24px] overflow-hidden mb-6">
                    <img src={cat.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={cat.name} />
                  </div>
                  <h4 className="text-xl font-serif italic text-ivory mb-2">{cat.name}</h4>
                  <p className="text-subtle text-sm mb-4">{cat.description}</p>
                  <a href="#" className="text-gold text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Category <ArrowRight size={14} />
                  </a>
                </motion.div>
              ))}
            </div>
          </section>

          {/* --- WHY CHOOSE US --- */}
          <section className="py-32 px-6 md:px-12 bg-surface">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <SectionTitle eyebrow="Excellence" title="Designed for the way you live" subtext="From product selection to layout planning, we help you create a bathroom that feels effortless every day." />
                
                <div className="space-y-12">
                  {[
                    { icon: ShieldCheck, title: "Curated Selection", text: "Only models that balance design, durability, and ergonomic comfort." },
                    { icon: Wind, title: "Space Consultation", text: "We recommend products based on your specific bathroom size and layout." },
                    { icon: Droplets, title: "Premium Materials", text: "Brass, stone, and finishes selected for long-term functional beauty." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gold">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h5 className="text-lg font-serif italic text-ivory mb-2">{item.title}</h5>
                        <p className="text-muted text-sm leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-1/2 relative">
                <img 
                  src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070&auto=format&fit=crop" 
                  className="rounded-[40px] shadow-2xl relative z-10" 
                  alt="Showroom display"
                />
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-gold/5 blur-[50px] rounded-full" />
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-bronze/5 blur-[80px] rounded-full" />
              </div>
            </div>
          </section>

          {/* --- SMART TECHNOLOGY SECTION --- */}
          <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
            <div className="glass rounded-[48px] p-12 md:p-24 overflow-hidden relative">
              <div className="relative z-10 flex flex-col items-center text-center">
                <SectionTitle eyebrow="Innovation" title="Smart Comfort, Seamless Hygiene" subtext="Modern sanitaryware brings cleaner routines and effortless control into everyday life." center />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full mt-12">
                  {[
                    { icon: Zap, label: "Touchless Flush" },
                    { icon: ShieldCheck, label: "Antibacterial" },
                    { icon: Droplets, label: "Water Saving" },
                    { icon: Wind, label: "Air Deodorizing" }
                  ].map((feat, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center gap-4 p-8 glass-panel rounded-3xl"
                    >
                      <feat.icon size={32} className="text-gold" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-ivory">{feat.label}</span>
                    </motion.div>
                  ))}
                </div>

                <button className="mt-16 px-10 py-5 bg-gold text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all">
                  Explore Smart Products
                </button>
              </div>

              {/* Background Glows */}
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(216,192,138,0.1),transparent_70%)]" />
            </div>
          </section>

          {/* --- MATERIALS SECTION --- */}
          <section id="materials" className="py-32 px-10 max-w-7xl mx-auto">
            <SectionTitle eyebrow="Curated Finishes" title="The Material Palette" center />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 bg-surface p-12 rounded-[32px] border border-white/5">
              {MATERIALS.map((mat, i) => (
                <motion.div
                  key={mat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center space-x-6 group"
                >
                  <div 
                    className="flex-shrink-0 w-16 h-16 rounded-full border-4 border-white/5 shadow-inner transition-transform duration-500 group-hover:scale-110"
                    style={{ background: mat.color }}
                  />
                  <div>
                    <h4 className="text-lg font-serif italic text-ivory mb-1">{mat.name}</h4>
                    <p className="text-subtle text-[11px] uppercase tracking-widest leading-relaxed max-w-[200px]">{mat.description}</p>
                    <div className="mt-2 text-[9px] text-[#6F675E] uppercase tracking-tighter">Selected for longevity</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* --- CONSULTATION PROCESS --- */}
          <section id="consult" className="py-32 px-6 md:px-12 bg-surface-soft">
            <div className="max-w-7xl mx-auto">
              <SectionTitle eyebrow="Protocol" title="From idea to bathroom selection" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                {/* Connection Line */}
                <div className="hidden md:block absolute top-[60px] left-0 w-full h-[1px] bg-white/5" />
                
                {[
                  { step: "01", title: "Share Your Space", text: "Send us your layout size, style preference, and expected budget." },
                  { step: "02", title: "Product Matching", text: "We recommend collections that fit your specific plumbing and layout." },
                  { step: "03", title: "Review Proposal", text: "Experience combinations of materials and finishes before deciding." },
                  { step: "04", title: "Project Support", text: "We provide guidance for your contractor for a seamless installation." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative pt-16 group"
                  >
                    <div className="text-5xl font-serif italic text-white/5 absolute top-0 group-hover:text-gold/20 transition-colors">{item.step}</div>
                    <div className="w-3 h-3 rounded-full bg-gold/20 absolute top-[54px] group-hover:bg-gold transition-all" />
                    <h5 className="text-xl font-serif italic text-ivory mb-4">{item.title}</h5>
                    <p className="text-subtle text-sm leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mt-20">
                <button className="px-12 py-5 bg-gold text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-gold/20">
                  Start Consultation
                </button>
              </div>
            </div>
          </section>

          {/* --- TESTIMONIALS --- */}
          <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
            <SectionTitle eyebrow="Accolades" title="Trusted for the most refined spaces" center />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 rounded-[32px] glass relative"
                >
                  <p className="text-lg font-serif italic text-ivory mb-8">"{t.quote}"</p>
                  <div className="mt-auto">
                    <div className="font-bold text-gold text-xs uppercase tracking-widest">{t.name}</div>
                    <div className="text-subtle text-[10px] uppercase tracking-widest mt-1">{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* --- FOOTER --- */}
          <footer className="relative pt-40 pb-10 px-10 border-t border-white/5 bg-[#050505]">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20 pointer-events-none">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-6xl md:text-[140px] font-serif italic text-white/5 whitespace-nowrap"
                >
                  DESIGNING WATER
                </motion.h2>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center space-x-4">
                  <div className="w-1.5 h-1.5 bg-[#44FF44] rounded-full shadow-[0_0_8px_rgba(68,255,68,0.5)] animate-pulse"></div>
                  <span className="text-[10px] uppercase tracking-widest text-muted">Available for Design Consultation</span>
                </div>
                
                <div className="flex items-center space-x-8">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-subtle">
                    © 2026 Bath Atelier • Showroom • HCM City
                  </div>
                  <div className="hidden md:flex items-center space-x-6">
                    <a href="#" className="text-subtle hover:text-gold transition-colors"><Instagram size={18} /></a>
                    <a href="#" className="text-subtle hover:text-gold transition-colors"><Facebook size={18} /></a>
                  </div>
                </div>
              </div>
            </div>
          </footer>

        </motion.div>
      )}
    </div>
  );
}

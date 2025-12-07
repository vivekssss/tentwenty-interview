"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
    title: "Started in 2017",
    subtitle: "FLora Delight",
    description: "There's always something happening at Flower Exchange!",
    badge: "New products",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
    title: "Founded 2018",
    subtitle: "Bloom Haven",
    description: "Discover the beauty of nature's finest creations",
    badge: "Premium",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
    title: "Est. 2019",
    subtitle: "Pet Paradise",
    description: "Where your furry friends find their perfect match",
    badge: "Featured",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    title: "Since 2020",
    subtitle: "Wild Trails",
    description: "Adventure awaits around every corner",
    badge: "Popular",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    title: "Born 2021",
    subtitle: "Ocean Dreams",
    description: "Dive into the wonders of the deep blue sea",
    badge: "New",
  },
];

function CircularCursor({ hoveredCard, onPrev, onNext }: { 
  hoveredCard: number | null; 
  onPrev: () => void; 
  onNext: () => void; 
}) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        cursorX.set(e.touches[0].clientX);
        cursorY.set(e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-50 hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <AnimatePresence mode="wait">
        {hoveredCard === null ? (
          <motion.div
            key="default"
            className="w-4 h-4 bg-white rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        ) : (
          <motion.div
            key="skeleton"
            className="w-[180px] h-[180px] rounded-full overflow-hidden border-2 border-white/50 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-teal-600/20 backdrop-blur-md"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ 
              duration: 0.4, 
              ease: "anticipate",
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            {/* Animated gradient background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 via-purple-500/30 to-blue-500/30"
              animate={{
                background: [
                  "linear-gradient(to-tr, from-pink-500/30 via-purple-500/30 to-blue-500/30)",
                  "linear-gradient(to-tr, from-purple-500/30 via-blue-500/30 to-teal-500/30)",
                  "linear-gradient(to-tr, from-blue-500/30 via-teal-500/30 to-pink-500/30)",
                  "linear-gradient(to-tr, from-teal-500/30 via-pink-500/30 to-purple-500/30)",
                  "linear-gradient(to-tr, from-pink-500/30 via-purple-500/30 to-blue-500/30)",
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.svg
              className="absolute inset-0 w-full h-full p-6"
              viewBox="0 0 100 100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {/* Card skeleton outline with gradient stroke */}
              <defs>
                <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              
              <rect
                x="8"
                y="12"
                width="84"
                height="76"
                fill="none"
                stroke="url(#strokeGradient)"
                strokeWidth="2"
                rx="10"
              />
              
              <rect
                x="12"
                y="16"
                width="76"
                height="48"
                fill="none"
                stroke="url(#strokeGradient)"
                strokeWidth="1.5"
                rx="6"
              />
              
              {/* Animated skeleton elements with color */}
              <motion.circle 
                cx="30" 
                cy="30" 
                r="8" 
                fill="none" 
                stroke="#ec4899" 
                strokeWidth="1"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4],
                  stroke: ["#ec4899", "#8b5cf6", "#3b82f6", "#ec4899"]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.circle 
                cx="50" 
                cy="35" 
                r="6" 
                fill="none" 
                stroke="#8b5cf6" 
                strokeWidth="1"
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 1, 0.4],
                  stroke: ["#8b5cf6", "#3b82f6", "#10b981", "#8b5cf6"]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              
              <motion.circle 
                cx="70" 
                cy="32" 
                r="7" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="1"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 1, 0.4],
                  stroke: ["#3b82f6", "#10b981", "#f59e0b", "#3b82f6"]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              
              <motion.circle 
                cx="45" 
                cy="45" 
                r="5" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="1"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                  stroke: ["#10b981", "#f59e0b", "#ef4444", "#10b981"]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              />
              
              {/* Text lines with animated colors */}
              <motion.line 
                x1="16" 
                y1="72" 
                x2="84" 
                y2="72" 
                stroke="#f59e0b" 
                strokeWidth="1.5"
                animate={{
                  stroke: ["#f59e0b", "#ef4444", "#ec4899", "#f59e0b"],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.line 
                x1="16" 
                y1="78" 
                x2="68" 
                y2="78" 
                stroke="#ef4444" 
                strokeWidth="1"
                animate={{
                  stroke: ["#ef4444", "#ec4899", "#8b5cf6", "#ef4444"],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              />
              
              <motion.line 
                x1="16" 
                y1="84" 
                x2="72" 
                y2="84" 
                stroke="#ec4899" 
                strokeWidth="1"
                animate={{
                  stroke: ["#ec4899", "#8b5cf6", "#3b82f6", "#ec4899"],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }}
              />
              
              {/* Badge skeleton with pulse */}
              <motion.circle 
                cx="78" 
                cy="80" 
                r="6" 
                fill="none" 
                stroke="url(#strokeGradient)" 
                strokeWidth="1.5"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.svg>
            
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors pointer-events-auto"
              onClick={onPrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors pointer-events-auto"
              onClick={onNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function CardSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header text animations
      gsap.fromTo(".header-text",
        {
          y: 80,
          opacity: 0,
          rotationX: -30,
          skewX: 10,
          filter: "blur(10px)"
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          skewX: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".header-text",
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(".header-description",
        {
          y: 60,
          opacity: 0,
          rotationX: -20,
          filter: "blur(8px)"
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          filter: "blur(0px)",
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".header-description",
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.to(card, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      textRefs.current.forEach((textRef) => {
        if (!textRef) return;

        gsap.fromTo(textRef.querySelectorAll(".text-line"),
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef,
              start: "top 85%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      
      const offset = index - activeIndex;
      const isActive = offset === 0;
      const isLeft = offset === -1 || (offset === cards.length - 1);
      const isRight = offset === 1 || (offset === -(cards.length - 1));
      
      let x = 0;
      let scale = 1;
      let rotationY = 0;
      let opacity = 1;
      let zIndex = 10;
      
      if (isActive) {
        scale = 1.1;
        zIndex = 30;
      } else if (isLeft) {
        x = -400;
        scale = 0.9;
        rotationY = 25;
        zIndex = 20;
      } else if (isRight) {
        x = 400;
        scale = 0.9;
        rotationY = -25;
        zIndex = 20;
      } else {
        opacity = 0;
        zIndex = 5;
      }
      
      tl.to(card, {
        scale,
        x,
        rotationY,
        opacity,
        zIndex,
        duration: 1.2,
        ease: "power4.inOut",
      }, 0);
    });

    // Enhanced text animations for active card
    textRefs.current.forEach((textRef, index) => {
      if (!textRef) return;
      
      const isActive = index === activeIndex;
      
      if (isActive) {
        // Staggered entrance animation for active text
        tl.fromTo(
          textRef.querySelectorAll(".text-line"),
          { 
            y: 80, 
            opacity: 0, 
            rotationX: -30,
            skewX: 10,
            filter: "blur(10px)"
          },
          { 
            y: 0, 
            opacity: 1, 
            rotationX: 0,
            skewX: 0,
            filter: "blur(0px)",
            duration: 1.2, 
            stagger: 0.15, 
            ease: "power3.out"
          },
          0.2
        );
        
        // Add a subtle glow effect
        tl.fromTo(
          textRef,
          { 
            filter: "brightness(0.8) saturate(0.8)",
            transform: "scale(0.95)"
          },
          { 
            filter: "brightness(1.2) saturate(1.2)",
            transform: "scale(1)",
            duration: 0.8,
            ease: "power2.out"
          },
          0.3
        );
      } else {
        // Exit animation for inactive text
        tl.to(
          textRef.querySelectorAll(".text-line"),
          { 
            y: -60, 
            opacity: 0, 
            rotationX: 20,
            skewX: -10,
            filter: "blur(8px)",
            duration: 0.8, 
            ease: "power2.in" 
          },
          0
        );
        
        // Scale down inactive text container
        tl.to(
          textRef,
          { 
            filter: "brightness(0.7) saturate(0.7)",
            transform: "scale(0.9)",
            duration: 0.6,
            ease: "power2.in"
          },
          0
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX("touches" in e ? e.touches[0].clientX : e.clientX);
  }, []);

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const offset = currentX - dragStartX;
    setDragOffset(offset);
    
    cardRefs.current.forEach((card) => {
      if (card) {
        gsap.to(card, {
          x: `+=${offset * 0.3}`,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    });
  }, [isDragging, dragStartX]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Swipe right - go to previous card (infinite)
        setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
      } else if (dragOffset < 0) {
        // Swipe left - go to next card (infinite)
        setActiveIndex((prev) => (prev + 1) % cards.length);
      }
    }
    
    setDragOffset(0);
  }, [isDragging, dragOffset]);

  const handleCardClick = useCallback((index: number) => {
    if (!isDragging && index !== activeIndex) {
      setActiveIndex(index);
    }
  }, [isDragging, activeIndex]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <CircularCursor 
        hoveredCard={hoveredCard} 
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <div className="section flex flex-col items-center justify-center py-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 header-text">
            Quality Products
          </h2>
          <p className="text-lg text-white/50 max-w-3xl mx-auto header-description">
            Animation-led storytelling that feels tactile, warm, and intentional. We choreograph visuals so every frame lands with purpose.
          </p>
        </div>
        
        <div
          ref={sliderRef}
          className="relative h-[500px] w-full max-w-7xl mx-auto cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div className="absolute inset-0 flex items-center justify-center perspective-1000">
            {cards.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="absolute w-[350px] h-[450px] bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-3xl"
                style={{ 
                  transformStyle: "preserve-3d",
                }}
                onClick={() => handleCardClick(index)}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.subtitle}
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs rounded-full">
                      {card.badge}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center max-w-3xl">
          {cards.map((card, index) => (
            <div
              key={`text-${card.id}`}
              ref={(el) => {
                textRefs.current[index] = el;
              }}
              className={`space-y-4 ${index === activeIndex ? 'block' : 'hidden'}`}
            >
              <p className="text-line text-lg text-white/60 uppercase tracking-wider font-medium">
                {card.title}
              </p>
              <h3 className="text-line text-4xl md:text-5xl font-bold text-white">
                {card.subtitle}
              </h3>
              <p className="text-line text-xl text-white/80 max-w-2xl mx-auto">
                {card.description}
              </p>
              <div className="text-line mt-6">
                <span className="inline-block px-6 py-3 bg-white text-black text-sm rounded-full font-semibold">
                  {card.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-8 mt-16">
          <button
            onClick={handlePrev}
            className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex gap-3">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === activeIndex
                    ? "w-20 bg-white"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
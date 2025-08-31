import { Button } from "@/components/ui/button";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Play, Users, TrendingUp, Globe, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import heroVideo from "@/assets/hero-bg-video.mp4";

interface HeroSectionProps {
  onVideoOpen: () => void;
}

// Counter animation component
const AnimatedCounter = ({ 
  target, 
  suffix = "", 
  duration = 2000 
}: { 
  target: number; 
  suffix?: string; 
  duration?: number; 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(target * easeOut));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="text-4xl font-bold text-secondary">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const HeroSection = ({ onVideoOpen }: HeroSectionProps) => {
  const stats = [
    { icon: Users, value: "12,000+", numericValue: 12000, suffix: "+", label: "Candidates Trained" },
    { icon: TrendingUp, value: "94%", numericValue: 94, suffix: "%", label: "Placement Rate" },
    { icon: Globe, value: "15+", numericValue: 15, suffix: "+", label: "Partner Countries" },
    { icon: Clock, value: "45 Days", numericValue: 45, suffix: "", label: "Avg Deployment Time" }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video src={heroVideo} autoPlay loop muted className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40"></div>
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto pt-4 px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl pt-8 font-bold text-primary-foreground mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Certified candidates, <span className="text-secondary md:text-background">ready to work </span><span className="hidden md:block">—</span>
          <motion.span 
            className="hidden md:block gradient-text mt-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            trained in Sri Lanka, deployed worldwide
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Government-certified training, industry-tested skills and full placement support for Israel, Gulf & Europe.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Button className="btn-hero py-6 px-12 text-lg" data-analytics="request-quota-click">
            Request Job Quota
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            className="btn-hero-outline py-6 px-12 text-lg"
            onClick={onVideoOpen}
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Our Story
          </Button>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
        >
          <a href="/candidate-portal" className="text-primary-foreground/80 hover:text-secondary text-lg underline">
            Candidate Portal
          </a>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 pt-12 md:pt-4 pb-12 md:grid-cols-4 gap-8 text-primary-foreground/80"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Icon className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <div>
                  <AnimatedCounter 
                    target={stat.numericValue} 
                    suffix={stat.suffix}
                    duration={2000 + index * 200} // Stagger the animation duration
                  />
                  {stat.label === "Avg Deployment Time" && <span className="text-4xl font-bold text-secondary"> Days</span>}
                </div>
                <div className="text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
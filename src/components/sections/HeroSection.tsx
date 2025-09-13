import { Button } from "@/components/ui/button";
import { FoodScene } from "@/components/3d/FoodScene";
import { Sparkles, ArrowDown } from "lucide-react";

interface HeroSectionProps {
  onAnalyzeClick: () => void;
}

export const HeroSection = ({ onAnalyzeClick }: HeroSectionProps) => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <FoodScene className="w-full h-full opacity-20" />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80 z-10" />
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center max-w-4xl">
        <div className="animate-fade-in">
          {/* Logo/Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-8 pulse-glow">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Smart{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Nutrition
            </span>{" "}
            AI
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Instantly analyze your meals with AI-powered nutrition tracking. 
            Simply snap a photo and get detailed macronutrient breakdowns.
          </p>
          
          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm">
            {[
              "📸 Photo Analysis",
              "🥗 Macro Tracking", 
              "⚡ Instant Results",
              "🎯 Accurate Data"
            ].map((benefit, index) => (
              <div 
                key={index}
                className="bg-card px-4 py-2 rounded-full shadow-soft border border-border"
              >
                {benefit}
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={onAnalyzeClick}
              className="min-w-[200px] h-14 text-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Analyze Your Meal
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToFeatures}
              className="min-w-[200px] h-14 text-lg"
            >
              Learn How It Works
            </Button>
          </div>
          
          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-muted-foreground mx-auto" />
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-primary/20 rounded-full blur-sm float" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-primary-glow/30 rounded-full blur-sm float-delayed" />
      <div className="absolute bottom-32 left-20 w-10 h-10 bg-primary/10 rounded-full blur-sm float" />
      <div className="absolute bottom-20 right-10 w-4 h-4 bg-primary-glow/40 rounded-full blur-sm float-delayed" />
    </section>
  );
};
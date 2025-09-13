import { Card } from "@/components/ui/card";
import { Camera, Zap, BarChart3, Target, Brain, Clock } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Camera,
      title: "Smart Photo Analysis",
      description: "Advanced AI recognizes ingredients and portions from your meal photos with high accuracy.",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get comprehensive nutrition breakdown in seconds, no manual input required.",
      color: "text-nutrition-protein"
    },
    {
      icon: BarChart3,
      title: "Detailed Macros",
      description: "Complete breakdown of protein, carbs, fat, calories, fiber, and more nutrients.",
      color: "text-nutrition-carbs"
    },
    {
      icon: Target,
      title: "Precision Tracking",
      description: "AI-powered portion estimation ensures accurate calorie and macro calculations.",
      color: "text-nutrition-fat"
    },
    {
      icon: Brain,
      title: "Learning AI",
      description: "Our AI continuously improves accuracy by learning from millions of food images.",
      color: "text-primary-glow"
    },
    {
      icon: Clock,
      title: "Time Saving",
      description: "Skip tedious manual logging. Just snap and track your nutrition effortlessly.",
      color: "text-warning"
    }
  ];

  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Smart Nutrition AI Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our advanced AI technology makes nutrition tracking as simple as taking a photo. 
            Here's what makes us different:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 shadow-card hover:shadow-glow transition-smooth group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-smooth">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Process Steps */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12">Simple 3-Step Process</h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Capture",
                description: "Take a photo of your meal or upload from gallery",
                icon: Camera
              },
              {
                step: "02", 
                title: "Analyze",
                description: "AI identifies ingredients and calculates nutrition",
                icon: Brain
              },
              {
                step: "03",
                title: "Track",
                description: "View detailed macros and save to your history",
                icon: BarChart3
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-smooth">
                  <step.icon className="w-8 h-8" />
                </div>
                
                <div className="text-sm font-mono text-primary mb-2">{step.step}</div>
                <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
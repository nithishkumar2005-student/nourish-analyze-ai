import { useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { AnalyzerSection } from "@/components/sections/AnalyzerSection";
import { FooterSection } from "@/components/sections/FooterSection";

const Index = () => {
  const [showAnalyzer, setShowAnalyzer] = useState(false);

  const handleAnalyzeClick = () => {
    setShowAnalyzer(true);
  };

  const handleBackToHome = () => {
    setShowAnalyzer(false);
  };

  if (showAnalyzer) {
    return <AnalyzerSection onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onAnalyzeClick={handleAnalyzeClick} />
      <FeaturesSection />
      <FooterSection />
    </div>
  );
};

export default Index;

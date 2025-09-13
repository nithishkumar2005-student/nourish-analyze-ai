import { useState } from "react";
import { ImageUploader } from "@/components/nutrition/ImageUploader";
import { NutritionDisplay } from "@/components/nutrition/NutritionDisplay";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share } from "lucide-react";
import { toast } from "sonner";

interface AnalyzerSectionProps {
  onBack: () => void;
}

// Mock nutrition data for demo purposes
const mockNutritionData = {
  calories: 425,
  protein: 28,
  carbs: 45,
  fat: 12,
  fiber: 8,
  sugar: 6,
  confidence: 94
};

export const AnalyzerSection = ({ onBack }: AnalyzerSectionProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleImageUpload = async (imageFile: File) => {
    setUploadedImage(imageFile);
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setNutritionData(mockNutritionData);
      setIsAnalyzing(false);
      toast.success("Analysis complete!");
    }, 3000);
    
    // In a real app, you would make an API call here:
    // try {
    //   const formData = new FormData();
    //   formData.append('image', imageFile);
    //   
    //   const response = await fetch('/api/analyze-nutrition', {
    //     method: 'POST',
    //     body: formData
    //   });
    //   
    //   const data = await response.json();
    //   setNutritionData(data);
    // } catch (error) {
    //   toast.error("Analysis failed. Please try again.");
    // } finally {
    //   setIsAnalyzing(false);
    // }
  };

  const handleShare = () => {
    if (navigator.share && nutritionData) {
      navigator.share({
        title: 'My Meal Analysis',
        text: `My meal contains ${nutritionData.calories} calories, ${nutritionData.protein}g protein, ${nutritionData.carbs}g carbs, and ${nutritionData.fat}g fat.`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `My meal analysis: ${nutritionData?.calories} calories, ${nutritionData?.protein}g protein, ${nutritionData?.carbs}g carbs, ${nutritionData?.fat}g fat.`
      );
      toast.success("Results copied to clipboard!");
    }
  };

  const handleDownload = () => {
    if (!nutritionData) return;
    
    const data = {
      timestamp: new Date().toISOString(),
      nutrition: nutritionData,
      image: uploadedImage?.name || 'meal-photo.jpg'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutrition-analysis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Analysis downloaded!");
  };

  return (
    <section className="min-h-screen py-12 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          
          <h1 className="text-2xl font-bold">Nutrition Analyzer</h1>
          
          <div className="w-20" /> {/* Spacer for center alignment */}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Image Upload */}
          <div>
            <ImageUploader 
              onImageUpload={handleImageUpload}
              isAnalyzing={isAnalyzing}
            />
            
            {/* Tips Card */}
            <Card className="p-4 mt-6 bg-primary/5 border-primary/20">
              <h4 className="font-semibold mb-2 text-primary">📷 Photo Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ensure good lighting for better recognition</li>
                <li>• Include the entire meal in the frame</li>
                <li>• Avoid shadows or reflections</li>
                <li>• Take photos from directly above when possible</li>
              </ul>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div>
            {isAnalyzing && (
              <Card className="p-8 text-center shadow-card">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Analyzing Your Meal</h3>
                  <p className="text-muted-foreground">
                    Our AI is identifying ingredients and calculating nutrition...
                  </p>
                </div>
              </Card>
            )}

            {nutritionData && !isAnalyzing && (
              <div className="space-y-6">
                <NutritionDisplay data={nutritionData} />
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={handleShare}
                    className="flex-1"
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleDownload}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            )}

            {!nutritionData && !isAnalyzing && (
              <Card className="p-8 text-center shadow-card">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <h3 className="font-semibold text-lg">Ready to Analyze</h3>
                  <p className="text-muted-foreground">
                    Upload a photo of your meal to get started with AI nutrition analysis.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
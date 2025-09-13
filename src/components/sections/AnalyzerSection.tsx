import { useState } from "react";
import { ImageUploader } from "@/components/nutrition/ImageUploader";
import { NutritionDisplay } from "@/components/nutrition/NutritionDisplay";
import { MealItemsDisplay } from "@/components/nutrition/MealItemsDisplay";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share } from "lucide-react";
import { toast } from "sonner";

interface AnalyzerSectionProps {
  onBack: () => void;
}

interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface AnalysisResult {
  status: string;
  food: FoodItem[];
  total: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const AnalyzerSection = ({ onBack }: AnalyzerSectionProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleImageUpload = async (imageFile: File) => {
    setUploadedImage(imageFile);
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await fetch('https://nitishkumar83411.app.n8n.cloud/webhook-test/meal-ai', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle the response format - it's an array with one object containing "output"
      if (data && Array.isArray(data) && data[0]?.output) {
        setAnalysisResult(data[0].output);
        toast.success("Analysis complete!");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleShare = () => {
    if (navigator.share && analysisResult) {
      navigator.share({
        title: 'My Meal Analysis',
        text: `My meal contains ${analysisResult.total.calories} calories, ${analysisResult.total.protein}g protein, ${analysisResult.total.carbs}g carbs, and ${analysisResult.total.fat}g fat.`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `My meal analysis: ${analysisResult?.total.calories} calories, ${analysisResult?.total.protein}g protein, ${analysisResult?.total.carbs}g carbs, ${analysisResult?.total.fat}g fat.`
      );
      toast.success("Results copied to clipboard!");
    }
  };

  const handleDownload = () => {
    if (!analysisResult) return;
    
    const data = {
      timestamp: new Date().toISOString(),
      analysis: analysisResult,
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

            {analysisResult && !isAnalyzing && (
              <div className="space-y-6">
                <MealItemsDisplay analysisResult={analysisResult} />
                <NutritionDisplay 
                  data={{
                    calories: analysisResult.total.calories,
                    protein: analysisResult.total.protein,
                    carbs: analysisResult.total.carbs,
                    fat: analysisResult.total.fat,
                    confidence: 95 // Default confidence since API doesn't provide it
                  }} 
                />
                
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

            {!analysisResult && !isAnalyzing && (
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
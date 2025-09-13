import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils } from "lucide-react";

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

interface MealItemsDisplayProps {
  analysisResult: AnalysisResult;
  className?: string;
}

export const MealItemsDisplay = ({ analysisResult, className }: MealItemsDisplayProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
          <Utensils className="w-5 h-5 text-primary" />
          Detected Food Items
        </h3>
        <Badge variant="secondary" className="mb-4">
          {analysisResult.food.length} items found
        </Badge>
      </div>

      <div className="grid gap-3">
        {analysisResult.food.map((item, index) => (
          <Card key={index} className="p-4 shadow-soft hover:shadow-card transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-base mb-1">{item.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{item.quantity}</p>
                
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{item.calories}</p>
                    <p className="text-xs text-muted-foreground">cal</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-protein">{item.protein}g</p>
                    <p className="text-xs text-muted-foreground">protein</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-carbs">{item.carbs}g</p>
                    <p className="text-xs text-muted-foreground">carbs</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-fat">{item.fat}g</p>
                    <p className="text-xs text-muted-foreground">fat</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="text-center">
          <h4 className="font-semibold mb-2 text-primary">📊 Total Nutrition</h4>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <p className="text-lg font-bold">{analysisResult.total.calories}</p>
              <p className="text-xs text-muted-foreground">calories</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-protein">{analysisResult.total.protein}g</p>
              <p className="text-xs text-muted-foreground">protein</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-carbs">{analysisResult.total.carbs}g</p>
              <p className="text-xs text-muted-foreground">carbs</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-fat">{analysisResult.total.fat}g</p>
              <p className="text-xs text-muted-foreground">fat</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, Target, Heart } from "lucide-react";

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  confidence: number;
}

interface NutritionDisplayProps {
  data: NutritionData;
  className?: string;
}

export const NutritionDisplay = ({ data, className }: NutritionDisplayProps) => {
  const totalMacros = data.protein + data.carbs + data.fat;
  const proteinPercent = (data.protein / totalMacros) * 100;
  const carbsPercent = (data.carbs / totalMacros) * 100;
  const fatPercent = (data.fat / totalMacros) * 100;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Nutrition Analysis</h3>
        <p className="text-muted-foreground">
          Analysis confidence: <span className="font-semibold text-primary">{data.confidence}%</span>
        </p>
      </div>

      {/* Calories Card */}
      <Card className="p-6 gradient-card shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Calories</p>
              <p className="text-2xl font-bold">{data.calories}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">kcal</p>
          </div>
        </div>
      </Card>

      {/* Macronutrients */}
      <div className="grid gap-4">
        <h4 className="font-semibold text-lg flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Macronutrients Breakdown
        </h4>
        
        {/* Protein */}
        <Card className="p-4 shadow-soft">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-protein">Protein</span>
            <span className="text-sm font-semibold">{data.protein}g ({proteinPercent.toFixed(1)}%)</span>
          </div>
          <Progress value={proteinPercent} className="h-2" />
        </Card>

        {/* Carbohydrates */}
        <Card className="p-4 shadow-soft">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-carbs">Carbohydrates</span>
            <span className="text-sm font-semibold">{data.carbs}g ({carbsPercent.toFixed(1)}%)</span>
          </div>
          <Progress value={carbsPercent} className="h-2" />
        </Card>

        {/* Fat */}
        <Card className="p-4 shadow-soft">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-fat">Fat</span>
            <span className="text-sm font-semibold">{data.fat}g ({fatPercent.toFixed(1)}%)</span>
          </div>
          <Progress value={fatPercent} className="h-2" />
        </Card>
      </div>

      {/* Additional Info */}
      {(data.fiber || data.sugar) && (
        <Card className="p-4 shadow-soft">
          <h5 className="font-medium mb-3 flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary" />
            Additional Information
          </h5>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {data.fiber && (
              <div>
                <span className="text-muted-foreground">Fiber:</span>
                <span className="ml-2 font-semibold">{data.fiber}g</span>
              </div>
            )}
            {data.sugar && (
              <div>
                <span className="text-muted-foreground">Sugar:</span>
                <span className="ml-2 font-semibold">{data.sugar}g</span>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Health Tips */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <h5 className="font-medium mb-2 text-primary">💡 Quick Tips</h5>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Aim for 0.8-1g protein per kg body weight daily</li>
          <li>• Complex carbs provide sustained energy</li>
          <li>• Healthy fats support hormone production</li>
        </ul>
      </Card>
    </div>
  );
};
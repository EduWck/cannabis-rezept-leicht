
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const StepIndicator = ({ currentStep, totalSteps, className }: StepIndicatorProps) => {
  return (
    <div className={cn("flex items-center justify-center mt-4 mb-8", className)}>
      <div className="flex space-x-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-colors duration-300",
              index < currentStep
                ? "bg-cannabis-green-500"
                : index === currentStep
                ? "bg-cannabis-green-300"
                : "bg-gray-300 dark:bg-gray-600"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;

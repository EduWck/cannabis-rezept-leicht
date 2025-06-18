
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface QuickSelectionBarProps {
  onQuickSelect: (type: string) => void;
}

export const QuickSelectionBar = ({ onQuickSelect }: QuickSelectionBarProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <Button
        size="sm"
        variant="outline"
        onClick={() => onQuickSelect('overdue')}
        className="text-xs"
      >
        <Filter className="w-3 h-3 mr-1" />
        Alle Überfälligen
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onQuickSelect('pending')}
        className="text-xs"
      >
        <Filter className="w-3 h-3 mr-1" />
        Alle Ausstehenden
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onQuickSelect('paid')}
        className="text-xs"
      >
        <Filter className="w-3 h-3 mr-1" />
        Alle Bezahlten
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onQuickSelect('clear')}
        className="text-xs"
      >
        <X className="w-3 h-3 mr-1" />
        Auswahl löschen
      </Button>
    </div>
  );
};


import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock } from "lucide-react";

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  rating: number;
  deliveryTime: string;
  phone: string;
  products: string[];
}

interface PharmacyCardProps {
  pharmacy: Pharmacy;
}

const PharmacyCard = ({ pharmacy }: PharmacyCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-sm">{pharmacy.name}</h4>
            <div className="flex items-center text-xs">
              <Star className="w-3 h-3 text-yellow-400 mr-1" />
              <span>{pharmacy.rating}</span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{pharmacy.city}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>{pharmacy.deliveryTime}</span>
            </div>
          </div>
          
          <Badge variant="outline" className="text-xs">
            {pharmacy.products.length} Sorten
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default PharmacyCard;

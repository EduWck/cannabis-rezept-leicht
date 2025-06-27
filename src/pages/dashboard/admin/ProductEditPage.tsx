import { logger } from "@/lib/logger";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";

interface ProductData {
  id?: number;
  name: string;
  thcContent: number;
  cbdContent: number;
  pricePerGram: number;
  inStock: boolean;
  description: string;
}

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    thcContent: 0,
    cbdContent: 0,
    pricePerGram: 0,
    inStock: true,
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (id && id !== "new") {
      // Mock data - in real app this would come from API
      const mockProduct: ProductData = {
        id: parseInt(id),
        name: "Bedrocan®",
        thcContent: 22.0,
        cbdContent: 1.0,
        pricePerGram: 12.50,
        inStock: true,
        description: "Hochwertige Cannabis-Blüten mit 22% THC-Gehalt. Für medizinische Anwendungen geeignet.",
      };
      
      setProductData(mockProduct);
    }
  }, [id]);

  const updateField = (field: keyof ProductData, value: any) => {
    setProductData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!productData.name.trim()) {
      newErrors.name = "Produktname ist erforderlich";
    }
    
    if (productData.pricePerGram <= 0) {
      newErrors.pricePerGram = "Preis muss größer als 0 sein";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Fehler",
        description: "Bitte überprüfen Sie die markierten Felder.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      logger.debug("Saving product:", productData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: id === "new" ? "Produkt erstellt" : "Produkt aktualisiert",
        description: `${productData.name} wurde erfolgreich ${id === "new" ? "erstellt" : "aktualisiert"}.`,
      });
      
      navigate("/dashboard/products");
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Beim Speichern des Produkts ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard/products")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>
        <h1 className="text-2xl font-bold">
          {id === "new" ? "Neues Produkt" : "Produkt bearbeiten"}
        </h1>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Produktdetails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Produktname *</Label>
                <Input
                  id="name"
                  placeholder="z.B. Bedrocan®"
                  value={productData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="thcContent">THC-Gehalt (%)</Label>
                  <Input
                    id="thcContent"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="z.B. 22.0"
                    value={productData.thcContent}
                    onChange={(e) => updateField('thcContent', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cbdContent">CBD-Gehalt (%)</Label>
                  <Input
                    id="cbdContent"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="z.B. 1.0"
                    value={productData.cbdContent}
                    onChange={(e) => updateField('cbdContent', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerGram">Preis pro Gramm (€) *</Label>
                <Input
                  id="pricePerGram"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="z.B. 12.50"
                  value={productData.pricePerGram}
                  onChange={(e) => updateField('pricePerGram', parseFloat(e.target.value) || 0)}
                  className={errors.pricePerGram ? "border-red-500" : ""}
                />
                {errors.pricePerGram && <p className="text-sm text-red-500">{errors.pricePerGram}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Beschreibung</Label>
                <Textarea
                  id="description"
                  placeholder="Produktbeschreibung eingeben..."
                  className="min-h-[100px]"
                  value={productData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="inStock"
                  checked={productData.inStock}
                  onCheckedChange={(checked) => updateField('inStock', checked)}
                />
                <Label htmlFor="inStock">Auf Lager</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/products")}
            className="flex-1"
          >
            Abbrechen
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="flex-1"
          >
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Wird gespeichert..." : "Speichern"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;

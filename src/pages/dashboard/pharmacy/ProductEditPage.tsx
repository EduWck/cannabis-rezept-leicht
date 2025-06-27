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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";

interface PackageVariant {
  size: string;
  quantity: number;
  minStock: number;
}

interface ProductData {
  name: string;
  category: "flower" | "extract";
  packageVariants: PackageVariant[];
  pricePerGram?: number; // Nur für Cannabis-Blüten
  pricePerMl?: number; // Nur für Extrakte - Preis pro ml
  supplier: string;
  description: string;
  thcContent: number;
  cbdContent: number;
}

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    category: "flower",
    packageVariants: [{ size: "10g", quantity: 0, minStock: 5 }],
    pricePerGram: 0,
    supplier: "",
    description: "",
    thcContent: 0,
    cbdContent: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (id && id !== "new") {
      // Mock product data - FULLY synchronized with PharmacyInventoryPage.tsx
      let mockProduct: ProductData;
      
      switch (id) {
        case "PROD-001":
          mockProduct = {
            name: "Cannabisblüte THC18",
            category: "flower",
            packageVariants: [
              { size: "10g", quantity: 20, minStock: 5 },
              { size: "50g", quantity: 5, minStock: 2 }
            ],
            pricePerGram: 12.99,
            supplier: "CannaGrow GmbH",
            description: "Hochwertige Cannabisblüte mit 18% THC-Gehalt",
            thcContent: 18,
            cbdContent: 1,
          };
          break;
        case "PROD-002":
          mockProduct = {
            name: "Cannabisblüte THC22",
            category: "flower",
            packageVariants: [
              { size: "10g", quantity: 3, minStock: 5 },
              { size: "25g", quantity: 2, minStock: 3 }
            ],
            pricePerGram: 14.99,
            supplier: "CannaGrow GmbH",
            description: "Premium Cannabisblüte mit 22% THC-Gehalt",
            thcContent: 22,
            cbdContent: 0.5,
          };
          break;
        case "PROD-003":
          mockProduct = {
            name: "THC Extrakt 25%",
            category: "extract",
            packageVariants: [
              { size: "5ml", quantity: 8, minStock: 3 },
              { size: "10ml", quantity: 5, minStock: 2 }
            ],
            pricePerMl: 8.99, // Preis pro ml statt pro Flasche
            supplier: "ExtractMed GmbH",
            description: "Hochwertiger THC Extrakt mit 25% THC-Gehalt",
            thcContent: 25,
            cbdContent: 1,
          };
          break;
        case "PROD-004":
          mockProduct = {
            name: "CBD Extrakt 15%",
            category: "extract",
            packageVariants: [
              { size: "10ml", quantity: 2, minStock: 5 },
              { size: "15ml", quantity: 1, minStock: 3 }
            ],
            pricePerMl: 14.99, // Preis pro ml statt pro Flasche
            supplier: "ExtractMed GmbH",
            description: "Reiner CBD Extrakt mit 15% CBD-Gehalt",
            thcContent: 0,
            cbdContent: 15,
          };
          break;
        case "PROD-005":
          mockProduct = {
            name: "THC/CBD Extrakt 1:1",
            category: "extract",
            packageVariants: [
              { size: "10ml", quantity: 0, minStock: 3 }
            ],
            pricePerMl: 19.99, // Preis pro ml statt pro Flasche
            supplier: "ExtractMed GmbH",
            description: "Hochwertiger THC/CBD Extrakt im Verhältnis 1:1 mit 25% THC und 25% CBD",
            thcContent: 25,
            cbdContent: 25,
          };
          break;
        default:
          mockProduct = {
            name: "Cannabisblüte THC18",
            category: "flower",
            packageVariants: [
              { size: "10g", quantity: 20, minStock: 5 },
              { size: "50g", quantity: 5, minStock: 2 }
            ],
            pricePerGram: 12.99,
            supplier: "CannaGrow GmbH",
            description: "Hochwertige Cannabisblüte mit 18% THC-Gehalt",
            thcContent: 18,
            cbdContent: 1,
          };
      }
      
      setProductData(mockProduct);
    }
  }, [id]);

  const categories = [
    { value: "flower", label: "Cannabis Blüte" },
    { value: "extract", label: "Extrakt" },
  ];

  const getPackageSizeOptions = (category: "flower" | "extract") => {
    if (category === "flower") {
      return [
        { value: "10g", label: "10g" },
        { value: "25g", label: "25g" },
        { value: "50g", label: "50g" },
        { value: "100g", label: "100g" },
        { value: "200g", label: "200g" },
      ];
    } else {
      return [
        { value: "5ml", label: "5ml Flasche" },
        { value: "10ml", label: "10ml Flasche" },
        { value: "15ml", label: "15ml Flasche" },
        { value: "20ml", label: "20ml Flasche" },
        { value: "30ml", label: "30ml Flasche" },
        { value: "50ml", label: "50ml Flasche" },
      ];
    }
  };

  const updateField = (field: keyof ProductData, value: any) => {
    setProductData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Beim Kategoriewechsel Packungsgrößen zurücksetzen
      if (field === "category") {
        const defaultSize = value === "flower" ? "10g" : "10ml";
        updated.packageVariants = [{ size: defaultSize, quantity: 0, minStock: 5 }];
        
        // Preisfelder entsprechend anpassen
        if (value === "flower") {
          updated.pricePerMl = undefined;
          if (!updated.pricePerGram) updated.pricePerGram = 0;
        } else {
          updated.pricePerGram = undefined;
          if (!updated.pricePerMl) updated.pricePerMl = 0;
        }
      }
      
      return updated;
    });
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const updatePackageVariant = (index: number, field: keyof PackageVariant, value: any) => {
    setProductData(prev => ({
      ...prev,
      packageVariants: prev.packageVariants.map((variant, i) => 
        i === index ? { ...variant, [field]: value } : variant
      )
    }));
  };

  const addPackageVariant = () => {
    const defaultSize = productData.category === "flower" ? "10g" : "10ml"; // Konsistente Standardgröße
    setProductData(prev => ({
      ...prev,
      packageVariants: [...prev.packageVariants, { size: defaultSize, quantity: 0, minStock: 5 }]
    }));
  };

  const removePackageVariant = (index: number) => {
    if (productData.packageVariants.length > 1) {
      setProductData(prev => ({
        ...prev,
        packageVariants: prev.packageVariants.filter((_, i) => i !== index)
      }));
    }
  };

  const calculateTotalStock = () => {
    if (productData.category === "flower") {
      return productData.packageVariants.reduce((total, variant) => {
        const grams = parseInt(variant.size.replace('g', '')) || 0;
        return total + (variant.quantity * grams);
      }, 0);
    } else {
      // Für Extrakte: Gesamte ml-Menge
      return productData.packageVariants.reduce((total, variant) => {
        const ml = parseInt(variant.size.replace('ml', '')) || 0;
        return total + (variant.quantity * ml);
      }, 0);
    }
  };
  
  const calculateTotalBottles = () => {
    return productData.packageVariants.reduce((total, variant) => total + variant.quantity, 0);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!productData.name.trim()) {
      newErrors.name = "Produktname ist erforderlich";
    }
    if (!productData.supplier.trim()) {
      newErrors.supplier = "Lieferant ist erforderlich";
    }
    
    if (productData.category === "flower" && (productData.pricePerGram || 0) <= 0) {
      newErrors.pricePerGram = "Preis pro Gramm muss größer als 0 sein";
    }
    
    if (productData.category === "extract" && (productData.pricePerMl || 0) <= 0) {
      newErrors.pricePerMl = "Preis pro ml muss größer als 0 sein";
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
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: id === "new" ? "Produkt erstellt" : "Produkt aktualisiert",
        description: `${productData.name} wurde erfolgreich ${id === "new" ? "erstellt" : "aktualisiert"}.`,
      });
      
      navigate("/dashboard/pharmacy-inventory");
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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard/pharmacy-inventory")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zum Inventar
        </Button>
        <h1 className="text-2xl font-bold">
          {id === "new" ? "Neues Produkt" : "Produkt bearbeiten"}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Produktdetails</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Produktname *</Label>
                    <Input
                      id="name"
                      placeholder="Produktname eingeben"
                      value={productData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Kategorie *</Label>
                    <Select value={productData.category} onValueChange={(value: "flower" | "extract") => updateField('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kategorie wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {productData.category === "flower" && (
                    <div className="space-y-2">
                      <Label htmlFor="pricePerGram">Preis pro Gramm (€) *</Label>
                      <Input
                        id="pricePerGram"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={productData.pricePerGram || 0}
                        onChange={(e) => updateField('pricePerGram', parseFloat(e.target.value) || 0)}
                        className={errors.pricePerGram ? "border-red-500" : ""}
                      />
                      {errors.pricePerGram && <p className="text-sm text-red-500">{errors.pricePerGram}</p>}
                    </div>
                  )}

                  {productData.category === "extract" && (
                    <div className="space-y-2">
                      <Label htmlFor="pricePerMl">Preis pro ml (€) *</Label>
                      <Input
                        id="pricePerMl"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={productData.pricePerMl || 0}
                        onChange={(e) => updateField('pricePerMl', parseFloat(e.target.value) || 0)}
                        className={errors.pricePerMl ? "border-red-500" : ""}
                      />
                      {errors.pricePerMl && <p className="text-sm text-red-500">{errors.pricePerMl}</p>}
                      <p className="text-xs text-muted-foreground">
                        Berechnung: Preis pro Flasche = Preis/ml × Flaschengröße
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="supplier">Lieferant *</Label>
                    <Input
                      id="supplier"
                      placeholder="Lieferant eingeben"
                      value={productData.supplier}
                      onChange={(e) => updateField('supplier', e.target.value)}
                      className={errors.supplier ? "border-red-500" : ""}
                    />
                    {errors.supplier && <p className="text-sm text-red-500">{errors.supplier}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thcContent">THC-Gehalt (%)</Label>
                    <Input
                      id="thcContent"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      placeholder="0.0"
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
                      placeholder="0.0"
                      value={productData.cbdContent}
                      onChange={(e) => updateField('cbdContent', parseFloat(e.target.value) || 0)}
                    />
                  </div>
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
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {productData.category === "flower" ? "Packungseinheiten" : "Flaschengrößen"}
                </CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addPackageVariant}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {productData.packageVariants.map((variant, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">
                      {productData.category === "flower" ? `Packung ${index + 1}` : `Flasche ${index + 1}`}
                    </Label>
                    {productData.packageVariants.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removePackageVariant(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>
                      {productData.category === "flower" ? "Packungsgröße" : "Flaschengröße"}
                    </Label>
                    <Select 
                      value={variant.size} 
                      onValueChange={(value) => updatePackageVariant(index, 'size', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {getPackageSizeOptions(productData.category).map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Bestand ({productData.category === "flower" ? "Packungen" : "Flaschen"})
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      value={variant.quantity}
                      onChange={(e) => updatePackageVariant(index, 'quantity', parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Mindestbestand ({productData.category === "flower" ? "Packungen" : "Flaschen"})</Label>
                    <Input
                      type="number"
                      min="0"
                      value={variant.minStock}
                      onChange={(e) => updatePackageVariant(index, 'minStock', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              ))}
              
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium">Gesamtbestand</div>
                {productData.category === "flower" ? (
                  <div className="text-2xl font-bold text-green-600">
                    {calculateTotalStock()}g
                  </div>
                ) : (
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {calculateTotalBottles()} Flaschen
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ({calculateTotalStock()}ml gesamt)
                    </div>
                    {productData.pricePerMl && (
                      <div className="text-sm text-blue-600 mt-1">
                        Gesamtwert: {(calculateTotalStock() * productData.pricePerMl).toFixed(2)} €
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-col gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard/pharmacy-inventory")}
              className="w-full"
            >
              Abbrechen
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading}
              className="w-full"
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Wird gespeichert..." : "Speichern"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;

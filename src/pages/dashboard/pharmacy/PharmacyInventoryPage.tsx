
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Search,
  Plus,
  FileEdit,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Package
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface PackageVariant {
  size: string; // z.B. "10g" für Blüten, "10ml" für Extrakte
  quantity: number; // Anzahl verfügbarer Packungen/Flaschen
  minStock: number; // Mindestbestand für diese Packungseinheit
}

interface Product {
  id: string;
  name: string;
  category: string;
  packageVariants: PackageVariant[];
  pricePerGram?: number; // Nur für Cannabis-Blüten
  pricePerBottle?: number; // Nur für Extrakte
  supplier: string;
  thcContent?: number;
  cbdContent?: number;
}

const PharmacyInventoryPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Mock data - aktualisierte Struktur ohne CBD Öle
  const products: Product[] = [
    {
      id: "PROD-001",
      name: "Cannabisblüte THC18",
      category: "flower",
      packageVariants: [
        { size: "10g", quantity: 20, minStock: 5 },
        { size: "50g", quantity: 5, minStock: 2 }
      ],
      pricePerGram: 12.99,
      supplier: "CannaGrow GmbH",
      thcContent: 18,
      cbdContent: 1,
    },
    {
      id: "PROD-002",
      name: "Cannabisblüte THC22",
      category: "flower",
      packageVariants: [
        { size: "10g", quantity: 3, minStock: 5 },
        { size: "25g", quantity: 2, minStock: 3 }
      ],
      pricePerGram: 14.99,
      supplier: "CannaGrow GmbH",
      thcContent: 22,
      cbdContent: 0.5,
    },
    {
      id: "PROD-003",
      name: "THC Extrakt 25%",
      category: "extract",
      packageVariants: [
        { size: "5ml", quantity: 8, minStock: 3 },
        { size: "10ml", quantity: 5, minStock: 2 }
      ],
      pricePerBottle: 89.99,
      supplier: "ExtractMed GmbH",
      thcContent: 25,
      cbdContent: 1,
    },
    {
      id: "PROD-004",
      name: "CBD Extrakt 15%",
      category: "extract",
      packageVariants: [
        { size: "10ml", quantity: 2, minStock: 5 },
        { size: "15ml", quantity: 1, minStock: 3 }
      ],
      pricePerBottle: 149.99,
      supplier: "ExtractMed GmbH",
      thcContent: 0,
      cbdContent: 15,
    },
    {
      id: "PROD-005",
      name: "THC/CBD Extrakt 1:1",
      category: "extract",
      packageVariants: [
        { size: "10ml", quantity: 0, minStock: 3 }
      ],
      pricePerBottle: 199.99,
      supplier: "ExtractMed GmbH",
      thcContent: 25,
      cbdContent: 25,
    },
  ];
  
  const categories = [
    { value: "flower", label: "Cannabis Blüte" },
    { value: "extract", label: "Extrakt" },
  ];
  
  // Berechnung für Blüten (Gramm) und Extrakte (ml)
  const calculateTotalAmount = (product: Product) => {
    if (product.category === "flower") {
      return product.packageVariants.reduce((total, variant) => {
        const grams = parseInt(variant.size.replace('g', ''));
        return total + (variant.quantity * grams);
      }, 0);
    } else {
      // Für Extrakte: Gesamte ml-Menge
      return product.packageVariants.reduce((total, variant) => {
        const ml = parseInt(variant.size.replace('ml', ''));
        return total + (variant.quantity * ml);
      }, 0);
    }
  };
  
  // Berechnung der Gesamtanzahl Flaschen für Extrakte
  const calculateTotalBottles = (packageVariants: PackageVariant[]) => {
    return packageVariants.reduce((total, variant) => total + variant.quantity, 0);
  };
  
  // Berechnung ob Produkt unter Mindestbestand ist
  const isLowStock = (packageVariants: PackageVariant[]) => {
    return packageVariants.some(variant => variant.quantity < variant.minStock);
  };
  
  // Berechnung ob Produkt ausverkauft ist
  const isOutOfStock = (packageVariants: PackageVariant[]) => {
    return packageVariants.every(variant => variant.quantity === 0);
  };
  
  const getStockStatus = (packageVariants: PackageVariant[]) => {
    if (isOutOfStock(packageVariants)) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Nicht auf Lager
        </Badge>
      );
    }
    if (isLowStock(packageVariants)) {
      return (
        <Badge variant="secondary" className="flex items-center gap-1 bg-yellow-100 text-yellow-800 border-yellow-300">
          <AlertTriangle className="h-3 w-3" />
          Niedriger Bestand
        </Badge>
      );
    }
    return (
      <Badge variant="default" className="flex items-center gap-1 bg-green-100 text-green-800 border-green-300">
        <CheckCircle className="h-3 w-3" />
        Auf Lager
      </Badge>
    );
  };
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bestand verwalten</h1>
        
        <Button onClick={() => navigate("/dashboard/pharmacy-inventory/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Produkt hinzufügen
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Inventar filtern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-2/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Nach Produktname oder ID suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-1/3">
                <SelectValue placeholder="Alle Kategorien" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Kategorien</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Produktbestand</CardTitle>
          <CardDescription>
            Verwalten Sie Ihren Produktbestand mit verschiedenen Packungseinheiten.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produkt-ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Kategorie</TableHead>
                  <TableHead>Gesamtbestand</TableHead>
                  <TableHead>Packungseinheiten</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Preis</TableHead>
                  <TableHead>Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono text-sm">{product.id}</TableCell>
                    <TableCell className="font-medium">
                      <div>
                        {product.name}
                        {(product.thcContent || product.cbdContent) && (
                          <div className="text-sm text-muted-foreground">
                            {product.thcContent && `THC: ${product.thcContent}%`}
                            {product.thcContent && product.cbdContent && " | "}
                            {product.cbdContent && `CBD: ${product.cbdContent}%`}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {categories.find(c => c.value === product.category)?.label || product.category}
                    </TableCell>
                    <TableCell>
                      {product.category === "flower" ? (
                        <div className={`text-lg font-bold ${isLowStock(product.packageVariants) ? "text-red-500" : "text-green-600"}`}>
                          {calculateTotalAmount(product)}g
                        </div>
                      ) : (
                        <div className={`${isLowStock(product.packageVariants) ? "text-red-500" : "text-green-600"}`}>
                          <div className="text-lg font-bold">
                            {calculateTotalBottles(product.packageVariants)} Flaschen
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ({calculateTotalAmount(product)}ml gesamt)
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {product.packageVariants.map((variant, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Package className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className={`text-sm ${variant.quantity < variant.minStock ? "text-red-500 font-medium" : ""}`}>
                              {variant.quantity}x {variant.size}
                              {product.category === "extract" ? " Flaschen" : " Packungen"}
                            </span>
                            {variant.quantity < variant.minStock && (
                              <Badge variant="outline" className="text-xs px-2 py-1 flex items-center gap-1">
                                <span>Min: {variant.minStock}</span>
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStockStatus(product.packageVariants)}</TableCell>
                    <TableCell>
                      {product.category === "flower" ? (
                        <div>
                          <div className="font-medium">{product.pricePerGram?.toFixed(2)} €/g</div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-medium">{product.pricePerBottle?.toFixed(2)} €/Flasche</div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/dashboard/pharmacy-inventory/${product.id}`)}
                      >
                        <FileEdit className="h-4 w-4 mr-1" />
                        Bearbeiten
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Keine Produkte gefunden.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyInventoryPage;

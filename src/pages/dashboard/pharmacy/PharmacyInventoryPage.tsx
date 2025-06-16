
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
  XCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const PharmacyInventoryPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Mock data - in real app would come from API
  const products = [
    {
      id: "PROD-001",
      name: "Cannabisblüte THC18",
      category: "flower",
      stock: 25,
      minStock: 10,
      pricePerGram: 12.99,
      packageSize: "10g",
      supplier: "CannaGrow GmbH",
    },
    {
      id: "PROD-002",
      name: "Cannabisblüte THC22",
      category: "flower",
      stock: 5,
      minStock: 10,
      pricePerGram: 14.99,
      packageSize: "10g",
      supplier: "CannaGrow GmbH",
    },
    {
      id: "PROD-003",
      name: "CBD Öl 5%",
      category: "oil",
      stock: 15,
      minStock: 5,
      pricePerGram: 19.99,
      packageSize: "100g",
      supplier: "NaturoCBD AG",
    },
    {
      id: "PROD-004",
      name: "CBD Öl 10%",
      category: "oil",
      stock: 8,
      minStock: 5,
      pricePerGram: 29.99,
      packageSize: "100g",
      supplier: "NaturoCBD AG",
    },
    {
      id: "PROD-005",
      name: "CBD Öl 15%",
      category: "oil",
      stock: 12,
      minStock: 5,
      pricePerGram: 39.99,
      packageSize: "10g",
      supplier: "NaturoCBD AG",
    },
    {
      id: "PROD-006",
      name: "Cannabis Extrakt THC/CBD 1:1",
      category: "extract",
      stock: 0,
      minStock: 3,
      pricePerGram: 49.99,
      packageSize: "10g",
      supplier: "ExtractMed GmbH",
    },
  ];
  
  const categories = [
    { value: "flower", label: "Cannabis Blüte" },
    { value: "oil", label: "CBD-Öl" },
    { value: "extract", label: "Extrakt" },
  ];
  
  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Nicht auf Lager
        </Badge>
      );
    }
    if (stock < minStock) {
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
            Verwalten Sie Ihren Produktbestand und aktualisieren Sie die Mengen.
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
                  <TableHead>Bestand</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Preis/g</TableHead>
                  <TableHead>Packungseinheit</TableHead>
                  <TableHead>Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono text-sm">{product.id}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      {categories.find(c => c.value === product.category)?.label || product.category}
                    </TableCell>
                    <TableCell>
                      <span className={product.stock < product.minStock ? "text-red-500 font-bold" : ""}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>{getStockStatus(product.stock, product.minStock)}</TableCell>
                    <TableCell>{product.pricePerGram.toFixed(2)} €</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.packageSize}</Badge>
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

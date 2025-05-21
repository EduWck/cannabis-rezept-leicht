
import { useState } from "react";
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
  AlertCircle,
  Plus,
  Save,
  FileEdit,
  Trash2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const PharmacyInventoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Mock data - in real app would come from API
  const products = [
    {
      id: "PROD-001",
      name: "Cannabisblüte THC18",
      category: "flower",
      stock: 25,
      minStock: 10,
      price: 12.99,
      supplier: "CannaGrow GmbH",
    },
    {
      id: "PROD-002",
      name: "Cannabisblüte THC22",
      category: "flower",
      stock: 5,
      minStock: 10,
      price: 14.99,
      supplier: "CannaGrow GmbH",
    },
    {
      id: "PROD-003",
      name: "CBD Öl 5%",
      category: "oil",
      stock: 15,
      minStock: 5,
      price: 19.99,
      supplier: "NaturoCBD AG",
    },
    {
      id: "PROD-004",
      name: "CBD Öl 10%",
      category: "oil",
      stock: 8,
      minStock: 5,
      price: 29.99,
      supplier: "NaturoCBD AG",
    },
    {
      id: "PROD-005",
      name: "CBD Öl 15%",
      category: "oil",
      stock: 12,
      minStock: 5,
      price: 39.99,
      supplier: "NaturoCBD AG",
    },
    {
      id: "PROD-006",
      name: "Cannabis Extrakt THC/CBD 1:1",
      category: "extract",
      stock: 7,
      minStock: 3,
      price: 49.99,
      supplier: "ExtractMed GmbH",
    },
  ];
  
  const categories = [
    { value: "flower", label: "Cannabis Blüte" },
    { value: "oil", label: "CBD-Öl" },
    { value: "extract", label: "Extrakt" },
  ];
  
  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return <Badge className="bg-red-500">Nicht auf Lager</Badge>;
    if (stock < minStock) return <Badge className="bg-yellow-500">Niedriger Bestand</Badge>;
    return <Badge className="bg-green-500">Auf Lager</Badge>;
  };
  
  const handleSaveStock = (productId: string, newStock: number) => {
    // In a real app, this would make an API call
    toast({
      title: "Bestand aktualisiert",
      description: `Bestand für ${productId} wurde auf ${newStock} aktualisiert.`,
    });
    setEditingProduct(null);
  };
  
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    toast({
      title: "Produkt hinzugefügt",
      description: "Das neue Produkt wurde zum Inventar hinzugefügt.",
    });
    setIsAddDialogOpen(false);
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
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Produkt hinzufügen
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neues Produkt hinzufügen</DialogTitle>
              <DialogDescription>
                Fügen Sie ein neues Produkt zu Ihrem Inventar hinzu.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddProduct}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Kategorie</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
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
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">Bestand</Label>
                  <Input id="stock" type="number" min="0" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="minStock" className="text-right">Mindestbestand</Label>
                  <Input id="minStock" type="number" min="0" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">Preis (€)</Label>
                  <Input id="price" type="number" min="0" step="0.01" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier" className="text-right">Lieferant</Label>
                  <Input id="supplier" className="col-span-3" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Produkt hinzufügen</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produkt-ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Kategorie</TableHead>
                <TableHead>Bestand</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Preis</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    {categories.find(c => c.value === product.category)?.label || product.category}
                  </TableCell>
                  <TableCell>
                    {editingProduct?.id === product.id ? (
                      <Input 
                        type="number" 
                        min="0" 
                        value={editingProduct.stock} 
                        onChange={e => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})} 
                        className="w-20"
                      />
                    ) : (
                      <span className={product.stock < product.minStock ? "text-red-500 font-bold" : ""}>
                        {product.stock}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{getStockStatus(product.stock, product.minStock)}</TableCell>
                  <TableCell>{product.price.toFixed(2)} €</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {editingProduct?.id === product.id ? (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSaveStock(product.id, editingProduct.stock)}
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Speichern
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setEditingProduct(product)}
                        >
                          <FileEdit className="h-4 w-4 mr-1" />
                          Bearbeiten
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Keine Produkte gefunden.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyInventoryPage;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Search, Plus, Edit, PackageX, Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Switch,
} from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  
  // Sample product data
  const products = [
    { 
      id: 1, 
      name: "Bedrocan®", 
      thcContent: 22.0,
      cbdContent: 1.0,
      pricePerGram: 12.50,
      inStock: true,
    },
    { 
      id: 2, 
      name: "Bedica®", 
      thcContent: 14.0,
      cbdContent: 1.0,
      pricePerGram: 11.90,
      inStock: true,
    },
    { 
      id: 3, 
      name: "Bedrobinol®", 
      thcContent: 13.5,
      cbdContent: 0.1,
      pricePerGram: 10.80,
      inStock: true,
    },
    { 
      id: 4, 
      name: "Bediol®", 
      thcContent: 6.3,
      cbdContent: 8.0,
      pricePerGram: 10.80,
      inStock: false,
    },
    { 
      id: 5, 
      name: "Cannabisöl 5ml", 
      thcContent: 25.0,
      cbdContent: 0.5,
      pricePerGram: 65.90,
      inStock: true,
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleStock = (id: number, newStatus: boolean) => {
    const product = products.find(p => p.id === id);
    if (product) {
      toast({
        title: newStatus ? "Produkt verfügbar" : "Produkt nicht verfügbar",
        description: `${product.name} ist jetzt ${newStatus ? "auf Lager" : "nicht auf Lager"}.`
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Produktverwaltung</h1>
        <Button onClick={() => setIsAddProductDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Neues Produkt
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Nach Produkten suchen..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Produktübersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>THC (%)</TableHead>
                <TableHead>CBD (%)</TableHead>
                <TableHead>Preis (€/g)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.thcContent}%</TableCell>
                  <TableCell>{product.cbdContent}%</TableCell>
                  <TableCell>€{product.pricePerGram.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={product.inStock}
                        onCheckedChange={(checked) => handleToggleStock(product.id, checked)}
                      />
                      <span>
                        {product.inStock ? 
                          <Badge className="bg-green-500">Auf Lager</Badge> : 
                          <Badge className="bg-red-500">Nicht verfügbar</Badge>
                        }
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toast({
                          title: "Produkt bearbeiten",
                          description: `Die Daten für ${product.name} werden bearbeitet.`
                        })}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Bearbeiten
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => toast({
                          title: "Produkt entfernt",
                          description: `${product.name} wurde aus dem Katalog entfernt.`
                        })}
                      >
                        <PackageX className="h-4 w-4 mr-1" />
                        Entfernen
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Keine Produkte gefunden
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add New Product Dialog */}
      <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Neues Produkt hinzufügen</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Produktname</Label>
              <Input id="name" placeholder="z.B. Bedrocan®" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="thc">THC Gehalt (%)</Label>
                <Input id="thc" type="number" step="0.1" placeholder="z.B. 22.0" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cbd">CBD Gehalt (%)</Label>
                <Input id="cbd" type="number" step="0.1" placeholder="z.B. 1.0" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Preis pro Gramm (€)</Label>
              <Input id="price" type="number" step="0.01" placeholder="z.B. 12.50" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="in-stock" />
              <Label htmlFor="in-stock">Auf Lager</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductDialogOpen(false)}>
              <X className="h-4 w-4 mr-1" />
              Abbrechen
            </Button>
            <Button onClick={() => {
              toast({
                title: "Produkt hinzugefügt",
                description: "Das neue Produkt wurde erfolgreich hinzugefügt."
              });
              setIsAddProductDialogOpen(false);
            }}>
              <Check className="h-4 w-4 mr-1" />
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;

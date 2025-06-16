
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
import { ArrowLeft, Save } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface ProductFormData {
  name: string;
  category: string;
  stock: number;
  minStock: number;
  pricePerGram: number;
  packageSize: string;
  supplier: string;
  description: string;
  thcContent?: number;
  cbdContent?: number;
}

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      category: "flower",
      stock: 0,
      minStock: 5,
      pricePerGram: 0,
      packageSize: "10g",
      supplier: "",
      description: "",
      thcContent: 0,
      cbdContent: 0,
    },
  });

  // Mock data - in real app would fetch from API based on id
  useEffect(() => {
    if (id && id !== "new") {
      // Simulate loading existing product data
      const mockProduct = {
        name: "Cannabisblüte THC18",
        category: "flower",
        stock: 25,
        minStock: 10,
        pricePerGram: 12.99,
        packageSize: "10g",
        supplier: "CannaGrow GmbH",
        description: "Hochwertige Cannabisblüte mit 18% THC-Gehalt",
        thcContent: 18,
        cbdContent: 1,
      };
      form.reset(mockProduct);
    }
  }, [id, form]);

  const categories = [
    { value: "flower", label: "Cannabis Blüte" },
    { value: "oil", label: "CBD-Öl" },
    { value: "extract", label: "Extrakt" },
  ];

  const packageSizes = [
    { value: "10g", label: "10g Packung" },
    { value: "100g", label: "100g Packung" },
  ];

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call
      console.log("Saving product:", data);
      
      toast({
        title: id === "new" ? "Produkt erstellt" : "Produkt aktualisiert",
        description: `${data.name} wurde erfolgreich ${id === "new" ? "erstellt" : "aktualisiert"}.`,
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

      <Card>
        <CardHeader>
          <CardTitle>Produktdetails</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Produktname *</FormLabel>
                      <FormControl>
                        <Input placeholder="Produktname eingeben" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategorie *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Kategorie wählen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aktueller Bestand *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mindestbestand *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="5"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pricePerGram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preis pro Gramm (€) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="packageSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Packungseinheit *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Packungseinheit wählen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {packageSizes.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lieferant *</FormLabel>
                      <FormControl>
                        <Input placeholder="Lieferant eingeben" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thcContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>THC-Gehalt (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          placeholder="0.0"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cbdContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CBD-Gehalt (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          placeholder="0.0"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beschreibung</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Produktbeschreibung eingeben..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard/pharmacy-inventory")}
                >
                  Abbrechen
                </Button>
                <Button type="submit" disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Wird gespeichert..." : "Speichern"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductEditPage;

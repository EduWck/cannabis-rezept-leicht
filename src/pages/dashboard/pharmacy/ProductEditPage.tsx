
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";

interface PackageVariant {
  size: string;
  quantity: number;
  minStock: number;
}

interface ProductFormData {
  name: string;
  category: string;
  packageVariants: PackageVariant[];
  pricePerGram: number;
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
      packageVariants: [{ size: "10g", quantity: 0, minStock: 5 }],
      pricePerGram: 0,
      supplier: "",
      description: "",
      thcContent: 0,
      cbdContent: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "packageVariants"
  });

  // Mock data - in real app would fetch from API based on id
  useEffect(() => {
    if (id && id !== "new") {
      // Simulate loading existing product data
      const mockProduct = {
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
      form.reset(mockProduct);
    }
  }, [id, form]);

  const categories = [
    { value: "flower", label: "Cannabis Blüte" },
    { value: "oil", label: "CBD-Öl" },
    { value: "extract", label: "Extrakt" },
  ];

  const packageSizeOptions = [
    { value: "10g", label: "10g" },
    { value: "25g", label: "25g" },
    { value: "50g", label: "50g" },
    { value: "100g", label: "100g" },
    { value: "200g", label: "200g" },
  ];

  const addPackageVariant = () => {
    append({ size: "10g", quantity: 0, minStock: 5 });
  };

  const removePackageVariant = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const calculateTotalGrams = () => {
    const variants = form.watch("packageVariants");
    return variants.reduce((total, variant) => {
      const grams = parseInt(variant.size.replace('g', ''));
      return total + (variant.quantity * grams);
    }, 0);
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Packungseinheiten</CardTitle>
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
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Packung {index + 1}</Label>
                    {fields.length > 1 && (
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
                  
                  <FormField
                    control={form.control}
                    name={`packageVariants.${index}.size`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Packungsgröße</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {packageSizeOptions.map((size) => (
                              <SelectItem key={size.value} value={size.value}>
                                {size.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`packageVariants.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bestand (Stück)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`packageVariants.${index}.minStock`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mindestbestand</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium">Gesamtbestand</div>
                <div className="text-2xl font-bold text-green-600">
                  {calculateTotalGrams()}g
                </div>
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
              onClick={form.handleSubmit(onSubmit)} 
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

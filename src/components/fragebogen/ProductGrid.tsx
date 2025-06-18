
import ProductCard from "./ProductCard";

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

interface Product {
  id: string;
  name: string;
  type: "flower" | "extract";
  thcPercentage: number;
  cbdPercentage: number;
  pricePerGram?: number;
  pricePerBottle?: number;
  bottleSize?: number;
  description: string;
  image: string;
  pharmacies: string[];
}

interface ProductGridProps {
  products: Product[];
  pharmacies: Pharmacy[];
  selectedProducts: Record<string, { quantity: number; pharmacyId: string }>;
  selectedPharmacies: string[];
  showAllPharmacies: boolean;
  onProductSelectChange: (productId: string, quantity: number, pharmacyId: string) => void;
}

const ProductGrid = ({
  products,
  pharmacies,
  selectedProducts,
  selectedPharmacies,
  showAllPharmacies,
  onProductSelectChange
}: ProductGridProps) => {
  const getFilteredProducts = () => {
    if (showAllPharmacies) {
      return products;
    }
    return products.filter(product => 
      product.pharmacies.some(pharmacyId => selectedPharmacies.includes(pharmacyId))
    );
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">
        Verfügbare Sorten ({getFilteredProducts().length})
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredProducts().map((product) => {
          // Filter available pharmacies based on user selection
          const productPharmacies = pharmacies.filter(p => product.pharmacies.includes(p.id));
          const filteredPharmacies = showAllPharmacies 
            ? productPharmacies 
            : productPharmacies.filter(pharmacy => selectedPharmacies.includes(pharmacy.id));

          return (
            <ProductCard
              key={product.id}
              product={product}
              quantity={selectedProducts[product.id]?.quantity || 0}
              selectedPharmacyId={selectedProducts[product.id]?.pharmacyId}
              availablePharmacies={filteredPharmacies}
              onQuantityChange={(quantity, pharmacyId) => onProductSelectChange(product.id, quantity, pharmacyId)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;


import { mockProducts } from '@/data/mockData';

export const calculateTotalAmount = (selectedProducts: Record<string, { quantity: number; pharmacyId: string }>) => {
  console.log("Calculating total amount with selectedProducts:", selectedProducts);
  console.log("Available products:", mockProducts);
  
  let productTotal = 0;
  Object.entries(selectedProducts).forEach(([productId, selection]) => {
    const product = mockProducts.find(p => p.id === productId);
    console.log(`Product ${productId}:`, product, "Selection:", selection);
    
    if (product && selection.quantity > 0) {
      // Fix: Use only pricePerGram since all products are flowers
      const price = product.pricePerGram || 12.5; // Fallback price
      const total = selection.quantity * price;
      productTotal += total;
      console.log(`Adding ${selection.quantity} x ${price} = ${total} for product ${product.name}`);
    }
  });
  
  const prescriptionFee = 14.99;
  const shippingFee = productTotal < 100 ? 10.0 : 0;
  const finalTotal = productTotal + prescriptionFee + shippingFee;
  
  console.log("Product total:", productTotal, "Final total:", finalTotal);
  return finalTotal;
};

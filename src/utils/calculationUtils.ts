
import { mockProducts } from '@/data/mockData';

export const calculateTotalAmount = (selectedProducts: Record<string, { quantity: number; pharmacyId: string }>) => {
  console.log("=== Calculating total amount ===");
  console.log("Selected products:", selectedProducts);
  console.log("Available mock products:", mockProducts);
  
  let productTotal = 0;
  
  Object.entries(selectedProducts).forEach(([productId, selection]) => {
    console.log(`Processing product ID: ${productId}`, selection);
    
    const product = mockProducts.find(p => p.id === productId);
    console.log(`Found product:`, product);
    
    if (product && selection.quantity > 0) {
      const price = product.pricePerGram;
      const total = selection.quantity * price;
      productTotal += total;
      console.log(`Product ${product.name}: ${selection.quantity} x ${price} = ${total}`);
    } else {
      console.log(`Product ${productId} not found or quantity is 0`);
    }
  });
  
  const prescriptionFee = 14.99;
  const shippingFee = productTotal < 100 ? 10.0 : 0;
  const finalTotal = productTotal + prescriptionFee + shippingFee;
  
  console.log("=== Calculation Summary ===");
  console.log("Product total:", productTotal);
  console.log("Prescription fee:", prescriptionFee);
  console.log("Shipping fee:", shippingFee);
  console.log("Final total:", finalTotal);
  console.log("=== End Calculation ===");
  
  return finalTotal;
};

import { logger } from "@/lib/logger";

import { mockProducts } from '@/data/mockData';

export const calculateTotalAmount = (selectedProducts: Record<string, { quantity: number; pharmacyId: string }>) => {
  logger.debug("=== Calculating total amount ===");
  logger.debug("Selected products:", selectedProducts);
  logger.debug("Available mock products:", mockProducts);
  
  let productTotal = 0;
  
  Object.entries(selectedProducts).forEach(([productId, selection]) => {
    logger.debug(`Processing product ID: ${productId}`, selection);
    
    const product = mockProducts.find(p => p.id === productId);
    logger.debug(`Found product:`, product);
    
    if (product && selection.quantity > 0) {
      const price = product.pricePerGram;
      const total = selection.quantity * price;
      productTotal += total;
      logger.debug(`Product ${product.name}: ${selection.quantity} x ${price} = ${total}`);
    } else {
      logger.debug(`Product ${productId} not found or quantity is 0`);
    }
  });
  
  const prescriptionFee = 14.99;
  const shippingFee = productTotal < 100 ? 10.0 : 0;
  const finalTotal = productTotal + prescriptionFee + shippingFee;
  
  logger.debug("=== Calculation Summary ===");
  logger.debug("Product total:", productTotal);
  logger.debug("Prescription fee:", prescriptionFee);
  logger.debug("Shipping fee:", shippingFee);
  logger.debug("Final total:", finalTotal);
  logger.debug("=== End Calculation ===");
  
  return finalTotal;
};


import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CheckoutStepProps {
  totalAmount: number;
  onComplete: () => void;
  onBack: () => void;
}

const CheckoutStep = ({ totalAmount, onComplete, onBack }: CheckoutStepProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'creditCard' | 'paypal' | 'sepa'>('creditCard');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Bezahlung</h2>
      
      <Card>
        <CardContent className="p-6">
          <div className="mb-6 border-b dark:border-gray-700 pb-4">
            <h3 className="font-medium text-lg mb-2">Zahlungsübersicht</h3>
            <div className="flex justify-between text-sm mb-1">
              <span>Produkte:</span>
              <span>{(totalAmount - 14.99 - (totalAmount < 114.99 ? 10 : 0)).toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Rezeptgebühr:</span>
              <span>14,99 €</span>
            </div>
            {totalAmount < 114.99 && (
              <div className="flex justify-between text-sm mb-1">
                <span>Versandkosten:</span>
                <span>10,00 €</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg mt-3">
              <span>Gesamtbetrag:</span>
              <span>{totalAmount.toFixed(2)} €</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-4">Zahlungsmethode auswählen</h3>
                
                <div className="space-y-3">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'creditCard' ? 'border-cannabis-green-500 bg-cannabis-green-50 dark:bg-cannabis-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                    onClick={() => setPaymentMethod('creditCard')}
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full border-2 border-cannabis-green-500 flex items-center justify-center mr-3">
                        {paymentMethod === 'creditCard' && <div className="w-3 h-3 rounded-full bg-cannabis-green-500"></div>}
                      </div>
                      <div>
                        <div className="font-medium">Kreditkarte</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Visa, Mastercard, American Express</div>
                      </div>
                      <div className="ml-auto flex space-x-2">
                        <div className="w-8 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="w-8 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="w-8 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    
                    {paymentMethod === 'creditCard' && (
                      <div className="mt-4 space-y-3">
                        <div>
                          <Label htmlFor="cardNumber">Kartennummer</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="expiryDate">Gültig bis (MM/JJ)</Label>
                            <Input id="expiryDate" placeholder="MM/JJ" />
                          </div>
                          <div>
                            <Label htmlFor="cvc">Sicherheitscode</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardholderName">Name des Karteninhabers</Label>
                          <Input id="cardholderName" placeholder="Vor- und Nachname" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'paypal' ? 'border-cannabis-green-500 bg-cannabis-green-50 dark:bg-cannabis-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full border-2 border-cannabis-green-500 flex items-center justify-center mr-3">
                        {paymentMethod === 'paypal' && <div className="w-3 h-3 rounded-full bg-cannabis-green-500"></div>}
                      </div>
                      <div>
                        <div className="font-medium">PayPal</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Bezahle sicher mit deinem PayPal-Konto</div>
                      </div>
                      <div className="ml-auto">
                        <div className="w-16 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    
                    {paymentMethod === 'paypal' && (
                      <div className="mt-4 text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                        Du wirst nach dem Klick auf "Jetzt bezahlen" zu PayPal weitergeleitet.
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'sepa' ? 'border-cannabis-green-500 bg-cannabis-green-50 dark:bg-cannabis-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                    onClick={() => setPaymentMethod('sepa')}
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full border-2 border-cannabis-green-500 flex items-center justify-center mr-3">
                        {paymentMethod === 'sepa' && <div className="w-3 h-3 rounded-full bg-cannabis-green-500"></div>}
                      </div>
                      <div>
                        <div className="font-medium">SEPA-Lastschrift</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Bezahlung per Bankeinzug</div>
                      </div>
                    </div>
                    
                    {paymentMethod === 'sepa' && (
                      <div className="mt-4 space-y-3">
                        <div>
                          <Label htmlFor="iban">IBAN</Label>
                          <Input id="iban" placeholder="DE89 3704 0044 0532 0130 00" />
                        </div>
                        <div>
                          <Label htmlFor="accountHolder">Kontoinhaber</Label>
                          <Input id="accountHolder" placeholder="Vor- und Nachname" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button 
                type="button"
                variant="outline" 
                onClick={onBack}
                className="py-6 px-8"
                disabled={isProcessing}
              >
                Zurück
              </Button>
              
              <Button 
                type="submit"
                disabled={isProcessing}
                className="py-6 px-8 min-w-[200px]"
              >
                {isProcessing ? "Verarbeitung..." : "Jetzt bezahlen"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutStep;

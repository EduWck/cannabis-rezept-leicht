
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface CheckoutStepProps {
  totalAmount: number;
  onComplete: () => void;
  onBack: () => void;
}

const CheckoutStep = ({ totalAmount, onComplete, onBack }: CheckoutStepProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'creditCard' | 'paypal' | 'sepa'>('creditCard');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Contact information
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    country: "Deutschland", // Default value
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'street', 'houseNumber', 'postalCode', 'city'];
    const missingFields = requiredFields.filter(field => !contactInfo[field as keyof typeof contactInfo]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte füllen Sie alle erforderlichen Felder aus.",
        variant: "destructive"
      });
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactInfo.email)) {
      toast({
        title: "Ungültige E-Mail",
        description: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        variant: "destructive"
      });
      return;
    }
    
    // Phone number validation (simple format check)
    const phoneRegex = /^[+\d\s()-]{8,20}$/;
    if (!phoneRegex.test(contactInfo.phone)) {
      toast({
        title: "Ungültige Telefonnummer",
        description: "Bitte geben Sie eine gültige Telefonnummer ein.",
        variant: "destructive"
      });
      return;
    }
    
    // Postal code validation for Germany (5 digits)
    const postalCodeRegex = /^\d{5}$/;
    if (!postalCodeRegex.test(contactInfo.postalCode)) {
      toast({
        title: "Ungültige Postleitzahl",
        description: "Bitte geben Sie eine gültige Postleitzahl ein (5 Ziffern).",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Bestellung abschließen</h2>
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-medium text-lg mb-4">Kontakt- und Lieferadresse</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Vorname *</Label>
                <Input 
                  id="firstName" 
                  name="firstName" 
                  value={contactInfo.firstName} 
                  onChange={handleInputChange}
                  placeholder="Max"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nachname *</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  value={contactInfo.lastName} 
                  onChange={handleInputChange}
                  placeholder="Mustermann"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">E-Mail *</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={contactInfo.email} 
                  onChange={handleInputChange}
                  placeholder="max.mustermann@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefonnummer *</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={contactInfo.phone} 
                  onChange={handleInputChange}
                  placeholder="+49 123 456789"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Separator className="my-3" />
                <p className="text-sm text-gray-500 mb-3">Lieferadresse</p>
              </div>
              <div>
                <Label htmlFor="street">Straße *</Label>
                <Input 
                  id="street" 
                  name="street" 
                  value={contactInfo.street} 
                  onChange={handleInputChange}
                  placeholder="Musterstraße"
                  required
                />
              </div>
              <div>
                <Label htmlFor="houseNumber">Hausnummer *</Label>
                <Input 
                  id="houseNumber" 
                  name="houseNumber" 
                  value={contactInfo.houseNumber} 
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Postleitzahl *</Label>
                <Input 
                  id="postalCode" 
                  name="postalCode" 
                  value={contactInfo.postalCode} 
                  onChange={handleInputChange}
                  placeholder="12345"
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">Stadt *</Label>
                <Input 
                  id="city" 
                  name="city" 
                  value={contactInfo.city} 
                  onChange={handleInputChange}
                  placeholder="Berlin"
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">Land *</Label>
                <Input 
                  id="country" 
                  name="country" 
                  value={contactInfo.country} 
                  onChange={handleInputChange}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
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
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CheckoutStep;

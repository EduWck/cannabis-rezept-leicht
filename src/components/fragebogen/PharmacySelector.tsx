
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Search, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface PharmacySelectorProps {
  pharmacies: Pharmacy[];
  selectedPharmacies: string[];
  showAllPharmacies: boolean;
  onPharmacyToggle: (pharmacyId: string) => void;
  onShowAllToggle: () => void;
}

const PharmacySelector = ({
  pharmacies,
  selectedPharmacies,
  showAllPharmacies,
  onPharmacyToggle,
  onShowAllToggle
}: PharmacySelectorProps) => {
  const [comboboxOpen, setComboboxOpen] = useState(false);

  const handlePharmacySelect = (pharmacyId: string) => {
    if (!selectedPharmacies.includes(pharmacyId)) {
      onPharmacyToggle(pharmacyId);
    }
    setComboboxOpen(false);
  };

  const getAvailablePharmacies = () => {
    return pharmacies.filter(pharmacy => !selectedPharmacies.includes(pharmacy.id));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-4">Apotheken auswählen</h3>
        
        <div className="space-y-4">
          {/* Show All Toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showAll"
              checked={showAllPharmacies}
              onCheckedChange={onShowAllToggle}
            />
            <label htmlFor="showAll" className="text-sm font-medium cursor-pointer">
              Alle Apotheken anzeigen
            </label>
          </div>

          {/* Pharmacy Search & Selection */}
          {!showAllPharmacies && (
            <div className="space-y-3">
              <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={comboboxOpen}
                    className="w-full justify-between"
                  >
                    <div className="flex items-center">
                      <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Apotheke suchen und hinzufügen...</span>
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command className="w-full">
                    <CommandInput 
                      placeholder="Apotheke suchen..." 
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>Keine Apotheke gefunden.</CommandEmpty>
                      <CommandGroup>
                        {getAvailablePharmacies().map((pharmacy) => (
                          <CommandItem
                            key={pharmacy.id}
                            value={`${pharmacy.name} ${pharmacy.city}`}
                            onSelect={() => handlePharmacySelect(pharmacy.id)}
                            className="flex items-center justify-between cursor-pointer"
                          >
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <span className="font-medium">{pharmacy.name}</span>
                                <div className="flex items-center ml-2 text-xs text-muted-foreground">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  <span>{pharmacy.city}</span>
                                </div>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                <span className="mr-3">{pharmacy.rating}</span>
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{pharmacy.deliveryTime}</span>
                              </div>
                            </div>
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedPharmacies.includes(pharmacy.id) 
                                  ? "opacity-100" 
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Selected Pharmacies */}
          {!showAllPharmacies && selectedPharmacies.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Ausgewählte Apotheken:</p>
              <div className="flex flex-wrap gap-2">
                {selectedPharmacies.map((pharmacyId) => {
                  const pharmacy = pharmacies.find(p => p.id === pharmacyId);
                  if (!pharmacy) return null;
                  
                  return (
                    <Badge
                      key={pharmacyId}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      onClick={() => onPharmacyToggle(pharmacyId)}
                    >
                      {pharmacy.name} - {pharmacy.city} ×
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PharmacySelector;

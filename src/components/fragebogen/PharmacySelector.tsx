
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Search, X } from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getFilteredPharmacies = () => {
    const availablePharmacies = pharmacies.filter(pharmacy => !selectedPharmacies.includes(pharmacy.id));
    
    if (!searchTerm.trim()) {
      return availablePharmacies;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return availablePharmacies.filter(pharmacy =>
      pharmacy.name.toLowerCase().includes(searchLower) ||
      pharmacy.city.toLowerCase().includes(searchLower) ||
      pharmacy.address.toLowerCase().includes(searchLower)
    );
  };

  const handlePharmacySelect = (pharmacyId: string) => {
    onPharmacyToggle(pharmacyId);
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPharmacies = getFilteredPharmacies();

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

          {/* Direct Pharmacy Search */}
          {!showAllPharmacies && (
            <div className="space-y-3 relative" ref={dropdownRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Apotheke suchen und hinzufügen..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  className="pl-10 pr-10"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Dropdown Results */}
              {isDropdownOpen && (searchTerm || filteredPharmacies.length > 0) && (
                <div className="absolute top-full left-0 right-0 z-50 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredPharmacies.length > 0 ? (
                    <div className="p-1">
                      {filteredPharmacies.map((pharmacy) => (
                        <div
                          key={pharmacy.id}
                          className="flex items-center justify-between p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-sm"
                          onClick={() => handlePharmacySelect(pharmacy.id)}
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
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 text-sm text-muted-foreground text-center">
                      Keine Apotheke gefunden
                    </div>
                  )}
                </div>
              )}
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

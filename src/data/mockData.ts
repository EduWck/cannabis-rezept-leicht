
export const mockProducts = [
  {
    id: "1",
    name: "Bedrocan",
    type: "flower" as const,
    thcPercentage: 22,
    cbdPercentage: 0.1,
    pricePerGram: 12.5,
    description: "Eine der beliebtesten medizinischen Sorten mit verlässlichem THC-Gehalt.",
    image: "/placeholder.svg",
    pharmacies: ["1", "2", "4"]
  },
  {
    id: "2",
    name: "Bediol",
    type: "flower" as const,
    thcPercentage: 6.3,
    cbdPercentage: 8,
    pricePerGram: 10.25,
    description: "Ausgewogenes THC-CBD-Verhältnis für eine mildere Wirkung.",
    image: "/placeholder.svg",
    pharmacies: ["1", "3"]
  },
  {
    id: "3",
    name: "Pedanios 22/1",
    type: "flower" as const,
    thcPercentage: 22,
    cbdPercentage: 1,
    pricePerGram: 13.75,
    description: "Indicalastige Sorte für abendliche Anwendung und Schlafstörungen.",
    image: "/placeholder.svg",
    pharmacies: ["1", "4"]
  },
  {
    id: "4",
    name: "Aurora 20/1",
    type: "flower" as const,
    thcPercentage: 20,
    cbdPercentage: 1,
    pricePerGram: 11.90,
    description: "Sativa-dominant mit klarer Wirkung für den Tag.",
    image: "/placeholder.svg",
    pharmacies: ["2", "4"]
  },
  {
    id: "5",
    name: "THC Extrakt 25%",
    type: "extract" as const,
    thcPercentage: 25,
    cbdPercentage: 0.5,
    pricePerBottle: 89.95,
    bottleSize: 10,
    description: "Hochkonzentrierter THC-Extrakt für erfahrene Anwender (10ml Flasche).",
    image: "/placeholder.svg",
    pharmacies: ["1", "2"]
  },
  {
    id: "6",
    name: "CBD Extrakt 15%",
    type: "extract" as const,
    thcPercentage: 0.2,
    cbdPercentage: 15,
    pricePerBottle: 65.50,
    bottleSize: 15,
    description: "CBD-reicher Extrakt zur Entspannung und Schmerzlinderung (15ml Flasche).",
    image: "/placeholder.svg",
    pharmacies: ["2", "3"]
  },
  {
    id: "7",
    name: "CBD Blüte 18%",
    type: "flower" as const,
    thcPercentage: 0.2,
    cbdPercentage: 18,
    pricePerGram: 9.50,
    description: "CBD-reiche Blüte ohne psychoaktive Wirkung.",
    image: "/placeholder.svg",
    pharmacies: ["3"]
  }
];

export const mockPharmacies = [
  {
    id: "1",
    name: "Green Leaf Apotheke",
    address: "Hauptstraße 15",
    city: "Berlin",
    rating: 4.8,
    deliveryTime: "1-2 Werktage",
    phone: "+49 30 12345678",
    products: ["1", "2", "3", "5"]
  },
  {
    id: "2",
    name: "MediCanna Apotheke",
    address: "Bahnhofstraße 42",
    city: "München",
    rating: 4.6,
    deliveryTime: "2-3 Werktage",
    phone: "+49 89 87654321",
    products: ["4", "1", "6", "5"]
  },
  {
    id: "3",
    name: "Natura Apotheke",
    address: "Gartenweg 8",
    city: "Hamburg",
    rating: 4.7,
    deliveryTime: "1-3 Werktage",
    phone: "+49 40 11223344",
    products: ["2", "6", "7"]
  },
  {
    id: "4",
    name: "CityMed Apotheke",
    address: "Marktplatz 3",
    city: "Köln",
    rating: 4.5,
    deliveryTime: "2-4 Werktage",
    phone: "+49 221 55667788",
    products: ["1", "4", "3"]
  }
];


export const mockProducts = [
  {
    id: "1",
    name: "Aurora Indica",
    type: "flower" as const,
    thcPercentage: 18,
    cbdPercentage: 1,
    pricePerGram: 12.5,
    description: "Eine beruhigende Indica-Sorte",
    image: "/placeholder.svg",
    pharmacies: ["1", "2"]
  },
  {
    id: "2", 
    name: "Green Crack",
    type: "flower" as const,
    thcPercentage: 22,
    cbdPercentage: 0.5,
    pricePerGram: 14.0,
    description: "Eine energetisierende Sativa-Sorte",
    image: "/placeholder.svg",
    pharmacies: ["1", "3"]
  }
];

export const mockPharmacies = [
  {
    id: "1",
    name: "Apotheke am Markt",
    address: "Marktplatz 1",
    city: "Berlin",
    rating: 4.5,
    deliveryTime: "1-2 Tage",
    phone: "+49 30 12345678",
    products: ["1", "2"]
  },
  {
    id: "2",
    name: "Stadt-Apotheke",
    address: "Hauptstraße 25",
    city: "München",
    rating: 4.8,
    deliveryTime: "2-3 Tage", 
    phone: "+49 89 87654321",
    products: ["1"]
  },
  {
    id: "3",
    name: "Zentral-Apotheke",
    address: "Königsallee 15",
    city: "Hamburg",
    rating: 4.2,
    deliveryTime: "1-3 Tage",
    phone: "+49 40 11223344",
    products: ["2"]
  }
];

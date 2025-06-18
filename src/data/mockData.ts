
export const mockProducts = [
  {
    id: "1",
    name: "Aurora Indica",
    type: "flower" as const,
    thcPercentage: 18,
    cbdPercentage: 1,
    pricePerGram: 12.5,
    description: "Eine beruhigende Indica-Sorte mit entspannender Wirkung",
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
    description: "Eine energetisierende Sativa-Sorte für den Tag",
    image: "/placeholder.svg",
    pharmacies: ["1", "3"]
  },
  {
    id: "3",
    name: "CBD Pure",
    type: "flower" as const,
    thcPercentage: 1,
    cbdPercentage: 20,
    pricePerGram: 15.0,
    description: "Eine CBD-reiche Sorte mit minimaler psychoaktiver Wirkung",
    image: "/placeholder.svg",
    pharmacies: ["2", "3"]
  },
  {
    id: "4",
    name: "OG Kush",
    type: "flower" as const,
    thcPercentage: 19,
    cbdPercentage: 0.3,
    pricePerGram: 13.5,
    description: "Eine klassische Hybrid-Sorte mit ausgewogener Wirkung",
    image: "/placeholder.svg",
    pharmacies: ["1", "2", "3"]
  },
  {
    id: "5",
    name: "Cannatonic",
    type: "flower" as const,
    thcPercentage: 6,
    cbdPercentage: 17,
    pricePerGram: 16.0,
    description: "Eine milde Sorte mit hohem CBD-Gehalt",
    image: "/placeholder.svg",
    pharmacies: ["2", "3"]
  },
  {
    id: "6",
    name: "Sour Diesel",
    type: "flower" as const,
    thcPercentage: 20,
    cbdPercentage: 0.2,
    pricePerGram: 14.5,
    description: "Eine energetisierende Sativa mit charakteristischem Aroma",
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
    products: ["1", "2", "4", "6"]
  },
  {
    id: "2",
    name: "Stadt-Apotheke",
    address: "Hauptstraße 25",
    city: "München",
    rating: 4.8,
    deliveryTime: "2-3 Tage", 
    phone: "+49 89 87654321",
    products: ["1", "3", "4", "5"]
  },
  {
    id: "3",
    name: "Zentral-Apotheke",
    address: "Königsallee 15",
    city: "Hamburg",
    rating: 4.2,
    deliveryTime: "1-3 Tage",
    phone: "+49 40 11223344",
    products: ["2", "3", "4", "5", "6"]
  }
];

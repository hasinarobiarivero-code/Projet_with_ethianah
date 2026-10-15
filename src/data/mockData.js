// Données de transit et d'importation multi-sources (Alibaba, 1688, Amazon, AliExpress, etc.) vers Madagascar 🇲🇬

export const initialOrders = [
  {
    id: "CMD-MG-84291",
    client: "Faly Rakotomalala",
    email: "faly.rakoto@moov.mg",
    phone: "+261 34 12 345 67",
    channel: "1688 / Alibaba",
    channelColor: "bg-orange-600",
    originCountry: "Chine 🇨🇳",
    originHub: "Hub Guangzhou",
    destination: "Antananarivo (Analakely)",
    city: "Antananarivo",
    flag: "🇲🇬",
    total: 328.40,
    totalMGA: "1 642 000 Ar",
    status: "Expédiée",
    statusVariant: "blue",
    date: "14 Oct 2026, 09:15",
    shippingMode: "Fret Aérien Express Chine",
    hubArrival: "Ivato TNR",
    items: [
      { name: "Lot Montres Connectées & Bracelets (1688)", qty: 5, price: 65.68 }
    ],
    carrier: "Air Cargo Guangzhou ➔ Ivato",
    trackingNumber: "CAN-TNR-982347"
  },
  {
    id: "CMD-MG-84290",
    client: "Haingo Razafindrabe",
    email: "haingo.razafy@gmail.com",
    phone: "+261 32 45 678 90",
    channel: "Amazon FR",
    channelColor: "bg-amber-500",
    originCountry: "France 🇫🇷",
    originHub: "Hub Paris CDG",
    destination: "Antananarivo (Ankorondrano)",
    city: "Antananarivo",
    flag: "🇲🇬",
    total: 158.90,
    totalMGA: "794 500 Ar",
    status: "Livrée",
    statusVariant: "green",
    date: "14 Oct 2026, 08:42",
    shippingMode: "Fret Aérien Express France",
    hubArrival: "Agence Ankorondrano",
    items: [
      { name: "Casque Audio Sans Fil ANC (Amazon)", qty: 1, price: 158.90 }
    ],
    carrier: "Livraison Express Tana",
    trackingNumber: "TNR-DLV-44910"
  },
  {
    id: "CMD-MG-84289",
    client: "Mamy Andrianina",
    email: "mamy.andrianina@wanadoo.mg",
    phone: "+261 33 11 222 33",
    channel: "Alibaba Grossiste",
    channelColor: "bg-orange-500",
    originCountry: "Chine 🇨🇳",
    originHub: "Hub Yiwu / Ningbo",
    destination: "Toamasina (Tamatave)",
    city: "Toamasina",
    flag: "🇲🇬",
    total: 764.20,
    totalMGA: "3 821 000 Ar",
    status: "En transit",
    statusVariant: "orange",
    date: "14 Oct 2026, 07:30",
    shippingMode: "Fret Maritime Conteneur",
    hubArrival: "Port de Toamasina (En mer)",
    items: [
      { name: "Matériel Informatique & Écrans Pro (Alibaba)", qty: 2, price: 382.10 }
    ],
    carrier: "Conteneur Maritime Chine ➔ Tamatave",
    trackingNumber: "MGA-SEA-77821"
  },
  {
    id: "CMD-MG-84288",
    client: "Tantely Rasoanaivo",
    email: "tantely.rasoan@yahoo.fr",
    phone: "+261 34 55 666 77",
    channel: "AliExpress",
    channelColor: "bg-red-500",
    originCountry: "Chine 🇨🇳",
    originHub: "Hub Shenzhen",
    destination: "Antsirabe",
    city: "Antsirabe",
    flag: "🇲🇬",
    total: 99.00,
    totalMGA: "495 000 Ar",
    status: "À préparer",
    statusVariant: "gray",
    date: "14 Oct 2026, 06:55",
    shippingMode: "Fret Aérien Standard",
    hubArrival: "Entrepôt Shenzhen Relais",
    items: [
      { name: "Accessoires & Pièces Électroniques (AliExpress)", qty: 3, price: 33.00 }
    ],
    carrier: "Transit Hub Chine",
    trackingNumber: "SZX-TNR-33201"
  },
  {
    id: "CMD-MG-84287",
    client: "Hery Rajaonarison",
    email: "hery.rajaon@societe.mg",
    phone: "+261 32 02 333 44",
    channel: "Fournisseur Direct / US",
    channelColor: "bg-indigo-600",
    originCountry: "USA 🇺🇸",
    originHub: "Hub Delaware",
    destination: "Antananarivo (Ivato)",
    city: "Antananarivo",
    flag: "🇲🇬",
    total: 1245.00,
    totalMGA: "6 225 000 Ar",
    status: "Contrôle",
    statusVariant: "pink",
    date: "14 Oct 2026, 05:18",
    shippingMode: "Fret Aérien Express USA",
    hubArrival: "Douanes Ivato Aéroport",
    items: [
      { name: "Équipement Réseau & Serveur Thunderbolt 4", qty: 1, price: 1245.00 }
    ],
    carrier: "Air Cargo Dédouanement Ivato",
    trackingNumber: "DOUANE-TNR-9941"
  },
  {
    id: "CMD-MG-84286",
    client: "Voahirana Randria",
    email: "voahirana.r@moov.mg",
    phone: "+261 33 88 999 00",
    channel: "Shein / Mode",
    channelColor: "bg-pink-600",
    originCountry: "Chine / Europe",
    originHub: "Hub Transit International",
    destination: "Mahajanga (Majunga)",
    city: "Mahajanga",
    flag: "🇲🇬",
    total: 218.75,
    totalMGA: "1 093 750 Ar",
    status: "Livrée",
    statusVariant: "green",
    date: "14 Oct 2026, 04:40",
    shippingMode: "Fret Maritime Groupage",
    hubArrival: "Port de Toamasina ➔ Majunga",
    items: [
      { name: "Colis Vêtements & Chaussures (Shein)", qty: 1, price: 218.75 }
    ],
    carrier: "Fret Maritime Conteneur Toamasina",
    trackingNumber: "MAR-TOA-55018"
  }
];

export const initialActivities = [
  {
    id: 1,
    type: "delivery",
    title: "Colis 1688 / Alibaba livré au client",
    details: "Agence Analakely (Tana) • Il y a 4 min",
    iconBg: "bg-emerald-100 text-emerald-600",
    badge: null
  },
  {
    id: 2,
    type: "payment",
    title: "Paiement MVola validé (1 642 000 Ar)",
    details: "Faly Rakotomalala • Il y a 12 min",
    iconBg: "bg-purple-100 text-purple-600",
    badge: null
  },
  {
    id: 3,
    type: "alert",
    title: "Inspection douanière à l'aéroport d'Ivato",
    details: "Colis #DOUANE-TNR-9941 • Il y a 25 min",
    iconBg: "bg-rose-100 text-rose-500",
    badge: "red"
  },
  {
    id: 4,
    type: "user",
    title: "Nouveau client importateur 1688 & Amazon",
    details: "Boutique Mahamasina • Il y a 46 min",
    iconBg: "bg-blue-100 text-blue-600",
    badge: null
  }
];

export const initialShipments = [
  {
    id: "SH-MG-9041",
    orderId: "CMD-MG-84289",
    carrier: "Conteneur Maritime Asie ➔ Madagascar",
    origin: "Port de Ningbo / Guangzhou (Chine 🇨🇳)",
    destination: "Port de Toamasina (Tamatave 🇲🇬)",
    status: "En transit",
    statusColor: "amber",
    eta: "Arrivée prévue dans 8 jours (SPAT)",
    progress: 75,
    currentLocation: "Navire en océan Indien vers Toamasina",
    weight: "48.5 kg",
    service: "Fret Maritime Groupage (Bateau)",
    sourceMarket: "1688 / Alibaba (Chine)",
    originHub: "Hub Chine"
  },
  {
    id: "SH-MG-9040",
    orderId: "CMD-MG-84291",
    carrier: "Air Cargo International",
    origin: "Hub Guangzhou Baiyun (Chine 🇨🇳)",
    destination: "Antananarivo (Ivato TNR 🇲🇬)",
    status: "Expédiée",
    statusColor: "blue",
    eta: "Aujourd'hui, 17:00",
    progress: 85,
    currentLocation: "Atterri à Ivato - En cours de tri",
    weight: "3.2 kg",
    service: "Fret Aérien Express Chine ➔ Mada",
    sourceMarket: "1688",
    originHub: "Hub Chine"
  },
  {
    id: "SH-MG-9039",
    orderId: "CMD-MG-84290",
    carrier: "Air France Cargo",
    origin: "Entrepôt Relais Paris CDG (France 🇫🇷)",
    destination: "Agence Ankorondrano, Tana 🇲🇬",
    status: "Livrée",
    statusColor: "emerald",
    eta: "Remis au destinataire",
    progress: 100,
    currentLocation: "Colis retiré en agence Tana",
    weight: "1.1 kg",
    service: "Fret Aérien Express France",
    sourceMarket: "Amazon FR",
    originHub: "Hub Europe"
  },
  {
    id: "SH-MG-9038",
    orderId: "CMD-MG-84287",
    carrier: "Douanes Malagasy Ivato",
    origin: "Hub Delaware (USA 🇺🇸)",
    destination: "Antananarivo Ivato 🇲🇬",
    status: "Contrôle",
    statusColor: "rose",
    eta: "En attente liquidation taxes",
    progress: 60,
    currentLocation: "Zone Fret Douanes Aéroport Ivato",
    weight: "5.6 kg",
    service: "Fret Aérien USA ➔ Madagascar",
    sourceMarket: "Fournisseur US / Amazon",
    originHub: "Hub USA"
  },
  {
    id: "SH-MG-9037",
    orderId: "CMD-MG-84286",
    carrier: "MSC / CMA CGM Conteneur",
    origin: "Hub Transit International",
    destination: "Mahajanga via Toamasina 🇲🇬",
    status: "Livrée",
    statusColor: "emerald",
    eta: "Livré en agence",
    progress: 100,
    currentLocation: "Remis en main propre au client",
    weight: "14.2 kg",
    service: "Fret Maritime Groupage",
    sourceMarket: "Shein / Mode",
    originHub: "Hub International"
  }
];

export const initialClients = [
  {
    id: "CL-MG-001",
    name: "Faly Rakotomalala",
    email: "faly.rakoto@moov.mg",
    phone: "+261 34 12 345 67",
    city: "Antananarivo (Analakely)",
    country: "Madagascar",
    flag: "🇲🇬",
    type: "Commerçant 1688 / Alibaba",
    totalSpent: 1840.50,
    totalSpentMGA: "9 202 500 Ar",
    ordersCount: 6,
    status: "Actif",
    lastOrder: "14 Oct 2026"
  },
  {
    id: "CL-MG-002",
    name: "Haingo Razafindrabe",
    email: "haingo.razafy@gmail.com",
    phone: "+261 32 45 678 90",
    city: "Antananarivo (Ankorondrano)",
    country: "Madagascar",
    flag: "🇲🇬",
    type: "Particulier (Amazon FR)",
    totalSpent: 920.00,
    totalSpentMGA: "4 600 000 Ar",
    ordersCount: 4,
    status: "Actif",
    lastOrder: "14 Oct 2026"
  },
  {
    id: "CL-MG-003",
    name: "Mamy Andrianina",
    email: "mamy.andrianina@wanadoo.mg",
    phone: "+261 33 11 222 33",
    city: "Toamasina (Tamatave)",
    country: "Madagascar",
    flag: "🇲🇬",
    type: "Grossiste Import Alibaba",
    totalSpent: 4350.80,
    totalSpentMGA: "21 754 000 Ar",
    ordersCount: 12,
    status: "VIP",
    lastOrder: "14 Oct 2026"
  },
  {
    id: "CL-MG-004",
    name: "Tantely Rasoanaivo",
    email: "tantely.rasoan@yahoo.fr",
    phone: "+261 34 55 666 77",
    city: "Antsirabe",
    country: "Madagascar",
    flag: "🇲🇬",
    type: "Particulier (AliExpress)",
    totalSpent: 540.20,
    totalSpentMGA: "2 701 000 Ar",
    ordersCount: 3,
    status: "Actif",
    lastOrder: "14 Oct 2026"
  },
  {
    id: "CL-MG-005",
    name: "Hery Rajaonarison",
    email: "hery.rajaon@societe.mg",
    phone: "+261 32 02 333 44",
    city: "Antananarivo (Ivato)",
    country: "Madagascar",
    flag: "🇲🇬",
    type: "Entreprise Import Pro",
    totalSpent: 12890.00,
    totalSpentMGA: "64 450 000 Ar",
    ordersCount: 18,
    status: "VIP",
    lastOrder: "14 Oct 2026"
  },
  {
    id: "CL-MG-006",
    name: "Voahirana Randria",
    email: "voahirana.r@moov.mg",
    phone: "+261 33 88 999 00",
    city: "Mahajanga (Majunga)",
    country: "Madagascar",
    flag: "🇲🇬",
    type: "Boutique Mode (Shein / Chine)",
    totalSpent: 680.15,
    totalSpentMGA: "3 400 750 Ar",
    ordersCount: 5,
    status: "Actif",
    lastOrder: "14 Oct 2026"
  }
];

export const initialProducts = [
  {
    id: "PRD-INT-01",
    name: "Lots Électronique & Montres (1688 / Chine)",
    sku: "1688-WTC-01",
    category: "Chine - 1688",
    price: 249.00,
    priceMGA: "1 245 000 Ar",
    cost: 130.00,
    stock: 45,
    status: "En stock Tana",
    sales: 230,
    rating: 4.9
  },
  {
    id: "PRD-INT-02",
    name: "Casque Audio Sans Fil ANC (Amazon)",
    sku: "AMZ-AUD-02",
    category: "Europe - Amazon",
    price: 158.90,
    priceMGA: "794 500 Ar",
    cost: 95.00,
    stock: 18,
    status: "En stock Tana",
    sales: 210,
    rating: 4.9
  },
  {
    id: "PRD-INT-03",
    name: "Matériel Informatique & Écrans (Alibaba)",
    sku: "BABA-IT-14",
    category: "Chine - Alibaba",
    price: 699.00,
    priceMGA: "3 495 000 Ar",
    cost: 440.00,
    stock: 8,
    status: "Stock faible",
    sales: 92,
    rating: 4.8
  },
  {
    id: "PRD-INT-04",
    name: "Accessoires & Vêtements (Shein / AliExpress)",
    sku: "SHN-MOD-AL",
    category: "Mode & Beauté",
    price: 99.00,
    priceMGA: "495 000 Ar",
    cost: 35.00,
    stock: 60,
    status: "En stock Tana",
    sales: 410,
    rating: 4.7
  }
];

export const initialPayments = [
  {
    id: "PAY-MG-7821",
    orderId: "CMD-MG-84291",
    client: "Faly Rakotomalala",
    amount: 328.40,
    amountMGA: "1 642 000 Ar",
    method: "MVola (Telma)",
    date: "14 Oct 2026, 09:16",
    status: "Validé",
    fee: 3.25
  },
  {
    id: "PAY-MG-7820",
    orderId: "CMD-MG-84290",
    client: "Haingo Razafindrabe",
    amount: 158.90,
    amountMGA: "794 500 Ar",
    method: "Orange Money",
    date: "14 Oct 2026, 08:43",
    status: "Validé",
    fee: 1.80
  },
  {
    id: "PAY-MG-7819",
    orderId: "CMD-MG-84289",
    client: "Mamy Andrianina",
    amount: 764.20,
    amountMGA: "3 821 000 Ar",
    method: "Airtel Money",
    date: "14 Oct 2026, 07:31",
    status: "Validé",
    fee: 8.40
  },
  {
    id: "PAY-MG-7818",
    orderId: "CMD-MG-84288",
    client: "Tantely Rasoanaivo",
    amount: 99.00,
    amountMGA: "495 000 Ar",
    method: "Virement BNI Madagascar",
    date: "14 Oct 2026, 06:56",
    status: "Validé",
    fee: 1.00
  },
  {
    id: "PAY-MG-7817",
    orderId: "CMD-MG-84287",
    client: "Hery Rajaonarison",
    amount: 1245.00,
    amountMGA: "6 225 000 Ar",
    method: "Virement BMOI Madagascar",
    date: "14 Oct 2026, 05:19",
    status: "En attente dédouanement",
    fee: 0.00
  }
];

export const chartDatasets = {
  "7 jours": {
    labels: ["8 oct.", "10 oct.", "12 oct.", "13 oct.", "Aujourd'hui"],
    points: [22, 38, 41, 55, 66.429],
    max: 80,
    tooltipValue: "66 429 € (~332 M Ar)",
    tooltipLabel: "Aujourd'hui"
  },
  "14 jours": {
    labels: ["1 oct.", "5 oct.", "9 oct.", "12 oct.", "Aujourd'hui"],
    points: [30, 45, 52, 60, 71.200],
    max: 80,
    tooltipValue: "71 200 € (~356 M Ar)",
    tooltipLabel: "Aujourd'hui"
  },
  "30 jours": {
    labels: ["15 sept.", "22 sept.", "29 sept.", "6 oct.", "Aujourd'hui"],
    points: [25, 48, 59, 64, 78.500],
    max: 80,
    tooltipValue: "78 500 € (~392 M Ar)",
    tooltipLabel: "Aujourd'hui"
  }
};

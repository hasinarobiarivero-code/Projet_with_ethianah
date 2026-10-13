export const initialOrders = [
  {
    id: "GS-84291",
    client: "Sofia Laurent",
    email: "sofia.laurent@mail.fr",
    channel: "Web",
    channelColor: "bg-blue-600",
    destination: "Paris, FR",
    flag: "🇫🇷",
    total: 328.40,
    status: "Expédiée",
    statusVariant: "blue",
    date: "13 Oct 2026, 09:15",
    items: [
      { name: "Montre Connectée Sport Pro", qty: 1, price: 249.00 },
      { name: "Bracelet Cuir Véritable", qty: 1, price: 79.40 }
    ],
    carrier: "Colissimo",
    trackingNumber: "FR982347101"
  },
  {
    id: "GS-84290",
    client: "Jonas Becker",
    email: "j.becker@mail.de",
    channel: "App",
    channelColor: "bg-purple-600",
    destination: "Berlin, DE",
    flag: "🇩🇪",
    total: 158.90,
    status: "Livrée",
    statusVariant: "green",
    date: "13 Oct 2026, 08:42",
    items: [
      { name: "Casque Audio Sans Fil ANC", qty: 1, price: 158.90 }
    ],
    carrier: "DHL Express",
    trackingNumber: "DE449102834"
  },
  {
    id: "GS-84289",
    client: "Emma Wilson",
    email: "emma.w@post.co.uk",
    channel: "Amazon",
    channelColor: "bg-amber-500",
    destination: "Londres, GB",
    flag: "🇬🇧",
    total: 764.20,
    status: "En transit",
    statusVariant: "orange",
    date: "13 Oct 2026, 07:30",
    items: [
      { name: "Tablette Graphique Ultra 14\"", qty: 1, price: 699.00 },
      { name: "Stylet Précision Stylus V3", qty: 1, price: 65.20 }
    ],
    carrier: "DHL Express",
    trackingNumber: "GB778219401"
  },
  {
    id: "GS-84288",
    client: "Luca Romano",
    email: "l.romano@post.it",
    channel: "Web",
    channelColor: "bg-blue-600",
    destination: "Milan, IT",
    flag: "🇮🇹",
    total: 99.00,
    status: "À préparer",
    statusVariant: "gray",
    date: "13 Oct 2026, 06:55",
    items: [
      { name: "Support Ergonomique Aluminium", qty: 1, price: 99.00 }
    ],
    carrier: "BRT Express",
    trackingNumber: "IT332019482"
  },
  {
    id: "GS-84287",
    client: "Nour Al-Fassi",
    email: "nour.alf@post.ae",
    channel: "App",
    channelColor: "bg-purple-600",
    destination: "Dubaï, AE",
    flag: "🇦🇪",
    total: 1245.00,
    status: "Contrôle",
    statusVariant: "pink",
    date: "13 Oct 2026, 05:18",
    items: [
      { name: "Station de Travail Thunderbolt 4", qty: 1, price: 1150.00 },
      { name: "Câble Optique Pro 2m", qty: 1, price: 95.00 }
    ],
    carrier: "FedEx International",
    trackingNumber: "AE994102938"
  },
  {
    id: "GS-84286",
    client: "Clara Gómez",
    email: "clara.g@post.es",
    channel: "Web",
    channelColor: "bg-blue-600",
    destination: "Madrid, ES",
    flag: "🇪🇸",
    total: 218.75,
    status: "Livrée",
    statusVariant: "green",
    date: "13 Oct 2026, 04:40",
    items: [
      { name: "Clavier Mécanique Sans Fil RGB", qty: 1, price: 189.00 },
      { name: "Repose-Poignet Mousse Mémoire", qty: 1, price: 29.75 }
    ],
    carrier: "Correos Express",
    trackingNumber: "ES550183921"
  }
];

export const initialActivities = [
  {
    id: 1,
    type: "delivery",
    title: "Commande GS-84290 livrée",
    details: "Berlin • Il y a 4 min",
    iconBg: "bg-emerald-100 text-emerald-600",
    badge: null
  },
  {
    id: 2,
    type: "payment",
    title: "Paiement de 1 340,00 € validé",
    details: "Nour Al-Fassi • Il y a 12 min",
    iconBg: "bg-purple-100 text-purple-600",
    badge: null
  },
  {
    id: 3,
    type: "alert",
    title: "Contrôle douanier requis",
    details: "Colis DHL-684201 • Il y a 25 min",
    iconBg: "bg-rose-100 text-rose-500",
    badge: "red"
  },
  {
    id: 4,
    type: "user",
    title: "Nouveau client professionnel",
    details: "Atelier Nante • Il y a 46 min",
    iconBg: "bg-blue-100 text-blue-600",
    badge: null
  }
];

export const salesChannels = [
  { name: "Boutique web", percentage: 48, color: "#4f46e5", bgClass: "bg-indigo-600", amount: "136 700 €" },
  { name: "Application", percentage: 28, color: "#06b6d4", bgClass: "bg-cyan-500", amount: "79 730 €" },
  { name: "Marketplaces", percentage: 17, color: "#f59e0b", bgClass: "bg-amber-500", amount: "48 400 €" },
  { name: "Partenaires", percentage: 8, color: "#10b981", bgClass: "bg-emerald-500", amount: "19 930 €" }
];

export const chartDatasets = {
  "7 jours": {
    labels: ["25 sept.", "27 sept.", "29 sept.", "1 oct.", "Aujourd'hui"],
    points: [22, 38, 41, 55, 66.429],
    max: 80,
    tooltipValue: "66 429 €",
    tooltipLabel: "Aujourd'hui"
  },
  "14 jours": {
    labels: ["18 sept.", "22 sept.", "26 sept.", "30 sept.", "Aujourd'hui"],
    points: [30, 45, 52, 60, 71.200],
    max: 80,
    tooltipValue: "71 200 €",
    tooltipLabel: "Aujourd'hui"
  },
  "30 jours": {
    labels: ["13 sept.", "20 sept.", "27 sept.", "4 oct.", "Aujourd'hui"],
    points: [25, 48, 59, 64, 78.500],
    max: 80,
    tooltipValue: "78 500 €",
    tooltipLabel: "Aujourd'hui"
  }
};

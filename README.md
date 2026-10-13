# ato aki ny fanazavana anazy a ,en vrai nogenereko tamny IA ito fa miezaka miverifier za we mamde ve de mbola juste interface izy ty fa mbola tsisy fonctionnalite be manakory
# Tableau de Bord Administrateur (React + Tailwind CSS)

Tableau de bord logistique et e-commerce répliquant fidèlement le design fourni, incluant la palette de couleurs verte (`#2f6f52`), les graphiques interactifs et l'ensemble des fonctionnalités.

## 🚀 Démarrage rapide

Pour lancer le projet en mode développement :

```bash
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

## 📦 Fonctionnalités incluses

1. **Barre latérale (Sidebar)** :
   - Thème vert sapin fidèle (`#2f6f52`) avec logo réseau/globe.
   - Navigation : *Vue d'ensemble*, *Commandes* (badge interactif), *Expéditions*, *Clients*, *Catalogue*, *Paiements*, *Rapports*, *Intégrations*, *Paramètres*.
   - Widget d'état : *99,2% Réseau opérationnel (42 packages actifs dans 18 pays)* avec icône fusée.
   - Bouton de déconnexion.
   - Adapté pour mobiles et ordinateurs avec menu rétractable.

2. **En-tête supérieur (Header)** :
   - Recherche globale avec raccourci clavier `⌘ K` ou `Ctrl + K`.
   - Sélecteur de pays et devise (France - EUR, USA - USD, etc.).
   - Centre d'aide et popover de notifications.
   - Profil administrateur (`AH Admin - Opérations monde`).

3. **4 Cartes KPI** :
   - *Chiffre d'affaires* (284 760 €) avec sparkline violette et tendance `+12,4%`.
   - *Commandes* (1 842) avec sparkline orange et tendance `+8,1%`.
   - *Panier moyen* (154,59 €) avec sparkline violette et tendance `+3,6%`.
   - *Livraison à temps* (96,8%) avec sparkline verte et tendance `+1,2 pt`.

4. **Visualisations & Graphiques** :
   - **Évolution des commandes** : Courbe de Bézier SVG lissée avec dégradé, infobulle pinned "Aujourd'hui / 66 429 €", et sélecteur temporel interactif (7j, 14j, 30j).
   - **Canaux de vente** : Donut chart SVG interactif avec montant total au centre (`284,8 k€ TOTAL`), légende et mise en avant au survol (Web 48%, App 28%, Marketplaces 17%, Partenaires 8%).
   - **Suivi prioritaire** : Visualisation du trajet Paris → Leipzig → Londres avec nœud animé DHL et statut en direct.

5. **Gestion des commandes récentes** :
   - Tableau complet avec statuts colorés (*Expédiée*, *Livrée*, *En transit*, *À préparer*, *Contrôle*).
   - Filtrage par statut et menu d'actions par ligne.
   - Clic sur une commande pour ouvrir le tiroir modal avec détails, articles, code-barres et changement de statut.

6. **Activité en direct & Actions rapides** :
   - Flux d'événements réseau en temps réel.
   - **+ Créer une commande** : Formulaire modal avec ajout immédiat au tableau.
   - **Scanner un colis** : Viseur optique simulé avec recherche instantanée de code colis.
   - **Exporter le rapport** : Génération et téléchargement réel du fichier CSV.

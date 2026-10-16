// Tout le texte du site est ici. Modifiez librement, le design suit.

export const site = {
  name: "EnimaTech",
  tagline: "Soutien informatique pour petites entreprises",
  city: "Montréal (Québec)",
  emails: {
    info: "info@enimatech.com",
    support: "support@enimatech.com",
  },
  // Responsable de la protection des renseignements personnels (Loi 25)
  privacyOfficer: "Amine, propriétaire d'EnimaTech",
};

export const hero = {
  title: "Votre informatique, prise en charge par quelqu'un que vous connaissez.",
  lead:
    "EnimaTech s'occupe des postes, du courriel, des comptes Microsoft 365 et des noms de domaine des petites entreprises du Québec. Vous parlez toujours à la même personne, et vous savez ce qui a été fait.",
  primaryCta: "Nous écrire",
  secondaryCta: "Voir les services",
};

// Le panneau d'état du haut de page. state: "ok" | "work"
export const statusRows = [
  { label: "Postes de travail", value: "À jour", state: "ok" },
  { label: "Courriel", value: "SPF, DKIM et DMARC en place", state: "ok" },
  { label: "Sauvegardes", value: "Vérifiées cette semaine", state: "ok" },
  { label: "Nom de domaine", value: "Renouvellement suivi", state: "ok" },
  { label: "Imprimante de l'accueil", value: "Billet ouvert, en traitement", state: "work" },
] as const;

export const services = [
  {
    title: "Soutien à distance et par téléphone",
    text: "Un poste qui ralentit, un logiciel qui refuse de s'ouvrir, une imprimante capricieuse : on règle la plupart des problèmes à distance, souvent le jour même.",
  },
  {
    title: "Microsoft 365",
    text: "Création et départ d'employés, licences, Teams, SharePoint, OneDrive, authentification multifacteur. Votre locataire reste propre et documenté.",
  },
  {
    title: "Courriel et hébergement web",
    text: "Gestion de vos boîtes courriel, de votre hébergement et de vos sauvegardes de site, avec un seul interlocuteur pour tout.",
  },
  {
    title: "Noms de domaine et sécurité",
    text: "DNS, renouvellements, enregistrements SPF, DKIM et DMARC pour que vos courriels arrivent à destination et qu'on ne puisse pas usurper votre nom.",
  },
  {
    title: "Postes de travail",
    text: "Préparation de nouveaux ordinateurs, mises à jour, antivirus, transfert de données lors d'un remplacement.",
  },
  {
    title: "Conseil et planification",
    text: "Avant d'acheter ou de changer d'outil, on regarde ensemble ce dont vous avez vraiment besoin, au bon prix.",
  },
];

export const vision = {
  title: "Notre approche",
  text: [
    "Une petite entreprise n'a pas besoin d'un service informatique complet. Elle a besoin que ses outils fonctionnent, que ses données soient protégées et qu'une personne fiable réponde quand quelque chose bloque.",
    "EnimaTech a été fondée pour offrir ce niveau de soin : un accompagnement direct, des prix annoncés à l'avance et une trace écrite de chaque intervention.",
  ],
  principles: [
    {
      title: "Une seule personne",
      text: "Pas de centre d'appels. Celui qui connaît votre installation est celui qui répond.",
    },
    {
      title: "Des prix clairs",
      text: "Forfait annuel ou à l'heure, convenu par écrit avant de commencer.",
    },
    {
      title: "Tout est documenté",
      text: "Chaque intervention est consignée dans un billet. Vos accès et configurations vous appartiennent.",
    },
  ],
};

// Une vraie séquence : la numérotation a un sens ici.
export const process = [
  { title: "Premier contact", text: "Vous décrivez votre situation par courriel ou avec le formulaire." },
  { title: "Évaluation", text: "Un appel pour faire le tour de vos postes, comptes et besoins." },
  { title: "Entente", text: "Vous recevez une soumission et une convention de services à signer." },
  { title: "Soutien continu", text: "Vos demandes sont traitées par billet, avec un suivi écrit." },
];

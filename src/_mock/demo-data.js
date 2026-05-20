// In-memory demo data for portfolio / local preview (no backend required)

export const DEMO_LOGIN = {
  email: 'admin@clubselectior.com',
  password: 'demo1234',
};

export const ADMIN_PHOTO_URL = '/assets/images/avatars/admin.jpg';

let nextId = 100;

const daysAgo = (n) => new Date(Date.now() - n * 86400000).toISOString();

export const mockStore = {
  currentUser: {
    id: 1,
    name: 'Kawtar Admin',
    email: DEMO_LOGIN.email,
    photoURL: ADMIN_PHOTO_URL,
    accessToken: 'mock-jwt-token-demo',
    user: { role: 'admin' },
  },

  admins: [
    { id: 1, name: 'Kawtar Admin', email: 'admin@clubselectior.com', created_at: daysAgo(120), updated_at: daysAgo(2) },
    { id: 2, name: 'Sophie Martin', email: 'sophie.martin@clubselectior.com', created_at: daysAgo(90), updated_at: daysAgo(10) },
    { id: 3, name: 'Thomas Dubois', email: 'thomas.dubois@clubselectior.com', created_at: daysAgo(60), updated_at: daysAgo(5) },
    { id: 4, name: 'Marie Leroy', email: 'marie.leroy@clubselectior.com', created_at: daysAgo(45), updated_at: daysAgo(1) },
    { id: 5, name: 'Lucas Bernard', email: 'lucas.bernard@clubselectior.com', created_at: daysAgo(30), updated_at: daysAgo(8) },
    { id: 6, name: 'Emma Petit', email: 'emma.petit@clubselectior.com', created_at: daysAgo(15), updated_at: daysAgo(3) },
  ],

  particulars: [
    { id: 1, first_name: 'Amine', last_name: 'Benali', email: 'amine.benali@gmail.com', image: 'assets/placeholder.svg', subscription_type: 'abonnement', created_at: daysAgo(80), updated_at: daysAgo(4) },
    { id: 2, first_name: 'Claire', last_name: 'Fontaine', email: 'claire.fontaine@outlook.fr', image: 'assets/placeholder.svg', subscription_type: 'test', created_at: daysAgo(70), updated_at: daysAgo(6) },
    { id: 3, first_name: 'Julien', last_name: 'Moreau', email: 'julien.moreau@yahoo.fr', image: 'assets/placeholder.svg', subscription_type: 'abonnement', created_at: daysAgo(65), updated_at: daysAgo(2) },
    { id: 4, first_name: 'Fatima', last_name: 'El Amrani', email: 'fatima.elamrani@gmail.com', image: 'assets/placeholder.svg', subscription_type: 'none', created_at: daysAgo(55), updated_at: daysAgo(12) },
    { id: 5, first_name: 'Nicolas', last_name: 'Girard', email: 'nicolas.girard@free.fr', image: 'assets/placeholder.svg', subscription_type: 'abonnement', created_at: daysAgo(50), updated_at: daysAgo(1) },
    { id: 6, first_name: 'Léa', last_name: 'Rousseau', email: 'lea.rousseau@gmail.com', image: 'assets/placeholder.svg', subscription_type: 'test', created_at: daysAgo(40), updated_at: daysAgo(7) },
    { id: 7, first_name: 'Karim', last_name: 'Haddad', email: 'karim.haddad@hotmail.com', image: 'assets/placeholder.svg', subscription_type: 'abonnement', created_at: daysAgo(35), updated_at: daysAgo(3) },
    { id: 8, first_name: 'Camille', last_name: 'Dupont', email: 'camille.dupont@gmail.com', image: 'assets/placeholder.svg', subscription_type: 'none', created_at: daysAgo(20), updated_at: daysAgo(9) },
  ],

  professionals: [
    { id: 1, num_siret: '123 456 789 0001', company_name: 'FitClub Paris', email: 'contact@fitclub-paris.fr', phone: '+33 1 42 00 00 01', city: 'Paris', country: 'France', postal_code: '75011', adr_p: '12 Rue de la Roquette', adr_c: 'Bâtiment A', image: 'assets/placeholder.svg', subscription_type: 'abonnement', created_at: daysAgo(100), updated_at: daysAgo(3) },
    { id: 2, num_siret: '234 567 890 0002', company_name: 'Zen Spa Lyon', email: 'info@zenspa-lyon.fr', phone: '+33 4 78 00 00 02', city: 'Lyon', country: 'France', postal_code: '69002', adr_p: '45 Cours Charlemagne', adr_c: '', image: 'assets/placeholder.svg', subscription_type: 'test', created_at: daysAgo(85), updated_at: daysAgo(5) },
    { id: 3, num_siret: '345 678 901 0003', company_name: 'Bio Market Marseille', email: 'hello@biomarket-mrs.fr', phone: '+33 4 91 00 00 03', city: 'Marseille', country: 'France', postal_code: '13001', adr_p: '8 La Canebière', adr_c: 'Étage 2', image: 'assets/placeholder.svg', subscription_type: 'abonnement', created_at: daysAgo(75), updated_at: daysAgo(1) },
    { id: 4, num_siret: '456 789 012 0004', company_name: 'Style Coiffure Bordeaux', email: 'rdv@stylecoiffure.fr', phone: '+33 5 56 00 00 04', city: 'Bordeaux', country: 'France', postal_code: '33000', adr_p: '3 Place de la Bourse', adr_c: '', image: 'assets/placeholder.svg', subscription_type: 'none', created_at: daysAgo(60), updated_at: daysAgo(14) },
    { id: 5, num_siret: '567 890 123 0005', company_name: 'Tech Repair Nantes', email: 'support@techrepair-nantes.fr', phone: '+33 2 40 00 00 05', city: 'Nantes', country: 'France', postal_code: '44000', adr_p: '17 Quai de la Fosse', adr_c: 'Local 3', image: 'assets/placeholder.svg', subscription_type: 'abonnement', created_at: daysAgo(45), updated_at: daysAgo(2) },
    { id: 6, num_siret: '678 901 234 0006', company_name: 'Café du Centre Lille', email: 'contact@cafeducentre-lille.fr', phone: '+33 3 20 00 00 06', city: 'Lille', country: 'France', postal_code: '59000', adr_p: '22 Rue Faidherbe', adr_c: '', image: 'assets/placeholder.svg', subscription_type: 'test', created_at: daysAgo(30), updated_at: daysAgo(6) },
    { id: 7, num_siret: '789 012 345 0007', company_name: 'Auto Prestige Toulouse', email: 'garage@autoprestige-tls.fr', phone: '+33 5 61 00 00 07', city: 'Toulouse', country: 'France', postal_code: '31000', adr_p: '5 Allée Jean Jaurès', adr_c: 'Zone B', image: 'assets/placeholder.svg', subscription_type: 'abonnement', created_at: daysAgo(25), updated_at: daysAgo(4) },
  ],

  promoCodes: [
    { id: 1, code: 'WELCOME20', price: 20, for_pro: 0, start_date: '2024-01-01', end_date: '2024-12-31', created_at: daysAgo(200), updated_at: daysAgo(10) },
    { id: 2, code: 'PRO50', price: 50, for_pro: 1, start_date: '2024-03-01', end_date: '2024-09-30', created_at: daysAgo(150), updated_at: daysAgo(5) },
    { id: 3, code: 'SUMMER15', price: 15, for_pro: 0, start_date: '2024-06-01', end_date: '2024-08-31', created_at: daysAgo(100), updated_at: daysAgo(2) },
    { id: 4, code: 'VIP100', price: 100, for_pro: 1, start_date: '2024-01-15', end_date: '2024-06-15', created_at: daysAgo(80), updated_at: daysAgo(20) },
    { id: 5, code: 'NEWUSER10', price: 10, for_pro: 0, start_date: '2024-02-01', end_date: '2025-02-01', created_at: daysAgo(60), updated_at: daysAgo(1) },
  ],

  topVisitedStores: [
    { company_name: 'FitClub Paris', visit_count: 1240 },
    { company_name: 'Bio Market Marseille', visit_count: 980 },
    { company_name: 'Zen Spa Lyon', visit_count: 875 },
    { company_name: 'Tech Repair Nantes', visit_count: 720 },
    { company_name: 'Auto Prestige Toulouse', visit_count: 650 },
    { company_name: 'Café du Centre Lille', visit_count: 540 },
    { company_name: 'Style Coiffure Bordeaux', visit_count: 410 },
  ],

  topRecommended: [
    { company_name: 'FitClub Paris', recommendation_count: 89 },
    { company_name: 'Bio Market Marseille', recommendation_count: 72 },
    { company_name: 'Zen Spa Lyon', recommendation_count: 65 },
    { company_name: 'Tech Repair Nantes', recommendation_count: 48 },
    { company_name: 'Auto Prestige Toulouse', recommendation_count: 41 },
  ],
};

export function createId() {
  nextId += 1;
  return nextId;
}

export function buildUserResponse(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    photoURL: user.photoURL || ADMIN_PHOTO_URL,
    accessToken: mockStore.currentUser.accessToken,
    user: { role: 'admin' },
  };
}

export const mockDelay = (ms = 250) => new Promise((resolve) => { setTimeout(resolve, ms); });

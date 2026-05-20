/* eslint-disable class-methods-use-this */
import {
  createId,
  mockDelay,
  mockStore,
  DEMO_LOGIN,
  buildUserResponse,
} from 'src/_mock/demo-data';

// ----------------------------------------------------------------------

export default class MockApi {
  async Login(admin) {
    await mockDelay();

    if (admin.email !== DEMO_LOGIN.email) {
      return { email: 'Email incorrect' };
    }
    if (admin.password !== DEMO_LOGIN.password) {
      return { password: 'Mot de passe incorrect' };
    }

    return {
      status: true,
      user: buildUserResponse(mockStore.currentUser),
    };
  }

  async getAllAdmins() {
    await mockDelay();
    return { admins: [...mockStore.admins] };
  }

  async ModifierUser(user, id) {
    await mockDelay();
    const admin = mockStore.admins.find((a) => a.id === id);
    if (!admin) return { status: false, email: 'Utilisateur introuvable' };

    if (user.name) admin.name = user.name;
    if (user.email) admin.email = user.email;
    admin.updated_at = new Date().toISOString();

    if (id === mockStore.currentUser.id) {
      mockStore.currentUser.name = admin.name;
      mockStore.currentUser.email = admin.email;
    }

    return {
      status: true,
      message: 'Profil mis à jour avec succès',
      user: buildUserResponse(mockStore.currentUser),
    };
  }

  async ModifierMDP(user, id) {
    await mockDelay();
    if (user.oldPassword !== DEMO_LOGIN.password) {
      return { oldPassword: 'Ancien mot de passe incorrect' };
    }
    return {
      status: true,
      message: 'Mot de passe modifié avec succès',
      user: buildUserResponse(mockStore.currentUser),
    };
  }

  async AjouterUser(user) {
    await mockDelay();
    const exists = mockStore.admins.some((a) => a.email === user.email);
    if (exists) return { email: 'Cet email est déjà utilisé' };

    mockStore.admins.push({
      id: createId(),
      name: user.name,
      email: user.email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return { status: true, message: 'Administrateur ajouté avec succès' };
  }

  async ModifierAdmin(user, id) {
    await mockDelay();
    const admin = mockStore.admins.find((a) => a.id === id);
    if (!admin) return { status: false };

    if (user.name) admin.name = user.name;
    if (user.email) admin.email = user.email;
    admin.updated_at = new Date().toISOString();

    return { status: true, message: 'Administrateur modifié avec succès' };
  }

  async SupprimerAdmin(id) {
    await mockDelay();
    mockStore.admins = mockStore.admins.filter((a) => a.id !== id);
    return { status: true, message: 'Administrateur supprimé' };
  }

  async SupprimerAdmins(ids) {
    await mockDelay();
    mockStore.admins = mockStore.admins.filter((a) => !ids.includes(a.id));
    return { status: true, message: 'Administrateurs supprimés' };
  }

  async getAllParticular() {
    await mockDelay();
    return [...mockStore.particulars];
  }

  async AjouterParticuler(user) {
    await mockDelay();
    const exists = mockStore.particulars.some((p) => p.email === user.email);
    if (exists) return { email: 'Cet email est déjà utilisé' };

    mockStore.particulars.push({
      id: createId(),
      first_name: user.fname,
      last_name: user.lname,
      email: user.email,
      image: 'assets/placeholder.svg',
      subscription_type: 'none',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return { status: true, message: 'Particulier ajouté avec succès' };
  }

  async ModifierParticular(user, id) {
    await mockDelay();
    const particular = mockStore.particulars.find((p) => p.id === id);
    if (!particular) return { status: false };

    Object.assign(particular, {
      ...(user.first_name && { first_name: user.first_name }),
      ...(user.last_name && { last_name: user.last_name }),
      ...(user.email && { email: user.email }),
      updated_at: new Date().toISOString(),
    });

    return { status: true, message: 'Particulier modifié avec succès' };
  }

  async SupprimerParticulier(id) {
    await mockDelay();
    mockStore.particulars = mockStore.particulars.filter((p) => p.id !== id);
    return { status: true, message: 'Particulier supprimé' };
  }

  async SupprimerParticuliers(ids) {
    await mockDelay();
    mockStore.particulars = mockStore.particulars.filter((p) => !ids.includes(p.id));
    return { status: true, message: 'Particuliers supprimés' };
  }

  async getSubscribedParticulars() {
    await mockDelay();
    const total = mockStore.particulars.length;
    const subscribed = mockStore.particulars.filter((p) => p.subscription_type === 'abonnement').length;
    const test = mockStore.particulars.filter((p) => p.subscription_type === 'test').length;

    return {
      statistics: {
        total_particulars: total,
        total_subscribed_particulars: subscribed,
        total_test_subscribed_particulars: test,
      },
    };
  }

  async getAllProfessional() {
    await mockDelay();
    return [...mockStore.professionals];
  }

  async AjouterProfessionnel(user) {
    await mockDelay();
    const exists = mockStore.professionals.some((p) => p.email === user.email);
    if (exists) return { email: 'Cet email est déjà utilisé' };

    mockStore.professionals.push({
      id: createId(),
      num_siret: user.num_siret,
      company_name: user.company_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      country: user.country,
      postal_code: user.postal_code,
      adr_p: user.adr_p,
      adr_c: user.adr_c || '',
      image: 'assets/placeholder.svg',
      subscription_type: 'none',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return { status: true, message: 'Professionnel ajouté avec succès' };
  }

  async ModifierProfessionnel(user, id) {
    await mockDelay();
    const pro = mockStore.professionals.find((p) => p.id === id);
    if (!pro) return { status: false };

    Object.assign(pro, {
      ...(user.num_siret && { num_siret: user.num_siret }),
      ...(user.company_name && { company_name: user.company_name }),
      ...(user.email && { email: user.email }),
      ...(user.phone && { phone: user.phone }),
      ...(user.city && { city: user.city }),
      ...(user.country && { country: user.country }),
      ...(user.postal_code && { postal_code: user.postal_code }),
      ...(user.adr_p && { adr_p: user.adr_p }),
      ...(user.adr_c && { adr_c: user.adr_c }),
      updated_at: new Date().toISOString(),
    });

    return { status: true, message: 'Professionnel modifié avec succès' };
  }

  async SupprimerProfessionnel(id) {
    await mockDelay();
    mockStore.professionals = mockStore.professionals.filter((p) => p.id !== id);
    return { status: true, message: 'Professionnel supprimé' };
  }

  async SupprimerProfessionnels(ids) {
    await mockDelay();
    mockStore.professionals = mockStore.professionals.filter((p) => !ids.includes(p.id));
    return { status: true, message: 'Professionnels supprimés' };
  }

  async getSubscribedprofessionals() {
    await mockDelay();
    const total = mockStore.professionals.length;
    const subscribed = mockStore.professionals.filter((p) => p.subscription_type === 'abonnement').length;
    const test = mockStore.professionals.filter((p) => p.subscription_type === 'test').length;

    return {
      statistics: {
        total_pros: total,
        total_subscribed_pros: subscribed,
        total_test_subscribed_pros: test,
      },
    };
  }

  async getStoresStatistics() {
    await mockDelay();
    return { statistics: { total_stores: 42 } };
  }

  async getOffresStatistics() {
    await mockDelay();
    return { statistics: { total_offres: 156 } };
  }

  async getTopVisitedStores() {
    await mockDelay();
    return { top_visited_stores: [...mockStore.topVisitedStores] };
  }

  async getTopRecommendedCompanies() {
    await mockDelay();
    return { top_recommended_companies: [...mockStore.topRecommended] };
  }

  async getAllPromoCode() {
    await mockDelay();
    return [...mockStore.promoCodes];
  }

  async AjouterCodePromo(CPromo) {
    await mockDelay();
    const exists = mockStore.promoCodes.some((c) => c.code === CPromo.code);
    if (exists) return { code: 'Ce code promo existe déjà' };

    mockStore.promoCodes.push({
      id: createId(),
      code: CPromo.code,
      price: Number(CPromo.price),
      for_pro: Number(CPromo.for_pro),
      start_date: CPromo.start_date,
      end_date: CPromo.end_date,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return { status: true, message: 'Code promo ajouté avec succès' };
  }

  async ModifierCodePromo(CPromo, id) {
    await mockDelay();
    const promo = mockStore.promoCodes.find((c) => c.id === id);
    if (!promo) return { status: false };

    Object.assign(promo, {
      ...(CPromo.code && { code: CPromo.code }),
      ...(CPromo.price && { price: Number(CPromo.price) }),
      ...(CPromo.for_pro !== undefined && { for_pro: Number(CPromo.for_pro) }),
      ...(CPromo.start_date && { start_date: CPromo.start_date }),
      ...(CPromo.end_date && { end_date: CPromo.end_date }),
      updated_at: new Date().toISOString(),
    });

    return { status: true, message: 'Code promo modifié avec succès' };
  }

  async SupprimerCodePromo(id) {
    await mockDelay();
    mockStore.promoCodes = mockStore.promoCodes.filter((c) => c.id !== id);
    return { status: true, message: 'Code promo supprimé' };
  }

  async SupprimerCodesPromo(ids) {
    await mockDelay();
    mockStore.promoCodes = mockStore.promoCodes.filter((c) => !ids.includes(c.id));
    return { status: true, message: 'Codes promo supprimés' };
  }
}

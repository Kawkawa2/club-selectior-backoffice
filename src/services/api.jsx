/* eslint-disable class-methods-use-this */
import axios from 'axios';

class Api {
    // /****************Login *****************/
    async Login(admin) {
      const  res = await axios.post(`${base}/admin/login`,admin);
       return res.data;
    }

    // /****************API Users-Admin *****************/
    
    // get all admins
    async getAllAdmins() {
      const  res = await axios.get(`${base}/admins`);
      return res.data;
    }

    // Update profile info --name && email
    async ModifierUser(user,id) {
      const formData = new FormData();
      if(user.name)
          formData.append("name", user.name);
      if(user.email)
          formData.append("email", user.email);
         
      const res = await axios.post(`${base}/admin/update/${id}`,formData)
          return res.data;
    }

    // Update profile info -- password
    async ModifierMDP(user,id) {
      const formData = new FormData();
      formData.append("oldPassword", user.oldPassword);
      formData.append("password", user.password);
         
      const res = await axios.post(`${base}/admin/updatePassword/${id}`,formData)
          return res.data;
    }
    
    // added new  admin 
    async AjouterUser(user) {
      const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("password", user.password);
        
      const res = await axios.post(`${base}/admin/register`,formData)
          return res.data;
    }
    
    // Update admin  user info
    async ModifierAdmin(user,id) {
      const formData = new FormData();
      if(user.name)
          formData.append("name", user.name);
      if(user.email)
          formData.append("email", user.email);
      if(user.password)
          formData.append("password", user.password);
      formData.append("updated_at", new Date().toISOString());

      const res = await axios.post(`${base}/admin/updateAdmin/${id}`,formData)
          return res.data;
    }

    // delete an  admin
    async SupprimerAdmin(id) {
      const  res = await axios.post(`${base}/admin/delete/${id}`);
      return res.data;
    }

    // delete admins
    async SupprimerAdmins(ids) {
      const  res = await axios.post(`${base}/admin/delete/${ids}`);
      return res.data;
    }
   
    // /****************API Users-particulars *****************/

    // get all particulars 
    async getAllParticular() {
      const  res = await axios.get(`${base}/particulars`);
      return res.data;
    }

    // added new  particular 
    async AjouterParticuler(user) {
      const formData = new FormData();
        formData.append("first_name", user.fname);
        formData.append("last_name", user.lname);
        formData.append("email", user.email);
        formData.append("password", user.password);
        if(user.image)
          formData.append("image", user.image);
        
      const res = await axios.post(`${base}/particular/register`,formData
        , {
        headers: {
          "Content-Type": "multipart/form-data"
          }
        }
      );
      return res.data;
    }

    // Update particular   info
    async ModifierParticular(user,id) {
      const formData = new FormData();
      if(user.first_name)
          formData.append("first_name", user.first_name);
      if(user.last_name)
          formData.append("last_name", user.last_name);
      if(user.email)
          formData.append("email", user.email);
      if(user.password)
          formData.append("password", user.password);
      if(user.image)
          formData.append("image", user.image);
      formData.append("updated_at", new Date().toISOString());

      const res = await axios.post(`${base}/particular/${id}`,formData
      , {
        headers: {
          "Content-Type": "multipart/form-data"
          }
        }
      )
          return res.data;
    }

    // delete a particular
    async SupprimerParticulier(id) {
      const  res = await axios.post(`${base}/particular/delete/${id}`);
      return res.data;
    }

    // get all subscribed particulars 
    async getSubscribedParticulars() {
      const  res = await axios.get(`${base}/particulars/subscribed`);
      return res.data;
    }

    // /****************API Users-professionals *****************/
    // get all proffessional 
    async getAllProfessional() {
      const  res = await axios.get(`${base}/professionals`);
      return res.data;
    }

    // added new  proffessional 
    async AjouterProfessionnel(user) {
      const formData = new FormData();
        formData.append("num_siret", user.num_siret);
        formData.append("company_name", user.company_name);
        formData.append("email", user.email);
        formData.append("phone", user.phone);
        formData.append("password", user.password);
        formData.append("city", user.city);
        formData.append("country", user.country);
        formData.append("postal_code", user.postal_code);
        formData.append("adr_p", user.adr_p);
        formData.append("adr_c", user.adr_c);
        if(user.image)
          formData.append("image", user.image);
        
      const res = await axios.post(`${base}/pro/register`,formData
        , {
        headers: {
          "Content-Type": "multipart/form-data"
          }
        }
      );
      return res.data;
    }

    // Update proffessional   info
    async ModifierProfessionnel(user,id) {
      const formData = new FormData();
      if(user.num_siret)
          formData.append("num_siret", user.num_siret);
      if(user.company_name)
          formData.append("company_name", user.company_name);
      if(user.email)
          formData.append("email", user.email);
      if(user.password)
          formData.append("password", user.password);
      if(user.phone)
          formData.append("phone", user.phone);
      if(user.city)
          formData.append("city", user.city);
      if(user.country)
          formData.append("country", user.country);
      if(user.postal_code)
          formData.append("postal_code", user.postal_code);
      if(user.adr_p)
          formData.append("adr_p", user.adr_p);
      if(user.adr_c)
          formData.append("adr_c", user.adr_c);
      if(user.image)
          formData.append("image", user.image);
      formData.append("updated_at", new Date().toISOString());

      const res = await axios.post(`${base}/pro/${id}`,formData
      , {
        headers: {
          "Content-Type": "multipart/form-data"
          }
        }
      )
          return res.data;
    }

    // delete a proffessional
    async SupprimerProfessionnel(id) {
      const  res = await axios.post(`${base}/pro/delete/${id}`);
      return res.data;
    }

    // get all subscribed proffessionals 
    async getSubscribedprofessionals() {
      const  res = await axios.get(`${base}/professionals/subscribed`);
      return res.data;
    }

    // get all subscribed proffessionals 
    async getStoresStatistics() {
      const  res = await axios.get(`${base}/professionals/stores`);
        return res.data;
    }

    // get all subscribed proffessionals 
    async getOffresStatistics() {
      const  res = await axios.get(`${base}/professionals/offres`);
        return res.data;
    }

    // get top visited  stores 
    async getTopVisitedStores() {
      const  res = await axios.get(`${base}/professionals/top-stores`);
      return res.data;
    }

    // get all subscribed proffessionals 
    async getTopRecommendedCompanies() {
      const  res = await axios.get(`${base}/professionals/top-recommended`);
      return res.data;
    }

    // /****************API Promo-code *****************/
    // get all promo codes 
    async getAllPromoCode() {
      const  res = await axios.get(`${base}/promo-codes`);
      return res.data;
    }

    // added new  promo code 
    async AjouterCodePromo(CPromo) {
      const formData = new FormData();
        formData.append("code", CPromo.code);
        formData.append("price", CPromo.price);
        formData.append("for_pro", CPromo.for_pro);
        
      const res = await axios.post(`${base}/promo-code`,formData);
      return res.data;
    }

    // Update  promo code
    async ModifierCodePromo(CPromo,id) {
      const formData = new FormData();
      if(CPromo.code)
          formData.append("code", CPromo.code);
      if(CPromo.price)
          formData.append("price", CPromo.price);
      if(CPromo.for_pro)
          formData.append("for_pro", CPromo.for_pro);
     
      formData.append("updated_at", new Date().toISOString());

      const res = await axios.post(`${base}/promo-code/update/${id}`,formData)
      return res.data;
    }

    // delete a proffessional
    async SupprimerCodePromo(id) {
      const  res = await axios.post(`${base}/promo-code/delete/${id}`);
      return res.data;
    }

    // /****************API statistics *****************/
    
}
const base = import.meta.env.VITE_APP_BACKEND_API_URL;
export default Api;

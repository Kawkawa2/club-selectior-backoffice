/* eslint-disable class-methods-use-this */
import axios from 'axios';

class Api {
    // /****************Login *****************/
    async Login(admin) {
      const  res = await axios.post(`${base}/admin/login`,admin);
       return res.data;
    }
   
    // /****************API Users-particulars *****************/
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

      const res = await axios.post(`${base}/particulars/${id}`,formData
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

    // /****************API Users-professionals *****************/
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

      const res = await axios.post(`${base}/pros/${id}`,formData
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

    // /****************API Users-Admin *****************/
    
    // get all admins
    async getAllAdmins() {
      const  res = await axios.get(`${base}/admins`);
      return res.data;
    }

    // Update admin  user info
    async ModifierUser(user,id) {
      const formData = new FormData();
      if(user.name)
          formData.append("name", user.name);
      if(user.email)
          formData.append("email", user.email);
         
      const res = await axios.post(`${base}/admin/update/${id}`,formData)
          return res.data;
    }

    // Update profile info
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

    // supprimer un admin
    async SupprimerAdmin(id) {
      const  res = await axios.post(`${base}/admin/delete/${id}`);
      return res.data;
    }

    // supprimer des admin
    async SupprimerAdmins(ids) {
      const  res = await axios.post(`${base}/admin/delete/${ids}`);
      return res.data;
    }
           

    //          async AjoutOrga(organisateur) {
              
    //            const res = await axios.post(`${base}/signup`,organisateur);
    //             return res.data;
    //             }
    //             async AjoutImage(user,id) {
    //               const formData = new FormData();
    //               formData.append("image", user.image);
    //               const res = await axios.post(`${base}/updateUserImage/${id}`,formData
    //               , {
    //               headers: {
    //                       "Content-Type": "multipart/form-data"
    //                     }
    //                   }
    //                   );
    //                 return res.data;
    //               }
               
        
    //       async SupprimerUser(id) {
    //         const res = await axios.delete(`${base}/user/${id}`);
    //             return res.data;
    //             }
              
    //     UrlImage =()=>{
    //     return images;
    //     }
}
const base = import.meta.env.VITE_APP_BACKEND_API_URL;
export default Api;

/* eslint-disable class-methods-use-this */
import axios from 'axios';

class Api {
    // /****************Login *****************/
    async Login(admin) {
      const  res = await axios.post(`${base}/admin/login`,admin);
       return res.data;
    }
   
    // /****************API Users-particulars/professionals *****************/
    async getAllParticular() {
      const  res = await axios.get(`${base}/particulars`);
      return res.data;
    }

    async getAllProfessional() {
      const  res = await axios.get(`${base}/professionals`);
      return res.data;
    }

    // /****************API Users-Admin *****************/
    
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

    // Update admin  user info
    async ModifierMDP(user,id) {
      const formData = new FormData();
      formData.append("oldPassword", user.oldPassword);
      formData.append("password", user.password);
         
      const res = await axios.post(`${base}/admin/updatePassword/${id}`,formData)
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

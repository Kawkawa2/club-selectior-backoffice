/* eslint-disable class-methods-use-this */
import axios from 'axios';

class Api {
    // /****************Login *****************/
    async Login(admin) {
      const  res = await axios.post(`${base}/admin/login`,admin);
       return res.data;
    }
   
    // /****************API Users-partuclars/professionals *****************/
    async getAllParticular() {
      const  res = await axios.get(`${base}/particulars`);
      return res.data;
    }

    async getAllProfessional() {
      const  res = await axios.get(`${base}/professionals`);
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
               
        
    //          async ModifierUser(user,id) {
    //           const formData = new FormData();
    //               if(user.name)
    //               formData.append("name", user.name);
    //               if(user.prename)
    //               formData.append("prename", user.prename);
    //               if(user.age)
    //               formData.append("age", user.age);
    //               if(user.email)
    //               formData.append("email", user.email);
    //               if(user.phone)
    //               formData.append("phone", user.phone);
    //               if(user.password)
    //               formData.append("password", user.password);
    //               if(user.citie_id)
    //               formData.append("citie_id", user.citie_id);
    //               if(user.image)
    //               formData.append("image", user.image);
    //              console.log(user.image);
    //               const res = await axios.post(`${base}/updateUser/${id}`,formData
    //                   , {
    //                   headers: {
    //                           "Content-Type": "multipart/form-data"
    //                         }
    //                       }
    //                       );
    //                     return res.data;
    //                   }
    //       async SupprimerUser(id) {
    //         const res = await axios.delete(`${base}/user/${id}`);
    //             return res.data;
    //             }
              
    //     UrlImage =()=>{
    //     return images;
    //     }
}
const base = import.meta.env.VITE_APP_BACKEND_API_URL;
// console.log('base',base);      
// const images =process.env.REACT_APP_BACKEND_API_URL_Image;


export default Api;

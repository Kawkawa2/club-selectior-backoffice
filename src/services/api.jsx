/* eslint-disable class-methods-use-this */
import axios from 'axios';

class Api {
    // /****************Login *****************/
    async Login(admin) {
      const  res = await axios.post(`https://selectior.fr/api/admin/login`,admin);
       return res.data;
    }
    //  /****************API Notes *****************/
    //   async getNotes() {
    //     const  res = await axios.get(`${base}/notes`);
    //     return res.data;
    //       }
          
    //   async SupprimerNote(id) {
    //     const res = await axios.delete(`${base}/note/${id}`);
    //     return res.data;
    //     }
          

    // /****************API Cities *****************/
    // async getCities() {
    // const  res = await axios.get(`${base}/All_Cities`);
    //  return res.data;
    //   }
    //   async AjoutCitie(City) {
    //   const formData = new FormData();
    //   formData.append("name", City.name);
    //   formData.append("image", City.image);
    //   const res = await axios.post(`${base}/citie`,formData, {
    //    headers: {
    //           "Content-Type": "multipart/form-data"
    //         }
    //       });
    //     return res.data;
    //   }
    
    //   async ModifierCitie(City,id) {
    //     const formData = new FormData();
    //     formData.append("name", City.name);
    //     if(City.image)
    //     formData.append("image", City.image);
    //     const res = await axios.post(`${base}/citie/${id}`,formData
    //     , {
    //      headers: {
    //             "Content-Type": "multipart/form-data"
    //           }
    //         }
    //         );
    //       return res.data;
    //     }

    //   async SupprimerCitie(id) {
    //     const res = await axios.delete(`${base}/citie/${id}`);
    //     return res.data;
    //    }

    //  /****************API Terrains *****************/
    //  async getTerains() {
    //     const  res = await axios.get(`${base}/All_Terrains`);
    //     return res.data;
    //     }
    //  async AjoutTerain(terain) {
    //        const res = await axios.post(`${base}/Terrain`,terain, {
    //         });
    //           return res.data;
    //         }
    //     async AjoutTerrainImage(terr,id) {
    //           const formData = new FormData();
    //           formData.append("image", terr.image);
    //           const res = await axios.post(`${base}/updateTerrainImage/${id}`,formData
    //           , {
    //           headers: {
    //                   "Content-Type": "multipart/form-data"
    //                 }
    //               }
    //               );
    //             return res.data;
    //       }

    // async SupprimerTerain(id) {
    //     const res = await axios.delete(`${base}/Terrain/${id}`);
    //       return res.data;
    //       }

    //     async ModifierTerrain(terain,id) {
    //       console.log(terain);
    //     const formData = new FormData();
    //      formData.append("name", terain.name);
    //      if(terain.citie_id)
    //      formData.append("citie_id", terain.citie_id);
    //      if(terain.image)
    //     formData.append("image", terain.image);
    //     if(terain.address)
    //     formData.append("address", terain.address);
    //         const res = await axios.post(`${base}/Terrain/${id}`,formData
    //         , {
    //          headers: {
    //                 "Content-Type": "multipart/form-data"
    //               }
    //             }
    //             );
    //           return res.data;
    //         }


    //    /****************API Matchs  *****************/
    //     async getMatchsCount(){
    //         const res = await axios.get(`${base}/matchesCount`);
    //         return res.data;
          
    //     };
    //     async getMatchs(perpage = 10, page = 1) {
    //       const res = await axios.get(`${base}/matches?perpage=${perpage}&page=${page}`);
    //       return res.data;
    //     }
      
    //     async AjoutMatch(matche) {

    //       const formData = new FormData();
    //         formData.append("date_start", matche.date_start);
    //         formData.append("date_end", matche.date_end);
    //         formData.append("jour", matche.jour);
    //         formData.append("Terrain_id", matche.Terrain_id);
    //         formData.append("organisateur_id", matche.organisateur_id);

    //         const res = await axios.post(`${base}/matche`,formData, {
    //           headers: {
    //               "Content-Type": "multipart/form-data"
    //                 }
    //               })
                
    //               return res;
              

    //     }

    //     async SupprimerMatch(id) {
    //       const res = await axios.delete(`${base}/matche/${id}`);
    //         return res.data;
    //     }


    //     async ModifierMatch(matche,id) {
    //           const formData = new FormData();
    //           if(matche.date_start)
    //             formData.append("date_start", matche.date_start);
    //           if(matche.date_end)
    //             formData.append("date_end", matche.date_end);
    //           if(matche.Terrain_id)
    //             formData.append("Terrain_id", matche.Terrain_id);
    //           if(matche.organisateur_id)
    //             formData.append("organisateur_id", matche.organisateur_id);
    //           if(matche.jour)
    //             formData.append("jour", matche.jour);
    //           const res = await axios.post(`${base}/matche/${id}`,formData
    //               , {
    //               headers: {
    //                       "Content-Type": "multipart/form-data"
    //                     }
    //                   }
    //                   );
    //                 return res;
    //       }

    //       /****************API Users *****************/
    //        async getOrganisateurs() {
    //         const  res = await axios.get(`${base}/Organisateurs`);
    //           return res.data;
    //          }
    //          async getInscriptions() {
    //           const  res = await axios.get(`${base}/joeurs`);
    //             return res.data;
    //            }
           

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
// const base = process.env.REACT_APP_BACKEND_API_URL; 
// console.log('base',base);      
// const images =process.env.REACT_APP_BACKEND_API_URL_Image;


export default Api;

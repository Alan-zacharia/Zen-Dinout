import axios from "../api/axios";
axios.defaults.withCredentials = true;

export const axiosGetUser = async()=>{
    try{
        const {data : {users , message}} = await axios.get("/admin/users-list");
         console.log({users , message}) 
          return { users , message};
    }catch(error : any){
        console.log(error.message); 
        throw error;
    }
};
export const axiosActionsUser = async(id : string , block : boolean)=>{
    try{
        const {data : {users , message}} = await axios.put(`/admin/user-actions/${id}/${block}`);
         console.log({users , message})
          return { users , message};
    }catch(error : any){
        console.log(error.message); 
        throw error;
    }
};
export const validateToken_admin = async()=>{

        const response = await axios.get(`/admin/validate-token`);
        if(response.status !== 200){
           throw new Error("Token invalid");
        }
        return response
  
};

export const adminLogout = async()=>{
    const response = await axios.post("/admin/logout");
    if (response.status !== 200) {
      throw new Error("Error during sign out...");
    }
};

// /**
//  * Function for admin login
//  * @param data - Object containing email and password for login
//  * @returns Promise that resolves to an object containing the logged-in  admin , mesage , jwt, or null if login fails
//  */
// const adminLogin = async (data: Partial<credentials>): Promise<APIresponse> => {
//     try {
//       const {
//         data: { message, user, token },
//       } = await axios.post("/admin/login", data);
//       return { data: { message, user, token } };
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   };

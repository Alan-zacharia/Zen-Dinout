import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.baseURL = API_BASE_URL;

export interface credentials {
  restaurantName: string;
  email: string;
  contact: string;
  address: string;
  description: string;
  openingTime: string;
  closingTime: string;
  TableRate: string;
  featuredImage: string;
  secondaryImages: string;
}

export const sellerRegisteration = async (datas : credentials )=>{
     try{
       const {data : { success , message}} = await axios.post('/restaurant/restaurant-regiseteration',{datas});
       return {data :{success , message}}
      } catch (error) {
        console.log(error);
        throw error;
      }
}

export const validateToken = async () => {
    const response = await axios.get("/restaurant/validate-token");
    console.log(response.data); 
    if (response.status !== 200) {
      throw new Error("Token invalid");
    }
    return response;
  }; 

export const Logout = async () => {
  const response = await axios.post("/restaurant/logout");
  if (response.status !== 200) {
    throw new Error("Error during sign out...");
  }
  };


export const imageCloudUpload = async (Image : string) =>{
     const formData = new FormData();
      formData.append("file", Image);
      formData.append("upload_preset", "xkitcf7p");
      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dneezqmgu/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        if (res.ok) {
          const data = await res.json();
          return data.secure_url
        } else {
          console.error("Upload failed:", res.statusText);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }

      
}

export const sellerLogin = async (data: Partial<credentials>) => {
  try {
    const {
      data: { message, user, token },
    } = await axios.post("/restaurant/restaurant-login", data);
    return { data: { message, user, token } };
  } catch (error) {
    console.log(error); 
    throw error;
  }
};
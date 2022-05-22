import axios from "axios";


const { REACT_APP_ENVIRONMENT } = process.env;

export default async function callApi(
   endpoint,
   method,
   payload,
   options,
) {

   const res = await axios({
      method: 'get',
      url: `https://cofefu.ru${REACT_APP_ENVIRONMENT || ''}/${endpoint}`,
      responseType: 'json',
      
   })
      .then(res => {
         return res.data
      });

   return await res;
}

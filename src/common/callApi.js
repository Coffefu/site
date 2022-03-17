import axios from "axios";

export default async function callApi(
   endpoint,
   method,
   payload,
   options,
) {
   const config = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      }
   };

   const res = await axios({
      method: 'get',
      url: endpoint,
      responseType: 'json',


   })
      .then(res => {
         return res.data
      });

   return await res;
}

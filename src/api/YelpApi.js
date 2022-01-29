import queryString from 'query-string';
import { axiosInstance } from '../config';
const BASE_URL = "https://click-to-eat2.herokuapp.com/"

export default function getYelpData(queryParams) {
    const query = queryString.stringify(queryParams)       
    return fetch(`${BASE_URL}api?${query}`);  
   console.debug("API CALL:", query)
}



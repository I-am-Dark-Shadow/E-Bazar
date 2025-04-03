import Axios from "./Axios";

import SummaryApi from "../common/SummaryApi.js";


// fetch user details api
const fetchUserDetails = async () => {
    try {

        // x_x
        // this is for sending token with every request except login apis
        const response = await Axios({
            ...SummaryApi.userDetails
        })

        return response.data



    } catch (error) {
        console.log(error);
        
    }
}

export default fetchUserDetails

import SummaryApi from "../common/SummaryApi"
import Axios from "../utils/axios"

// for uploading image anywhere
const uploadImage = async (iamge) => {
    try {
        // create form data 
        const formData = new FormData()
        // append iamge to formData 
        formData.append("image", iamge)

        // upload image 
        const response = await Axios({
            ...SummaryApi.uploadImage,
            data: formData
        })

        // return image url
        return response
    } catch (error) {
        return error
    }
}

export default uploadImage
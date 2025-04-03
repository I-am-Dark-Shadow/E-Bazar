import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true // because we use cookie if you dont use withCredentials then your browser dont send cookie
})

Axios.interceptors.request.use(
    async (config) => {
        // this is for sending token with every request except login and register apis
        // x_x
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config

    }, (error) => {
        return Promise.reject(error) // reject the Promise with the error message
    })


// if access token is expired then we need to refresh token
// or extend the life span of access token with the help of refresh token
// x_x
Axios.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        let originalRequest = error.config // this is for getting the original request that was sent before the error occurred

        // if access token is expired then we need to refresh token
        if (error.response.status === 401 && !originalRequest.retry) {
            originalRequest.retry = true // this is for retrying the request with the new access token

            const refreshToken = localStorage.getItem("refreshToken") // get refresh token from local storage

            // if refresh token is present then refresh access token
            if (refreshToken) {
                const newAccessToken = await refreshAccessToken(refreshToken) // refresh access token

                if (newAccessToken) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}` // this is for sending new access token
                    return Axios(originalRequest) // return the original request with the new access token
                }
            }
        }

        return Promise.reject(error) // reject the Promise with the error message
    })

// refresh access token controller
// x_x
const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await Axios({
            ...SummaryApi.refreshToken,
            headers: {
                Authorization: `Bearer ${refreshToken}` // this is for sending refresh token
            }
        })

        // store access token in local storage
        const accessToken = response.data.data.accessToken
        localStorage.setItem("accessToken", accessToken)
        return accessToken

    } catch (error) {
        console.log("Refresh token field", error);

    }
}



export default Axios
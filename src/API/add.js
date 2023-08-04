// import { API } from "./config"
import axios from "axios";

// export const BaseApiUrl = 'http://localhost:3002/api'
export const BaseApiUrl = 'http://43.206.137.78:8080/api'

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbG1hbm5hcXY0NjFAZ21haWwuY29tIiwiaWF0IjoxNjg1NzkzNjUwfQ.Rd-U0FVIHucqjV7_PzZ-Ez56ORr6amRuzdbp-xjG79U'
// let token = ""

const  API = axios.create({
    baseURL: BaseApiUrl,
    // headers: {
    //     "authorization": token
    // }
})

export const setToken = (token) => {
    API.defaults.headers.common["Authorization"] = `${token}`;
}


// ================== Authentication ==================
export const register = async (body) => {
    let response = await API.post(`/auth/register`, body)
    setToken(response.data.token)
    return response.data
}

export const login = async (body) => {
    let response = await API.post(`/auth/login`, body)
    setToken(response.data.token)
    return response.data
}

// ================== Order ==================
export const placeOrder = async (orderDetails, paymentInfo) => {
    let response = await API.post(`/order/create`, {
        ...orderDetails,
        paymentDetails: JSON.stringify(paymentInfo)
    })
    return response.data
}

export const getOrders = async (userId) => {
    let response = await API.get(`/order/get/${userId}`)
    return response.data
}

export const getAllOrder = async (paginationInfo) => {
    let response = await API.get(`/order/getAll?value=${paginationInfo.value}&page=${paginationInfo.page}&limit=${paginationInfo.limit}`)
    return response.data
}

export const getByPlanId = async (paginationInfo) => {
    let response = await API.get(`/order/byplan?planId=${paginationInfo.planId}&page=${paginationInfo.page}&limit=${paginationInfo.limit}`)
    return response.data
}

export const updateOrderStatus = async (orderId, status) => {
    let response = await API.patch(`/order/update/${orderId}`, { orderStatus: status })
    return response.data
}

export const deleteOrder = async (orderId) => {
    let response = await API.delete(`/order/delete/${orderId}`)
    return response.data
}

// ================== Order Details ==================
export const addOrderDetails = async (body) => {
    let response = await API.post(`/orderDetails/`, body)
    return response.data
}

export const getOrderDetails = async (orderId) => {
    let response = await API.get(`/orderDetails/${orderId}`)
    return response.data
}

export const updateDetails = async (detail_id, body) => {
    let response = await API.patch(`/orderDetails/${detail_id}`, body)
    return response.data
}

export const deleteDetails = async (detail_id) => {
    let response = await API.delete(`/orderDetails/${detail_id}`)
    return response.data
}

// ================== Analytics ==================
export const getAnalytics = async (startDate, endDate) => {
    let response = await API.get(`/dashboard?startDate=${startDate}&endDate=${endDate}`)
    return response.data
}
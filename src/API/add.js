import { API } from "./config"

// ================== Authentication ==================
export const register = async (body) => {
    let response = await API.post(`/auth/register`, body)
    return response.data
}

export const login = async (body) => {
    let response = await API.post(`/auth/login`, body)
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

export const getAllOrder = async () => {
    let response = await API.get(`/order/getAll`)
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
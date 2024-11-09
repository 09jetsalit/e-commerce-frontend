import axios from "axios"




export const createProduct = async(token: string, form: any) => {
    return axios.post('http://localhost:3000/api/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listProduct = async(token: string, count: number) => {
    return axios.get('http://localhost:3000/api/products/'+count, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const readProduct = async(token: string, form: any) => {
    return axios.post('http://localhost:3000/api/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateProduct = async(token: string, form: any) => {
    return axios.post('http://localhost:3000/api/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeProduct = async(token: string, form: any) => {
    return axios.post('http://localhost:3000/api/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
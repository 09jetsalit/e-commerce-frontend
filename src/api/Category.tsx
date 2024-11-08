import axios from "axios"




export const createCategory = async(token: string, form: any) => {
    return axios.post('http://localhost:3000/api/category', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getCategory = async(token: string) => {
    return axios.get('http://localhost:3000/api/category', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCategory = async(token: string, id: number) => {
    return axios.delete('http://localhost:3000/api/category/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
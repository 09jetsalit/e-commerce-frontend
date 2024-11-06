import axios from "axios";



export const currentUser = (token: any) => axios.post('http://localhost:3000/api/current-user',{}, {
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const currentAdmin = (token: any) => {
    return axios.post('http://localhost:3000/api/current-admin',{},{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
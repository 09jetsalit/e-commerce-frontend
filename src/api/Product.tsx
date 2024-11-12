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

export const uploadFiles = async (token: any, form: any) => {
    // code
    // console.log('form api frontent', form)
    return axios.post(
      "http://localhost:3000/api/images",
      {
        image: form,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  
  export const removeFiles = async (token: any, public_id: any) => {
    // code
    // console.log('form api frontent', form)
    return axios.post(
      "http://localhost:3000/api/removeimages",
      {
        public_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  
//   export const searchFilters = async (arg) => {
//     // code body
//     return axios.post("http://localhost:5001/api/search/filters", arg);
//   };
  
//   export const listProductBy = async (sort, order, limit) => {
//     // code body
//     return axios.post("http://localhost:5001/api/productby", {
//       sort,
//       order,
//       limit,
//     });
//   };
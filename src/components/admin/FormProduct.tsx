import { useEffect, useState } from "react";
import useEcomStore from "../../store/e-com-store";
import { createProduct } from "../../api/Product";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  price: '' ,
  quantity: '',
  categoryId: '',
  images: [],
};

const FormProduct = () => {
  const token: any = useEcomStore((state) => state.token);
  const GetCategories = useEcomStore((state) => state.listCategory);
  const categories:any[] = useEcomStore((state) => state.categories);
  const [form, setForm] = useState(initialState);
//   console.log(categories);
  

  useEffect(() => {
    GetCategories(token);
  }, []);

  const handleOnChange = (e: any) => {
    // console.log(e.target.name, e.target.value);
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async(e: any) => {
    e.preventDefault()
    // console.log(form);
    try {
        const res = await createProduct(token, form)
        // console.log(res);
        if(res.status === 200) {
            toast.success('Add Product Success')
            setForm(initialState)
        }
        
    } catch (err) {
        console.log(err);
        
    }
    
  }

  return (
    <>
      <div className="container mx-auto bg-white">
        <form onSubmit={handleSubmit}>
          <h1>เพิ่มสินค้า</h1>
          <input
            type="text"
            className="border"
            value={form.title}
            onChange={handleOnChange}
            placeholder="Title"
            name="title"
          />
          <input
            type="text"
            className="border"
            value={form.description}
            onChange={handleOnChange}
            placeholder="description"
            name="description"
          />
          <input
            type="number"
            className="border"
            value={form.price}
            onChange={handleOnChange}
            placeholder="price"
            name="price"
          />
          <input
            type="number"
            className="border"
            value={form.quantity}
            onChange={handleOnChange}
            placeholder="quantity"
            name="quantity"
          />
          
          <select name="categoryId" className="border" onChange={handleOnChange} required>
              <option>please select</option>
            {
                categories.map((item, index) => 
                    <option key={index} value={item.id}>{item.name}</option>

                )
            }
          </select>
            <hr />
          <button className="bg-blue-500" onClick={handleSubmit}>เพิ่มสินค้า</button>
        </form>
      </div>
    </>
  );
};

export default FormProduct;

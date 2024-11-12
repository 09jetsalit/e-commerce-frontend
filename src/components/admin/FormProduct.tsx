import { useEffect, useState } from "react";
import useEcomStore from "../../store/e-com-store";
import { createProduct } from "../../api/Product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";

type form = {
  title: string;
  description: string;
  price: number | '';
  quantity: number | '';
  categoryId: number;
  images: [];
};

const initialState: form = {
  title: "",
  description: "",
  price: '',
  quantity: '',
  categoryId: 0,
  images: [],
};

const FormProduct = () => {
  const token: any = useEcomStore((state) => state.token);
  const GetCategories = useEcomStore((state) => state.listCategory);
  const categories: any[] = useEcomStore((state) => state.categories);
  const [form, setForm] = useState(initialState);
  const products: any[] = useEcomStore((state) => state.products);
  const getProducts = useEcomStore((state) => state.getProduct);
  // console.log(products);

  useEffect(() => {
    GetCategories(token);
    getProducts(token, 20);
  }, []);

  const handleOnChange = (e: any) => {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(form);
    try {
      const res = await createProduct(token, form);
      // console.log(res);
      if (res.status === 200) {
        toast.success("Add Product Success");
        setForm({ ...initialState, images: [] });
      }
    } catch (err) {
      // console.log(err);
      if (!form.title) {
        toast.error("Please fill name");
      } else if (!form.description) {
        toast.error("Please fill description");
      } else if (!form.price) {
        toast.error("Please fill price");
      } else if (!form.quantity) {
        toast.error("Please fill quantity");
      } else if (!form.categoryId) {
        toast.error("Please select category");
      }
    }
    getProducts(token, 20)
  };

  return (
    <>
      <div className="container mx-auto bg-white pl-3">
        <form onSubmit={handleSubmit}>
          <h1 className="py-4">เพิ่มสินค้า</h1>
          <label htmlFor="title">ชื่อสินค้า</label>
          <input
            type="text"
            className="border"
            value={form.title}
            onChange={handleOnChange}
            placeholder="Title"
            name="title"
          />
          <br />
          <label htmlFor="description">รายละเอียดสินค้า</label>
          <input
            type="text"
            className="border"
            value={form.description}
            onChange={handleOnChange}
            placeholder="description"
            name="description"
          />
          <br />
          <label htmlFor="price">ราคา</label>
          <input
            type="number"
            className="border"
            value={form.price}
            onChange={handleOnChange}
            placeholder="price"
            name="price"
          />
          <br />
          <label htmlFor="quantity">จำนวน</label>
          <input
            type="number"
            className="border"
            value={form.quantity}
            onChange={handleOnChange}
            placeholder="quantity"
            name="quantity"
          />
          <br />
          <label htmlFor="categoryId">ประเภทสินค้า</label>
          <select
            name="categoryId"
            className="border"
            onChange={handleOnChange}
            required
            value={form.categoryId || ''}
          >
            <option value="" disabled>
              please select
            </option>
            {/* if () {
                toast.error('Please select category')
              } */}
            {categories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <br />
          {/* upload file */}
          <UploadFile form={form} setForm={setForm} />
          <button
            className="bg-blue-500 rounded-md p-1 mt-2"
            onClick={handleSubmit}
          >
            เพิ่มสินค้า
          </button>

          <br />
          <br />
        </form>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-slate-300">ชื่อสินค้า</th>
              <th className="px-4 py-2 border border-slate-300">
                รายละเอียดสินค้า
              </th>
              <th className="px-4 py-2 border border-slate-300">สต๊อก</th>
              <th className="px-4 py-2 border border-slate-300">ราคา</th>
              <th className="px-4 py-2 border border-slate-300">
                จำนวนที่ขายได้
              </th>
              <th className="px-4 py-2 border border-slate-300">อัพเดทเมื่อ</th>
              <th className="px-4 py-2 border border-slate-300">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="px-4 py-2 border text-center">{item.title}</td>
                <td className="px-4 py-2 border text-center">
                  {item.description}
                </td>
                <td className="px-4 py-2 border text-center">
                  {item.quantity}
                </td>
                <td className="px-4 py-2 border text-center">{item.price}</td>
                <td className="px-4 py-2 border text-center">{item.sold}</td>
                <td className="px-4 py-2 border text-center">
                  {item.updateAt}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button className="bg-red-500 text-white p-1 rounded-md">
                    ลบ
                  </button>
                  <button className="bg-green-500 text-white p-1 rounded-md ml-2">
                    แก้ไข
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FormProduct;

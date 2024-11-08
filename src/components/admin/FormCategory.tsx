import { useEffect, useState } from "react";
import { createCategory, getCategory, removeCategory } from "../../api/Category";
import useEcomStore from "../../store/e-com-store";
import { toast } from "react-toastify";

type Category = {
  name: string;
  id: number
};

const FormCategory = () => {
  const token: any = useEcomStore((state) => state.token);
  const [name, setName] = useState<string>("");
  // const [categories, setCategories] = useState<Category[]>([]);
  const categories: Category[] = useEcomStore( (state) => state.categories)
  const getCategories = useEcomStore( (state) => state.listCategory)

  // console.log(categories);
  
 

  useEffect(() => {
    getCategories(token);
  }, []);


  const handleSubmit = async () => {
    try {
      if (!name) {
        return toast.warning("Please fill data");
      }
      const res = await createCategory(token, { name });
      // console.log(res);      
      toast.success(`Add category ${res.data.Category.name} Success`)
      setName('')
      getCategories(token)
    } catch (err) {
      console.log(err);
      
    }
  };

  const handleRemove = async(id: number) => {
    
    const categoryToDelete = categories.find((category) => category.id === id);
    // console.log(id);
    try {
      const res = await removeCategory(token, id)
      // console.log(res);
      toast.error(`Deleted category ${categoryToDelete?.name} successfully`);
      getCategories(token)
      
    } catch (err) {
      console.log(err);
      
    }
  }

  return (
    <div className="container mx-auto bg-white">
      <h1>management</h1>
      <form className="my-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="border"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-blue-400" onClick={handleSubmit}>
          Add category
        </button>
      </form>

      <hr />
      <ul className="list-none">
        {categories.map((item, index) => (
          <li key={index} className="flex justify-between my-2">
            {" "}
            <span>
            {item.name}
            </span>
            <button onClick={() => handleRemove(item.id)}
              className="bg-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;

import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false); // 👈 loading state added

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // 👈 start loading
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false); // 👈 stop loading
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full max-w-4xl mx-auto items-start gap-6 bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-2xl'>

      <div>
        <p className='mb-3 font-semibold text-lg'>Upload Product Images</p>
        <div className='flex gap-4'>
          {[image1, image2, image3, image4].map((img, idx) => (
            <label key={idx} htmlFor={`image${idx + 1}`} className='cursor-pointer hover:scale-105 transition-transform'>
              <img className='w-24 h-24 object-cover rounded-xl border-2 border-dashed border-gray-400' src={!img ? assets.upload_area : URL.createObjectURL(img)} alt="" />
              <input onChange={(e) => [setImage1, setImage2, setImage3, setImage4][idx](e.target.files[0])} type="file" id={`image${idx + 1}`} hidden />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-4 py-3 rounded-xl bg-white shadow-md outline-none focus:ring-2 focus:ring-purple-400' type="text" placeholder='Type product name' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-4 py-3 rounded-xl bg-white shadow-md outline-none focus:ring-2 focus:ring-purple-400' placeholder='Write description' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-4 w-full'>
        <div>
          <p className='mb-2'>Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-4 py-3 rounded-xl bg-white shadow-md outline-none'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-4 py-3 rounded-xl bg-white shadow-md outline-none'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Price ($)</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-4 py-3 rounded-xl bg-white shadow-md outline-none sm:w-[120px]' type="number" placeholder='Price' />
        </div>
      </div>

      <div>
        <p className='mb-2'>Select Sizes</p>
        <div className='flex gap-3 flex-wrap'>
          {["S", "M", "L", "XL", "XXL"].map(size => (
            <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
              <p className={`px-4 py-2 rounded-full cursor-pointer shadow-md ${sizes.includes(size) ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>{size}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-3 mt-3 items-center'>
        <label htmlFor="bestseller" className='flex items-center cursor-pointer gap-2'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' className='accent-purple-500 w-5 h-5' />
          <span>Add to Bestseller</span>
        </label>
      </div>

      <button
        type="submit"
        className={`w-32 py-3 mt-6 text-white rounded-xl shadow-lg transition-all duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:from-purple-600 hover:to-pink-600"}`}
        disabled={loading}
      >
        {loading ? "Loading..." : "ADD"}
      </button>

    </form>
  )
}

export default Add

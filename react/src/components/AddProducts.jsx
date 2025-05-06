import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash, Edit } from 'lucide-react';

function AddProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://192.168.1.77/product-api/get_products.php');
      // Ensure full image URLs with cache-busting
      const updatedProducts = res.data.map((product) => {
        const imageUrl = product.image
          ? `${product.image}?t=${new Date().getTime()}` // Cache-busting
          : ''; 
        return {
          ...product,
          image: imageUrl,
        };
      });
      setProducts(updatedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleSubmit = async () => {
    if (!name || !brand || !price || (!image && editingId === null))
      return alert('Please fill all fields');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('price', price);
    if (image) formData.append('image', image);

    try {
      if (editingId) {
        formData.append('id', editingId);
        await axios.post(
          'http://192.168.1.77/product-api/update_product.php',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        fetchProducts(); // Fetch updated products
        resetForm();
      } else {
        await axios.post(
          'http://192.168.1.77/product-api/add_product.php',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        fetchProducts(); // Fetch updated products
        resetForm();
      }
    } catch (err) {
      console.error('Error submitting product:', err);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setBrand(product.brand || '');
    setPrice(product.price);
    setPreview(product.image);
    setImage(null);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(
        'http://192.168.1.77/product-api/delete_product.php',
        { id },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      if (res.data.success) {
        fetchProducts();
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting product');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setBrand('');
    setPrice('');
    setImage(null);
    setPreview(null);
  };

  return (
    <div className='bg-blue-50 min-h-screen py-4 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6'>
        <h2 className='text-2xl font-bold text-center'>
          {editingId ? 'Edit Product' : 'Add Product'}
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border rounded px-3 py-2'
          />
          <input
            type='text'
            placeholder='Brand'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className='border rounded px-3 py-2'
          />
          <input
            type='number'
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='border rounded px-3 py-2'
          />
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='sm:col-span-2 border rounded px-3 py-2'
          />
          {preview && (
            <img
              src={preview}
              alt='Preview'
              className='w-24 h-24 object-cover rounded mx-auto sm:col-span-2'
            />
          )}
        </div>
        <div className='flex justify-center gap-4'>
          <button
            type='button'
            onClick={handleSubmit}
            className='bg-blue-500 text-white px-6 py-2 rounded-full'
          >
            {editingId ? 'Update' : 'Add Product'}
          </button>
          {editingId && (
            <button
              type='button'
              onClick={resetForm}
              className='bg-gray-300 px-4 py-2 rounded-full'
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className=' mt-10'>
        <table className='min-w-full text-center bg-white shadow-md rounded-xl'>
          <thead className='bg-stone-200'>
            <tr>
              <th className='px-4 py-3'>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className='border-b hover:bg-blue-50'>
                <td className='px-4 py-3'>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className='w-14 h-14 rounded-full mx-auto'
                  />
                </td>
                <td>{prod.name}</td>
                <td>{prod.brand}</td>
                <td>Rs. {prod.price}</td>
                <td className='px-4 py-3'>
                  <div className='flex justify-center gap-4 items-center'>
                    <button
                      onClick={() => handleEdit(prod)}
                      className='text-blue-600 hover:underline flex items-center gap-1'
                    >
                      <Edit className='w-4 h-4' /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className='text-red-600 hover:underline flex items-center gap-1'
                    >
                      <Trash className='w-4 h-4' /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className='py-5 text-gray-500'>
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddProducts;

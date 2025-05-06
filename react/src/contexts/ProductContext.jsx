import React,{createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios'

const ProductContext = createContext()

export function useProducts() {
  return useContext(ProductContext)
}

export function ProductProvider({children}){
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://192.168.1.77/product-api/get_products.php');
      if (Array.isArray(res.data)) {
        const updated = res.data.map((product) => ({
          ...product,
          image: product.image ? `${product.image}?t=${Date.now()}` : '',
        }));
        setProducts(updated);
      } else {
        console.error('Unexpected products response:', res.data);
        setProducts([]);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return(
    <ProductContext.Provider value= {{products, setProducts, fetchProducts}}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext

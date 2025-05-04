import React,{createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios'

const ProductContext = createContext()

export function useProducts() {
  return useContext(ProductContext)
}

export function ProductProvider({children}){
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost/product-api/get_products.php')
        if (Array.isArray(res.data)) {
          setProducts(res.data)
        } else {
          console.error('Unexpected products response:', res.data)
          setProducts([])
        }
      } catch (err) {
        console.error('Failed to load products:', err)
        setProducts([])
      }
    }

    fetchProducts()
  }, [])
  return(
    <ProductContext.Provider value= {{products, setProducts}}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext

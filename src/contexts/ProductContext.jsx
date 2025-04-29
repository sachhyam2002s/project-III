import React,{createContext, useContext, useState} from 'react'

const ProductContext = createContext()

export function useProducts() {
  return useContext(ProductContext)
}

export function ProductProvider({children}){
  const [products] = useState([
    {id:1, name:"Cream Converse", image:"/photo/cream converse.jpg", price:"2500", brand:"converse"},
    {id:2, name:"White Adidas", image:"/photo/white addidas.jpg", price:"2000", brand:"adidas"},
    {id:3, name:"Green Nike", image:"/photo/nike (4).jpg", price:"2800", brand:"nike"},
    {id:4, name:"Gray Goldstar", image:"/photo/goldstar.jpg", price:"1500", brand:"goldstar"},
    {id:5, name:"Comfy Sport", image:"/photo/stylish sport.jpg", price:"2200", brand:"sport"},
    {id:6, name:"Brown Nike  Sneaker", image:"/photo/orange nike.jpg", price:"2500", brand:"nike"},
    {id:7, name:"Gray Jordan", image:"/photo/gray jordan.jpg", price:"3000", brand:"jordan"},
    {id:8, name:"Black Leather Boot", image:"/photo/leather boot.jpg", price:"5000", brand:"leather"},
  ])
  return(
    <ProductContext.Provider value= {{products}}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext

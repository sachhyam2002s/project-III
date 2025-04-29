import React,{createContext, useContext, useState} from 'react'

const ProductContext = createContext()

export function useProducts() {
  return useContext(ProductContext)
}

export function ProductProvider({children}){
  const [products] = useState([
    {id:1, name:"Cream Converse", image:"/photo/cream converse.jpg", price:"2500"},
    {id:2, name:"White Adidas", image:"/photo/white addidas.jpg", price:"2000"},
    {id:3, name:"Green Nike", image:"/photo/nike (4).jpg", price:"2800"},
    {id:4, name:"Gray Goldstar", image:"/photo/goldstar.jpg", price:"1500"},
    {id:5, name:"Comfy Sport", image:"/photo/stylish sport.jpg", price:"2200"},
    {id:6, name:"Brown Nike  Sneaker", image:"/photo/orange nike.jpg", price:"2500"},
    {id:7, name:"Gray Jordan", image:"/photo/gray jordan.jpg", price:"3000"},
    {id:8, name:"Black Leather Boot", image:"/photo/leather boot.jpg", price:"5000"},
  ])
  return(
    <ProductContext.Provider value= {{products}}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext

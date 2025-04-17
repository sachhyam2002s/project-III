import {Routes, Route} from "react-router-dom";
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="" element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App

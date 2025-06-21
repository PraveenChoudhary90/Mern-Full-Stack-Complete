
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './Layout'
import Home from './Pages/Home'
import About from './Pages/About'
import Cart from './Pages/Addtocart'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='about' element={<About/>}/> 
      <Route path='cart' element={<Cart/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App

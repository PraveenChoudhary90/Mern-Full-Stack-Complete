
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Home from './Pages/Home'
import About from './Pages/About'
import Insert from './Pages/Insert'
import CartData from './Pages/CartData'
import Checkout from './Pages/Checkout'
import Success from './Success'
import Failed from './Failed'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='insert' element={<Insert/>}/>
        <Route path='cartdata' element={<CartData/>}/>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='success' element={<Success/>}/>
        <Route path='failed' element={<Failed/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

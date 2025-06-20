
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Home from './Pages/Home'
import About from './Pages/About'
import Registration from './Pages/Registration'
import Display from './Pages/Display'
import Search from './Pages/Search'

function App() {
 

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='registration' element={<Registration/>}/>
      <Route path='display' element={<Display/>}/>
      <Route path='search' element={<Search/>}/>

      </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

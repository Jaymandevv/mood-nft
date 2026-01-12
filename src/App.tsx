import './App.css'
import Home from './pages/home'
import { Routes, Route } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import MyNft from './pages/my-nft';


function App() {



  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/my-nft' element={<MyNft />} />
      </Route>
    </Routes>
  )
}

export default App


import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup'
import Footer from './Components/Footer/Footer';
import man_banner from './Components/Assets/man_banner.png'
import women_banner from './Components/Assets/women_banner.png'
import kid_banner from './Components/Assets/kid_banner.png'

function App() {
  return (
    <div>
      <BrowserRouter>
      
    <Navbar/>
    <Routes>
      <Route path='/' element={<Shop/>}/>
      <Route path='/men' element={<ShopCategory banner={man_banner} category="men"/>}/>
      <Route path='/women' element={<ShopCategory banner={women_banner}category="women"/>}/>
      <Route path='/kids' element={<ShopCategory banner={kid_banner}category="kids"/>}/>
      <Route path='/Product' element={<product/>}>
        <Route path=':productId' element={<product/>}/>
      </Route>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<LoginSignup/>}/>

      
    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;

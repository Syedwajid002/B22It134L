
import './App.css';
import { Route, Routes } from 'react-router-dom';
import GetProducts from './Components/GetProducts';
import Home from './Home';


function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/getProducts/:company/:category" element={<GetProducts/>} />
      </Routes>
    </>
  );
}

export default App;

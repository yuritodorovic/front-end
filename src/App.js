import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Componente/Sidebar/Sidebar';
import Empresas from './Pages/Tabs/Empresas/Empresas';
import Fornecedores from './Pages/Tabs/Fornecedor/Fornecedores';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Sidebar><Empresas/></Sidebar>}/>
        <Route path='/fornecedor' element={<Sidebar><Fornecedores/></Sidebar>}/>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ClienteAdm from './pages/clientes-adm';
import LocacaoAdm from './pages/locacao-adm';
import VeiculosAdm from './pages/veiculos-adm';
 
export default function Rotas(){


    return(

        <BrowserRouter>
        
            <Routes>

                <Route path='/cliente' element={<ClienteAdm/>}></Route>
                <Route path='/locacao' element={<LocacaoAdm/>}></Route>
                <Route path='/alugar' element={<VeiculosAdm/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
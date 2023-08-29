import './index.scss';
import { useState } from 'react';
import { cadastrarCliente } from '../../api/clienteAPI';
import Menu from '../../components/menu-adm';
import Cabecalho from '../../components/cabecalho-adm';

export default function ClienteAdm(){

    const[nome,setNome]=useState('');
    const[email,setEmail]=useState('');
    const[telefone,setTelefone]=useState('');
    const[CPF,setCPF]=useState('');
    const[CNH,setCNH]=useState(Number());
    const[clientes,setClientes]=useState([]);

    async function cadastrar(){

        try{const cliente =cadastrarCliente(nome,email,telefone,CPF,CNH);}

        catch(err){


        }
    }

    return(

        <div className='page-cliente'>

            <Menu/>

            <div className='conteudo'>

                <Cabecalho/>

                <main>

                    <h5>ÁREA ADMINISTRATIVA</h5>
                    <h3>Controle de Clientes</h3>

                    <div className='add-cliente'>

                        <h4>Novo Cliente</h4>

                        <div>

                            <label>Nome</label>
                            <input type='text' value={nome} onChange={(e) => {setNome(e.target.value)}}/>
                        </div>

                        <div>

                            <label>Email</label>
                            <input type='text' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                        </div>

                        <div>

                            <label>Telefone</label>
                            <input type='text' value={telefone} onChange={(e) => {setTelefone(e.target.value)}}/>
                        </div>

                        <div>

                            <label>CPF</label>
                            <input type='text' value={CPF} onChange={(e) => {setCPF(e.target.value)}}/>
                        </div>

                        <div>

                            <label>CNH</label>
                            <input type='number' value={CNH} onChange={(e) => {setCNH(e.target.value)}}/>
                        </div>

                        <button onClick={cadastrar}>SALVAR</button>
                    </div>
                </main>
            </div>
        </div>
    );
}
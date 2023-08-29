import './index.scss';
import { useState } from 'react';
import { cadastrarCliente, procurarClientes } from '../../api/clienteAPI';
import Menu from '../../components/menu-adm';
import Cabecalho from '../../components/cabecalho-adm';

export default function ClienteAdm(){

    const[nome,setNome]=useState('');
    const[email,setEmail]=useState('');
    const[telefone,setTelefone]=useState('');
    const[CPF,setCPF]=useState('');
    const[CNH,setCNH]=useState(Number());

    const[clientes,setClientes]=useState([]);
    const[nomeBusca,setNomeBusca]=useState('');

    async function cadastrar(){

        try{

            const cliente =cadastrarCliente(nome,email,telefone,CPF,CNH);
            alert('Cliente adicionado nos registros');
        }

        catch(err){

            alert(err.message);
        }
    }

    async function buscarNome(){

        const resp= await procurarClientes(nomeBusca);
        console.log(resp);
        setClientes(resp.data);
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

                    <div className='listar-clientes'>

                        <div>

                            <div>
                                <label>Nome</label>
                                <input type='text' value={nomeBusca} onChange={ (e) => {setNomeBusca(e.target.value)}}/>
                            </div>
                            
                            <button onClick={buscarNome}>

                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.0002 20.0002L15.6572 15.6572M15.6572 15.6572C16.4001 14.9143 16.9894 14.0324 17.3914 13.0618C17.7935 12.0911 18.0004 11.0508 18.0004 10.0002C18.0004 8.9496 17.7935 7.90929 17.3914 6.93866C16.9894 5.96803 16.4001 5.08609 15.6572 4.34321C14.9143 3.60032 14.0324 3.01103 13.0618 2.60898C12.0911 2.20693 11.0508 2 10.0002 2C8.9496 2 7.90929 2.20693 6.93866 2.60898C5.96803 3.01103 5.08609 3.60032 4.34321 4.34321C2.84288 5.84354 2 7.87842 2 10.0002C2 12.122 2.84288 14.1569 4.34321 15.6572C5.84354 17.1575 7.87842 18.0004 10.0002 18.0004C12.122 18.0004 14.1569 17.1575 15.6572 15.6572Z" stroke="#8F8F8F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>

                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
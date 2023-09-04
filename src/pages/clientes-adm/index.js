import './index.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Menu from '../../components/menu-adm';
import Cabecalho from '../../components/cabecalho-adm';

export default function ClienteAdm(){

    const[nome,setNome]=useState('');
    const[email,setEmail]=useState('');
    const[telefone,setTelefone]=useState('');
    const[CPF,setCPF]=useState('');
    const[CNH,setCNH]=useState('');
    const[ID,setID]=useState('');

    const[clientes,setClientes]=useState([]);
    const[nomeBusca,setNomeBusca]=useState('');
 
    const[mostrar,setMostrar]=useState(true);

    function limparInputs(){

        setNome('');
        setEmail('');
        setTelefone('');
        setCPF('');
        setCNH('');
    }

    async function cadastrar(){

        try{
            let cliente={
                nome: nome,
                email: email,
                telefone: telefone,
                cpf: CPF,
                cnh: CNH
            };
            
            const resp=await axios.post('http://localhost:5000/locadora/cliente', cliente); 
            alert('Cliente cadastrado');

            buscar();
            limparInputs();
        }

        catch(err){

            alert(err.response.data.erro);
        }
    }

    async function buscar(){

        try{

            let nome=nomeBusca;
            const resp= await axios.get('http://localhost:5000/locadora/cliente/nome?nome='+nomeBusca);

            setClientes(resp.data);
        }

        catch(err){

            alert(err.response.data.erro);
        }
    }

    async function deletar(id){
        
        confirmAlert({
            title: 'REMOVER CLIENTE',
            message: 'Tem certeza que deseja remover (Esta ação não pode ser desfeita) ?',
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                    try {
                        let resp = await axios.delete('http://localhost:5000/locadora/cliente/'+id);
                        alert('Cliente deletado dos registros');
                        buscar();
                    }
                    catch (err) {
                        alert(err.response.data.erro);
                    }
                }
              },
              {
                label: 'Não'
              }
            ]
        });
    }

    function setarInputs(cliente){

        setNome(cliente.NM_CLIENTE);
        setEmail(cliente.DS_EMAIL);
        setTelefone(cliente.DS_TELEFONE);
        setCPF(cliente.DS_CPF);
        setCNH(cliente.DS_CNH);  
        setMostrar(false);
        setID(cliente.ID_CLIENTE);
    }

    async function alterarCliente(){

        try{

            let cliente={

                nome:nome,
                email:email,
                telefone:telefone,
                cpf:CPF,
                cnh:CNH
            };

            const resp=await axios.put('http://localhost:5000/locadora/cliente/'+ID, cliente);
            alert('Cliente alterado com sucesso');

            limparInputs();
            buscar();
        }

        catch(err){

            alert(err.response.data.erro);
        }
    }

    // Máscaras
    const cpfMask = value =>{

        return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    }

    const telMask = (value) => {
        
        return value
        .replace(/\D/g,'')
        .replace(/(\d{2})(\d)/,"($1) $2")
        .replace(/(\d)(\d{4})$/,"$1-$2")
      }

    const handleChangeCPF = (e) => {

        const formatarCPF=cpfMask(e.target.value);
        setCPF(formatarCPF);
    }

    const handleChangeTelefone = (e) => {

        const formatarTelefone=telMask(e.target.value);
        setTelefone(formatarTelefone);
    }

    useEffect(() => {

        buscar();
    },[nomeBusca]);

    return(

        <div className='page-cliente'>

            <Menu/>

            <div className='conteudo'>

                <Cabecalho/>

                <main>

                    <h5>ÁREA ADMINISTRATIVA</h5>
                    <h3>Controle de Clientes</h3>

                    <div className='add-cliente estilizar-inputs'>

                        <h4 className='h4'>Novo Cliente</h4>

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
                            <input type='text' value={telefone} maxLength='15' onChange={handleChangeTelefone}/>
                        </div>

                        <div>

                            <label>CPF</label>
                            <input type='text' value={CPF} maxLength='14' onChange={handleChangeCPF}/>
                        </div>

                        <div>

                            <label>CNH</label>
                            <input type='number' value={CNH} onChange={(e) => {setCNH(e.target.value)}}/>
                        </div>

                        {mostrar ? 
                            <button onClick={cadastrar} className='estilizar-botao'>SALVAR</button> 
                        : 
                            <div style={{border:"none", display:"flex", flexDirection:"row", gap:"10px"}}>
                                <button onClick={alterarCliente} className='estilizar-botao'>ALTERAR</button>
                                <button onClick={() => {setMostrar(true); 
                                    setNome('');
                                    setEmail('');
                                    setTelefone('');
                                    setCPF('');
                                    setCNH('');}}  className='estilizar-botao'>CANCELAR
                                </button>
                            </div>
                        }
                    </div>

                    <div className='listar-clientes'>

                        <h4 className='h4'>Lista de Clientes</h4>
    
                        <div className='search estilizar-inputs'>

                            <div>

                                <label>Nome</label>
                                <input type='text' value={nomeBusca} onChange={ (e) => {setNomeBusca(e.target.value)}}/>
                            </div>

                            <button onClick={buscar}>

                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.0002 20.0002L15.6572 15.6572M15.6572 15.6572C16.4001 14.9143 16.9894 14.0324 17.3914 13.0618C17.7935 12.0911 18.0004 11.0508 18.0004 10.0002C18.0004 8.9496 17.7935 7.90929 17.3914 6.93866C16.9894 5.96803 16.4001 5.08609 15.6572 4.34321C14.9143 3.60032 14.0324 3.01103 13.0618 2.60898C12.0911 2.20693 11.0508 2 10.0002 2C8.9496 2 7.90929 2.20693 6.93866 2.60898C5.96803 3.01103 5.08609 3.60032 4.34321 4.34321C2.84288 5.84354 2 7.87842 2 10.0002C2 12.122 2.84288 14.1569 4.34321 15.6572C5.84354 17.1575 7.87842 18.0004 10.0002 18.0004C12.122 18.0004 14.1569 17.1575 15.6572 15.6572Z" stroke="#8F8F8F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>

                             </button>
                        </div>

                        <table>
                            
                            <thead>

                                <tr>

                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>Telefone</th>
                                    <th>E-mail</th>
                                </tr>
                            </thead>

                            <tbody>

                                {clientes.map(item=> 
                                
                                <tr>
                                    
                                    <td>{item.NM_CLIENTE}</td>
                                    <td>{item.DS_CPF}</td>
                                    <td>{item.DS_TELEFONE}</td>
                                    <td>{item.DS_EMAIL}</td>

                                    <td> 

                                        <button style={{margin:"10px"}} onClick={() => {setarInputs(item)}}>
                                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 4H3C2.46957 4 1.96086 4.21071 1.58579 4.58579C1.21071 4.96086 1 5.46957 1 6V20C1 20.5304 1.21071 21.0391 1.58579 21.4142C1.96086 21.7893 2.46957 22 3 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V13" stroke="#787676" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M17.5 2.50023C17.8978 2.1024 18.4374 1.87891 19 1.87891C19.5626 1.87891 20.1022 2.1024 20.5 2.50023C20.8978 2.89805 21.1213 3.43762 21.1213 4.00023C21.1213 4.56284 20.8978 5.1024 20.5 5.50023L11 15.0002L7 16.0002L8 12.0002L17.5 2.50023Z" stroke="#787676" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>

                                        </button>

                                        <button onClick={() => deletar(item.ID_CLIENTE)}>
                                            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 5H3H19" stroke="#787676" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M17 5V19C17 19.5304 16.7893 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 15 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5M6 5V3C6 2.46957 6.21071 1.96086 6.58579 1.58579C6.96086 1.21071 7.46957 1 8 1H12C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V5" stroke="#787676" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M8 10V16" stroke="#787676" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12 10V16" stroke="#787676" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>  
                    </div>
                </main>
            </div>
        </div>
    );
}
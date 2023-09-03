import axios from 'axios';

export async function cadastarClientes(nome,email,telefone,cpf,cnh){
 
    let cliente={
        nome: nome,
        email: email,
        telefone: telefone,
        cpf: cpf,
        cnh: cnh
    };
        
    let resp=await axios.post('http://localhost:5000/locadora/cliente', cliente) 

    return resp.data;
}

export async function procurarClientes(nome){

    const resp = await axios.get(`http://localhost:5000/cliente/nome?nome=${nome}`);

    return resp.data;
}
import axios from 'axios';

const apiCliente = axios.create({

    URL:'http://localhost:5000/locadora'
});

export async function cadastrarCliente(nome,email,telefone,cpf,cnh){

    const resp = await apiCliente.post('/cliente', {

        nome:nome,
        email:email,
        telefone:telefone,
        CPF:cpf,
        CNH:cnh
    });

    return resp.data;
}
import React, { useEffect, useState } from 'react'
import './style.css'
import api from '../../../Api/Api'
import AddFornecedor from '../../../Componente/Modais/Empresa/Fornecedor/AddFornecedor/AddFornecedor';
import InfoFornecedores from '../../../Componente/Modais/Empresa/InfoFornecedores/InfoFornecedores';

export default function Fornecedores() {
  const [fornecedor,setFornecedor] = useState(null)
  const [add,setAdd] = useState(false);
  const [lista,setLista] = useState([
    {id: 1,nome:'Accenture', email: 'exemplo@gmail.com', cnpj: 'XX.XXX.XXX/0001-XX.',cep: '18275-100'}
])
  useEffect(() => {
    GetFornecedores()
  },[])
  async function GetFornecedores() {
    await api.get('api/fornecedor').then(response => {
      setLista(response.data)
    }).catch(err => {
      alert(err);
    })
  } 
  const AddNewItem = (valor) => {
    const get = [...lista]
    get.push(valor)
    setLista(get);
  }
  const Remove = (id) => {
    const get = [...lista]
    let newL = get.filter(e => e.id !== id)
    setLista(newL);
    console.log(get)
  }
  return (
    <div className='fornecedor-container'>
      <div className='fornecedor-content'>
        <div className="fornecedor-header">
            <span>Fornecedores</span>
            <div className="fornecedor-button-header" onClick={() => setAdd(true)}>
                <span>Adicionar Fornecedor</span>
            </div>
        </div>
        <div className="empresa-table-content">
            <main className="table">
                <section className='table_body'>
                    <table>
                        <thead>
                            <tr>
                                <th>CNPJ</th>
                                <th>Nome</th>
                                <th>E-Mail</th>
                                <th>CEP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map(e => (
                                <tr key={e.id} onClick={() => setFornecedor(e)}>
                                    <td>{e.cnpj}</td>
                                    <td>{e.nome}</td>
                                    <td>{e.email}</td>
                                    <td>{e.cep}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                
            </main>
        </div>
      </div>
      {fornecedor !== null && <InfoFornecedores CloseBtn={() => setFornecedor(null)} Item={fornecedor} Remove={Remove}/>}

      {add && <AddFornecedor CloseBtn={() => setAdd(false)} Add={AddNewItem}/>}
    </div>
  )
}

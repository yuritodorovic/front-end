import React, { useEffect, useState } from 'react'
import './style.css'
import AddEmpresa from '../../../Componente/Modais/Empresa/AddEmpresa/AddEmpresa';
import api from '../../../Api/Api';
import InfoEmpresa from '../../../Componente/Modais/Empresa/InfoEmpresa/InfoEmpresa';

export default function Empresas() {
    const [add,setAdd] = useState(false);
    const [empresa,setEmpresa] = useState(null);
    const [lista,setLista] = useState([
    ])
    useEffect(() => {
        GetEmpresas()
      },[])
      async function GetEmpresas() {
        await api.get('api/empresa').then(response => {
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
    <div className='empresa-container'>
      <div className='empresa-content'>
        <div className="empresa-header">
            <span>Empresas</span>
            <div className="empresa-button-header" onClick={() => setAdd(true)}>
                <span>Adicionar Empresa</span>
            </div>
        </div>
        <div className="empresa-table-content">
            <main className="table">
                <section className='table_body'>
                    <table>
                        <thead>
                            <tr>
                                <th>CNPJ</th>
                                <th>Nome Fantasia</th>
                                <th>CEP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map(e => (
                                <tr key={e.id} onClick={() => setEmpresa(e)}>
                                    <td>{e.cnpj}</td>
                                    <td>{e.nome}</td>
                                    <td>{e.cep}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                
            </main>
        </div>
      </div>
      {empresa !== null && <InfoEmpresa CloseBtn={() => setEmpresa(null)} Item={empresa} Remove={Remove}/>}
      {add && <AddEmpresa CloseBtn={() => setAdd(false)} AddEmpresa={AddNewItem}/>}
    </div>
  )
}

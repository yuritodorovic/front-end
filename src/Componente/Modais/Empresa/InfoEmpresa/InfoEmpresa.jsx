import React, { useEffect, useState } from 'react'
import './style.css'
import * as FaIcons from 'react-icons/fa'
import api from '../../../../Api/Api'

export default function InfoEmpresa({Item,CloseBtn,Remove}) {
    const [fornecedores,setFornecedores] = useState([])
    useEffect(() => {
        GetFornecedores()
    },[])
    async function GetFornecedores() {
        await api.get('api/fornecedorempresa/'+Item.id).then(response => {
          setFornecedores(response.data)
        }).catch(err => {
          alert(err);
        })
      } 
      async function Delete() {
        await api.delete('api/empresa/'+Item.id).then(response => {
            Remove(Item.id)
            CloseBtn()
         
        }).catch(err => {
          alert(err);
        })
      } 
      
  return (
    <div className='info-empresa-container'>
      <div className="info-empresa-content">
        <div className="info-empresa-header">
            <span>
                Informações De: {Item.nome}
            </span>
            <div className="info-empresa-back-button" onClick={CloseBtn}>
                <FaIcons.FaWindowClose className='icon'/>
            </div>
        </div>
        <div className="info-empresa">
            <span>Empresa : {Item.nome}</span>
            <span>CNPJ : {Item.cnpj}</span>
            <span>CEP : {Item.cep}</span>
        </div>
        <div className="info-Header">
            <span>Fornecedores</span>
        </div>
        <div className="info-header-list">
            {fornecedores.map((e) => (
                <div key={e.id} className="info-header-fornecedor-item">
                <span>
                    {e.nome}
                </span>
            </div>
            ))}
        </div>
        <div className="delete-button" onClick={() => Delete()}>
            <span>Delete</span>
        </div>
      </div>

    </div>
  )
}

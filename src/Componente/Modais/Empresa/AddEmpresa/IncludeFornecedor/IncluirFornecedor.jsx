import React, { useEffect, useState } from 'react'
import './style.css'
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io'
import api from '../../../../../Api/Api';

export default function IncluirFornecedor({CloseBtn,AddNew}) {
    const [fornecedores , setFornecedores] = useState([]);
    useEffect(() => {
        GetFornecedores()
      },[])
      async function GetFornecedores() {
        await api.get('api/fornecedor').then(response => {
            setFornecedores(response.data)
        }).catch(err => {
          alert(err);
        })
      } 
      const AddNewItem = (item) => {
        AddNew(item)
        CloseBtn()
      }
  return (
    <div className='add-fornecedor-container'>
        <div className="add-fornecedor-content">
            <div className="add-fornecedor-header">
                <span>
                    Incluir Fornecedor
                </span>
                <div className="add-fornecedor-back-button" onClick={CloseBtn}>
                    <FaIcons.FaWindowClose className='icon'/>
                </div>
            </div>
            <div className="fornecedores-lista">
                {fornecedores.map((e) => (
                    <div key={e.id} className='fornecedores-lista-item' onClick={() => AddNewItem(e)}>
                    <span>
                        {e.nome}
                    </span>
                    <IoIcons.IoIosAddCircle className='icon'/>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}

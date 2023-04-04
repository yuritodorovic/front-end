import React, { useState } from 'react'
import './style.css'
import * as FaIcons from 'react-icons/fa'
import InputMask from 'react-input-mask';
import api from '../../../../../Api/Api';
export default function AddFornecedor({CloseBtn,Add}) {
    const [cnpj,setCnpj] = useState("");
    const [nome,setNome] = useState("");
    const [email,setEmail] = useState("");
    const [cep,setCep] = useState("");

    async function NovoFornecedor(){
        
        var item = {
          cnpj: cnpj,
          nome: nome,
          email: email,
          cep: cep,
        }
        await api.post('api/fornecedor',item).then(response => {
            Add(response.data)
            CloseBtn()
        }).catch(err => {     
          console.log(err)
        });
      }
  return (
    <div className='add-fornecedor-container'>
      <div className="add-fornecedor-content">
        <div className="add-fornecedor-header">
            <span>
                Adicionar Fornecedor
            </span>
            <div className="add-fornecedor-back-button" onClick={CloseBtn}>
                <FaIcons.FaWindowClose className='icon'/>
            </div>
        </div>
        <div className="add-fornecedor-form-container">
            <div className="add-fornecedor-form-input">
                <span>*CPNJ Do fornecedor</span>
                <InputMask
                mask="99.999.999/9999-99"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                placeholder='XX.XXX.XXX/0001-XX'
                >
                   {(inputProps) => <input {...inputProps} type='text'/>} 
                </InputMask>
            </div>
            <div className="add-fornecedor-form-input">
                <span>*Nome Do fornecedor</span>
                <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder='Nome'/>
            </div>
            <div className="add-fornecedor-form-input">
                <span>*Email Do fornecedor</span>
                <input value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='exemplo@gmail.com'/>
            </div>
            <div className="add-fornecedor-form-input">
                <span>*CEP Do fornecedor</span>
                <InputMask
                mask="99999-999"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder='00000-000'
                >
                   {(inputProps) => <input {...inputProps} type='text'/>} 
                </InputMask>
            </div>

        </div>
        <div className="add-fornecedor-confirm-buttom-container">
            <div className="add-fornecedor-confirm-buttom" onClick={() => NovoFornecedor()}>
                <span>Confirmar</span>
            </div>
        </div>
      </div>
    </div>
  )
}

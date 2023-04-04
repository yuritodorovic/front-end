import React, { useState } from 'react'
import './style.css'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import InputMask from 'react-input-mask';
import IncluirFornecedor from './IncludeFornecedor/IncluirFornecedor';
import api from '../../../../Api/Api';
export default function AddEmpresa({CloseBtn,AddEmpresa}) {
    const [add,setAdd] = useState(false);
    const [fornecedores,setFornecedores] = useState([
       
    ])
    const [cnpj,setCnpj] = useState("");
    const [nome,setNome] = useState("");
    const [cep,setCep] = useState("");

    const RemoveItem = (index) => {
        let get = [...fornecedores]
        get.splice(index,1);
        setFornecedores(get)

    }
   
    const AddItem = (item) => {
        let get = [...fornecedores]
        let find = get.find(e => e.fornecedorId === item.id);
        if(find !== undefined){
            alert("Item já adicionado")
        }else{
            var newitem = {
                fornecedorId: item.id,
                nome: item.nome
            }
            get.push(newitem)
            setFornecedores(get)
        }
    }
    async function NovoFornecedor(){
        
        var item = {
          cnpj: cnpj,
          nome: nome,
          cep: cep,
          fornecedores: fornecedores
        }
        await api.post('api/empresa',item).then(response => {
            AddEmpresa(response.data)
            CloseBtn()
        }).catch(err => {     
          console.log(err)
        });
      }

  return (
    <div className='add-empresa-container'>
      <div className="add-empresa-content">
        <div className="add-empresa-header">
            <span>
                Adicionar Empresa
            </span>
            <div className="add-empresa-back-button" onClick={CloseBtn}>
                <FaIcons.FaWindowClose className='icon'/>
            </div>
        </div>
        <div className="add-empresa-form-container">
            <div className="add-empresa-form-input">
                <span>*CPNJ Da empresa</span>
                <InputMask
                mask="99.999.999/9999-99"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                placeholder='XX.XXX.XXX/0001-XX'
                >
                   {(inputProps) => <input {...inputProps} type='text'/>} 
                </InputMask>
            </div>
            <div className="add-empresa-form-input">
                <span>*Nome da empresa</span>
                <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder='Nome'/>
            </div>
            <div className="add-empresa-form-input">
                <span>*CEP da empresa</span>
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
        <div className="add-new-fornecedor-confirm-buttom-container">
            <div className="add-new-fornecedor-confirm-buttom" onClick={() => setAdd(true)}>
                <span>Adicionar Fornecedor</span>
            </div>
        </div>
        <div className='fornecedores-container'>
            {fornecedores.map((item,index) => (
                <div key={index} className='item-fornecedor'>
                    <span>{item.nome}</span>
                    <div className='delete-fornecedor' onClick={() => RemoveItem(index)}>
                        <AiIcons.AiFillDelete className='icon'/>
                    </div>
                </div>
            ))}
        </div>
        <div className="add-empresa-confirm-buttom-container">
            <div className="add-empresa-confirm-buttom" onClick={() => NovoFornecedor()}>
             <span>Confirmar</span>           
            </div>
        </div>
      </div>
      {add && <IncluirFornecedor CloseBtn={() => setAdd(false)} AddNew={AddItem}/>}
    </div>
  )
}

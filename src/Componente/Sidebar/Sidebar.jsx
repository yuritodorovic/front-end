import React, { useEffect, useState } from 'react'
import './style.css'
import * as BiIcons from 'react-icons/bi'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './../../Assets/Logo.png'

export default function Sidebar({children}) {
    const [open,setOpen] = useState(false)
    const [tabs,setTabs] = useState([
        {
            path: '/',
            name: 'Empresas',
            selected: true,
            icon: <AiIcons.AiTwotoneTool className='icon'/>
        },
        {
            path: '/fornecedor',
            name: 'Fornecedor',
            selected: false,
            icon: <FaIcons.FaToolbox className='icon'/>
        }
    ])
    const location = useLocation();


    useEffect(() => {
        refreshSelectedButton(location.pathname)
    },[location])
    const refreshSelectedButton = (location) => {
        const list = [...tabs];
        list.forEach(element => {
            if(element.path === location){
                element.selected = true;
            }else{
                element.selected = false;
            }
        });
        setTabs(list)
    }
    const convertModalOpen = () =>{
        return open ? '' : 'close';
    }
    const convertItemSelected = (value) => {
        return value ? 'active' : '';
    }
  return (
    <div className='container'>
        <div className={'sidebar '+convertModalOpen()}>
            <header>
                <div className='image-text'>
                    <span className='image'>
                        <img src={Logo} alt=''/>
                    </span>
                    <div className='text header-text'>
                        <span className='username'>YuriTodorovic</span>
                    </div>
                    <BiIcons.BiChevronRight className='toggle' onClick={() => setOpen(!open)}/>
                </div>
            </header>
            <div className="menu-bar">
            <div className="menu">
                <div className="menu-links">
                    {tabs.map((item,index) => (
                        <li key={index} className={'nav-link'}>
                            <NavLink to={item.path} className={'nav-content ' + convertItemSelected(item.selected)}>
                                {item.icon}
                                <span className='text'>
                                {item.name}
                                </span>
                            </NavLink>
                        </li>
                    ))}
                </div>
            </div>
        </div>
        </div>
        
      
      <main className='childrens'>{children}</main>
    </div>
  )
}

import React from 'react';
import { SidebarData } from './SidebarData';

const Sidebar = () => {
    return(
        <div className="Sidebar">
            <ul className="SidebarList">
           {SidebarData.map((key, val) => {
               return(
                   <li key={key.id}  className="row" onClick={() =>{window.location.pathname = key.link}}>
                       <div id="icon">{key.icon}</div>
                       <div id="title">{key.name}</div>
                   </li>
               )
           })}
           </ul>
        </div>
    )
}

export default Sidebar;
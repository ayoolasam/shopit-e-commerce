import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideBarMenu = () => {
    
  const menuItems = [
    {
      name:"Profile",
      url:"/me/profile",
      icon:"fas fa-user"


    },
    {
      name:" update Profile",
      url:"/me/update_profile",
      icon:"fas fa-user"


    },
    {
      name:"upload avatar",
      url:"/me/upload_avatar",
      icon:"fas fa-user-circle"


    },
    {
      name:"update Password",
      url:"/me/update_Password",
      icon:"fas fa-lock"


    },
  ]
        const location = useLocation()
  const [activeMenuItem,setActiveMenuItem]= useState(location.pathname)   
  const  handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuItem(menuItemUrl)
  }
  return (
    
    <div className="list-group mt-5 pl-4">
      {menuItems?.map((menuItem,index)=>{
return (
  <Link
  key={index}
  to={menuItem.url}
  className={`fw-bold list-group-item list-group-item-action ${activeMenuItem.includes(menuItem.url)? "active":""}`}
  onClick={()=>handleMenuItemClick(menuItem.url)}
  aria-current={activeMenuItem.includes(menuItem.url)? "true":"false"}
  >
  <i className={`${menuItem.icon} fa-fw pe-2`}></i>{menuItem?.name}
  </Link>
)
    
      })}
  
    
    </div>

  
  )
}

export default SideBarMenu
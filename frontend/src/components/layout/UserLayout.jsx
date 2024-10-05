import React from 'react'
import SideBarMenu from './SideBarMenu'

const UserLayout = ({children}) => {
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
  return (
    <div>
      <div className='mt-2 mb-4 py-4'>
        <h2 className='text-center fw-bolder'>User Settings</h2>
      </div>
      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-lg-3">
            <p><SideBarMenu menuItems={menuItems}/></p>
          </div>
          <div className="col-12 col-lg-8 user-dashboard">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default UserLayout
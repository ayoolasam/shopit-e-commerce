import React, { useState,useEffect } from 'react'
import UserLayout from '../layout/UserLayout'
import { useNavigate } from 'react-router-dom'
import { useUploadAvatarMutation } from '../../redux/api/userApi'
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useSelector } from 'react-redux';

const UploadAvatar = () => {
  const {user} = useSelector((state)=> state.auth)
  const[avatar ,setAvatar ] = useState("")
  const [avatarPreview,setAvatarPreview]= useState(
    user?.avatar ? user.avatar?.url : '/frontend/src/images/default_avatar.jpg'  )
  const navigate = useNavigate()


  const [uploadAvatar,{error,isLoading,isSuccess}]= useUploadAvatarMutation()


  useEffect(() => {
 
    if (error) {
      Toastify({
        text: error?.data?.message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right,#ff5f6d,#ffc371",
      }).showToast();
    }
    if (isSuccess) {
      Toastify({
        text: "avatar uploaded",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right,#ff5f6d,#ffc371",
      }).showToast();
      navigate("/me/profile");
    }
    
  },[error, isSuccess,]);

  const submitHandler = (e) => {
  
    e.preventDefault()
    const userData= {
      avatar
    };


  console.log(userData)
    uploadAvatar(userData)
  }

  const onChange =(e)=>{
    // The FileReader object allows web applications to asynchronously read the contents of files (or raw data buffers) stored on the user's computer.
    const reader = new FileReader(); 



    //after the reading is done
    reader.onload = ()=> {
      //it would check if it is ready and set the states with the reader.result
      if(reader.readyState === 2){
        setAvatarPreview(reader.result)
        setAvatar(reader.result)
      }
    }

    //reader would read the file as a data url
    reader.readAsDataURL(e.target.files[0])

  }
  
    return (
    <UserLayout>
    <div className="row wrapper">
    <div className="col-10 col-lg-8">
      <form
        className="shadow rounded bg-body"
        action="#"
        method="post"
        enctype="multipart/form-data"
        onSubmit={submitHandler}
      >
        <h2 className="mb-4">Upload Avatar</h2>

        <div className="mb-3">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <figure className="avatar item-rtl">
                {/* preview of the image  */}
                <img src={avatarPreview} className="rounded-circle" alt="avatarPreview" />
              </figure>
            </div>
            <div className="input-foam">
              <label className="form-label" for="customFile">
                Choose Avatar
              </label>
              <input
                type="file"
                name="avatar"
                className="form-control"
                id="customFile"
                accept="images/*"
                onChange={onChange}
              />
            </div>
          </div>
        </div>

        <button
          id="register_button"
          type="submit"
          className="btn w-100 py-2"
          disabled={isLoading}
        >
          { isLoading ? "uploading..." : "upload"}
        </button>
      </form>
    </div>
  </div>
  </UserLayout>
  )
}

export default UploadAvatar
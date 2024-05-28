import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateUserMutation } from '../../redux/api/userApi'

const UpdateUser = () => {

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

useUpdateUserMutation();

  return (
    <div className="row wrapper">
    <div className="col-10 col-lg-8">
      <form
        className="shadow rounded bg-body"
        action="#"
        method="post"
        enctype="multipart/form-data"
      >
        <h2 className="mb-4">Update Profile</h2>

        <div className="mb-3">
          <label for="name_field" className="form-label"> Name </label>
          <input
            type="text"
            id="name_field"
            className="form-control"
            name="name"
            value=""
          />
        </div>

        <div className="mb-3">
          <label for="email_field" className="form-label"> Email </label>
          <input
            type="email"
            id="email_field"
            className="form-control"
            name="email"
            value=""
          />
        </div>

        <button type="submit" className="btn update-btn w-100">Update</button>
      </form>
    </div>
  </div>
  )
}

export default UpdateUser
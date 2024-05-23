import React, { useState ,useEffect} from 'react'
import MetaData from '../layout/MetaData'
import { useRegisterMutation } from '../../redux/api/authApi'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const Register = () => {
const [name,setName]=useState('')
const [password,setPassword]=useState('')
const [email,setEmail]=useState('')

const [register ,{isLoading,error,data}] = useRegisterMutation()
console.log(data)

const errorMessage = error?.data?.message
console.log(errorMessage)

useEffect(()=>{
  if(error) {
    console.log(error)
Toastify({
text:errorMessage,
duration:3000,
close:true,
gravity:"top",
position:"right",
backgroundColor:"linear-gradient(to right,#ff5f6d,#ffc371",
}).showToast()
  }
  },[error])

  const submitHandler =(e)=>{
e.preventDefault();
const signupData ={
  email,password,name
}
register(signupData)
  }

  return (
    <>
    <MetaData title={"Register"} />
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
          <h2 className="mb-4">Register</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "REGISTER"}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Register
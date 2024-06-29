import React, { useEffect } from 'react'
import { useGetMyordersQuery } from '../../redux/api/orderApi'
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Loader from '../layout/Loader';
import {MDBDataTable} from "mdbreact"
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const {data,isLoading,error,isSuccess}= useGetMyordersQuery()

  
  useEffect(()=>{
   

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

    
  },[error])

  if(isLoading){
    return <Loader/>
  }

  const setOrders= ()=> {
    const orders = {
        columns:[
          {
            label: "ID",
            field:"id",
            sort:"asc"
          },
          {
            label:" Amount Paid",
            field:"amount",
            sort:"asc"
          },
          {
            label:"payment-Status",
            field:"paymentStatus",
            sort:"asc"
          },
          {
            label:"Order Status",
            field:"orderStatus",
            sort:"asc"
          },
          {
            label:"Actions",
            field:"actions",
            sort:"asc"
          },
        

        ],
        rows:[],
    };

    data?.orders?.forEach((order)=>{
      orders.rows.push({
        id:order?._id,
        amount:` $ ${order?.totalAmount}`,
        paymentStatus:order?.paymentInfo?.status?.toUpperCase(),
        orderStatus:order?.orderStatus,
        actions:
         <>
        <Link to={`/me/order/${order?._id}`} className='btn btn-primary '>

        <i className="fa fa-eye"></i>
        </Link>
        <Link to={`/me/order/${order?._id}`} className='btn btn-success ms-2 '>

        <i className="fa fa-print"></i>
        </Link>
        </>
      })
    })
    return orders
  }
  return (
    <div>
      <h1 className="my-5">{data?.orders?.length} Orders</h1>

      <MDBDataTable
      data={setOrders()}
      className="px-3"
      bordered
      striped
      hover
      />
    
    </div>
  )
}

export default MyOrders 
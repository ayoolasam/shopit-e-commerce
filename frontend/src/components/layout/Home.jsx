import React, { useEffect } from 'react'
import MetaData from './MetaData'
import { useGetProductsQuery } from '../../redux/api/productsApi'
import ProductItem from '../product/ProductItem'
import Loader from '../layout/Loader'
import toast from 'react-hot-toast'

const Home = () => {
      const {data , isLoading , error , isError} = useGetProductsQuery()

useEffect(()=>{

if(isError) {
// console.log(error?.data?.message)

      console.log(error?.data?.message);
toast.error(error?.data?.message);

}
  
},[isError])

      
if(isLoading) return  <Loader/>


  return (

<>
<MetaData title={"Buy Best Products Online"}/>

    
    <div className="row">
      <divc className="col-12 col-sm-6 col-md-12">
        <h1 id="products_heading" className="text-secondary">Latest Products</h1>

        <section id="products" className="mt-5">
          <div className="row">
            {
            data?.products?.map((product) => (
        
<ProductItem   product={product}/>
        
          
))
}
          
      
          </div>
        </section>
      </divc>
    </div>
</>
  )
}

export default Home
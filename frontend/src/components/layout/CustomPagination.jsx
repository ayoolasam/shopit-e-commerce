import React, { useEffect } from 'react'
import { useState } from 'react';
import {useSearchParams} from 'react-router-dom'
import Pagination from 'react-js-pagination'


const CustomPagination = ({resPerPage,filteredProductsCount}) => {
const [currentPage , setCurrentPage] = useState()
  let [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page'))|| 1;
useEffect(()=>{
setCurrentPage(page)
},[page])


const setCurrentPageNo = () => {

};

  return (
    <div>
      {filteredProductsCount > resPerPage ?  <Pagination
        activePage={currentPage}
        itemsCountPerPage={resPerPage}
        totalItemsCount={filteredProductsCount}
        
        onChange={setCurrentPageNo}
        nextPageText={'Next'}
        prevPageText={'Prev'}
        firstPageText={'First'}
        lastPageText={'Last'}
        /> : null
      }
    </div>
  )
}

export default CustomPagination
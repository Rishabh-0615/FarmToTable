import React, { useEffect } from 'react'
import FarmerNavbar from './FarmerNavbar'
import { HeroSection } from './HeroSection'
import { Footer } from './Footer'
import Navbar from './Navbar'
import { ProductData } from '../context/FarmerContext'
import { Loading } from '../components/Loading'
import ItemCard from '../components/ItemCard'
import ItemCardHome from '../components/ItemCardHome'

const FarmerHome = () => {

  const {fetchProducts,products,loading}=ProductData()
  console.log(products)

  useEffect(()=>{
      fetchProducts();
    },[]);
  return (
    <div>

      <HeroSection/>
      
      {
        loading? <Loading/> :(<div className=' max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ' >
          <div className='px-4 py-6 sm:px-0'>
            <div className='flex flex-wrap m-4'>
                {
                  products && products.length>0? products.map((e,i)=>(
                    <p><ItemCardHome key={i} product={e} /></p>
                  )) : <p>No Products yet</p>
                }
            </div>
          </div>
          
          </div>)
        }

      
     
      <Footer/>
      
    </div>
  )
}

export default FarmerHome
